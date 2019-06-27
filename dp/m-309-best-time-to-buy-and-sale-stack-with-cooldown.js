/**
 * 【题目】
 * 给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​
 * 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
 * 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
示例:
输入: [1,2,3,0,1,2]
输出: 3 
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 不做, 卖出]
 */

/**
 * 【解析】
 * 状态转移方程：
 * 第n天持有股票情况下的最大资产 hold[n] = 以下几种情况最大值：
 *      1、前一天就持有：hold[n-1]
 *      2、前一天不持有：unhold[n-2] - prices[n]
 *      这里的 2 要注意，因为有冷冻期，如果前一天刚“不持有”，今天是没法“持有”的。
 *      所以今天想在2情况下持有，必须至少前两天都“不持有”，即 unhold[n-2]
 * 第n天不持有股票情况下的最大资产 unhold[n] = 以下几种情况最大值：
 *      1、前一天持有：hold[n-1] + prices[n]
 *      2、前一天就不持有：unhold[n-1]
 * 边界：hold[0] = -prices[n]; unhold[0] = 0;
 */

// code
var maxProfit = prices => {
    if (prices.length < 2) return 0;
    const hold = [-prices[0], Math.max(-prices[0], -prices[1])];
    const unhold = [0, Math.max(0, prices[1] - prices[0])];
    for (let n = 2; n < prices.length; n++) {
        hold[n] = Math.max(hold[n-1], unhold[n-2] - prices[n]);
        unhold[n] = Math.max(hold[n-1] + prices[n], unhold[n-1]);
    }
    return unhold[prices.length - 1];
};

// test
console.log(maxProfit([1,2,3,0,2]));