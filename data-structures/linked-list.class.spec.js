import _ from "lodash";
import { expect } from "chai";

import LinkedList from "./linked-list.class";

describe("LinkedList", () => {
  let linkedList;
  beforeEach(() => {
    linkedList = new LinkedList();
  });
  describe("add", () => {
    it("should exist", () => {
      expect(linkedList.add).to.be.a("function");
    });
    it("should append the specified element to the end of this list", () => {
      for (let i = 0; i < 10; i++) {
        const sizeBefore = linkedList.size();
        const elementToAdd = Math.random();
        linkedList.add(elementToAdd);

        const lastElement = linkedList.get(linkedList.size() - 1);
        expect(lastElement).to.equal(elementToAdd);

        const newSize = linkedList.size();
        expect(newSize).to.equal(sizeBefore + 1);
      }
    });
    it("should insert the specified element at the specified position in this list", () => {
      for (let i = 0; i < 10; i++) {
        const elementToAdd = Math.random();
        const index = _.random(0, i);
        linkedList.add(elementToAdd, index);

        const retrievedElement = linkedList.get(index);
        expect(retrievedElement).to.equal(elementToAdd);
      }
    });
  });
});
