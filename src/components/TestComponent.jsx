var React = require('react'),
    Actions = require('../actions/Actions'),
    Store = require('../stores/Store');

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {blueGrey400} from 'material-ui/styles/colors';
import {deepOrange500} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const styles = {
  container: {
    textAlign: 'center'
  },
  appBar: {
    backgroundColor: blueGrey400
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

var TestComponent = React.createClass({
  state: {
    open: false,
  },

  handleRequestClose: function() {
    this.setState({
      open: false,
    });
  },

  handleTouchTap: function() {
    this.setState({
      open: true,
    });
  },

  menuClick: function() {
    console.log(this);
  },

  getInitialState: function() {
    return Store.get();
  },
  componentDidMount: function() {
    Store.addListener('change', this.changeEventHandler);
  },
  changeEventHandler: function() {
    this.setState(Store.get());
  },
  handleChange: function(event) {
    Actions.set(event.target.value);
  },
  handleButtonClick: function(event) {
    Actions.add(1);
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
      <MuiThemeProvider muiTheme={muiTheme}>
      	<div style={styles.container}>
      	  <AppBar
        	    title="Title"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonTouchTap = {this.menuClick}
              style={styles.appBar}
          />

          <RaisedButton
            label="Super Secret Password"
            primary={true}
            onTouchTap={this.handleTouchTap}
          />

          <Dialog
              open={this.state.open}
              title="Super Secret Password"
              actions={standardActions}
              onRequestClose={this.handleRequestClose}
            >
            1-2-3-4-5
          </Dialog>
       	</div>
       </MuiThemeProvider>
  )}
});

module.exports = TestComponent;
