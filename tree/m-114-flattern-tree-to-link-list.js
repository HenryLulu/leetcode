/**
 * 【题目】
 * 给定一个二叉树，原地将它展开为链表。

例如，给定二叉树

    1
   / \
  2   5
 / \   \
3   4   6
将其展开为：

1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
 */

/**
 * 【解析】
 * 
 */

// code
// 非递归：前序遍历调整节点右子树的操作，需要一个栈
var flatten = function(root) {
    if (!root) return;
    const stack = [root];
    while (stack.length > 0) {
        const currentNode = stack.pop();
        if (currentNode.left) {
            // 如果节点有左节点，右节点-左节点应该入栈，并把右节点调整为左节点，清空左节点
            currentNode.right && stack.push(currentNode.right);
            stack.push(currentNode.left);
            currentNode.right = currentNode.left;
            currentNode.left = null;
        } else if (currentNode.right) {
            // 如果没有左节点，只有右节点，右节点入栈
            stack.push(currentNode.right);
        } else {
            // 如果左右节点都没有，右节点赋值为栈顶节点
            currentNode.right = stack[stack.length - 1];
        }
    }
};
// 递归：对每个节点：左右子节点都分别展开，再按根-左-右串联到right上
var flatten = function(root) {
    let pre = null;
    const flattenANode = root => {
        if (!root) return;
        if (pre) {
            pre.left = null;
            pre.right = root;
        }
        pre = root;
        const right = root.right;
        flattenANode(root.left);
        flattenANode(right);
    }
    flattenANode(root)
    return root;
}

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([1,2,5,3,4,null,6]);
console.log(flatten(tree));