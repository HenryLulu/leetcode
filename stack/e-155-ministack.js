/**
 * 【题目】
 * 设计一个支持 push，pop，top 操作，并能在 常数时间内检索到最小元素 的栈。
 */

/**
 * 【解析】
 * 栈：通过 1-2 个栈，实现stack功能，并记录当前栈的最小值
 */

// code
var MinStack = function () {
    this.stack = [];
};

MinStack.prototype.push = function (x) {
    var min = this.getMin();
    this.stack.push(x);
    this.stack.push(min || min === 0 ? Math.min(x, min) : x);
};
MinStack.prototype.pop = function () {
    this.stack.pop();
    this.stack.pop();
};
MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 2];
};
MinStack.prototype.getMin = function () {
    return this.stack[this.stack.length - 1];
};

// test
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin());
minStack.pop();
console.log(minStack.top());
console.log(minStack.getMin());