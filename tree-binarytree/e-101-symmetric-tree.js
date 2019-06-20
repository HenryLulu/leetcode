/**
 * 【题目】
 * 给定一个二叉树，检查它是否是镜像对称的。
例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
    1
   / \
  2   2
 / \ / \
3  4 4  3

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
    1
   / \
  2   2
   \   \
   3    3

 */

/**
 * 【解析】
 * 左右2树互为镜像，或者说两颗root互为镜像
 * 互为镜像的两棵树a,b：1、val相同；2、a.left/b.right互为镜像
 */

// code
// 递归
var isSymmetric = function(root) {
    const isMirror = (a, b) => {
        if (!a && !b) return true;
        if (!a || !b) return false;
        return a.val === b.val && isMirror(a.left, b.right) && isMirror(a.right, b.left);
    }
    return isMirror(root, root);
};
// 非递归
var isSymmetric = function (root) {
    // 待比较子树
    const queue = [[root, root]];
    while (queue.length > 0) {
        const [a, b] = queue.shift();
        // 都未定义，跳过检查
        if (!a && !b) continue;
        // 一个有一个无，检查失败
        if (!a || !b) return false;
        // 值不同，检查失败
        if (a.val !== b.val) return false;
        // 本节点检查成功，左右子树交叉入队
        queue.push([a.left, b.right]);
        queue.push([a.right, b.left]);
    }
    // 全部比较完
    return true;
}

// test
const tool = require('./tool/convertDataStruct');
const tree = tool.array2tree([1,2,2,3,4,4,3]);
console.log(isSymmetric(tree));