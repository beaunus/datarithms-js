/* eslint-disable no-invalid-this */

import { Suite } from "benchmark";

const suite = new Suite();

// add tests
suite
  .add("RegExp#test", () => {
    /o/.test("Hello World!");
  })
  .add("String#indexOf", () => {
    "Hello World!".indexOf("o") > -1;
  })
  // add listeners
  .on("cycle", event => {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  // run async
  .run({ async: true });
