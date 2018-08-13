import memoize from "lodash.memoize";
import Prism from "prismjs";

function addCustomTokens(tokens, counter = { current: 0 }) {
  return tokens.map(token => {
    if (typeof token === "string" && token.includes("\n")) {
      counter.current = 0;
      return token;
    } else if (typeof token === "string") {
      counter.current++;
      return new Prism.Token(
        "free-text",
        token,
        "token-" + counter.current,
        token
      );
    } else if (Prism.util.type(token.content) === "Array") {
      token.content = addCustomTokens(token.content, counter);
      return token;
    } else {
      counter.current++;
      const aliases =
        Prism.util.type(token.alias) === "Array" ? token.alias : [token.alias];
      aliases.push("token-" + counter.current);
      token.alias = aliases;
      return token;
    }
  });
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
  console.log(lines);
  return lines;
}

export default memoize(getHighlightedCodeLines);
