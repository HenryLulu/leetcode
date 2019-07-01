/**
 * 【题目】
 * 
 */

/**
 * 【解析】
 * 就是找数组中有没有几个元素加起来是整体和的一半
 * 状态转移
 */

// code
var canPartition = function(nums) {
    const targetSum = nums.reduce((a, b) => a + b) / 2;
    
};

// test
console.log(canPartition([1, 2, 3, 5]));