/**
 * 【题目】
 * 给定一个无序的整数数组，找到其中最长上升子序列的长度。
示例:
输入: [10,9,2,5,3,7,101,18]
输出: 4 
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
 */

/**
 * 【解析】
 * * 这道题，知道你想用栈，但真会出错，比如[1,3,6,7,9,4,10,5,6]，4下去了把67910全干掉了
 * 
 * 状态转移：
 * 以num[n]为结尾的最大上升子序列长度 = 左侧若干个比自己小的结尾的最大上升子序列长度的最大值 + 1
 *      
 * 边界：左侧没有比自己小的，长度为1
 */

// code
var lengthOfLIS = function(nums) {
    let MAX = 0;
    const longest = [];
    for (let i = 0; i < nums.length; i++) {
        longest[i] = 1;
        for (let j = i - 1; j >= 0; j--) {
            // 最近的并不一定是最长的，一定要把所有比自己小的都比下
            if (nums[j] < nums[i] && longest[j] + 1 > longest[i]) {
                longest[i] = longest[j] + 1;
            }
        }
        if (longest[i] > MAX) MAX = longest[i];
    }
    return MAX;
};

// test
console.log(lengthOfLIS([1,3,6,7,9,4,10,5,6]));