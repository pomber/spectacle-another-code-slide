const x = (
  <element-type p1="a" p2={2} p3>
    {whatever}
  </element-type>
)

// Becomes:

const x = React.createElement(
  "element-type",
  { p1: "a", p2: 2, p3: true },
  whatever
)
