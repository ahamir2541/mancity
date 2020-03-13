import React, { Component } from 'react';
import Fade from 'react-reveal/Fade'
import FormField from '../../UI/FormField'
import { valiDate } from '../../UI/Tag'
import { firebasePromotions } from '../../../firebase'

class Enroll extends Component {

    state ={
        formError: false,
        formSuccess: '',
        formdata: {
            email: {
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type: 'email',
                    placeholder: 'enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage:''
            }
        }
    }

    updateForm(element){
        const newFormData = {...this.state.formdata}
        const newElement = {...newFormData[element.id]}

        newElement.value = element.event.target.value 

        let validData = valiDate(newElement)
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]

        newFormData[element.id] = newElement

        console.log(newFormData)

        this.setState({
            formError : false,
            formdata : newFormData
        })
        
    }

    resetFormSuccess(type){
        const newFormData = {...this.state.formdata}

        for(let key in newFormData){
            newFormData[key].value = ''
            newFormData[key].valid = false
            newFormData[key].validationMessage = ''
        }
        this.setState({
            formError : false,
            formdata : newFormData,
            formSuccess : type ? 'Congratulation' : 'Already on the database'
        })
        this.successMessage()
    }

    successMessage(){
        setTimeout(() => {
            this.setState({
                formSuccess : ''
            })
        },2000)
    }

    submitForm(event){
        event.preventDefault()
        
        let dataToSubmit = {}
        let formIsValid = true

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value
            formIsValid = this.state.formdata[key].valid && formIsValid
        }
        if(formIsValid){
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once("value")
            .then((snapshot) => {
                if(snapshot.val() === null){
                    firebasePromotions.push(dataToSubmit)
                    this.resetFormSuccess(true)
                }else{
                    this.resetFormSuccess(false)
                }
            })

            // this.resetFormSuccess()
        }else{
            this.setState({             
                formError : true
            })
        }
        
    }

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={ (event) => this.submitForm(event) }>
                        <div className="enroll_title">
                            Enter your Email
                        </div>
                        <div className="enroll_input">
                            <FormField 
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element) => this.updateForm(element)}
                            />
                            {
                                this.state.formError ? <div className="error_label">Something is wrong, try again</div> : null
                            }
                            <div className="success_label"> {this.state.formSuccess} </div>
                            <button onClick={ (event) => this.submitForm(event) }>Enroll</button>
                            <div className="enroll_discl">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus iure veritatis quisquam vero voluptatum debitis totam, dicta cum exercitationem quia placeat in ea! Tenetur explicabo pariatur tempora porro hic.
                            </div>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;