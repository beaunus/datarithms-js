class LinkedList {
  public elements;
  constructor() {
    this.elements = [];
  }

  public add(element, index) {
    if (index === undefined) {
      this.elements.push(element);
    } else {
      this.elements.splice(index, 0, element);
    }
  }

  public get(index) {
    return this.elements[index];
  }

  public size() {
    return this.elements.length;
  }
}

export default LinkedList;
