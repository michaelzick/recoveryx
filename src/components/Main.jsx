import React, {Component} from 'react';
import Actions from '../../src/actions/Actions';
import Store from '../../src/stores/Store';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {cyanA100} from 'material-ui/styles/colors';
import {cyan400} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DropDownMenu from 'material-ui/DropDownMenu';
import Paper from 'material-ui/Paper';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const styles = {
  container: {
    textAlign: 'center'
  },
  appBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.66)',
    position: 'absolute',
    boxShadow: 'none',
    header: {
      // background: 'url("/',
      height: 90,
      fontSize: 30,
      lineHeight: 3,
    }
  },
  card: {
    width: 200,
    float: 'left'
  },
  circlePaper: {
    height: 200,
    width: 200,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  otherMenu: {
    color: 'rgb(0, 151, 167)',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 600,
    paddingLeft: 7,
    top: 1,
    underline: {
      display: 'none'
    }
  }
};

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }

  render() {
    return (
      <div>
        <FlatButton label="Surfing" primary={true}/>
        <FlatButton label="Skating" primary={true}/>
        <FlatButton label="Snowboarding" primary={true}/>
        <FlatButton label="Skiing" primary={true}/>
        <DropDownMenu
          labelStyle={styles.otherMenu}
          value={this.state.value}
          underlineStyle={styles.otherMenu.underline}
        >
          <MenuItem value={1} primaryText="Other" />
          <MenuItem value={2} primaryText="Running" />
          <MenuItem value={3} primaryText="Hiking" />
          <MenuItem value={4} primaryText="Swimming" />
          <MenuItem value={5} primaryText="Add a sport" />
        </DropDownMenu>
      </div>
    );
  }
}

export default class AppBarDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: 1
    };
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    });
  }

  handleClose() {
    this.setState({
      open: !this.state.open
    });
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return (
      <div>
        <AppBar
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          style={styles.appBar}
          onLeftIconButtonTouchTap = {this.handleToggle.bind(this)}
        >
          <Menu/>
        </AppBar>

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <div className="drawer-header" style={styles.appBar.header}></div>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Surfing</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Skating</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Snowboarding</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Skiing</MenuItem>
          <DropDownMenu value={this.state.value}>
            <MenuItem value={1} primaryText="Other" />
            <MenuItem value={2} onTouchTap={this.handleClose.bind(this)} primaryText="Running" />
            <MenuItem value={3} onTouchTap={this.handleClose.bind(this)} primaryText="Hiking" />
            <MenuItem value={4} onTouchTap={this.handleClose.bind(this)} primaryText="Swimming" />
            <MenuItem value={5} onTouchTap={this.handleClose.bind(this)} primaryText="Add a sport" />
          </DropDownMenu>
        </Drawer>
      </div>
    );
  }
}

var Main = React.createClass({
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

  menuClick: function() {
    this.setState({
      open: !this.state.open,
    });
    console.log(this.state);
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
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      	<div style={styles.container}>
          <AppBarDrawer/>
          <div className="hero"></div>
          <div className="circles-block">
            <Paper className="surfboard-card" style={styles.circlePaper} zDepth={2} circle={true} />
            <Paper className="cleanup-card" style={styles.circlePaper} zDepth={2} circle={true} />
            <Paper className="twelve-card" style={styles.circlePaper} zDepth={2} circle={true} />
          </div>

          <div className="main-block"></div>
        </div>
      </MuiThemeProvider>
  )}
});

module.exports = Main;
