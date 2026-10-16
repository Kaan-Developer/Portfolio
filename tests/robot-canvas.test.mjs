import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/components/Robot/RobotCanvas.tsx", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source.replaceAll("import.meta.env", "({})"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
});

function find(node, predicate) {
  if (!node || typeof node !== "object") return undefined;
  if (predicate(node)) return node;
  return [node.props?.children].flat(Infinity).map((child) => find(child, predicate)).find(Boolean);
}

function mountRobot() {
  const states = [];
  const refs = [];
  const effects = [];
  const listeners = new Map();
  let stateIndex = 0;
  let refIndex = 0;
  let effectIndex = 0;
  const Spline = "Spline";
  const Loading = "Loading";
  const window = {
    innerWidth: 1440,
    matchMedia: () => ({ matches: true }),
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name) => listeners.delete(name),
  };
  const exports = {};
  const jsx = (type, props) => ({ type, props });
  runInNewContext(outputText, {
    exports,
    window,
    require: (name) => {
      if (name === "react") return {
        lazy: () => Spline,
        Suspense: "Suspense",
        useState: (initial) => {
          const index = stateIndex++;
          if (!(index in states)) states[index] = typeof initial === "function" ? initial() : initial;
          return [states[index], (value) => { states[index] = value; }];
        },
        useRef: (initial) => {
          const index = refIndex++;
          return refs[index] ??= { current: initial };
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
      if (name === "../feedback/Loading") return { __esModule: true, default: Loading };
      return {};
    },
  });
  const render = () => {
    stateIndex = 0;
    refIndex = 0;
    effectIndex = 0;
    return exports.default({ sceneId: 2 });
  };
  return {
    render,
    load(app) { find(render(), (node) => node.type === Spline).props.onLoad(app); },
    loading: () => Boolean(find(render(), (node) => node.type === Loading)),
    resize(width) { window.innerWidth = width; listeners.get("resize")(); },
  };
}

test("loading a robot preserves the scene's exported camera framing", () => {
  const robot = mountRobot();
  const zoomOverrides = [];
  assert.equal(robot.loading(), true);
  robot.load({ setZoom: (zoom) => zoomOverrides.push(zoom), play() {}, stop() {} });
  assert.deepEqual(zoomOverrides, []);
  assert.equal(robot.loading(), false);
});

test("resizing a loaded desktop robot keeps the loading overlay hidden", () => {
  const robot = mountRobot();
  robot.load({ setZoom() {}, play() {}, stop() {} });
  assert.equal(robot.loading(), false);
  robot.resize(1200);
  assert.equal(robot.loading(), false);
  robot.resize(1600);
  assert.equal(robot.loading(), false);
});

test("returning from mobile shows loading until the new robot scene loads", () => {
  const robot = mountRobot();
  const app = { setZoom() {}, play() {}, stop() {} };
  robot.load(app);
  assert.equal(robot.loading(), false);
  robot.resize(600);
  assert.equal(robot.render(), null);
  robot.resize(1440);
  assert.equal(robot.loading(), true);
  robot.load(app);
  assert.equal(robot.loading(), false);
});
