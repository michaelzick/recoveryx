/* jslint esversion:6 */

(function () {
  'use strict';
})();

import React, {Component} from 'react';
import Actions from '../actions/Actions';
import Store from '../stores/Store';

class TestComponent extends Component {
  constructor(props) {
    super(props);

    this.state = Store.get();
    this.changeEventHandler = this.changeEventHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    Store.addListener('change', this.changeEventHandler);
  }

  changeEventHandler() {
    this.setState(Store.get());
  }

  handleChange(event) {
    Actions.set(event.target.value);
  }

  handleButtonClick() {
    Actions.add(1);
  }

  render() {
    return (
      <div>
        Hello <input onChange={this.handleChange} defaultValue={this.state.value} type="text"/>
        <button onClick={this.handleButtonClick}>+1</button>
        <hr/>
        <span>{this.state.count}: {this.state.value}</span>
      </div>
  )}
}

module.exports = TestComponent;
