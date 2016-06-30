var React = require('react'),
    Actions = require('../../src/actions/Actions'),
    Store = require('../../src/stores/Store');

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {blueGrey400} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const styles = {
  container: {
    textAlign: 'center'
  },
  appBar: {
    backgroundColor: blueGrey400
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  thumb: {
    maxWidth: '300px',
    minWidth: '100%'
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
  card: {
    width: 500,
    float: 'left'
  }
};

const muiTheme = getMuiTheme({
  // palette: {
  //   accent1Color: deepOrange500,
  // },
});

var ShowData = React.createClass({
  state: {
    open: false
  },

  handleRequestClose: function() {
    this.setState({
      open: false,
    });
  },

  handleTouchTap: function(text) {
    this.setState({
      open: true,
      dialogueText: text
    });
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
      <MuiThemeProvider muiTheme={muiTheme}>
      	<div style={styles.container}>
      	  <AppBar
        	    title="Title"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonTouchTap = {this.menuClick}
              style={styles.appBar}
          />
          <Dialog
              className='dialogue'
              open={this.state.open}
              title="Work"
              actions={standardActions}
              onRequestClose={this.handleRequestClose}
            >
            {this.state.dialogueText}
          </Dialog>
          <div style={styles.root}>
            {this.props.dataFeed.map(function(data, i) {
              return (
                <Card style={styles.card}>
                  <CardHeader
                    title={data.proj_title}
                    avatar={data.proj_thumb}
                  />
                  <CardMedia
                    overlay={<CardTitle title={data.proj_title}/>}
                  >
                    <img style={styles.thumb} src={data.proj_thumb}/>
                  </CardMedia>
                  <CardTitle/>
                  <CardText>
                    {data.proj_role}
                  </CardText>
                  <CardActions>
                    <FlatButton
                      label="Action1"
                      onTouchTap={this.handleTouchTap.bind(null, data.proj_role)}
                    />
                    <FlatButton label="Action2" />
                  </CardActions>
                </Card>
              );
            }.bind(this))}
          </div>
        </div>
      </MuiThemeProvider>
  )}
});

module.exports = ShowData;
