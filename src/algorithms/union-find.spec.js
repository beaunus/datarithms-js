import { expect } from "chai";

import { UnionFind } from "./union-find";

const SIZE = 10;

describe("UnionFind", () => {
  describe("connected", () => {
    it("should return true if given the same component for both arguments", () => {
      const unionFind = new UnionFind(10);
      for (let component = 0; component < 10; ++component) {
        expect(unionFind.connected(component, component)).to.equal(true);
      }
    });
    describe("no unions", () => {
      it("should return false if the given components are not equal", () => {
        const unionFind = new UnionFind(SIZE);
        for (let componentA = 0; componentA < SIZE; ++componentA) {
          for (let componentB = componentA + 1; componentB < SIZE; ++componentB) {
            expect(unionFind.connected(componentA, componentB)).to.equal(false);
          }
        }
      });
    });
    describe("some unions", () => {
      it("should return the correct answer", () => {
        const unionFind = new UnionFind(SIZE);
        for (let componentA = 0; componentA < SIZE; componentA += 2) {
          for (let componentB = componentA + 2; componentB < SIZE; componentB += 2) {
            unionFind.union(componentA, componentB);
          }
        }
      });
    });
    describe("all unions", () => {
      let unionFind;
      beforeEach(() => {
        unionFind = new UnionFind(SIZE);
        for (let componentA = 0; componentA < SIZE; ++componentA) {
          for (let componentB = componentA + 1; componentB < SIZE; ++componentB) {
            unionFind.union(componentA, componentB);
          }
        }
      });
      it("should return false if the given components are not equal", () => {
        for (let componentA = 0; componentA < SIZE; ++componentA) {
          for (let componentB = componentA + 1; componentB < SIZE; ++componentB) {
            expect(unionFind.connected(componentA, componentB)).to.equal(true);
          }
        }
      });
    });
  });
  describe("count", () => {
    it("should return the size if there have been no unions", () => {
      const unionFind = new UnionFind(SIZE);
      expect(unionFind.count()).to.equal(SIZE);
    });
    it("should return 1 if all sites have been connected", () => {
      const unionFind = new UnionFind(SIZE);
      for (let i = 0; i < SIZE; ++i) {
        unionFind.union(0, i);
      }
      expect(unionFind.count()).to.equal(1);
    });
  });
  describe("find", () => {
    it("should return the same component if no components have been connected", () => {
      const unionFind = new UnionFind(SIZE);
      for (let component = 0; component < SIZE; ++component) {
        expect(unionFind.find(component)).to.equal(component);
      }
    });
  });
});
