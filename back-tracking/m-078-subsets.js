/**
 * 【题目】
 * 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
说明：解集不能包含重复的子集。
示例:
输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
 */

/**
 * 【解析】
 * 每次判断是否将当前数字加入已有子集，直至最后一个数字
 * 起始状态：空子集，第一个数
 * 终止并取值的条件：考虑完最后一个数
 * 回溯操作：
 *      1、已有子集加入当前数
 *      2、已有子集不加入当前数
 */

// code
var subsets = function(nums) {
    const res = [];
    const backTrack = (hasGeneratedSet, currentConsiderNumberIndex) => {
        if (currentConsiderNumberIndex === nums.length) {
            res.push(hasGeneratedSet);
            return;
        }
        backTrack(
            [...hasGeneratedSet, nums[currentConsiderNumberIndex]],
            currentConsiderNumberIndex + 1
        );
        backTrack(
            hasGeneratedSet,
            currentConsiderNumberIndex + 1
        );
    }
    backTrack([], 0);
    return res;
};

// test
console.log(subsets([1,2,3]));