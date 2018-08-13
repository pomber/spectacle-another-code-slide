import React from "react";
import { storiesOf } from "@storybook/react";
import AnotherCodeSlide from "../src/AnotherCodeSlide";
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

storiesOf("Another Code Slide", module).add(
  "bigger selected than container",
  () => (
    <Deck theme={theme}>
      <AnotherCodeSlide
        lang="jsx"
        code={require("raw-loader!./snippets/2.sample-jsx.jsx")}
        locs={[
          // {},
          {
            2: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
            4: [1, 3]
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
    </Deck>
  )
);
