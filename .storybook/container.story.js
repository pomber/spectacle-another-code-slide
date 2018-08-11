import React from "react";
import { storiesOf } from "@storybook/react";
const Tween = require("component-tween");
const raf = require("component-raf");

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.contentRef = React.createRef();
    this.selectedRef = React.createRef();
  }

  animateScroll(container, center) {
    const startY = container.scrollTop;
    const endY = center;

    const tween = Tween({ top: startY })
      .ease("out-circ")
      .to({ top: endY })
      .duration(1000);

    tween.update(o => {
      container.scrollTop = o.top | 0;
    });
    tween.on("end", function() {
      animate = function() {};
    });

    function animate() {
      raf(animate);
      tween.update();
    }
    animate();
  }

  scroll() {
    const container = this.containerRef.current;
    const content = this.contentRef.current;
    const selected = this.selectedRef.current;

    const contentTop = content.offsetTop;
    const contentHeight = content.offsetHeight;

    const top = selected.offsetTop;
    const bottom = top + selected.offsetHeight;
    const middle = Math.floor((top + bottom) / 2);
    const containerHeight = container.offsetHeight;

    // center in the middle of the selected element
    let center = middle - contentTop;

    if (containerHeight > contentHeight) {
      // center in the middle of the content
      center = contentHeight / 2;
    } else {
      const minScroll = containerHeight / 2;
      const maxScroll = contentHeight - containerHeight / 2;
      center = center < minScroll ? minScroll : center;
      center = center > maxScroll ? maxScroll : center;
    }
    console.log(center);
    // container.scrollTop = center;
    this.animateScroll(container, center);
  }

  componentDidMount() {
    this.scroll();
  }

  componentDidUpdate() {
    this.scroll();
  }

  state = {
    selectedIndex: 0
  };

  render() {
    return (
      <div
        style={{
          background: "green",
          height: 0,
          padding: this.props.containerHeight / 2 + "px 0",
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
          {this.props.items.map((h, i) => (
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

storiesOf("Container", module)
  .add("bigger container than content", () => (
    <MyComponent containerHeight={500} items={[100, 50, 200]} />
  ))
  .add("bigger content than container", () => (
    <MyComponent containerHeight={300} items={[100, 50, 200, 20, 20]} />
  ));
