/**
 * 【题目】
 * 给定一个没有重复数字的序列，返回其所有可能的全排列。
示例:
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
 */

/**
 * 【解析】
 * 每次在剩余数组中取一个数
 * 终止并取值的条件：剩余数组为空
 * 回溯操作：
 *      对于剩余数组中每一个数：
 *          把这个数拿出来加到已生成数组中
 */

// code
var permute = function(nums) {
    const res = [];
    const backTrack = (hasGeneratedSeries, restNumbers) => {
        if (restNumbers.length === 0) {
            res.push(hasGeneratedSeries);
            return;
        }
        for (let i = 0; i < restNumbers.length; i++) {
            backTrack(
                [...hasGeneratedSeries, restNumbers[i]],
                restNumbers.slice(0, i).concat(restNumbers.slice(i + 1))
            );
        }
    };
    backTrack([], nums);
    return res;
};

// test
console.log(permute([1,2,3]));