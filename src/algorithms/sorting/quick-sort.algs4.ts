import { shuffle } from "../knuth-shuffle";

function quickSortAlgs4(a) {
  shuffle(a);
  sort(a, 0, a.length - 1);
  return a;
}

function sort(a, lo, hi) {
  if (hi <= lo) {
    return;
  }
  const j = partition(a, lo, hi);
  sort(a, lo, j - 1);
  sort(a, j + 1, hi);
}

function partition(a, lo, hi) {
  let i = lo;
  let j = hi + 1;
  const v = a[lo];
  while (true) {
    while (less(a[++i], v)) {
      if (i === hi) {
        break;
      }
    }

    while (less(v, a[--j])) {
      if (j === lo) {
        break;
      }
    }

    if (i >= j) {
      break;
    }

    exch(a, i, j);
  }

  exch(a, lo, j);

  return j;
}

function less(v, w) {
  return v < w;
}

function exch(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export { quickSortAlgs4 };
