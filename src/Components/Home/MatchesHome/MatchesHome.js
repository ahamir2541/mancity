import React from 'react';
import Tag from '../../UI/Tag'
import Blocks from './Blocks'

const MatchesHome = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag
                bak="#0e1731"
                size="50px"
                color="#ffffff"
                >
                    Matches
                </Tag>

                <Blocks/>

                <Tag
                bak="#ffffff"
                size="22px"
                color="#0e1731"
                link={true}
                linkto="/the_team"
                >
                    see more Matches
                </Tag>

            </div>
        </div>
    );
};

export default MatchesHome;