import React from "react";
import { storiesOf } from "@storybook/react";
import CodeSlide from "../src/CodeSlide";

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

import "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-jsx.js";
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

storiesOf("Button", module).add("with text", () => (
  <Deck theme={theme}>
    <CodeSlide
      showLineNumbers={true}
      bgColor="secondary"
      color="white"
      lang="jsx"
      code={require("raw-loader!./snippets/2.sample-jsx.jsx")}
      ranges={[
        {
          loc: [0, 5]
        },
        {
          locs: {
            8: [
              {
                selector: ":nth-child(-n+3)",
                style: { opacity: 0.35 }
              }
            ],
            12: null
          },
          note: "React.createElement"
        },
        {
          locs: {
            1: [{ selector: ".tag :not(.tag)", style: { opacity: 0.35 } }],
            3: [{ selector: ".tag :not(.tag)", style: { opacity: 0.35 } }],
            9: [{ selector: ":not(.string)", style: { opacity: 0.35 } }]
          },
          note: "First parameter: tag name"
        },
        {
          locs: {
            1: [{ selector: ".tag .tag", style: { opacity: 0.35 } }],
            10: [{ selector: ":last-child", style: { opacity: 0.35 } }]
          },
          note: "Second parameter: props object"
        },
        {
          locs: [[2, 3], [11, 12]],
          note: "Third parameter+: children"
        }
      ]}
    />
    <CodeSlide
      showLineNumbers={true}
      bgColor="secondary"
      color="white"
      lang="jsx"
      code={require("raw-loader!./snippets/2.sample-jsx.jsx")}
      ranges={[
        { locs: [[1, 2], [3, 4], [9, 10]] },
        { locs: [[1, 2], [10, 11]] },
        { locs: [[2, 3], [11, 12]] }
      ]}
    />
  </Deck>
));
