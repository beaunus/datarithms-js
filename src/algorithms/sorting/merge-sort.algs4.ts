function mergeSortAlgs4(a) {
  const aux = new Array(a.length);
  sort(a, aux, 0, a.length - 1);
  return a;
}

function sort(a, aux, lo, hi) {
  if (hi <= lo) {
    return;
  }
  const mid = Math.floor((lo + hi) / 2);
  sort(a, aux, lo, mid);
  sort(a, aux, mid + 1, hi);
  merge(a, aux, lo, mid, hi);
}

function merge(a, aux, lo, mid, hi) {
  for (let k = lo; k <= hi; k++) {
    aux[k] = a[k];
  }

  let i = lo;
  let j = mid + 1;
  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      a[k] = aux[j++];
    } else if (j > hi) {
      a[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      a[k] = aux[j++];
    } else {
      a[k] = aux[i++];
    }
  }
}

export { mergeSortAlgs4 };
