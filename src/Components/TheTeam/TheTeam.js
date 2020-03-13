import React, { Component } from 'react';
import PlayerCard from '../UI/PlayerCard'
import Fade from 'react-reveal'
import Stripes from '../../Resources/images/stripes.png'
import Otamendi from '../../Resources/images/players/Otamendi.png'
import Raheem from '../../Resources/images/players/Raheem.png'
import Vincent from '../../Resources/images/players/Vincent.png'

class TheTeam extends Component {

    state = {
        loading: true,
        players: []
    }

    // componentDidMount(){
    //     firebasePlayers.once('value').then(snapshot => {
    //         const players = firebaseLooper(snapshot)
    //         let promises = []

    //         for(let key in players){
    //             promises.push(
    //                 new Promise((resolve, reject)=>{
    //                     firebase.storage().ref('players')
    //                     .child(players[key].image).getDownloadURL()
    //                     .then(url => {
    //                         players[key].url = url
    //                         resolve()
    //                     })
    //                 })
    //             )
    //         }

    //         Promise.all(promises).then(() => {
    //             this.setState({
    //                 loading: false,
    //                 players
    //             })
    //         })
            
    //     })
    // }


    render() {
        return (
            <div className="the_team_container" style={{
                background: `url(${Stripes}) repeat`
            }}>
               <div>
                   <div className="team_category_wrapper">
                       <div className="title">Keepers</div>
                       <div className="team_cards">
                           <Fade left delay={2000} >
                           <div className="item">
                               <PlayerCard 
                               number="10" 
                               name="Leonal"
                               lastname="Messi"
                               bak={Otamendi}
                               />
                           </div>
                           <div className="item">
                               <PlayerCard 
                               number="17" 
                               name="Raheem"
                               lastname="lalen"
                               bak={Raheem}
                               />
                           </div>
                           
                           </Fade>
                       </div>
                       <div className="title">Defence</div>
                       <div className="team_cards">
                           <Fade left delay={2000} >
                           <div className="item">
                               <PlayerCard 
                               number="2" 
                               name="leo"
                               lastname="Demaria"
                               bak={Vincent}
                               />
                           </div>
                           <div className="item">
                               <PlayerCard 
                               number="22" 
                               name="Jhon"
                               lastname="Wick"
                               bak={Raheem}
                               />
                           </div>
                           <div className="item">
                               <PlayerCard 
                               number="9" 
                               name="Kristan"
                               lastname="Ronaldo"
                               bak={Otamendi}
                               />
                           </div>
                           </Fade>
                       </div>
                   </div>
               </div>
            </div>
        );
    }
}

export default TheTeam;