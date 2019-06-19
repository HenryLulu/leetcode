/**
 * 【题目】
 * 给定一个非空二叉树，返回其最大路径和。本题中，路径被定义为一条从树中任意节点出发，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。
示例 1:
输入: [1,2,3]
       1
      / \
     2   3
输出: 6

示例 2:
输入: [-10,9,20,null,null,15,7]

   -10
   / \
  9  20
    /  \
   15   7
输出: 42
 */

/**
 * 【解析】
 * 1 以某一节点为路径最上方节点的最大路径，等于节点自身值 + 以左子节点为起点向下的最大路径（如果大于0） + 以右子节点为起点向下的最大路径（如果大于0）
 * 2 以某一节点为起点向下的最大路径，等于节点自身值、节点自身值+以左子节点为起点向下的最大路径、节点自身值+以右子节点为起点向下的最大路径，三者的最大值
 * 遍历 + 求1 + 更新
 */

// code
// 递归
var maxPathSum = function(root) {
    let maxPath = root.val;
    const getMaxPathStartedFromANode = node => {
        const {val, left, right} = node;
        let leftVal = 0, rightVal = 0;
        if (left) {
            if (!left.max) left.max = getMaxPathStartedFromANode(left);
            leftVal = left.max;
        }
        if (right) {
            if (!right.max) right.max = getMaxPathStartedFromANode(right);
            rightVal = right.max;
        }
        return Math.max(val, val + leftVal, val + rightVal);
    };

    const getMaxPathThroughANode = node => {
        const {val, left, right} = node;
        let sum = val;
        if (left) {
            if (!left.max) left.max = getMaxPathStartedFromANode(left);
            if (left.max > 0) sum += left.max;
        }
        if (right) {
            if (!right.max) right.max = getMaxPathStartedFromANode(right);
            if (right.max > 0) sum += right.max;
        }
        return sum;
    };

    const traversal = node => {
        if (!node) return;
        maxPath = Math.max(maxPath, getMaxPathThroughANode(node));
        traversal(node.left);
        traversal(node.right);
    }

    traversal(root);
    return maxPath;
};

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([1,2,3]);
console.log(maxPathSum(tree));