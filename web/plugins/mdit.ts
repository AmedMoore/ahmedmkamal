import { defineNuxtPlugin } from "#imports";
import MarkdownIt from "markdown-it/lib/index.js";
import highlight from "highlight.js/lib/core";
import mdLinkAttrs from "markdown-it-link-attributes";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import ts from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

highlight.registerLanguage("bash", bash);
highlight.registerLanguage("json", json);
highlight.registerLanguage("ts", ts);
highlight.registerLanguage("xml", xml);

function mdHighlight(str: string, lang: string, _: string): string {
  return `<pre class="hljs relative">
  <code class="hljs">${
    highlight.highlight(str, { language: lang }).value
  }</code>
  <button class="copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.innerText)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
  </button>
</pre>`;
}

const mdit = new MarkdownIt({ highlight: mdHighlight });

mdit.use(mdLinkAttrs, { attrs: { target: "_blank" } });

export default defineNuxtPlugin((app) => {
  app.provide("mdit", mdit);
});
