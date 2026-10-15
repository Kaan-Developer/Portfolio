import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import clsx from "clsx";
import { site, socialLinks } from "../src/data/site.ts";

const source = readFileSync(new URL("../src/components/sections/Contact.tsx", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
});

function find(node, predicate) {
  if (!node || typeof node !== "object") return undefined;
  if (predicate(node)) return node;
  return [node.props?.children].flat(Infinity).map((child) => find(child, predicate)).find(Boolean);
}

function mountContact(clipboard) {
  const states = [];
  const effects = [];
  const timers = new Map();
  let stateIndex = 0;
  let effectIndex = 0;
  const exports = {};
  const jsx = (type, props) => ({ type, props });
  runInNewContext(outputText, {
    exports,
    navigator: { clipboard },
    setTimeout: (callback) => { const id = Symbol(); timers.set(id, callback); return id; },
    clearTimeout: (id) => timers.delete(id),
    require: (name) => {
      if (name === "react") return {
        useState: (initial) => {
          const index = stateIndex++;
          if (!(index in states)) states[index] = initial;
          return [states[index], (value) => { states[index] = value; }];
        },
        useEffect: (effect, dependencies) => {
          const index = effectIndex++;
          const previous = effects[index];
          if (!previous || dependencies.some((value, i) => value !== previous.dependencies[i])) {
            previous?.cleanup?.();
            effects[index] = { dependencies, cleanup: effect() };
          }
        },
      };
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "../../data/site") return { site, socialLinks };
      if (name === "clsx") return clsx;
      return {};
    },
  });
  const render = () => {
    stateIndex = 0;
    effectIndex = 0;
    return exports.default();
  };
  return {
    button: () => find(render(), (node) => node.type === "button" && node.props.type === "button"),
    copied: () => find(render(), (node) => node.type === "span" && ["Copied", "Kopyalandı"].includes(node.props.children)),
    error: () => find(render(), (node) => node.props?.role === "alert"),
    email: () => find(render(), (node) => node.type === "a" && node.props.href?.startsWith("mailto:")),
    expireTimers() { for (const callback of [...timers.values()]) callback(); timers.clear(); },
  };
}

test("copy waits for the clipboard before reporting success, then clears feedback", async () => {
  let finish;
  const clipboardResult = new Promise((resolve) => { finish = resolve; });
  let written;
  const contact = mountContact({ writeText: (text) => { written = text; return clipboardResult; } });
  const pending = contact.button().props.onClick();
  assert.equal(contact.copied(), undefined);
  assert.equal(contact.button().props.disabled, true);
  assert.equal(written, "kaandeveloperr07@gmail.com");
  finish();
  await pending;
  assert.ok(contact.copied());
  assert.equal(contact.copied().props.lang, "tr");
  assert.equal(contact.button().props.disabled, false);
  contact.expireTimers();
  assert.equal(contact.copied(), undefined);
});

test("clipboard rejection clears success and provides an actionable error", async () => {
  let denied = false;
  const contact = mountContact({ writeText: () => denied
    ? Promise.reject(new Error("Clipboard permission denied"))
    : Promise.resolve() });
  await contact.button().props.onClick();
  assert.ok(contact.copied());
  denied = true;
  await contact.button().props.onClick();
  assert.equal(contact.copied(), undefined);
  assert.match(contact.error().props.children, /email address/i);
  assert.equal(contact.button().props.disabled, false);
});

test("a missing clipboard API reports an error and keeps the email fallback", async () => {
  const contact = mountContact(undefined);
  await contact.button().props.onClick();
  assert.equal(contact.copied(), undefined);
  assert.ok(contact.error());
  assert.equal(contact.email().props.href, "mailto:kaandeveloperr07@gmail.com");
});

test("the email address is visible and selectable without copying", () => {
  const link = mountContact(undefined).email();
  assert.ok(link);
  assert.equal(link.props.children, "kaandeveloperr07@gmail.com");
  assert.match(link.props.className, /select-text/);
});
