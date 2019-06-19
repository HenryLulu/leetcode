/**
  * @file: convertDataStruct.js
  * @description: 数据结构转换工具（方便测试树函数）
  * @author: why
  * @date: 2019-06-13
*/

/**
 * 数组转树结构
 * @param {Array} arr
 * @returns {Object}
 */
const array2tree = arr => {
    if (arr.length === 0) return null;
    const root = {
        val: arr[0]
    };
    const queue = [root];
    for (let i = 1; i < arr.length; i += 2) {
        const curParent = queue.shift();
        const curLeft = arr[i];
        const curRight = arr[i + 1];
        if (curLeft || curLeft === 0) {
            curParent.left = {
                val: curLeft
            };
            queue.push(curParent.left);
        }
        if (curLeft === null) {
            curParent.left = null;
        }
        if (curRight || curRight === 0) {
            curParent.right = {
                val: curRight
            };
            queue.push(curParent.right);
        }
        if (curRight === null) {
            curParent.right = null;
        }
    }
    return root;
};
exports.array2tree = array2tree;

/**
 * 树结构转数组
 * @param {Object} root
 * @returns {Array}
 */
const tree2array = root => {
    const arr = [];
    const queue = [root];
    while (queue.length > 0) {
        const curNode = queue.shift();
        if (curNode === null) arr.push(null);
        if (!curNode) continue;
        arr.push(curNode.val);
        queue.push(curNode.left);
        queue.push(curNode.right);
    }
    return arr;
};
exports.tree2array = tree2array;

// console.log(array2tree([3,9,20,null,null,15,7]))
// console.log(tree2array(array2tree([3,9,20,null,null,15,7])))
