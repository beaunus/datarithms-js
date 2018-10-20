class LinkedList {
  constructor() {
    this.elements = [];
  }

  add(element, index) {
    if (index === undefined) {
      this.elements.push(element);
    } else {
      this.elements.splice(index, 0, element);
    }
  }

  get(index) {
    return this.elements[index];
  }

  size() {
    return this.elements.length;
  }
}

export default LinkedList;
