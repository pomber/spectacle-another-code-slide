import React from "react";
import { storiesOf } from "@storybook/react";
const Tween = require("component-tween");
const raf = require("component-raf");

//TODO more real representation of LOCs
//navigate with arrows

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.contentRef = React.createRef();
    this.firstSelectedRef = React.createRef();
    this.lastSelectedRef = React.createRef();
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
    const firstSelected = this.firstSelectedRef.current || content;
    const lastSelected = this.lastSelectedRef.current || firstSelected;

    const contentTop = content.offsetTop;
    const contentHeight = content.offsetHeight;

    const top = firstSelected.offsetTop;
    const bottom = lastSelected.offsetTop + lastSelected.offsetHeight;
    const selectedHeight = bottom - top;
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

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
    this.scroll(1);
  }

  componentDidUpdate() {
    this.scroll(600);
  }

  onKeyDown = e => {
    if (e.which === 38) {
      console.log("up");
      this.setState(ps => ({
        selectedIndex: Math.max(0, ps.selectedIndex - 1)
      }));
      e.preventDefault();
    } else if (e.which === 40) {
      console.log("down");
      this.setState(ps => ({
        selectedIndex: Math.min(
          this.props.locs.length - 1,
          ps.selectedIndex + 1
        )
      }));
      e.preventDefault();
    }
  };

  state = {
    selectedIndex: 0
  };

  render() {
    const items = [...Array(this.props.n).keys()];
    const clocs = this.props.locs[this.state.selectedIndex];
    const isSelected = i => i + 1 in clocs;
    const first = Math.min(...Object.keys(clocs));
    const last = Math.max(...Object.keys(clocs));
    console.log(first, last);
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
          {items.map(i => (
            <div
              ref={
                i === first
                  ? this.firstSelectedRef
                  : i === last
                    ? this.lastSelectedRef
                    : null
              }
              style={{
                background: isSelected(i) ? "#ff9800" : "#cddc39",
                height: 20,
                width: 200,
                border: "1px dashed grey"
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

storiesOf("Items", module).add("bigger container than content", () => (
  <MyComponent
    containerHeight={400}
    n={20}
    locs={[
      {},
      {
        1: [],
        2: []
      },
      {},
      {
        3: [],
        5: []
      },
      {
        4: []
      }
    ]}
  />
));
// .add("bigger content than container", () => (
//   <MyComponent containerHeight={300} n={10} />
// ))
// .add("bigger selected than container", () => (
//   <MyComponent containerHeight={300} n={20} />
// ))
