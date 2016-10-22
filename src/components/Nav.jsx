import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Popover from 'material-ui/Popover';

const styles = {
    appBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.66)',
        position: 'absolute',
        boxShadow: 'none',
        textAlign: 'left',
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

export default class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            value: 1,
            open: false,
        };
    }

    goToPage(loc) {
        window.location = loc;
    }

    render() {
        return (
            <div className="dt-menu">
                <FlatButton
                    onClick={this.goToPage.bind(null, this.props.url)}
                    label={
                        <span className={this.props.outline}>
                            {this.props.label}
                        </span>
                    }
                    disabled={this.props.disabled}
                    primary={true} />
                <FlatButton label="Skating" onTouchTap={this.props.handleTouchTap} primary={true} />
                <FlatButton label="Snowboarding" onTouchTap={this.props.handleTouchTap} primary={true} />
                <FlatButton label="Contact" onClick={this.goToPage.bind(null, '/contact')} primary={true} />

                {/*
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
                */}
            </div>
        );
    }
}

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: 1,
            popOpen: false
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

    handleTouchTap(event) {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            popOpen: true,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose() {
        this.setState({
            popOpen: false
        });
    }

    render() {
        return (
            <div>
                <Popover
                  open={this.state.popOpen}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose.bind(this)}>
                  <Menu>
                    <MenuItem primaryText="Coming Soon!" disabled={true} />
                  </Menu>
                </Popover>

                <AppBar
                    style={styles.appBar}
                    onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
                    iconClassNameLeft="app-bar-burger"
                    className="app-bar"
                    title={
                        <div>
                            <a href="/">
                                <span className="nav-logo-r">R</span>
                                <span className="nav-logo-x">x</span>
                            </a>
                        </div>
                    }
                    iconStyleLeft={styles.appBar.iconLeft}>

                    <MainMenu label={
                        this.props.label}
                        url={this.props.url}
                        handleTouchTap={this.handleTouchTap.bind(this)}
                        outline={this.props.outline}
                        disabled={this.props.disabled}
                    />
                </AppBar>

                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>

                    <div className="drawer-header" style={styles.appBar.header}></div>

                    <MenuItem
                        onClick={this.goToPage.bind(null, this.props.url)}
                        onTouchTap={this.handleClose.bind(this)}
                        disabled={this.props.disabled}>
                        <span className={this.props.outline}>
                            {this.props.label}
                        </span>
                    </MenuItem>

                    <MenuItem onTouchTap={this.handleTouchTap.bind(this)}>Skating</MenuItem>
                    <MenuItem onTouchTap={this.handleTouchTap.bind(this)}>Snowboarding</MenuItem>
                    <MenuItem onTouchTap={this.handleTouchTap.bind(this)}>Contact</MenuItem>

                    {/*
                    <DropDownMenu value={this.state.value}>
                        <MenuItem value={1} primaryText="Other" />
                        <MenuItem value={2} onTouchTap={this.handleClose.bind(this)} primaryText="Running" />
                        <MenuItem value={3} onTouchTap={this.handleClose.bind(this)} primaryText="Hiking" />
                        <MenuItem value={4} onTouchTap={this.handleClose.bind(this)} primaryText="Swimming" />
                        <MenuItem value={5} onTouchTap={this.handleClose.bind(this)} primaryText="Add a sport" />
                    </DropDownMenu>
                    */}
                </Drawer>
            </div>
        );
    }
}

module.exports = Nav;
