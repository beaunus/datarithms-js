/**
 * LinkedList
 */
class LinkedList {
  /**
   * Construct a new LinkedList
   */
  constructor() {
    this.elements = [];
  }


  /**
   * @param {*} element 
   * @param {number} index 
   */
  add(element, index) {
    if (index === undefined) {
      this.elements.push(element);
    } else {
      this.elements.splice(index, 0, element);
    }
  }

  /**
   * @param {number} index 
   * @return {*}
   */
  get(index) {
    return this.elements[index];
  }

  /**
   * @return {number}
   */
  size() {
    return this.elements.length;
  }
}

export default LinkedList;
