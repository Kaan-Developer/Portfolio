import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { useMenuStore } from "../src/store/menu.ts";

beforeEach(() => {
  useMenuStore.setState({ isOpen: false });
});

test("the menu trigger opens and closes the menu", () => {
  useMenuStore.getState().toggle();
  assert.equal(useMenuStore.getState().isOpen, true);

  useMenuStore.getState().toggle();
  assert.equal(useMenuStore.getState().isOpen, false);
});

test("dismissing an open menu closes it", () => {
  useMenuStore.getState().toggle();
  useMenuStore.getState().close();

  assert.equal(useMenuStore.getState().isOpen, false);
});

test("repeated dismissals keep the menu closed", () => {
  useMenuStore.getState().close();
  useMenuStore.getState().close();

  assert.equal(useMenuStore.getState().isOpen, false);
});
