/**
 * 【题目】
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？注意：给定 n 是一个正整数。

示例 1：
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶

示例 2：
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
 */

/**
 * 【解析】
 * 状态转移方程：爬到第n级的走法 = 爬到第n-1级走法（再走一节） + 爬到第n-2级走法（再走两节）
 * 边界：爬第0、1节的走法都是1
 */

// code
// 自底向上
var climbStairs = function(n) {
    const ways = [1, 1];
    for (let i = 2; i <= n; i++) {
        ways[i] = ways[i - 1] + ways[i - 2];
    }
    return ways[n];
};
// 自顶向下：递归
var climbStairs = function(n) {
    const ways = [1, 1];
    const d = n => {
        if (!ways[n]) {
            ways[n] = d(n - 1) + d(n - 2);
        }
        return ways[n];
    };
    return d(n);
};

// test
console.log(climbStairs(10));