/**
 * 【题目】
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 */

/**
 * 【解析】
 * 状态转移方程：以当前元素为结尾的最大子序列和 = max（ 以前一元素结尾的最大子序列和 + 当前元素，当前元素 ）
 * 边界：第一个元素最大子序列和 = 自身
 */

// code
var maxSubArray = function(nums) {
    // 统计最大值
    let max = nums[0]
    // 只用到上一步结果，只存上一步
    let lastMax = nums[0];
    for (let i = 1; i < nums.length; i++) {
        lastMax = lastMax > 0 ? lastMax + nums[i] : nums[i];
        if (lastMax > max) max = lastMax;
    }
    return max;
};

// test
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));