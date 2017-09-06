import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/FlatButton';
import {cyanA200} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Footer from '../../src/components/Footer.jsx';
import Nav from '../../src/components/Nav.jsx';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
// import ReactCSSTransitionGroup from 'react-addons-transition-group';

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
    circlePaper: {
        height: 200,
        width: 200,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        cursor: 'pointer',
    },
};

const dialogText = {
    sports: 'Currently we\'re only organizing surfing meetups, but will be adding skating, snowboarding and more in the future. ' +
                'Come join us regardless of skill level - we\'ll have a board that suits you!',
    service: 'With a firm belief that self esteem is built through esteemable acts, we pride ourselves in our community involvement. ' +
                'Whether it\'s a beach cleanup or helping a newcomer get on a board, we strive to make service a core value.',
    steps: 'Rooted in the 12 steps found in several successful recovery programs, we believe that living a spiritual life, driven by these ' +
                'principles, are what lead us to becoming better people in our daily lives. Don\'t be put off by the "G" word. All religions ' +
                'and spiritual practices are welcome. We do however follow the 12 steps as a general guide to living.'
};

const InfoCard = () => (
    <Card className="main-info-card">
        <CardTitle title="Our Mission:"
            subtitle={
                <span className="card-subtitle">
                    To provide an active outlet for those recovering from drug and alcohol addiction.
                </span>
            }
        />
        <CardText style={styles.card.cardText}>
            RecoveryX seeks to improve the lives of those recovering from drugs and alcohol,
             and foster a spirit of community, comradery and a healthy replacement for the substances that were destroying
             our lives. Whether you're just starting out or a semi-pro; a surfer, skater, snowboarder, or just an active person
             looking to replace addiction for endorphines, you've come to the right place!
             <br/>
             <br/>
            Click on one of the circles above or visit a dedicated sports page to find out more!
        </CardText>
        <CardActions>
            {/*<FlatButton label="Action1" />
            <FlatButton label="Action2" />*/}
        </CardActions>
    </Card>
);

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    handleTouchTap(title, text) {
        this.setState({
            open: true,
            title: title,
            dialogText: text
        });
    }

    render () {
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

                    <Nav label="Surfing" url="/surfing" outline="" />

                    <Dialog
                        className='dialog'
                        open={this.state.open}
                        title={this.state.title}
                        actions={standardActions}
                        onRequestClose={this.handleRequestClose}>
                        {this.state.dialogText}
                    </Dialog>

                    <div className="clear"></div>

                    <div className="hero">
                        <div className="hero-inner">
                            <h1 className="hero-title">RecoveryX</h1>
                        </div>
                    </div>

                    <div className="circles-block" ref="circles">
                        <div className="circle-block">
                            <Paper
                                className="surfboard-card main-card"
                                onTouchTap={this.handleTouchTap.bind(null, 'Sports', dialogText.sports)}
                                style={styles.circlePaper} zDepth={2}
                                circle={true}>
                            </Paper>
                            <div>Sports</div>
                        </div>

                        <div className="circle-block">
                            <Paper
                                className="cleanup-card main-card"
                                onTouchTap={this.handleTouchTap.bind(null, 'Service', dialogText.service)}
                                style={styles.circlePaper} zDepth={2}
                                circle={true}>
                            </Paper>
                            <div>Service</div>
                        </div>

                        <div className="circle-block">
                            <Paper
                                className="twelve-card main-card"
                                onTouchTap={this.handleTouchTap.bind(null, 'Steps', dialogText.steps)}
                                style={styles.circlePaper} zDepth={2}
                                circle={true}>
                            </Paper>
                            <div>Steps</div>
                        </div>
                    </div>

                    <div className="main-info-wrapper card-margin-top">
                        <InfoCard/>
                    </div>

                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
}

module.exports = Main;
