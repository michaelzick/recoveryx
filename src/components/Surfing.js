/* jslint esversion:6 */

(function () {
  'use strict';
})();

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/FlatButton';
import {cyanA200} from 'material-ui/styles/colors';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
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

const MainInfoCard = () => (
    <Card className="surf-main-info-card">
        <CardTitle title="Surfing Meetups" subtitle="" />
        <CardText style={styles.card.cardText}>
            Currently our surfing schedule is organized through meetups found through
             our <a className="social-link" href="//www.facebook.com/rxorg" className="underline">Facebook</a> page.
             You can also check us out on <a className="social-link" href="//www.instagram.com/rxorg" className="underline">Instragram</a>.
        </CardText>
        <CardActions>
            <FlatButton onClick={() => window.open('//www.facebook.com/rxorg','_blank')} label="Facebook" />
            <FlatButton onClick={() => window.open('//www.instagram.com/rxorg','_blank')} label="Instagram" />
        </CardActions>
    </Card>
);

const Surfing = () => (
    <MuiThemeProvider muiTheme={getMuiTheme({
        palette: {
            primary1Color: cyanA200
        },
    })}>
      	<div style={styles.container}>
            <Nav page="surfing" />

            <div className="hero">
                <div className="hero-inner">
                    <h1 className="hero-title">Surfing</h1>
                </div>
            </div>

            <div className="main-info-wrapper">
                <MainInfoCard />
            </div>

            <Footer/>
        </div>
    </MuiThemeProvider>
);

module.exports = Surfing;
