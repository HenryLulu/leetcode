/**
 * 【题目】
 * 给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。
 * 你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。
 * 输入: 
	Tree 1                     Tree 2                  
          1                         2                             
         / \                       / \                            
        3   2                     1   3                        
       /                           \   \                      
      5                             4   7                  
 * 输出: 
    合并后的树:
            3
            / \
           4   5
          / \   \ 
         5   4   7
 */

/**
 * 【解析】
 * 递归或者队列
 */

// code
// 递归
var mergeTrees = function(t1, t2) {
    if (!t1) {
        return t2;
    }
    if (!t2) {
        return t1;
    }
    const mergedNode = {};
    mergedNode.val = t1.val + t2.val;
    mergedNode.left = mergeTrees(t1.left, t2.left);
    mergedNode.right = mergeTrees(t1.right, t2.right);
    return mergedNode;
};
// 非递归
var mergeTrees = function(t1, t2) {
    if (!t1) return t2;
    if (!t2) return t1;
    const mergedTree = {};
    const queue = [[t1, t2, mergedTree]];
    while (queue.length > 0) {
        const [t1, t2, currentMergedNode] = queue.shift();
        currentMergedNode.val = t1.val + t2.val;
        if (t1.left && t2.left) {
            currentMergedNode.left = {};
            queue.push([t1.left, t2.left, currentMergedNode.left]);
        } else {
            currentMergedNode.left = t1.left || t2.left;
        }
        if (t1.right && t2.right) {
            currentMergedNode.right = {};
            queue.push([t1.right, t2.right, currentMergedNode.right]);
        } else {
            currentMergedNode.right = t1.right || t2.right;
        }
    }
    return mergedTree;
}

// test
