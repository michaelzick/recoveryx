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
  render: function() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      	<div style={styles.container}>
      	  <AppBar
        	    title="Title"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonTouchTap = {this.menuClick}
              style={styles.appBar}
          />
          <div style={styles.root}>
            {this.props.dataFeed.map(function(data, i) {
                var newLine = "",
                    fancyBox = "",
                    targetBlank = "",
                    isIframe = "",
                    hasRole = "";

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

                return (
                  <Card style={styles.card}>
                    <CardHeader
                      title={data.proj_title}
                      avatar="http://lorempixel.com/100/100/nature/"
                    />
                    <CardMedia
                      overlay={<CardTitle title={data.proj_title}/>}
                    >
                      <img src="http://lorempixel.com/600/337/nature/" />
                    </CardMedia>
                    <CardTitle/>
                    <CardText>
                      {data.proj_role}
                    </CardText>
                    <CardActions>
                      <FlatButton label="Action1" />
                      <FlatButton label="Action2" />
                    </CardActions>
                  </Card>
                );
              })}
          </div>
        </div>
      </MuiThemeProvider>
  )}
});

module.exports = ShowData;
