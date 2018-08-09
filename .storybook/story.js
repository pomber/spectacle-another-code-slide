import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
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
      // code="//foo"
      ranges={[{ loc: [1, 4] }]}
    />
  </Deck>
));
