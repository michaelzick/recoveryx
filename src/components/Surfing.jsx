import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Actions from '../../src/actions/Actions';
import Store from '../../src/stores/Store';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ReactCSSTransitionGroup from 'react-addons-transition-group';
import Footer from '../../src/components/Footer.jsx';
import Nav from '../../src/components/Nav.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const styles = {
  container: {
    textAlign: 'center'
  },
  mainInfoCard: {
    position: 'absolute',
    top: '440px',
    width: '90%'
  }
};

const MainInfoCard = () => (
  <Card style={styles.mainInfoCard}>
    <CardTitle title="Card title" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>
  </Card>
);

var Surfing = React.createClass({
  state: {
    open: false
  },

  handleRequestClose: function() {
    this.setState({
      open: false,
    });
  },

  menuClick: function() {
    this.setState({
      open: !this.state.open,
    });
  },

  getInitialState: function() {
    return Store.get();
  },

  changeEventHandler: function() {
    this.setState(Store.get());
    console.log(Store);
  },

  handleChange: function() {
    Actions.set(this.state.value);
  },

  handleToggle: function() {
    this.setState({
      open: !this.state.open
    });
  },

  handleTouchTap: function(text) {
    this.setState({
      open: true,
      dialogText: text
    });
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
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      	<div style={styles.container}>
          <Nav label="Home" url="/"/>

          <Dialog
              className='dialog'
              open={this.state.open}
              title="Sports"
              actions={standardActions}
              onRequestClose={this.handleRequestClose}
            >
            {this.state.dialogText}
          </Dialog>

          <div className="clear"></div>

          <div className="hero">
            <div className="hero-inner">
              <h1 className="hero-title">Surfing</h1>
            </div>
          </div>

          <div className="main-info-wrapper">
            <MainInfoCard/>
          </div>

          <Footer/>
        </div>
      </MuiThemeProvider>
  )}
});

module.exports = Surfing;
