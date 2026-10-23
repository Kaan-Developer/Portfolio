import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/components/ui/Navbar.tsx", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
});

function mountNavbar(initialScrollY = 0) {
  let scrolled = false;
  let menuOpen = false;
  let dependencies;
  let cleanup;
  let onScroll;
  const window = {
    scrollY: initialScrollY,
    addEventListener: (_, handler) => { onScroll = handler; },
    removeEventListener: () => { onScroll = undefined; },
  };
  const exports = {};
  runInNewContext(outputText, {
    exports,
    window,
    require: (name) => {
      if (name === "react") return {
        useState: () => [scrolled, (value) => { scrolled = value; }],
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
  const backdrop = () => [render().props.children].flat().find((node) => node?.props?.onClick);
  return {
    scroll(y) { window.scrollY = y; onScroll(); render(); },
    openMenu() { findElement(render(), (node) => node.props?.["aria-label"] === "Open menu").props.onClick(); render(); },
    closeMenu() { findElement(render(), (node) => node.props?.["aria-label"] === "Close menu").props.onClick(); render(); },
    mobileMenu() { return findElement(render(), (node) => node.props?.id === "mobile-menu"); },
    surface() { return findElement(render(), (node) => node.type === "div" && !node.props?.id && node.props?.["aria-hidden"] === true); },
    backdrop,
    clickOutsideMenu() { backdrop().props.onClick(); render(); },
    isHidden() { return findElement(render(), (node) => node.type === "header").props.className.includes("-translate-y-["); },
    unmount() { cleanup(); return onScroll; },
  };
}

test("navbar surface appears after one pixel and only clears at the top", () => {
  const navbar = mountNavbar();
  assert.match(navbar.surface()?.props.className ?? "", /border-transparent/);
  navbar.scroll(1);
  assert.match(navbar.surface().props.className, /border-border/);
  assert.match(navbar.surface().props.className, /backdrop-blur-md/);
  assert.match(navbar.surface().props.className, /bg-bg\/80/);
  navbar.scroll(100);
  navbar.scroll(1);
  assert.match(navbar.surface().props.className, /border-border/);
  assert.equal(navbar.isHidden(), false);
  navbar.scroll(0);
  assert.match(navbar.surface().props.className, /border-transparent/);
  assert.doesNotMatch(navbar.surface().props.className, /backdrop-blur-md/);
  assert.equal(navbar.isHidden(), false);
  assert.equal(navbar.unmount(), undefined);
});

test("navbar initializes its surface when the page is already scrolled", () => {
  const navbar = mountNavbar(120);
  assert.match(navbar.surface()?.props.className ?? "", /border-border/);
  assert.equal(navbar.isHidden(), false);
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

test("opening and closing the mobile menu does not clear the scrolled surface", () => {
  const navbar = mountNavbar();
  navbar.scroll(1);
  navbar.openMenu();
  assert.match(navbar.surface()?.props.className ?? "", /border-border/);
  navbar.closeMenu();
  assert.match(navbar.surface().props.className, /border-border/);
});

test("the backdrop only intercepts clicks while the mobile menu is open", () => {
  const navbar = mountNavbar();
  assert.equal(navbar.backdrop(), undefined);
  navbar.openMenu();
  assert.ok(navbar.backdrop());
  navbar.clickOutsideMenu();
  assert.equal(navbar.mobileMenu().props["aria-hidden"], true);
  assert.equal(navbar.backdrop(), undefined);
});
