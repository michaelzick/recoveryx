import React, {Component} from 'react';
import Actions from '../../src/actions/Actions';
import Store from '../../src/stores/Store';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/FlatButton';
import {cyanA200} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
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
        <CardTitle title="Michael Zick: Founder" subtitle="" />
        <CardText style={styles.card.cardText}>
            Coming Soon
        </CardText>
        <CardActions>
            <FlatButton onClick={() => window.open('//www.facebook.com/rxorg','_blank')} label="Facebook" />
            <FlatButton onClick={() => window.open('//www.instagram.com/rxorg','_blank')} label="Instagram" />
        </CardActions>
    </Card>
);

var Contact = React.createClass({
    state: {
        open: false
    },

    handleRequestClose: function() {
        this.setState({
            open: false,
        });
    },

    getInitialState: function() {
        return Store.get();
    },

    handleChange: function() {
        Actions.set(this.state.value);
    },

    render: function() {
        const standardActions = (
            <FlatButton
                label="Ok"
                primary={true}
                onTouchTap={this.handleRequestClose}
            />
        );

        return (
            <MuiThemeProvider muiTheme={getMuiTheme({
                palette: {
                    primary1Color: cyanA200
                },
            })}>
              	<div style={styles.container}>
                    <Nav page="contact" />

                    <Dialog
                        className='dialog'
                        open={this.state.open}
                        title="Sports"
                        actions={standardActions}
                        onRequestClose={this.handleRequestClose}>
                        {this.state.dialogText}
                    </Dialog>

                    <div className="clear"></div>

                    <div className="hero">
                        <div className="hero-inner">
                            <h1 className="hero-title">Contact</h1>
                        </div>
                    </div>

                    <div className="main-info-wrapper">
                        <MainInfoCard />
                    </div>

                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
});

module.exports = Contact;
