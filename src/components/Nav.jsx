import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

const styles = {
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
                <FlatButton onClick={this.goToPage.bind(null, this.props.url)} label={this.props.label} primary={true}/>
                <FlatButton label="Skating" primary={true}/>
                <FlatButton label="Snowboarding" primary={true}/>
                <FlatButton label="Skiing" primary={true}/>
                <DropDownMenu
                    labelStyle={styles.otherMenu}
                    value={this.state.value}
                    underlineStyle={styles.otherMenu.underline}>
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

export default class Nav extends React.Component {
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

    goToPage(loc) {
        window.location = loc;
    }

    render() {
        return (
            <div>
                <AppBar
                    style={styles.appBar}
                    onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
                    iconClassNameLeft="app-bar-burger"
                    className="app-bar"
                    iconStyleLeft={styles.appBar.iconLeft}>
                    <Menu label={this.props.label} url={this.props.url}/>
                </AppBar>

                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>

                    <div className="drawer-header" style={styles.appBar.header}></div>

                    <MenuItem
                        onClick={this.goToPage.bind(null, this.props.url)}
                        onTouchTap={this.handleClose.bind(this)}>
                        {this.props.label}
                    </MenuItem>

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

module.exports = Nav;
