import React from "react";
import { Slide } from "spectacle";
import CodeScroller from "./code-scroller";
import UpDownListener from "./vertical-arrows-listener";

class CodeSlide extends React.Component {
  state = {
    selectedIndex: 0
  };

  render() {
    const { code, lang, steps } = this.props;

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
              selectedIndex: Math.min(steps.length - 1, ps.selectedIndex + 1)
            }))
          }
        >
          <CodeScroller
            code={code}
            lang={lang}
            steps={steps}
            stepIndex={this.state.selectedIndex}
          />
        </UpDownListener>
      </Slide>
    );
  }
}

export default CodeSlide;
