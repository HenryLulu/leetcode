/**
 * 【题目】
 * 给定一个二叉树，返回它的中序 遍历。
 * 输入：[1,null,2,3] -> [1,3,2]
 */

/**
 * 【解析】
 * 入栈：每到一个节点，右-值-左 顺序入栈，入完出栈
 * 出栈：如果出的是左右节点，继续入栈；如果是值，打出来
 */

// code
var inorderTraversal = function (root) {
    const stack = [];
    root && root.length > 0 && stack.push(0);
    let cur;
    const res = [];
    while (stack.length > 0) {
        cur = stack.pop();
        // 通过类型标记值（string）/节点index（number）
        if (typeof cur === 'number') {
            // 右-值-左 顺序入栈
            root[cur + 2] && stack.push(cur + 2);
            stack.push('' + root[cur]);
            root[cur + 1] && stack.push(cur + 1);
        } else {
            res.push(+cur);
        }
    }
    return res;
};
// test
console.log(inorderTraversal([1, null, 2, 3]));