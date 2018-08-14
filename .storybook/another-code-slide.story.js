import React from "react";
import { storiesOf } from "@storybook/react";
import AnotherCodeSlide from "../src/AnotherCodeSlide";
import { Deck } from "spectacle";
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
        code={require("raw-loader!./snippets/1.sample-jsx.jsx")}
        steps={[
          { note: "JSX", range: [1, 5] },
          { ranges: [[1, 5], [9, 16]] },
          {
            range: [1, 5],
            tokens: {
              10: [2, 3, 4, 5],
              15: null //null means all
            }
          }
        ]}
      />
      <AnotherCodeSlide
        lang="jsx"
        code={require("raw-loader!./snippets/2.sample-jsx.jsx")}
        steps={[
          { note: "JSX", range: [1, 5] },
          { note: "Babel", ranges: [[1, 5], [9, 16]] },
          {
            range: [1, 5],
            tokens: {
              10: [2, 3, 4, 5],
              15: null //null means all
            }
          }
        ]}
      />
    </Deck>
  )
);
