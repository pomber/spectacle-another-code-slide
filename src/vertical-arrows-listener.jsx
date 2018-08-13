import React from "react";

export default class extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }
  componentWillMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }
  onKeyDown = ev => {
    if (ev.which === 38 && this.props.onUp) {
      this.props.onUp(ev);
      ev.preventDefault();
    }
    if (ev.which === 40 && this.props.onDown) {
      this.props.onDown(ev);
      ev.preventDefault();
    }
  };
  render() {
    return this.props.children;
  }
}
