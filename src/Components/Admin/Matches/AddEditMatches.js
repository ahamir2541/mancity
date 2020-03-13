import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout'
import FormField from '../../UI/FormField'
import { valiDate } from '../../UI/Tag'
import { firebaseTeams, firebaseDB, firebaseMatches } from '../../../firebase'
import { firebaseLooper } from '../../UI/Tag'

class AddEditMatches extends Component {

    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formdata: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event Date',
                    name: 'date_input',
                    type: 'date',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'select a local team',
                    name: 'select_local',
                    type: 'select',
                    options: [{ key: 'Yes', value: 'Yes' }, { key: 'Yes', value: 'Yes' },]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result local',
                    name: 'result_local_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'select a local team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result local',
                    name: 'result_local_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'team result',
                    name: 'select_result',
                    type: 'select',
                    options: [
                        {key:'W', value:'W'},
                        {key:'L', value:'L'},
                        {key:'D', value:'D'},
                        {key:'n/a', value:'n/a'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
             final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game played ?',
                    name: 'select_played',
                    type: 'select',
                    options: [
                        {key:'Yes', value:'Yes'},
                        {key:'No', value:'No'},                    
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },

        }

    }

    updateForm(element) {
        const newFormData = { ...this.state.formdata }
        const newElement = { ...newFormData[element.id] }

        newElement.value = element.event.target.value

        let validData = valiDate(newElement)
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]

        newFormData[element.id] = newElement

        this.setState({
            formError: false,
            formdata: newFormData
        })
    }

    updateFields(match,teamOptions,teams,type,matchId){
        const newFormData = {
            ...this.state.formdata
        }
        for(let key in newFormData){
            if(match){
                newFormData[key].value = match[key]
                newFormData[key].valid = true
            }
            if(key === 'local' || key === 'away'){
                newFormData[key].config.options = teamOptions
            }
        }
        this.setState({
            matchId,
            formType: type,
            formdata: newFormData,
            teams,
        })
        
    }

    successForm(message){
        this.setState({
            formSuccess: message
        })

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            })
        },2000)
    }

    submitForm(event) {
        event.preventDefault()

        let dataToSubmit = {}
        let formIsValid = true

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value
            formIsValid = this.state.formdata[key].valid && formIsValid
        }
        this.state.teams.forEach((team) => {
            if(team.shortName === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb 
            }
            if(team.shortName === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb
            }
        })
        if (formIsValid) {
            if(this.state.formType === 'Edit match'){
                firebaseDB.ref(`matches/${this.state.matchId}`)
                .update(dataToSubmit).then(() => {
                    this.successForm('update correctly')
                }).catch((e)=>{
                    this.setState({
                        formError : true
                    })
                })
            }else{
                firebaseMatches.push(dataToSubmit).then(() => {
                    this.props.history.push('/admin_matches')
                }).catch((e) => {
                    this.setState({
                        formError: true
                    })
                })
            }

        } else {
            this.setState({
                formError: true
            })
        }

    }

    componentDidMount(){
        const matchId = this.props.match.params.id
        const getTeams = (match, type) =>{
            firebaseTeams.once('value').then(snpashot=> {
                const teams = firebaseLooper(snpashot)
                const teamOptions = []

                snpashot.forEach((childSnapshot) => {
                    teamOptions.push({
                        key: childSnapshot.val().shortName,
                        value: childSnapshot.val().shortName
                    })
                })
                this.updateFields(match,teamOptions,teams,type,matchId)
            })
        }
        if(!matchId){
            getTeams(false, 'Add match')
        }else{
            firebaseDB.ref(`matches/${matchId}`).once('value')
            .then((snpashot)=> {
                const match = snpashot.val()
                getTeams(match, 'Edit match')
            })
        }
    }

    render() {
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2> {this.state.formType} </h2>
                    <div>
                        <form onSubmit={(event) => this.submitForm(event)} >
                            <FormField
                                id={'date'}
                                formdata={this.state.formdata.date}
                                change={(element) => this.updateForm(element)}
                            />

                            <div className="select_team_layout">
                                <div className="label_inputs">Local</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'local'}
                                            formdata={this.state.formdata.local}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div >
                                        <FormField
                                            id={'resultLocal'}
                                            formdata={this.state.formdata.resultLocal}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'away'}
                                            formdata={this.state.formdata.away}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div >
                                        <FormField
                                            id={'resultAway'}
                                            formdata={this.state.formdata.resultAway}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="split_fields">
                                <FormField
                                    id={'referee'}
                                    formdata={this.state.formdata.referee}
                                    change={(element) => this.updateForm(element)}
                                />
                                <FormField
                                    id={'stadium'}
                                    formdata={this.state.formdata.stadium}
                                    change={(element) => this.updateForm(element)}
                                />
                            </div>
                            <div className="split_fields last">
                                <FormField
                                    id={'result'}
                                    formdata={this.state.formdata.result}
                                    change={(element) => this.updateForm(element)}
                                />
                                <FormField
                                    id={'final'}
                                    formdata={this.state.formdata.final}
                                    change={(element) => this.updateForm(element)}
                                />                              
                            </div>

                            <div className="success_label">{this.state.formSuccess} </div>
                            {this.state.formError ?
                                <div className="error_label">Something is wrong</div>
                                : ''
                            }
                            <div className="admin_submit">
                                <button onClick={ (event) => this.submitForm(event) }>
                                    {this.state.formType}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditMatches;