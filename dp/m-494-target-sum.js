/**
 * 【题目】
 * 
 */

/**
 * 【解析】
 * 对n位数组求目标和S，等于 后n-1位求目标和S-第一位值 + 后n-1位求目标和S+第一位值
 */

// code
// 乞丐版：体现递归思路，但有很多不必要和重复计算，比较浪费时间
var findTargetSumWays = function(nums, S) {
    // 如果空数组，且目标和为0，则这条是通的
    if (nums.length === 0) return S === 0 ? 1 : 0;
    // 递归求后面目标和
    return findTargetSumWays(nums.slice(1), S - nums[0]) + findTargetSumWays(nums.slice(1), S + nums[0]);
};

// 缓存 + 剪枝版
var findTargetSumWays = function(nums, S) {
    // 剪枝：计算后n位可能产生的最大、最小值
    const maxs = nums.map((num, i) => nums.slice(i).reduce((r, cur) => r + cur, 0));
    const mins = nums.map((num, i) => nums.slice(i).reduce((r, cur) => r - cur, 0));
    // 缓存：缓存计算结果
    const cache = nums.map(() => ({}));
    // 递归函数
    const getRestWays = (startIndex, S) => {
        if (nums.length === startIndex) {
            return S === 0 ? 1 : 0;
        }
        // 如果超出了最大最小范围，不必算下去了
        if (maxs[startIndex] < S || mins[startIndex] > S) return 0;
        // 缓存读取、存储
        let res = cache[startIndex][S];
        if (res === undefined) {
            res = getRestWays(startIndex + 1, S - nums[startIndex]) + getRestWays(startIndex + 1, S + nums[startIndex]);
            cache[startIndex][S] = res;
        }
        return res;
    };
    return getRestWays(0, S);
};

// test
console.log(findTargetSumWays([1, 1, 1, 1, 1], 3))