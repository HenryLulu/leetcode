/**
 * 【题目】
 * 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
 */

/**
 * 【解析】
 * 两种解法：动态规划、图BFS，这里只实现动态规划
 * 状态转移：数n的最少完全平方数个数 = min（n减去一个完全平方数后的完全平方数个数 + 1）
 * 边界：0的最少完全平方数个数 = 0;
 */

// code
var numSquares = function(n) {
    const nums = [0];
    for (let i = 1; i <= n; i++) {
        let min;
        for (let j = 1; j * j <= i; j++) {
            if (nums[i - j * j] < min || !min) min = nums[i - j * j];
        }
        nums[i] = min + 1;
    }
    return nums[n];
};

// test
console.log(numSquares(12));