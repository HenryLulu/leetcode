/**
 * 【题目】
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。假设一个二叉搜索树具有如下特征：
1. 节点的左子树只包含小于当前节点的数。
2. 节点的右子树只包含大于当前节点的数。
3. 所有左子树和右子树自身必须也是二叉搜索树。
示例 1:
输入:
    2
   / \
  1   3
输出: true
示例 2:
输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。
 */

/**
 * 【解析】
 * BST的特点：如果对BST进行中序遍历，遍历结果一定是单调递增的
 * 所以我们只要进行中序遍历，比较上个节点和当前节点值的大小就行
 */

// code
var isValidBST = function(root) {
    let lastValue;
    const stack = [];
    let cur = root;
    while (cur || stack.length > 0) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        if (typeof lastValue !== 'undefined' && lastValue >= cur.val) return false;
        lastValue = cur.val;
        cur = cur.right;
    }
    return true;
};

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([5,1,4,null,null,3,6]);
console.log(isValidBST(tree));