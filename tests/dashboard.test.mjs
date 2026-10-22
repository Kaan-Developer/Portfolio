import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
const { MemoryRouter } = require("react-router-dom");

test("dashboard contact action links to the home contact section in the same tab", () => {
  const source = readFileSync(new URL("../src/pages/Dashboard.tsx", import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    require: (dependency) => {
      if (dependency.endsWith("Logo.svg")) return { default: "logo.svg" };
      if (dependency === "../data/site") return { site: { name: "Developer" }, socialLinks: [] };
      if (dependency === "../data/projects") return { projects: [] };
      return require(dependency);
    },
  });

  const markup = renderToStaticMarkup(
    createElement(MemoryRouter, null, createElement(exports.default)),
  );
  const contact = [...markup.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .find(([, , content]) => /Let(?:'|&#x27;|’|&#x2019;)s talk/i.test(content));

  assert.ok(contact, "The contact action must be a link rather than an inert button");
  assert.match(contact[1], /\bhref="\/#contact"/);
  assert.doesNotMatch(contact[1], /\btarget="_blank"/);
});
