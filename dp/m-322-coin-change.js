/**
 * 【题目】
 * 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

示例 1:
输入: coins = [1, 2, 5], amount = 11
输出: 3 
解释: 11 = 5 + 5 + 1

示例 2:
输入: coins = [2], amount = 3
输出: -1
 */

/**
 * 【解析】
 * 背包问题
 * 
 * 二维数组：m行n列表示，考虑前m种硬币，凑成n元的最少硬币数（0 < m <= coins.length, 0 <= n <= amount ）
 * 状态转移：
 *      考虑前m种硬币凑成n元的最少硬币数 = min（
 *          考虑前m-1种硬币凑成n元的最少硬币数（不用这种硬币）
 *          考虑前m种硬币凑成【n-第m种硬币面值】的最少硬币数 + 1 （这里面包含了这种硬币面值正好为n的情况 和 用过若干个这种硬币的情况）
 *      ）
 * 边界：考虑任意多种硬币凑成 0 元的最少硬币数 = 0
 * 
 * 二维转一维：只需考虑上一轮未遍历到的策略结果和已遍历过的本轮策略结果，由于一种硬币可以反复使用，正序
 */

// code
var coinChange = function(coins, amount) {
    if (amount === 0) return 0;
    if (coins.length === 0) return -1;
    const count = new Array(amount + 1).fill(Infinity);
    count[0] = 0;
    // 每轮循环把第m种硬币考虑进来
    for (let m = 0; m < coins.length; m++) {
        const curCoin = coins[m];
        // 重新计算每个和的策略
        for (let n = curCoin; n <= amount; n++) {
            // 这里的count[n]是上一轮结果，而count[n - curCoin]是遍历过的，用过本轮硬币的结果
            count[n] = Math.min(count[n], count[n - curCoin] + 1);
        }
    }
    return count[amount] === Infinity ? -1 : count[amount];
};

// test
console.log(coinChange([1, 2, 5],11));