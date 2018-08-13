import React from "react";
import { Container, Content, Element } from "./scroll-to-selection";
import getHighlightedCodeLines from "./getHighlightedCodeLines";
import padStart from "lodash.padstart";
import { css } from "glamor";

import { mapStep } from "./steps";

function getLineNumber(index) {
  return (
    '<span class="token comment token-leaf line-number" style="user-select: none">' +
    padStart(index + 1, 3) +
    ".</span> "
  );
}

function getLineClassName({ tokens }, lineNumber) {
  if (Object.keys(tokens).length === 0) {
    console.log(`Line ${lineNumber} 1`);
    return css({
      [`& .token-leaf`]: {
        opacity: "1"
      }
    });
  } else if (!(lineNumber in tokens)) {
    console.log(`Line ${lineNumber} 2`);
    return "";
  } else if (tokens[lineNumber] == null) {
    console.log(`Line ${lineNumber} 3`);
    return css({
      [`& .token-leaf`]: {
        opacity: "1"
      }
    });
  } else {
    console.log(`Line ${lineNumber} 4`);
    return css(
      {
        [`& .token-leaf.line-number`]: {
          opacity: "1"
        }
      },
      ...tokens[lineNumber].map(n => ({
        [`& .token-leaf.token-${n}`]: {
          opacity: "1"
        }
      }))
    );
  }
}

class CodeScroller extends React.Component {
  render() {
    const { code, lang, steps, stepIndex, height = 620 } = this.props;
    const codeLines = getHighlightedCodeLines(code, lang);

    const step = mapStep(steps[stepIndex]);

    const isSelected = i => i + 1 in step.tokens;
    const tokenOpacity = css({
      ["& .token-leaf"]: {
        opacity: "0.35",
        transition: "opacity 300ms"
      }
    });
    return (
      <Container type="pre" height={height}>
        <Content type="code" className={tokenOpacity}>
          {codeLines.map((line, index) => {
            let rules = getLineClassName(step, index + 1);
            return (
              <Element
                key={index}
                selected={isSelected(index)}
                className={rules}
                dangerouslySetInnerHTML={{
                  __html: getLineNumber(index) + line || " "
                }}
              />
            );
          })}
        </Content>
      </Container>
    );
  }
}

export default CodeScroller;
