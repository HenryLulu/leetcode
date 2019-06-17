/**
 * 【题目】
 * 给定一个二叉树，它的每个结点都存放着一个整数值。找出路径和等于给定数值的路径总数。
路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1

返回 3。和等于 8 的路径有:

1.  5 -> 3
2.  5 -> 2 -> 1
3.  -3 -> 11
 */

/**
 * 【解析】
 * 对数值sum，以某个节点 n 为起点的，和为 sum 的路径数等于：n.left/right 上路径和为 sum - n.val 的路径数的和，加上本身是否等于 sum
 * 所以我们只要遍历所有节点，并将以每个节点为起点的路径数相加就可以了
 */

// code
var pathSum = function(root, sum) {   
    // 总计数 
    let totalRouteCount = 0;

    // 递归：计算以某个节点为起点的路径数
    const getRouteCountStartedFromANode = (node, targetSum) => {
        if (!node) return 0;
        const res = (node.val === targetSum ? 1 : 0)
            + getRouteCountStartedFromANode(node.left, targetSum - node.val)
            + getRouteCountStartedFromANode(node.right, targetSum - node.val);
        return res;
    };

    // 递归：遍历节点，对每个节点调用计算函数，并将结果累加到总计数上
    const traversalAndCountRoute = node => {
        if (!node) return;
        totalRouteCount += getRouteCountStartedFromANode(node, sum);
        traversalAndCountRoute(node.left);
        traversalAndCountRoute(node.right);
    };

    // 总入口
    traversalAndCountRoute(root);

    return totalRouteCount;
};

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([10,5,-3,3,2,null,11,3,-2,null,1]);
console.log(pathSum(tree, 8));