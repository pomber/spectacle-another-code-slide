import { configure } from "@storybook/react";

function loadStories() {
  require("./story.js");
  require("./container.story.js");
  require("./items.story.js");
  // You can require as many stories as you need.
}

configure(loadStories, module);
