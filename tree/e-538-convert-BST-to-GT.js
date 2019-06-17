/**
 * 【题目】
 * 给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater Tree)，使得每个节点的值是原来的节点值加上所有大于它的节点值之和。
输入: 二叉搜索树:
              5
            /   \
           2     13
输出: 转换为累加树:
             18
            /   \
          20     13
 */

/**
 * 【解析】
 * 反向中序遍历（右中左），然后累加
 * 遍历可以递归 or 栈
 */

// code
// 递归
var convertBST = function(root) {
    if (!root) return root;
    let sum = 0;
    function traversal (node) {
        if (node.right) traversal(node.right);
        node.val = sum += node.val;
        if (node.left) traversal(node.left);
    }
    traversal(root);
    return root;
};
// 栈
var convertBST = function(root) {
    if (!root) return root;
    const stack = [];
    let sum = 0;
    let cur = root;
    while (cur || stack.length > 0) {
        while (cur) {
            stack.push(cur);
            cur = cur.right;
        }
        cur = stack.pop();
        cur.val = sum += cur.val;
        cur = cur.left;
    }
    return root;
};

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([4,2,7,1,3,6,9]);
console.log(convertBST(tree));