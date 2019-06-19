/**
 * 【题目】
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
 */

/**
 * 【解析】
 * 前提：两个节点必然存在，那么两个节点在向上的过程中必然相遇
 * 所以，只要让 p、q 沿树枝上浮，并在相遇的时候转变成公共祖先，公共祖先一直上浮到root
 */

// code
// 递归
var lowestCommonAncestor = function(root, p, q) {
    // 为了定义更清晰，内部又定义了一个递归函数
    // 这个函数负责递归寻找当前节点的左右子树，返回p或者q或者他们的公共祖先
    // node: 当前搜索子树根
    const findPorQorTheirLCAInATree = node => {
        // 叶子节点，返回null
        if (!node) return null;
        // node就是p或q，返回node，不必向下递归了
        if (node.val === p.val || node.val === q.val) return node;

        // node既不是p也不是q，就要递归左右子树的情况
        const left = findPorQorTheirLCAInATree(node.left);
        const right = findPorQorTheirLCAInATree(node.right);
        // 左右子树的情况分几种
        // 1、如果两侧都有返回，就是左右分别有p、q，那么node就是公共祖先
        if (left && right) return node;
        // 2、一边有返回，一边无返回，那么这个浮上来的要么是p、q，要么是已经找到的公共祖先，继续向上浮
        if (left || right) return left || right;
        // 3、什么也没有，这个树没用
        return null;
    };

    // 到了root，浮上来的肯定是LCA（公共祖先）了
    return findPorQorTheirLCAInATree(root);
};

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([3,5,1,6,2,0,8,null,null,7,4]);
console.log(lowestCommonAncestor(tree, {val: 5}, {val: 1}));