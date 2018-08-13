import React from "react";
import { Slide } from "spectacle";
import { Container, Content, Element } from "./scroll-to-selection";
import getHighlightedCodeLines from "./getHighlightedCodeLines";
import padStart from "lodash.padstart";
import { css } from "glamor";

function getLineNumber(index) {
  return (
    '<span class="token comment" style="user-select: none">' +
    padStart(index + 1, 3) +
    ".</span> "
  );
}

class CodeSlide extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
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
    const { code, lang, locs } = this.props;
    const codeLines = getHighlightedCodeLines(code, lang);
    const clocs = locs[this.state.selectedIndex];
    const isSelected = i => i + 1 in clocs;
    return (
      <Slide bgColor="#222">
        <Container type="pre" height={700}>
          <Content type="code">
            {codeLines.map((line, index) => {
              const hideTokens = clocs[index + 1];
              const rules = !hideTokens
                ? ""
                : css(
                    hideTokens.map(n => ({
                      [`& .token-${n}`]: {
                        transition: "opacity 300ms",
                        opacity: "0.35"
                      }
                    }))
                  );
              return (
                <Element
                  key={index}
                  selected={isSelected(index)}
                  className={rules}
                  style={{
                    opacity: isSelected(index) ? 1 : 0.3,
                    transition: "opacity 300ms"
                  }}
                  dangerouslySetInnerHTML={{
                    __html: getLineNumber(index) + line || " "
                  }}
                />
              );
            })}
          </Content>
        </Container>
      </Slide>
    );
  }
}

export default CodeSlide;
