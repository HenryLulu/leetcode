/**
 * 【题目】
 * 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 * candidates 中的数字可以无限制重复被选取。
说明：
所有数字（包括 target）都是正整数。
解集不能包含重复的组合。 

示例 1:
输入: candidates = [2,3,6,7], target = 7,
所求解集为:
[
  [7],
  [2,2,3]
]
 */

/**
 * 【解析】
 * 终止和取值的条件：
 *      1、如果目标数小于0，加多了，不能用，直接return
 *      2、如果目标数恰好等于0，返回当前生成的序列
 * 回溯操作：
 *      把给定序列中的数挨个放到序列中，并在目标值中减去这个数
 *      注意：由于生成序列不能重复，每次回溯只从上一步考虑到的数开始
 */

// code
var combinationSum = function(candidates, target) {
    const res = [];
    const len = candidates.length;
    const backTrack = (hasGeneratedSeries, resTarget, indexLastConsidered) => {
        // 加多了
        if (resTarget < 0) return;
        // 正好
        if (resTarget === 0) {
            res.push(hasGeneratedSeries);
            return;
        }
        // 从上一轮回溯考虑的数开始，既满足当前数无限次使用，又防止 2,3 3,2 这样的重复
        for (let i = indexLastConsidered; i < len; i++) {
            backTrack(
                [...hasGeneratedSeries, candidates[i]],
                resTarget - candidates[i],
                i
            );
        }
    }
    backTrack([], target, 0);
    return res;
};

// test
console.log(combinationSum([2,3,6,7], 7));