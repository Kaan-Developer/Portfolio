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

function mountRobot({ sceneId = 2, width = 720, height = 400, viewportWidth = 1440, finePointer = true } = {}) {
  const states = [];
  const refs = [];
  const effects = [];
  const listeners = new Map();
  const observers = new Set();
  const pendingEffects = [];
  const container = { clientWidth: width, clientHeight: height, addEventListener() {}, removeEventListener() {} };
  let stateIndex = 0;
  let refIndex = 0;
  let effectIndex = 0;
  const Spline = "Spline";
  const Loading = "Loading";
  const window = {
    innerWidth: viewportWidth,
    matchMedia: () => ({ matches: finePointer }),
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name) => listeners.delete(name),
  };
  const exports = {};
  const jsx = (type, props, key) => ({ type, props, key });
  runInNewContext(outputText, {
    exports,
    window,
    ResizeObserver: class {
      constructor(callback) { this.callback = callback; }
      observe() { observers.add(this); }
      disconnect() { observers.delete(this); }
    },
    require: (name) => {
      if (name === "react") return {
        lazy: () => Spline,
        Suspense: "Suspense",
        useState: (initial) => {
          const index = stateIndex++;
          if (!(index in states)) states[index] = typeof initial === "function" ? initial() : initial;
          return [states[index], (value) => { states[index] = typeof value === "function" ? value(states[index]) : value; }];
        },
        useRef: (initial) => {
          const index = refIndex++;
          return refs[index] ??= { current: initial };
        },
        useEffect: (effect, dependencies) => {
          const index = effectIndex++;
          const previous = effects[index];
          if (!previous || dependencies.some((value, i) => value !== previous.dependencies[i])) {
            pendingEffects.push(() => {
              previous?.cleanup?.();
              effects[index] = { dependencies, cleanup: effect() };
            });
          }
        },
      };
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "../feedback/Loading") return { __esModule: true, default: Loading };
      if (name === "../feedback/ErrorBoundary") return { __esModule: true, default: "ErrorBoundary" };
      return {};
    },
  });
  const render = () => {
    stateIndex = 0;
    refIndex = 0;
    effectIndex = 0;
    const tree = exports.default({ sceneId });
    if (refs[0]) refs[0].current = tree ? container : null;
    pendingEffects.splice(0).forEach((effect) => effect());
    return tree;
  };
  return {
    render,
    boundary: () => find(render(), (node) => node.type === "ErrorBoundary"),
    load(app) {
      find(render(), (node) => node.type === Spline).props.onLoad({
        findObjectById: () => undefined,
        ...app,
      });
    },
    loading: () => Boolean(find(render(), (node) => node.type === Loading)),
    resize(width) { window.innerWidth = width; listeners.get("resize")(); },
    resizeCanvas(width, height) {
      container.clientWidth = width;
      container.clientHeight = height;
      for (const observer of observers) observer.callback();
    },
  };
}

test("a desktop touchscreen still mounts and loads the robot", () => {
  const robot = mountRobot({ finePointer: false });
  assert.ok(robot.render());
  robot.load({ setZoom() {}, play() {}, stop() {} });
  assert.equal(robot.loading(), false);
});

test("robot visibility follows the same desktop breakpoint as its About column", () => {
  const robot = mountRobot({ viewportWidth: 900 });
  assert.equal(robot.render(), null);
});

test("a scene failure exposes a retry that remounts the scene and restores loading", () => {
  const robot = mountRobot();
  const before = robot.boundary();
  before.props.onError(new Error("Scene failed to load"));
  assert.equal(robot.loading(), false);
  const retry = find(robot.boundary().props.fallback, (node) => node.type === "button");
  assert.ok(retry);
  retry.props.onClick();
  assert.notEqual(robot.boundary().key, before.key);
  assert.equal(robot.loading(), true);
  robot.load({ setZoom() {}, play() {}, stop() {} });
  assert.equal(robot.loading(), false);
});

test("loading scene 1 preserves its exported camera framing", () => {
  const robot = mountRobot({ sceneId: 1 });
  const zoomOverrides = [];
  assert.equal(robot.loading(), true);
  robot.load({ setZoom: (zoom) => zoomOverrides.push(zoom), play() {}, stop() {} });
  assert.deepEqual(zoomOverrides, []);
  assert.equal(robot.loading(), false);
});

test("scene 2 fits the limiting canvas dimension on load and resize", () => {
  const robot = mountRobot();
  const zooms = [];
  robot.load({ setZoom: (zoom) => zooms.push(zoom), play() {}, stop() {} });
  assert.equal(zooms.at(-1), 0.7);
  robot.resizeCanvas(180, 400);
  assert.equal(zooms.at(-1), 0.29);
  robot.resizeCanvas(720, 600);
  assert.equal(zooms.at(-1), 536 / 480);
  assert.equal(robot.loading(), false);
});

test("the robot loads when the runtime does not expose document data", () => {
  const robot = mountRobot();
  const zooms = [];
  assert.doesNotThrow(() => robot.load({
    data: undefined,
    setZoom: (zoom) => zooms.push(zoom),
    play() {}, stop() {},
  }));
  assert.ok(zooms.length > 0);
  assert.equal(robot.loading(), false);
});

test("the published robot bounds fit inside the padding at different canvas sizes", () => {
  const cameraX = 22.16930324445427;
  const cameraY = -11.766337692070238;
  for (const [width, height] of [
    [360, 360],
    [480, 480],
    [840, 480],
  ]) {
    const robot = mountRobot({ width, height });
    let zoom;
    robot.load({ setZoom: (value) => { zoom = value; }, play() {}, stop() {} });
    const margins = [
      width / 2 + (-127 - cameraX) * zoom,
      width / 2 - (127 - cameraX) * zoom,
      height / 2 - (187 - cameraY) * zoom,
      height / 2 + (-110 - cameraY) * zoom,
    ];
    assert.ok(margins.every((margin) => margin >= 32 - 0.000001));
  }
});

test("scene 2 hides only the exported background plane so the page color shows through", () => {
  const robot = mountRobot();
  const hidden = [];
  robot.load({
    findObjectById: (id) => ({ hide: () => hidden.push(id) }),
    setZoom() {}, play() {}, stop() {},
  });
  assert.deepEqual(hidden, ["9e0f8cf5-5312-4321-bf8b-da4b800916aa"]);
  assert.equal(robot.loading(), false);
});

test("a temporarily hidden canvas keeps its zoom and fits again when visible", () => {
  const robot = mountRobot();
  const zooms = [];
  robot.load({ setZoom: (zoom) => zooms.push(zoom), play() {}, stop() {} });
  const initialCalls = zooms.length;
  robot.resizeCanvas(0, 0);
  assert.equal(zooms.length, initialCalls);
  robot.resizeCanvas(360, 800);
  assert.equal(zooms.at(-1), 0.74);
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
