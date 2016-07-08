import React, {Component} from 'react';
import Actions from '../../src/actions/Actions';
import Store from '../../src/stores/Store';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {blueGrey400} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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

export default class AppBarDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
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

  render() {
    return (
      <div>
        <AppBar
      	    title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            style={styles.appBar}
            onLeftIconButtonTouchTap = {this.handleToggle.bind(this)}
            iconElementRight={
              <IconButton><MoreVertIcon /></IconButton>
            }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}

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
          <AppBarDrawer/>
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
