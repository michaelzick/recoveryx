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
      height: 90,
      fontSize: 30,
      lineHeight: 3,
    },
    iconLeft: {
      padding: 0,
      display: 'none'
    }
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
  },
  mainInfoCard: {
    position: 'absolute',
    top: '440px',
    width: '90%'
  }
};

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }

  goToPage(loc) {
    window.location = loc;
  }

  render() {
    return (
      <div className="dt-menu">
        <FlatButton onClick={this.goToPage.bind(null, '/')} label="Home" primary={true}/>
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
          style={styles.appBar}
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
          iconClassNameLeft="app-bar-burger"
          className="app-bar"
          iconStyleLeft={styles.appBar.iconLeft}
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
          <AppBarDrawer/>

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
        </div>
      </MuiThemeProvider>
  )}
});

module.exports = Surfing;
