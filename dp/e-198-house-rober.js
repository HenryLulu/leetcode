/**
 * 【题目】
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

示例:
输入: [1,2,3,1]
输出: 4
解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
 */

/**
 * 【解析】
 * 状态转移：打劫到某一家的最好结果 = max（（ 这家钱 + 打劫到上上家的最好结果），打劫到上家的最好结果 ）
 * 边界：打劫到第一家的最好结果 = 第一家钱；打劫到第二家最好结果 = max（第一家钱，第二家钱）
 */

// code
var rob = function(nums) {
    // 不够两家，直接返回结果
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    // 一个数组记录子问题结果，包括1、2家结果
    const maxAfterRobThisHouse = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 2; i < nums.length; i++) {
        // 计算后面结果
        maxAfterRobThisHouse[i] = Math.max(
            nums[i] + maxAfterRobThisHouse[i - 2],
            maxAfterRobThisHouse[i - 1]
        );
    }
    // 返回：打劫到最后一家的最好结果
    return maxAfterRobThisHouse[nums.length - 1];
};

// test
console.log(rob([2,7,9,3,1]))