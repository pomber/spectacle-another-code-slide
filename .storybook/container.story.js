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

  animateScroll(container, content, center, scale, duration) {
    const startY = container.scrollTop;

    // TODO browser support?
    const startScale =
      content.getBoundingClientRect().height / content.offsetHeight;

    const endY = center;

    const tween = Tween({ top: startY, scale: startScale })
      .ease("out-circ")
      .to({ top: endY, scale })
      .duration(duration);

    tween.update(o => {
      container.scrollTop = o.top | 0;
      content.style.transform = "scale(" + o.scale + ")";
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

  scroll(duration) {
    const container = this.containerRef.current;
    const content = this.contentRef.current;
    const selected = this.selectedRef.current || content;

    const contentTop = content.offsetTop;
    const contentHeight = content.offsetHeight;
    const selectedHeight = selected.offsetHeight;

    const top = selected.offsetTop;
    const bottom = top + selected.offsetHeight;
    const middle = Math.floor((top + bottom) / 2);
    const containerHeight = container.offsetHeight;

    let scale = 1;
    if (selectedHeight > containerHeight) {
      scale = containerHeight / selectedHeight;
      const minScale = 0.5;
      scale = scale < minScale ? minScale : scale;
    }

    // center in the middle of the selected element
    let center = middle;
    // debugger;

    const scaledContentHeight = contentHeight * scale;
    if (containerHeight >= scaledContentHeight) {
      // center in the middle of the content
      center = contentHeight / 2;
    } else {
      const minScroll = containerHeight / 2;
      const maxScroll = scaledContentHeight - containerHeight / 2;
      center = center < minScroll ? minScroll : center;
      center = center > maxScroll ? maxScroll : center;
    }

    console.log(center);
    // container.scrollTop = center;
    this.animateScroll(container, content, center, scale, duration);
  }

  componentDidMount() {
    this.scroll(1);
  }

  componentDidUpdate() {
    this.scroll(1000);
  }

  state = {
    selectedIndex: null
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
  ))
  .add("bigger selected than container", () => (
    <MyComponent containerHeight={300} items={[100, 500, 200, 20, 20]} />
  ));
