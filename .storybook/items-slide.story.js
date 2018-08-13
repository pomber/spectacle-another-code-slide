import React from "react";
import { storiesOf } from "@storybook/react";
const Tween = require("component-tween");
const raf = require("component-raf");

import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text
} from "spectacle";
import createTheme from "spectacle/lib/themes/default";

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
    const scaledSelectedHeight = selectedHeight * scale;
    const contentMargin = (contentHeight - scaledContentHeight) / 2;

    const halfContent = contentHeight / 2;
    if (scale !== 1) {
      center = (middle - halfContent) * scale + halfContent;
    }

    console.log("top", top);
    console.log("bottom", bottom);
    console.log("containerHeight", containerHeight);
    console.log("selectedHeight", selectedHeight);
    console.log("scaledSelectedHeight", scaledSelectedHeight);
    console.log("contentHeight", contentHeight);
    console.log("scaledContentHeight", scaledContentHeight);

    if (containerHeight >= scaledContentHeight) {
      // center in the middle of the content
      center = contentHeight / 2;
    } else if (containerHeight >= scaledSelectedHeight) {
      const minScroll = contentMargin + containerHeight / 2;
      const maxScroll = contentHeight - contentMargin - containerHeight / 2;
      center = center < minScroll ? minScroll : center;
      center = center > maxScroll ? maxScroll : center;
    } else {
      console.log("Bigger selected than container");
      center = (top - halfContent) * scale + halfContent + containerHeight / 2;
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
      this.setState(ps => ({
        selectedIndex: Math.max(0, ps.selectedIndex - 1)
      }));
      e.preventDefault();
    } else if (e.which === 40) {
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
          background: "#222",
          height: 0,
          padding: this.props.containerHeight / 2 + "px 0",
          overflow: "hidden",
          position: "relative",
          textAlign: "center"
        }}
        ref={this.containerRef}
      >
        <div
          style={{
            position: "relative"
          }}
        >
          <div
            style={{
              display: "inline-block"
            }}
            ref={this.contentRef}
          >
            {items.map(i => (
              <div
                ref={
                  i + 1 === first
                    ? this.firstSelectedRef
                    : i + 1 === last
                      ? this.lastSelectedRef
                      : null
                }
                style={{
                  background: "#ff9800",
                  opacity: isSelected(i) ? 1 : 0.3,
                  height: 30,
                  width: 540,
                  transition: "opacity 300ms",
                  border: "1px dashed grey"
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
const theme = createTheme(
  {
    primary: "#fafafa",
    secondary: "#272822"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

storiesOf("Items Slide", module)
  .add("bigger container than content", () => (
    <Deck theme={theme}>
      <MyComponent containerHeight={400} n={10} locs={[{}, { 1: [] }]} />
    </Deck>
  ))
  .add("bigger content than container", () => (
    <Deck theme={theme}>
      <MyComponent containerHeight={300} n={20} locs={[{}, { 1: [] }]} />
    </Deck>
  ))
  .add("bigger selected than container", () => (
    <Deck theme={theme}>
      <Slide bgColor="green" onActive={i => console.log("0", i)} />
      <Slide bgColor="blue" onActive={i => console.log("1", i)} />
      <Slide bgColor="red" onActive={i => console.log("2", i)}>
        <MyComponent
          containerHeight={400}
          n={50}
          locs={[
            {
              1: [],
              30: []
            },
            {},
            {
              5: [],
              40: []
            },
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
            },
            {
              18: [],
              25: []
            },
            {
              20: [],
              40: []
            }
          ]}
        />
      </Slide>
    </Deck>
  ));
