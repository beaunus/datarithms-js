class UnionFind {
  constructor(numComponents) {
    this.numComponents = numComponents;
    this.parents = new Array(numComponents);
    this.ranks = new Array(numComponents);
    for (let component = 0; component < numComponents; ++component) {
      this.parents[component] = component;
      this.ranks[component] = 0;
    }
  }

  find(component) {
    while (component !== this.parents[component]) {
      this.parents[component] = this.parents[this.parents[component]];
      component = this.parents[component];
    }
    return component;
  }

  count() {
    return this.numComponents;
  }

  connected(componentA, componentB) {
    return this.parents[componentA] === this.parents[componentB];
  }

  union(componentA, componentB) {
    const parentA = this.find(componentA);
    const parentB = this.find(componentB);

    if (parentA === parentB) {
      return;
    }

    if (this.ranks[parentA] < this.ranks[parentB]) {
      this.parents[parentA] = parentB;
    } else if (this.ranks[parentA] > this.ranks[parentB]) {
      this.parents[parentB] = parentA;
    } else {
      this.parents[parentB] = parentA;
      this.ranks[parentA]++;
    }

    --this.numComponents;
  }
}

export { UnionFind };
