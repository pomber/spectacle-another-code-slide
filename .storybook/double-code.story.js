import React from "react";
import { storiesOf } from "@storybook/react";
import AnotherCodeSlide from "../src/AnotherCodeSlide";
import { Deck } from "spectacle";
import createTheme from "spectacle/lib/themes/default";
import DoubleCodeSlide from "../src/DoubleCodeSlide";

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

storiesOf("Double Code Slide", module).add(
  "bigger selected than container",
  () => (
    <Deck theme={theme}>
      <DoubleCodeSlide
        lang="jsx"
        code1={require("raw-loader!./snippets/3.sample-jsx.jsx")}
        steps1={[
          { note: "JSX", range: [1, 3] },
          { tokens: { 2: [1, 2, 3, 4, 5, 6, 7, 8, 9] } }
        ]}
        code2={require("raw-loader!./snippets/4.sample-jsx.jsx")}
        steps2={[{ range: [] }, { range: [1, 3] }]}
        heights={[200, 40, 380]}
      />
    </Deck>
  )
);
