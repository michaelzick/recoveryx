var React = require('react'),
    Actions = require('../../src/actions/Actions'),
    Store = require('../../src/stores/Store');

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
          <ul className="thumbnails">
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
                      <li key={i} className={newLine + " span3"}>
                          <a href={data.proj_link_0}
                              className={fancyBox + " thumbnail"}
                              target={targetBlank}
                              data-fancybox-type={isIframe}
                              rel={data.proj_rel}
                              title={data.proj_title + "</br>" + data.proj_role}>
                              <img src={data.proj_thumb}/>
                          </a>
                          <div className="caption">
                              <h2>{data.proj_header}</h2>
                              <h3 className="lato description">{data.proj_desc}</h3>
                          </div>
                      </li>
                  );
              })}
          </ul>
        </div>
      </MuiThemeProvider>
  )}
});

module.exports = ShowData;
