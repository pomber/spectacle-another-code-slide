import React from "react";
import { Slide } from "spectacle";
import CodeScroller from "./code-scroller";
import UpDownListener from "./vertical-arrows-listener";
import CodeSlideNote from "./CodeSlideNote";

class DoubleCodeSlide extends React.Component {
  state = {
    selectedIndex: 0
  };

  render() {
    const {
      code1,
      code2,
      lang,
      steps1,
      steps2,
      heights = [280, 60, 280]
    } = this.props;
    const step = steps1[this.state.selectedIndex];

    const [firstHeight, noteHeight, secondHeight] = heights;

    return (
      <Slide bgColor="#222">
        <UpDownListener
          onUp={e =>
            this.setState(ps => ({
              selectedIndex: Math.max(0, ps.selectedIndex - 1)
            }))
          }
          onDown={e =>
            this.setState(ps => ({
              selectedIndex: Math.min(steps1.length - 1, ps.selectedIndex + 1)
            }))
          }
        >
          <CodeScroller
            code={code1}
            lang={lang}
            height={firstHeight}
            steps={steps1}
            stepIndex={this.state.selectedIndex}
          />
          <div style={{ height: noteHeight, color: "#fafafa" }}>
            {step.note}
          </div>
          <CodeScroller
            code={code2}
            lang={lang}
            steps={steps2}
            height={secondHeight}
            stepIndex={this.state.selectedIndex}
          />
        </UpDownListener>
      </Slide>
    );
  }
}

export default DoubleCodeSlide;
