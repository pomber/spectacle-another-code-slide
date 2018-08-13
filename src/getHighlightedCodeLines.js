import memoize from "lodash.memoize";
import Prism from "prismjs";

function parseToken(token, counter) {
  if (token === "\n") {
    counter.current = 0;
    return token;
  } else if (typeof token === "string" && token.includes("\n")) {
    const [left, ...rest] = token.split("\n");
    const right = rest.join("\n");
    const tokens = addCustomTokens([left, "\n", right], counter);
    return tokens;
  } else if (typeof token === "string" && !token.trim()) {
    // whitespace
    return token;
  } else if (typeof token === "string") {
    counter.current++;
    return new Prism.Token(
      "free-text",
      token,
      ["token-" + counter.current, "token-leaf"],
      token
    );
  } else if (Prism.util.type(token.content) === "Array") {
    token.content = addCustomTokens(token.content, counter);
    return token;
  } else {
    counter.current++;
    const aliases =
      Prism.util.type(token.alias) === "Array" ? token.alias : [token.alias];
    aliases.push("token-" + counter.current, "token-leaf");
    token.alias = aliases;
    return token;
  }
}

function addCustomTokens(tokens, counter = { current: 0 }) {
  const newTokens = tokens.map(token => parseToken(token, counter));
  // flatten
  return newTokens.concat.apply([], newTokens);
}

function highlight(text, grammar, language) {
  var env = {
    code: text,
    grammar: grammar,
    language: language
  };
  Prism.hooks.run("before-tokenize", env);
  env.tokens = Prism.tokenize(env.code, env.grammar);
  Prism.hooks.run("after-tokenize", env);

  env.tokens = addCustomTokens(env.tokens);

  // debugger;

  return Prism.Token.stringify(Prism.util.encode(env.tokens), env.language);
}

function getHighlightedCodeLines(code, lang) {
  const html = highlight(code, Prism.languages[lang]);
  const lines = html.split("\n");
  if (lines.length && lines[lines.length - 1].trim() == "") {
    // Remove last line if it's empty
    lines.pop();
  }
  return lines;
}

export default memoize(getHighlightedCodeLines);
