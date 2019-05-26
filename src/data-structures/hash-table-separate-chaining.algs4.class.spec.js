import { expect } from "chai";
import * as uuid from "uuid";

import { HashTableSeparateChainingAlgs4 } from "./hash-table-separate-chaining.algs4.class";

xdescribe("HashTableSeparateChainingAlgs4", () => {
  let hashTable;
  beforeEach(() => {
    hashTable = new HashTableSeparateChainingAlgs4();
  });
  describe("contains", () => {
    it("should return false if the hashTable does NOT contain the given key", () => {
      const actual = hashTable.contains(uuid.v4());
      expect(actual).to.be.false;
    });

    it("should return true if the hashTable contains the given key", () => {
      const key = uuid.v4();
      hashTable.put(key);
      const actual = hashTable.contains();
      expect(actual).to.be.true;
    });
  });
  // it("should allow insertion of items", () => {
  //   const hashTable = new HashTableSeparateChainingAlgs4();
  //   const key = uuid.v4();
  //   hashTable.put(key);
  //   const actual = hashTable.contains(key);
  //   expect(actual).to.be.true;
  // });
});
