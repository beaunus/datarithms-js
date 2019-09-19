import { getWordSquares, getWordSquaresOld } from "./word-squares";

import { expect } from "chai";

const words = [
  "AREA",
  "BALL",
  "DEAR",
  "LADY",
  "LEAD",
  "YARD",
  // "ARTS",
  // "OGOA",
  // "GWXV",
  // "WDPK",
  // "SIGM",
  // "HAKP",
  // "ETQX",
  // "PRJS",
  // "QYQF",
  // "LYQJ",
  // "VJEA",
  // "SFYS",
  // "XRIC",
  // "HBSM",
  // "EMTW",
  // "VAMG",
  // "DGHN",
  // "BFPY",
  // "JGIY",
  // "LGXH",
  // "RMCZ",
  // "BYXN",
  // "JCUJ",
  // "JXKT",
  // "WJLD",
  // "OZNI",
  // "BINM",
  // "YTWB",
  // "YWAN",
  // "YLBA",
  // "LHNN",
  // "EMGW",
  // "CYHJ",
  // "GROE",
  // "EXNM",
  // "EVAJ",
  // "NCDY",
  // "QFEG",
  // "UCIL",
  // "CNTR",
  // "OIHQ",
];

describe("getWordSquaresOld", () => {
  it("should return the correct result", () => {
    const actual = getWordSquaresOld(words);
    const expected = [
      ["LADY", "AREA", "DEAR", "YARD"],
      ["BALL", "AREA", "LEAD", "LADY"],
    ];
    expect(actual).to.have.deep.members(expected);
  });
});

describe("getWordSquares", () => {
  it("should return the correct result", () => {
    const actual = getWordSquares(words);
    const expected = [
      ["LADY", "AREA", "DEAR", "YARD"],
      ["BALL", "AREA", "LEAD", "LADY"],
    ];
    expect(actual).to.have.deep.members(expected);
  });
});
