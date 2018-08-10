function calculateScrollCenter(start, end, container, code) {
  if (!start) return;

  start = start || container;
  end = end || start;
  // debugger;

  const top = start.offsetTop;
  const bottom = end.offsetTop + end.offsetHeight;

  const height = container.offsetHeight;
  const half = height / 2;

  const middle = Math.floor((top + bottom) / 2) - half;

  const codeHeight = code.offsetHeight;
  const halfCode = codeHeight / 2;

  console.log("---");
  console.log("codeHeight", codeHeight);
  console.log("containerHeight", height);

  console.log("middle", middle);
  console.log("half", half);

  const center =
    codeHeight < height
      ? halfCode
      : middle < half
        ? half
        : codeHeight - middle < half
          ? codeHeight - half
          : middle;

  console.log("center", center);
  return center;
}

module.exports = calculateScrollCenter;
