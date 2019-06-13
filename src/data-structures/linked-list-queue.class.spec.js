import { expect } from "chai";
import * as _ from "lodash";

import LinkedListQueue from "./linked-list-queue.class";

describe("LinkedListQueue", () => {
  /** @type {LinkedListQueue} */
  let linkedListQueue;
  let NUM_ELEMENTS;
  /** @type {number[]} */
  let elements;
  beforeEach(() => {
    linkedListQueue = new LinkedListQueue();
    NUM_ELEMENTS = _.random(1, 10);
    elements = _.times(NUM_ELEMENTS, Math.random);
  });

  describe("constructor", () => {
    it("should create an empty LinkedList", () => {
      expect([...linkedListQueue.getElements()]).to.be.an("array").that.is
        .empty;
      expect(linkedListQueue.size).to.equal(0);
    });
  });

  describe("enqueue", () => {
    it("should enqueue an element to the front of the linkedListQueue", () => {
      for (let i = 0; i < NUM_ELEMENTS; ++i) {
        linkedListQueue.enqueue(elements[i]);
        expect([...linkedListQueue.getElements()]).to.deep.equal(
          elements.slice(0, i + 1).reverse()
        );
        expect(linkedListQueue.size).to.equal(i + 1);
      }
    });
  });

  describe("dequeue", () => {
    it("should remove the first element in the linkedListQueue", () => {
      for (const element of elements) {
        linkedListQueue.enqueue(element);
      }
      for (let i = 0; i < NUM_ELEMENTS; ++i) {
        expect(linkedListQueue.dequeue()).to.equal(
          elements[elements.length - i - 1]
        );
        expect(linkedListQueue.size).to.equal(NUM_ELEMENTS - i - 1);
      }
    });

    it("should throw if the linkedListQueue is empty", () => {
      expect(() => linkedListQueue.dequeue()).to.throw(/empty/);
    });
  });
});
