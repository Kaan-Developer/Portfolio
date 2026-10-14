import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/components/ui/Navbar.tsx", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
});

function mountNavbar() {
  let hidden = false;
  let menuOpen = false;
  let dependencies;
  let cleanup;
  let onScroll;
  const window = {
    scrollY: 0,
    addEventListener: (_, handler) => { onScroll = handler; },
    removeEventListener: () => { onScroll = undefined; },
  };
  const exports = {};
  runInNewContext(outputText, {
    exports,
    window,
    require: (name) => {
      if (name === "react") return {
        useState: () => [hidden, (value) => { hidden = value; }],
        useEffect: (effect, nextDependencies) => {
          if (!dependencies || nextDependencies.some((value, index) => value !== dependencies[index])) {
            cleanup?.();
            cleanup = effect();
            dependencies = nextDependencies;
          }
        },
      };
      if (name === "react/jsx-runtime") return {
        jsx: (type, props) => ({ type, props }),
        jsxs: (type, props) => ({ type, props }),
      };
      if (name.includes("store/menu")) return {
        useMenuStore: () => ({ isOpen: menuOpen, toggle: () => { menuOpen = !menuOpen; } }),
      };
      return {};
    },
  });
  const render = () => exports.Navbar();
  function findElement(node, predicate) {
    if (!node || typeof node !== "object") return undefined;
    if (predicate(node)) return node;
    const children = [node.props?.children].flat();
    return children.map((child) => findElement(child, predicate)).find(Boolean);
  }
  render();
  return {
    scroll(y) { window.scrollY = y; onScroll(); render(); },
    openMenu() { findElement(render(), (node) => node.props?.["aria-label"] === "Open menu").props.onClick(); render(); },
    closeMenu() { findElement(render(), (node) => node.props?.["aria-label"] === "Close menu").props.onClick(); render(); },
    mobileMenu() { return findElement(render(), (node) => node.props?.id === "mobile-menu"); },
    isHidden() { return render().props.className.includes("-translate-y-["); },
    unmount() { cleanup(); return onScroll; },
  };
}

test("navbar hides down, reveals up and stays visible near the top", () => {
  const navbar = mountNavbar();
  navbar.scroll(100);
  assert.equal(navbar.isHidden(), true);
  navbar.scroll(92);
  assert.equal(navbar.isHidden(), false);
  navbar.scroll(80);
  assert.equal(navbar.isHidden(), false);
  assert.equal(navbar.unmount(), undefined);
});

test("mobile panel stays mounted for opening and closing transitions", () => {
  const navbar = mountNavbar();
  assert.equal(navbar.mobileMenu()?.props.inert, true);
  assert.equal(navbar.mobileMenu().props["aria-hidden"], true);
  assert.match(navbar.mobileMenu().props.className, /invisible.*opacity-0/);
  navbar.openMenu();
  assert.equal(navbar.mobileMenu().props.inert, false);
  assert.equal(navbar.mobileMenu().props["aria-hidden"], false);
  assert.match(navbar.mobileMenu().props.className, /visible.*opacity-100/);
  navbar.closeMenu();
  assert.equal(navbar.mobileMenu().props.inert, true);
  assert.match(navbar.mobileMenu().props.className, /invisible.*opacity-0/);
});

test("an open mobile menu remains visible while scrolling", () => {
  const navbar = mountNavbar();
  navbar.scroll(100);
  navbar.openMenu();
  assert.equal(navbar.isHidden(), false);
  navbar.scroll(200);
  assert.equal(navbar.isHidden(), false);
});
