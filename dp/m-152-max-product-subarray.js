/**
 * 【题目】
 * 给定一个整数数组 nums ，找出一个序列中乘积最大的连续子序列（该序列至少包含一个数）。

示例 1:
输入: [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。

示例 2:
输入: [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 */

/**
 * 【解析】
 * 只考虑逐步比较最大值是有漏洞的，因为乘法存在符号反转的情况，所以要记录大小两组极值。
 * 状态转移：
 *      以某个数为终点的乘积最大子数组乘积 = max（以前一个数为终点的乘积最大子数组乘积 * 自身，以前一个数为终点的乘积最小子数组乘积 * 自身，自身）
 *      以某个数为终点的乘积最小子数组乘积 = min（以前一个数为终点的乘积最大子数组乘积 * 自身，以前一个数为终点的乘积最小子数组乘积 * 自身，自身）
 * 边界：以第一个数为终点的乘积最大/小子数组乘积 = 自身
 */

// code
var maxProduct = function(nums) {
    if (nums.length === 0) return 0;
    let MAX = nums[0];
    const maxProduct = [nums[0]];
    const minProduct = [nums[0]];
    for (let i = 1; i < nums.length; i++) {
        maxProduct[i] = Math.max(maxProduct[i - 1] * nums[i], minProduct[i - 1] * nums[i], nums[i]);
        minProduct[i] = Math.min(maxProduct[i - 1] * nums[i], minProduct[i - 1] * nums[i], nums[i]);
        if (maxProduct[i] > MAX) MAX = maxProduct[i];
    }
    return MAX;
};

// test
console.log(maxProduct([-2,3,-4]));