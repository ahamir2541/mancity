import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease'
import Animate from 'react-move/Animate'
import FeaturePlayer from '../../../Resources/images/featured_player.png'

class Text extends Component {

    animatedNumber = () => (
        <Animate
        show={true}

        start={{
            opacity: 0,
            rotate: 0 
        }}
        enter={{
            opacity:[1],
            rotate: [360],
            timing: {duration: 1000, ease: easePolyOut}
        }}
        >
            {({opacity,rotate }) => {
                return (
                    <div 
                    className="featured_number"
                    style={{
                        opacity,
                        transform: `translate(260px, 170px) rotateY(${rotate}deg)`
                    }}
                    >
                        3
                    </div>
                )
            }}
        </Animate>
    )

    firstAnimation = () => (
        <Animate
        show={true}

        start={{
            opacity: 0,
             x: 503,
             y: 450,
        }}
        enter={{
            opacity:[1],
            x:[273],
            y:[450],
            timing: {duration: 1000, ease: easePolyOut}
        }}
        >
            {({opacity,x,y }) => {
                return (
                    <div 
                    className="featured_first"
                    style={{
                        opacity,
                        transform: `translate(${x}px, ${y}px) `
                    }}
                    >
                        League
                    </div>
                )
            }}
        </Animate>
    )

    secondAnimation = () => (
        <Animate
        show={true}

        start={{
            opacity: 0,
             x: 503,
             y: 586,
        }}
        enter={{
            opacity:[1],
            x:[273],
            y:[586],
            timing: {duration: 500, delay:300, ease: easePolyOut}
        }}
        >
            {({opacity,x,y }) => {
                return (
                    <div 
                    className="featured_second"
                    style={{
                        opacity,
                        transform: `translate(${x}px, ${y}px) `
                    }}
                    >
                        ChampionShips
                    </div>
                )
            }}
        </Animate>
    )
    
    playerAnimation = () => (
        <Animate
        show={true}

        start={{
            opacity: 0,
            
        }}
        enter={{
            opacity:[1],
            
            timing: {duration: 500, delay:800, ease: easePolyOut}
        }}
        >
            {({opacity }) => {
                return (
                    <div 
                    className="featured_player"
                    style={{
                        opacity,
                        background: `url(${FeaturePlayer})`,
                        transform: `translate(550px, 201px) `
                    }}
                    >
                    </div>
                )
            }}
        </Animate>
    )

    render() {
        return (
            <div className="featured_text">
                {this.playerAnimation()}
                {this.animatedNumber()}
                {this.firstAnimation()}
                {this.secondAnimation()}
                
            </div>
        );
    }
}

export default Text;