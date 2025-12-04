import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { agate } from "../../utils/codeHighligherStyle";
import styles from "../../styles/Components.module.scss";
import { IDashboard } from "../../types";

interface CodeHighlighterProps {
  dashboard: IDashboard;
}

async function formatCode(code: string): Promise<string> {
  const prettier = await import("prettier/standalone");
  const babelPlugin = await import("prettier/plugins/babel");
  const estreePlugin = await import("prettier/plugins/estree");

  return prettier.format(code, {
    parser: "babel",
    plugins: [babelPlugin.default, estreePlugin.default],
    printWidth: 80,
  });
}

export function CodeHighlighter(props: CodeHighlighterProps) {
  const [formattedCode, setFormattedCode] = React.useState<string>("");

  const parsedCode = React.useMemo(() => {
    let strCode = JSON.stringify(props.dashboard);

    const matches = strCode.matchAll(
      /\"javascriptFunction\":\"(data \=\> \{ .*? \})\;?\"/g
    );
    let match = matches.next();
    while (!match.done) {
      const [_, func] = match.value;

      strCode = strCode.replace(`\"${func}\"`, func);
      match = matches.next();
    }

    return strCode;
  }, [props.dashboard]);

  React.useEffect(() => {
    formatCode(`const config = ${parsedCode};`)
      .then(setFormattedCode)
      .catch(() => setFormattedCode(`const config = ${parsedCode};`));
  }, [parsedCode]);

  return (
    <div className={styles.codeSection}>
      <SyntaxHighlighter
        customStyle={{ backgroundColor: "#4f4f4f" }}
        language="javascript"
        showLineNumbers={true}
        style={agate}
      >
        {formattedCode || `const config = ${parsedCode};`}
      </SyntaxHighlighter>
    </div>
  );
}
