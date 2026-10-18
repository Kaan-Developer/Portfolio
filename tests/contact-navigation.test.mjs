import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

function visibleText(node) {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(visibleText).join("");
  if (!node || node.props?.["aria-hidden"] === "true") return "";
  return visibleText(node.props?.children);
}

function mountContactNavigation(mobile = false) {
  let activeSection;
  let onIntersect;
  const observed = [];
  const bubbles = [
    { label: "Home", target: "home" },
    { label: "Projects", target: "projects" },
    { label: "About", target: "about" },
  ];
  const jsx = (type, props) => typeof type === "function" ? type(props) : { type, props };
  const modules = {};
  function load(name) {
    if (modules[name]) return modules[name];
    const source = readFileSync(new URL(`../src/components/ui/${name}.tsx`, import.meta.url), "utf8");
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    });
    const exports = {};
    runInNewContext(outputText, {
      exports,
      document: { getElementById: (id) => ({ id }) },
      IntersectionObserver: class {
        constructor(callback) { onIntersect = callback; }
        observe(section) { observed.push(section.id); }
        disconnect() {}
      },
      require: (dependency) => {
        if (dependency === "react") return {
          useState: (initial) => [activeSection ?? initial, (value) => { activeSection = value; }],
          useEffect: (effect) => effect(),
        };
        if (dependency === "react/jsx-runtime") return { jsx, jsxs: jsx };
        if (dependency === "../../data/site") return { site: { bubbles } };
        if (dependency === "./Ul") return load("Ul");
        if (dependency === "lucide-react") return { ArrowUpRight: "svg" };
        return {};
      },
    });
    return modules[name] = exports;
  }
  const Component = load("ContactButton").default;
  const render = () => Component({ mobile });
  const link = () => {
    function find(node) {
      if (!node || typeof node !== "object") return undefined;
      if (node.type === "a") return node;
      return [node.props?.children].flat().map(find).find(Boolean);
    }
    return find(render());
  };
  render();
  return { link, observed, enterContact() {
    onIntersect([{ isIntersecting: true, intersectionRatio: 1, target: { id: "contact" } }]);
  } };
}

test("Contact navigates in the same tab with its visible accessible name", () => {
  const { props } = mountContactNavigation().link();
  assert.equal(props.href, "#contact");
  assert.equal(props.target, undefined);
  assert.equal(props["aria-label"], undefined);
  assert.equal(visibleText(props.children), "Contact");
});

for (const mobile of [false, true]) {
  test(`Contact follows the active section in ${mobile ? "mobile" : "desktop"} navigation`, () => {
    const navigation = mountContactNavigation(mobile);
    assert.equal(navigation.link().props["aria-current"], undefined);
    assert.ok(navigation.observed.includes("contact"));
    assert.ok(navigation.observed.includes("projects"));
    navigation.enterContact();
    assert.equal(navigation.link().props["aria-current"], "location");
  });
}
