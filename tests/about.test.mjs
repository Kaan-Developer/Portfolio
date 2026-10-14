import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import clsx from "clsx";

function loadComponent(file, dependencies) {
  const source = readFileSync(new URL(`../src/components/sections/${file}.tsx`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  const jsx = (type, props) => ({ type, props });
  runInNewContext(outputText, {
    exports,
    require: (name) => name === "react/jsx-runtime"
      ? { jsx, jsxs: jsx }
      : dependencies[name] ?? {},
  });
  return exports.default;
}

function find(node, predicate) {
  if (!node || typeof node !== "object") return undefined;
  if (predicate(node)) return node;
  return [node.props?.children].flat(Infinity).map((child) => find(child, predicate)).find(Boolean);
}

test("About button opens and closes the desktop stacks panel", () => {
  let open = false;
  const About = loadComponent("About", {
    react: { useState: () => [open, (update) => { open = update(open); }] },
    clsx,
    "../../data/site": { site: { about: [{}], links: {} } },
  });
  const panel = () => find(About(), (node) => node.props?.id === "about-stacks");
  const button = () => find(About(), (node) => node.props?.["aria-controls"] === "about-stacks");
  assert.equal(panel()?.props["aria-hidden"], true);
  assert.equal(panel().props.inert, true);
  button().props.onClick();
  assert.equal(button().props["aria-expanded"], true);
  assert.equal(panel().props["aria-hidden"], false);
  assert.equal(panel().props.inert, false);
  button().props.onClick();
  assert.equal(panel().props["aria-hidden"], true);
});

test("Stacks renders its list without a separate visibility state", () => {
  const Stacks = loadComponent("Stacks", {
    react: { useState: () => [false, () => {}] },
    clsx: { clsx },
    "../../data/site": { site: { about: [{ tech: ["React"], tools: ["Git"] }] } },
    "../../data/techIcons": { techIcons: { React: "react-icon", Git: "git-icon" } },
  });
  const tree = Stacks();
  assert.equal(find(tree, (node) => node.props?.["aria-hidden"] === true), undefined);
  assert.ok(find(tree, (node) => node.type === "span" && node.props.children === "React"));
  assert.ok(find(tree, (node) => node.type === "span" && node.props.children === "Git"));
});
