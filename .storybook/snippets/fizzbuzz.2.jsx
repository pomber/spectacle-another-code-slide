var FizzBuzz = (
  <map>
    <cond concat>
      <pair>
        <both>
          <DivisibleBy value={3} />
          <DivisibleBy value={5} />
        </both>
        <always value="FizzBuzz" />
      </pair>
      <pair>
        <DivisibleBy value={3} />
        <always value="Fizz" />
      </pair>
      <pair>
        <DivisibleBy value={5} />
        <always value="Buzz" />
      </pair>
      <pair>
        <t />
        <identity />
      </pair>
    </cond>
  </map>
)

console.log(
  <FizzBuzz>
    <range>
      {1}
      {16}
    </range>
  </FizzBuzz>
)
