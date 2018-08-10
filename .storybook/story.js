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
                selector: ":nth-child(-n+3)"
              }
            ],
            12: null
          },
          note: "React.createElement"
        },
        {
          locs: {
            1: [{ selector: ".tag :not(.tag)" }],
            3: [{ selector: ".tag :not(.tag)" }],
            9: [{ selector: ":not(.string)" }]
          },
          note: "First parameter: tag name"
        },
        {
          locs: {
            1: [{ selector: ".tag .tag" }],
            10: [{ selector: ":last-child" }]
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
      showLineNumbers={false}
      bgColor="secondary"
      color="white"
      lang="jsx"
      code={require("raw-loader!./snippets/math.jsx")}
      ranges={[
        { locs: [[0, 24]] },
        { locs: [[0, 5]] },
        { locs: [[6, 14]] },
        { locs: [[15, 21]] },
        { locs: [[22, 23]] }
      ]}
    />
    <CodeSlide
      showLineNumbers={false}
      bgColor="secondary"
      color="white"
      lang="jsx"
      code={require("raw-loader!./snippets/fizzbuzz.2.jsx")}
      ranges={[
        { locs: [[0, 5]], title: "FizzBuzz" },
        { locs: [[0, 5]] },
        { locs: [[6, 14]] },
        { locs: [[15, 21]] },
        { locs: [[22, 23]] },
        { locs: [[27, 30]] }
      ]}
    />
  </Deck>
));
