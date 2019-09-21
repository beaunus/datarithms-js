import { decompressString } from "./compress-decompression";
import { expect } from "chai";

describe("compress-decompression", () => {
  describe("decompressString", () => {
    it("should return the correct result", () => {
      const expectedResults = {
        "0[abc]": "",
        "2[3[a]b]": "aaabaaab",
        "2[aaab]": "aaabaaab",
        "3[]b": "b",
        "3[abc]": "abcabcabc",
        "3[abc]1[d]": "abcabcabcd",
        "3[abc]4[ab]c": "abcabcabcababababc",
        "10[a]": "aaaaaaaaaa",
        a: "a",
        abc: "abc",
      };
      Object.entries(expectedResults).forEach(([input, expected]) => {
        const actual = decompressString(input);
        expect(actual).to.equal(expected);
      });
    });
  });
});
