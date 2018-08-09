function greeting(name) {
  return (
    <div className="hello">Hi {name}</div>
  )
}

// Becomes:

function greeting(name) {
  return React.createElement(
    "div",
    { className: "hello" },
    "Hi ",
    name
  )
}
