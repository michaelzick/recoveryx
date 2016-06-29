var React = require('react'),
    Actions = require('../../src/actions/Actions'),
    Store = require('../../src/stores/Store');

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {blueGrey400} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
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
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
  card: {
    maxWidth: 500,
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
              open={this.state.open}
              title="Work"
              actions={standardActions}
              onRequestClose={this.handleRequestClose}
            >
            Should be dynamic.
          </Dialog>
          <div style={styles.root}>
            {this.props.dataFeed.map(function(data, i) {
                if (data.proj_is_url == true) {
                    var fancyBox = "";
                    var targetBlank = "_blank";
                } else {
                    fancyBox = "fancybox";
                }
                if (data.proj_new_line == true) {
                    var newLine = "thumb-new-line";
                } else {
                    newLine = "";
                }
                if (data.proj_is_iframe == true) {
                    var isIframe = "iframe";
                } else {
                    isIframe = "";
                }
                if (data.proj_type == "pics") {
                    var hasRole = "";
                } else {
                    hasRole = "Role: ";
                }

                if (data.proj_title === 'Seon & Me' ||
                  data.proj_title === 'Blaise' ||
                  data.proj_title === 'Eden') {
                  return;
                } else {
                  return (
                    <Card style={styles.card}>
                      <CardHeader
                        title={data.proj_title}
                        avatar="http://lorempixel.com/100/100/animals/"
                      />
                      <CardMedia
                        overlay={<CardTitle title={data.proj_title}/>}
                      >
                        <img src="http://lorempixel.com/600/337/animals/" />
                      </CardMedia>
                      <CardTitle/>
                      <CardText>
                        {data.proj_role}
                      </CardText>
                      <CardActions>
                        <FlatButton label="Action1" onTouchTap={this.handleTouchTap}/>
                        <FlatButton label="Action2" />
                      </CardActions>
                    </Card>
                  );
                }
              }.bind(this))}
          </div>
        </div>
      </MuiThemeProvider>
  )}
});

module.exports = ShowData;
