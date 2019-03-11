//@flow

import React, { Component } from "react";

import PropTypes from "prop-types";

import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  findNodeHandle,
  DeviceInfo
} from "react-native";

export default class KeyBoard extends Component {
  state: Object;
  backSpaceRequest: number;
  insertTextRequest: number;
  clearFocusRequest: number;
  clearAllRequest: number;

  static propTypes = {
    insertText: PropTypes.func.isRequired,
    clearFocus: PropTypes.func.isRequired,
    clearAll: PropTypes.func.isRequired,
    KeyBoardView: PropTypes.any.isRequired
  };

  _handleDelete = () => {
    this.backSpaceRequest && cancelAnimationFrame(this.backSpaceRequest);
    this.backSpaceRequest = requestAnimationFrame(() => {
      this.props.backSpace(this.props.tag);
    });
  };

  _handleKeyPress = key => {
    this.insertTextRequest && cancelAnimationFrame(this.insertTextRequest);
    this.insertTextRequest = requestAnimationFrame(() => {
      this.props.insertText(this.props.tag, key);
    });
  };

  _clearFocus = () => {
    this.clearFocusRequest && cancelAnimationFrame(this.clearFocusRequest);
    this.clearFocusRequest = requestAnimationFrame(() => {
      this.props.clearFocus(this.props.tag);
    });
  };

  _handlerClearAll = () => {
    this.clearAllRequest && cancelAnimationFrame(this.clearAllRequest);
    this.clearAllRequest = requestAnimationFrame(() => {
      this.props.clearAll(this.props.tag);
    });
  };

  componentWillUnmount() {
    this.clearFocusRequest && cancelAnimationFrame(this.clearFocusRequest);
    this.insertTextRequest && cancelAnimationFrame(this.insertTextRequest);
    this.backSpaceRequest && cancelAnimationFrame(this.backSpaceRequest);
    this.clearAllRequest && cancelAnimationFrame(this.clearAllRequest);
  }

  render() {
    const { KeyBoardView } = this.props;

    return (
      <KeyBoardView
        {...this.props}
        onDismiss={this._clearFocus}
        onKeyPress={this._handleKeyPress}
        onDelete={this._handleDelete}
        onClearAll={this._handlerClearAll}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  }
});
