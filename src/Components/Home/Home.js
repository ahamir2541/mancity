import React from 'react';
import Feature from './Feature/Feature'
import MatchesHome from './MatchesHome/MatchesHome'
import MeetPlayers from './MeetPlayer/MeetPlayers'
import Promotion from './Promotion/Promotion'

const Home = () => {
    return (
        <div className="bck_blue">
            <Feature/>
            <MatchesHome/>
            <MeetPlayers/>
            <Promotion/>
        </div>
    );
};

export default Home;