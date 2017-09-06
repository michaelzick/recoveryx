(function () {
  'use strict';
})();

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/FlatButton';
import {cyanA200} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import Footer from '../../src/components/Footer.jsx';
import Nav from '../../src/components/Nav.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const styles = {
    container: {
        textAlign: 'center'
    },
    card: {
        cardText: {
            fontSize: '16px',
        }
    },
};

const ContactCard = () => (
    <Card className="contact-main-info-card">
        <CardHeader
            title="Michael Zick"
            subtitle="Founder"
            avatar="img/me/porto.jpg"
        />
        <CardMedia>
            <img src="img/me/porto-stylized.jpg" />
        </CardMedia>
        <CardText>
            Michael started RecoveryX out of a need to connect with people doing what he loved the most,
             with people looking to challenge themselves to become better individuals, better athletes and better
             than they were before.
             {<br/>}
             {<br/>}
            A web developer by trade, a musician by hobby and an ocean lover at heart, Michael is actualy a natural introvert.
             However by contrary action and the desire to help other people, RecoveryX was born out of a willingness to change;
             a change that he hopes will inspire those looking for a way out of addiction.
        </CardText>
        <CardActions>
            <FlatButton onClick={() => window.open('//www.facebook.com/rxorg','_blank')} label="Facebook" />
            <FlatButton onClick={() => window.open('//www.instagram.com/rxorg','_blank')} label="Instagram" />
        </CardActions>
    </Card>
);

const Contact = () => (
    <MuiThemeProvider muiTheme={getMuiTheme({
        palette: {
            primary1Color: cyanA200
        },
    })}>
        <div style={styles.container}>
            <Nav page="contact" />

            <div className="hero">
                <div className="hero-inner">
                    <h1 className="hero-title">Contact</h1>
                </div>
            </div>

            <div className="main-info-wrapper">
                <ContactCard />
            </div>

            <Footer/>
        </div>
    </MuiThemeProvider>
);

module.exports = Contact;
