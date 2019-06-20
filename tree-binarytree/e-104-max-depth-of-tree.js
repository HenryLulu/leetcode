/**
 * 【题目】
 * 给定一个二叉树，找出其最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 */

/**
 * 【解析】
 * 递归 or 栈+深度优先遍历
 */

// code
// 递归
var maxDepth = function(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
// 栈
var maxDepth = function(root) {
    if (!root) return 0;
    const stack = [[root, 1]];
    let maxDepth = 1;
    while (stack.length > 0) {
        const [currentNode, currentDepth] = stack.pop();
        // 每遍历到一个节点，更新最大深度值
        maxDepth = Math.max(maxDepth, currentDepth);
        // 空节点就不要推栈了，浪费操作
        if (currentNode.right) stack.push([currentNode.right, currentDepth + 1]);
        if (currentNode.left) stack.push([currentNode.left, currentDepth + 1]);
    }
    return maxDepth;
};

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([4,2,7,1,3,6,9]);
console.log(maxDepth(tree));