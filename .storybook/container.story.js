import React from "react";
import { storiesOf } from "@storybook/react";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.contentRef = React.createRef();
    this.selectedRef = React.createRef();
  }

  scroll() {
    const container = this.containerRef.current;
    const content = this.contentRef.current;
    const selected = this.selectedRef.current;

    const contentTop = content.offsetTop;

    const top = selected.offsetTop;
    const bottom = top + selected.offsetHeight;
    const middle = Math.floor((top + bottom) / 2);
    console.log(middle);
    container.scrollTop = middle - contentTop;
  }

  componentDidMount() {
    this.scroll();
  }

  componentDidUpdate() {
    this.scroll();
  }

  state = {
    selectedIndex: 1
  };

  render() {
    return (
      <div
        style={{
          background: "green",
          height: 0,
          padding: "250px 0",
          overflow: "hidden",
          position: "relative"
        }}
        ref={this.containerRef}
      >
        <div
          style={{
            background: "red",
            border: "1px solid red",
            display: "inline-block"
          }}
          ref={this.contentRef}
        >
          {[100, 50, 200].map((h, i) => (
            <div
              ref={this.state.selectedIndex === i && this.selectedRef}
              style={{
                background:
                  this.state.selectedIndex === i ? "#ff9800" : "#cddc39",
                height: h,
                width: 200,
                border: "1px dashed grey"
              }}
              onClick={() => this.setState({ selectedIndex: i })}
            >
              {h}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

storiesOf("Container", module).add("bigger container than content", () => (
  <MyComponent />
));
