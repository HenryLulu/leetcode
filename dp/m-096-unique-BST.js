/**
 * 【题目】
 * 给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？

示例:

输入: 3
输出: 5
解释:
给定 n = 3, 一共有 5 种不同结构的二叉搜索树:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3

 */

/**
 * 【解析】
 * BST的特点：每个节点的左子树节点一定都比它小，右子树节点一定都比它大
 * 状态转移：n个数组成的BST种数f(n) = (f(0) * f(n-1)) + (f(1) * f(n-2)) + ... + (f(n-1) * f(0))
 *      tip：这里别被数干扰，2~4 和 5~7 产生的BST种类是同样多的，都是f(3)
 * 边界：f(0) = 1; f(1) = 1;
 */

// code
var numTrees = function(n) {
    if (n < 2) return 1;
    const treesNum = [1, 1];
    for (let i = 2; i <= n; i++) {
        let sum = 0;
        for (let j = 0; j < i; j++) {
            sum += treesNum[j] * treesNum[i - 1 - j];
        }
        treesNum[i] = sum;
    }
    return treesNum[n];
};

// test
console.log(numTrees(3));