/* jslint esversion:6 */

(function () {
  'use strict';
})();

import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
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
        },
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
};

class MainMenu extends React.Component {
    constructor(props) {
        super(props);

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
                    onClick={this.goToPage.bind(null, '/surfing')}
                    disabled={this.props.page === 'surfing' ? true : false}
                    label={
                        <span className={this.props.page === 'surfing' ? 'nav-outline' : ''}>
                            Surfing
                        </span>
                    }
                    primary={true}
                />

                <FlatButton label="Skating" onTouchTap={this.props.handleTouchTap} primary={true} />
                <FlatButton label="Snowboarding" onTouchTap={this.props.handleTouchTap} primary={true} />

                <FlatButton
                    onClick={this.goToPage.bind(null, '/contact')}
                    disabled={this.props.page === 'contact' ? true : false}
                    label={
                        <span className={this.props.page === 'contact' ? 'nav-outline' : ''}>
                            Contact
                        </span>
                    }
                    primary={true}
                />

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

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            value: 1,
            popOpen: false
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
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
        // Run if not false.
        if (loc) {
            window.location = loc;
        }
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
                  onRequestClose={this.handleRequestClose}>
                  <Menu>
                    <MenuItem primaryText="Coming Soon!" disabled={true} />
                  </Menu>
                </Popover>

                <AppBar
                    style={styles.appBar}
                    onLeftIconButtonTouchTap={this.handleToggle}
                    iconClassNameLeft="app-bar-burger"
                    className="app-bar"
                    title={
                        <div className="nav-logo relative">
                            <a href="/">
                                <span className="nav-logo-r">R</span>
                                <span className="nav-logo-x primary-cyan-text">x</span>
                            </a>
                        </div>
                    }
                    iconStyleLeft={styles.appBar.iconLeft}>

                    <MainMenu
                        page={this.props.page}
                        handleTouchTap={this.handleTouchTap}
                    />
                </AppBar>

                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>

                    <div className="drawer-header primary-cyan-bg"
                        onClick={this.goToPage.bind(null, '/')}
                        onTouchTap={this.handleClose}>
                        RecoveryX
                    </div>

                    <MenuItem
                        onClick={this.goToPage.bind(null, '/surfing')}
                        onTouchTap={this.handleClose}
                        disabled={this.props.page === 'surfing' ? true : false}>
                        <span className={this.props.page === 'surfing' ? 'nav-outline' : ''}>
                            Surfing
                        </span>
                    </MenuItem>

                    <MenuItem onTouchTap={this.handleTouchTap}>Skating</MenuItem>
                    <MenuItem onTouchTap={this.handleTouchTap}>Snowboarding</MenuItem>
                    <MenuItem
                        onClick={this.goToPage.bind(null, '/contact')}
                        onTouchTap={this.handleClose}
                        disabled={this.props.page === 'contact' ? true : false}>
                        <span className={this.props.page === 'contact' ? 'nav-outline' : ''}>
                            Contact
                        </span>
                    </MenuItem>

                    {/*
                    <DropDownMenu value={this.state.value}>
                        <MenuItem value={1} primaryText="Other" />
                        <MenuItem value={2} onTouchTap={this.handleClose} primaryText="Running" />
                        <MenuItem value={3} onTouchTap={this.handleClose} primaryText="Hiking" />
                        <MenuItem value={4} onTouchTap={this.handleClose} primaryText="Swimming" />
                        <MenuItem value={5} onTouchTap={this.handleClose} primaryText="Add a sport" />
                    </DropDownMenu>
                    */}
                </Drawer>
            </div>
        );
    }
}

module.exports = Nav;
