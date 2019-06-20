/**
 * 【题目】
 * 给定一个二叉树，返回它的中序 遍历。

示例:

输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,3,2]
 */

/**
 * 【解析】
 * 从根节点开始，对每个节点，我们需要做以下几件事来模拟中序遍历（左-值-右）：
 * 1、沿左子树走到底，并把经过的节点都【待遍历】
 * 2、到底节点输出自身值
 * 3、切换到右节点上继续做1、2
 * 4、当右节点不存在，当前节点遍历到头，从【待遍历】中取一个继续123
 */

// code
var inorderTraversal = function (root) {
    const res = [];
    const stack = [];
    let cur = root;
    while (cur || stack.length > 0) {
        // 沿左子树走到底，沿途入栈
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        // 取出当前栈顶：没有左子树的节点
        cur = stack.pop();
        // 遍历自己
        res.push(cur.val);
        // 切到右子树上
        cur = cur.right;
    }
    return res;
};

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([1,2,3,4,5]);
console.log(inorderTraversal(tree));