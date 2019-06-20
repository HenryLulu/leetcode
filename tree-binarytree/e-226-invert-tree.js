/**
 * 【题目】
 * 翻转一棵二叉树
 */

/**
 * 【解析】
 * 递归 or 队列
 */

// code
// 递归
var invertTree = function(root) {
    if (root) {
        const tmp = invertTree(root.right);
        root.right = invertTree(root.left);
        root.left = tmp;    
    }
    return root;
};
// 非递归
var invertTree = function (root) {
    const queue = [root];
    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (!currentNode) continue;
        const tmp = currentNode.left;
        currentNode.left = currentNode.right;
        currentNode.right = tmp;
        queue.push(currentNode.left);
        queue.push(currentNode.right);
    }
    return root;
}

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([4,2,7,1,3,6,9]);
console.log(tool.tree2array(invertTree(tree)));