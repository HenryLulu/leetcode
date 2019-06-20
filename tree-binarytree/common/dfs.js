/**
  * @file: dfs.js
  * @author: why
  * @date: 2019-06-14
*/

// 方法一：后序遍历中，节点自身是在左右都遍历完后才会遍历的
var dfs = root => {
    if (!root) return;
    // 用一个标记记录上一个遍历到的节点，用于判断当前节点需不需要遍历
    let pre = null;
    // 记录待遍历节点
    const stack = [root];
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
            console.log(currentNode.val);
        } else {
            // 节点没遍历，子节点压栈
            currentNode.right && stack.push(currentNode.right);
            currentNode.left && stack.push(currentNode.left);
        }
    }
};

// 方法二：模拟遍历行为的指针移动
var dfs = root => {
    const stack = [];
    let cur = root;
    let pre = null;
    while (cur || stack.length > 0) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack[stack.length - 1];
        if (!cur.right || pre === cur.right) {
            stack.pop();
            console.log(cur.val);
            pre = cur;
            cur = null;
        } else {
            cur = cur.right;
        }
    }
};

const tool = require('../tool/convertDataStruct');
const tree = tool.array2tree([1,2,3,4,5]);
console.log(dfs(tree));