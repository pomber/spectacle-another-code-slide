function getGreeting(name) {
  return React.createElement(
    "div",
    { className: "greeting" },
    React.createElement(
      "h1",
      { foo: "bar" },
      "Hello!"
    ),
    React.createElement(
      "h2",
      null,
      "Good to see you ",
      name
    )
  );
}
