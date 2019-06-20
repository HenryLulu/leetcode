/**
 * 【题目】
 * 给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。

例如:
给定二叉树: [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回其层次遍历结果：

[
  [3],
  [9,20],
  [15,7]
]
 */

/**
 * 【解析】
 * 
 */

// code
var levelOrder = function(root) {
    if (!root) return [];
    const queueGroup = [[root]];
    let maxLevel = 0;
    for (let i = 0; i <= maxLevel; i++) {
        const currentLevelQueue = queueGroup[i];
        queueGroup.push([]);
        for (let j = 0; j < currentLevelQueue.length; j++) {
            const currentNode = currentLevelQueue[j];
            if (currentNode.left) {
                maxLevel = i + 1;
                queueGroup[i + 1].push(currentNode.left);
            }
            if (currentNode.right) {
                maxLevel = i + 1;
                queueGroup[i + 1].push(currentNode.right);
            }
        }
    }
    queueGroup.pop();
    return queueGroup.map(levelQueue => {
        return levelQueue.map(node => node.val);
    });
};

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([3,9,20,null,null,15,7]);
console.log(levelOrder(tree));