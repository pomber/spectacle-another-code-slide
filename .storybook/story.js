import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

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
    <Slide bgColor="secondary" textColor="primary">
      <BlockQuote>
        <Quote>Example Quote</Quote>
        <Cite>Author</Cite>
      </BlockQuote>
    </Slide>
  </Deck>
));
