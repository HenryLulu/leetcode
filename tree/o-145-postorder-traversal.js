/**
 * 【题目】
 * 给定一个二叉树，返回它的 后序 遍历（非递归）。
示例:
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [3,2,1]
 */

/**
 * 【解析】
 * 用到一个栈，存储等待遍历的节点；需要标记上一个遍历到的节点，判断当前节点是否该遍历
 */

// code
var postorderTraversal = function(root) {
    if (!root) return [];
    // 用一个标记记录上一个遍历到的节点，用于判断当前节点需不需要遍历
    let pre = null;
    // 记录待遍历节点
    const stack = [root];
    const res = [];
    while (stack.length > 0) {
        const currentNode = stack[stack.length - 1];
        if (
            // 三种情况下，当前节点可遍历：1没有左右子节点，2有右节点且上一个遍历到了，3没有右节点有左节点且上一个遍历到了
            (!currentNode.left && !currentNode.right) ||
            (currentNode.right && pre === currentNode.right) ||
            (currentNode.left && !currentNode.right && pre === currentNode.left)
        ) {
            pre = currentNode;
            // 节点遍历过了，出栈
            stack.pop();
            res.push(currentNode.val);
        } else {
            // 节点没遍历，子节点压栈
            currentNode.right && stack.push(currentNode.right);
            currentNode.left && stack.push(currentNode.left);
        }
    }
    return res;
};

var postorderTraversal = function(root) {
    if (!root) return [];
    const res = [];
    const stack = [];
    let cur = root;
    let pre = null;
    while (cur || stack.length > 0) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        if (!cur.right || pre && cur.right === pre) {
            pre = cur;
            res.push(cur.val);
            // cur 置空，让下个遍历从栈里取，退到父节点上
            cur = null;
        } else {
            stack.push(cur);
            cur = cur.right;
        }
    }
    return res;
};

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([1,2,3,4,5]);
console.log(postorderTraversal(tree));