import React, { Component } from "react";
import logo from "./logo.svg";
import Downshift from "downshift";
import "./App.css";

// fn from https://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field#answer-2897229
function getCaretPosition(oField) {
  // Initialize
  let iCaretPos = 0;

  // IE Support
  if (document.selection) {
    // Set focus on the element
    oField.focus();

    // To get cursor position, get empty selection range
    const oSel = document.selection.createRange();

    // Move selection start to 0 position
    oSel.moveStart("character", -oField.value.length);

    // The caret position is selection length
    iCaretPos = oSel.text.length;
  } else if (oField.selectionStart || oField.selectionStart == "0")
    // Firefox support
    iCaretPos = oField.selectionStart;

  // Return results
  return iCaretPos;
}

class InputWithLocalState extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.updateLocalState = this.updateLocalState.bind(this);
  }
  updateLocalState() {
    this.setState(
      prevState => ({ value: this.input.value }),
      () => {
        this.props.updateParentState &&
          this.props.updateParentState(this.state);
      }
    );
  }
  render() {
    const { innerRef, updateParentState, ...restOfProps } = this.props;
    return (
      <input
        {...restOfProps}
        ref={n => {
          this.input = n;
          innerRef(n);
        }}
        value={this.state.value}
        onInput={this.updateLocalState}
      />
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
  }
  render() {
    return (
      <div style={{ textAlign: "center", padding: "2.5em 0" }}>
        <Downshift
          onStateChange={data => {
            return (
              data.hasOwnProperty("inputValue") &&
              this.setState({ inputValue: data.inputValue })
            );
          }}
        >
          {({ getInputProps }) => (
            <div>
              <InputWithLocalState
                {...getInputProps()}
                innerRef={n => (this.test_input = n)}
                updateParentState={childState =>
                  this.setState(prevState => ({
                    inputValue: childState.value
                  }))}
              />
              <div>
                <br />
                Downshift state:{" "}
                <pre style={{ display: "inline-block" }}>
                  <code>{getInputProps().value}</code>
                </pre>
                <br />
                App state:{" "}
                <pre style={{ display: "inline-block" }}>
                  <code>{this.state.inputValue}</code>
                </pre>
              </div>
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

export default App;
