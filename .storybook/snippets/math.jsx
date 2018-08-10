const Sum = (...args) => args.reduce((a, b) => a + b, 0)
const Pow = ({ exponent }, base) => Math.pow(base, exponent)
const Sqrt = x => Math.sqrt(x)

const Hypotenuse = ({ a, b }) => (
  <Sqrt>
    <Sum>
      <Pow exponent={2}>{a}</Pow>
      <Pow exponent={2}>{b}</Pow>
    </Sum>
  </Sqrt>
)

/** @jsx calc */
function calc(operation, props, ...args) {
  let params = props ? [props] : []
  params = params.concat(...args)
  return operation(...params)
}

console.log(<Hypotenuse a={3} b={4} />)
