import { shuffle } from "../knuth-shuffle";

function quickSort3WayAlgs4(a) {
  shuffle(a);
  sort(a, 0, a.length - 1);
  return a;
}

function sort(a, lo, hi) {
  if (lo >= hi) {
    return;
  }
  let lt = lo;
  let gt = hi;
  const pivot = a[lo];
  let i = lo + 1;

  while (i <= gt) {
    const current = a[i];
    if (current < pivot) {
      [a[i], a[lt]] = [a[lt], a[i]];
      ++i;
      ++lt;
    } else if (current > pivot) {
      [a[i], a[gt]] = [a[gt], a[i]];
      --gt;
    } else {
      ++i;
    }
  }

  sort(a, lo, lt - 1);
  sort(a, gt + 1, hi);
}

export { quickSort3WayAlgs4 };
