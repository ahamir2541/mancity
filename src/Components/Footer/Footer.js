import React from 'react';
import CityLogo from '../UI/CityLogo'

const Footer = () => {
    return (
        <footer className="bck_blue">
            <div className="">
                <CityLogo 
                width="70px"
                height="70px"
                link={true}
                linkTo="/"
                />
            </div>
            <div className="footer_discl">
                Manchester city 2020. All rihgts reserved.
            </div>
        </footer>

    );
};

export default Footer;