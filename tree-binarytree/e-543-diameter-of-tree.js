/**
 * 【题目】
 * 给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过根结点。
示例 :
给定二叉树

          1
         / \
        2   3
       / \     
      4   5    
返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。
 */

/**
 * 【解析】
 * 经过某个节点 n 的直径，等于 n.left/right 深度和
 * 需要一轮遍历，从叶子节点开始（深度优先），1、记录节点深度，2、更新最大直径
 */

// code
// 递归
var diameterOfBinaryTree = function(root) {
    if (!root) return 0;
    let maxDiameter = 0;

    // 遍历一棵子树，并返回深度
    const traversalAndCal = node => {
        if (!node) return 0;
        const leftDepth = traversalAndCal(node.left);
        const rightDepth = traversalAndCal(node.right);
        maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);
        return Math.max(leftDepth, rightDepth) + 1;
    };

    traversalAndCal(root);

    return maxDiameter;
};

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([1,2,3,4,5]);
console.log(diameterOfBinaryTree(tree));