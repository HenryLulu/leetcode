/**
 * 【题目】
 * 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

示例 1:
输入: [1, 5, 11, 5]
输出: true
解释: 数组可以分割成 [1, 5, 5] 和 [11].
 
示例 2:
输入: [1, 2, 3, 5]
输出: false
解释: 数组不能分割成两个元素和相等的子集.
 */

/**
 * 【解析】
 * 就是找数组中有没有几个元素加起来是整体和的一半，这就成了个01背包问题
 * 
 * 二维状态数组：第m行第n列表示，在前几个数字策略基础上，把第m个数考虑进来后，能否找到和为n的子集。
 * 状态转移：
 *      把第m个数考虑进来后能找到和为n的子集 = 把第m-1个数考虑进来后能找到和为【n或者n-第m个数】的子集
 * 边界：总是能找到和为0的子集
 * 
 * 二维数组转一维：
 *      显然，把第m个数考虑进来的策略只依赖上个数的小和状态，所以用一维数组并倒序就可以
 * 
 * 例如：[1, 3, 3, 5]，找到何为6的子集
 * 加入的数  0  1  2  3  4  5  6
 *      1   T  T  F  F  F  F  F  
 *      3   T  T  F  T  T  F  F
 *      3   T  T  F  T  T  F  F
 *      5   T  T  F  T  T  T  T
 */

// code
var canPartition = function(nums) {
    const total = nums.reduce((a, b) => a + b);
    // 如果是奇数，直接返回false
    if (total % 2 !== 0) return false;

    // 整体和的一半
    const target = total / 2;
    // 一维数组
    const canSum = new Array(target + 1).fill(false);
    canSum[0] = true;
    // 把num加进来更新策略
    nums.forEach(num => {
        // 保护上一轮遍历的结果，从后向前
        // num肯定影响不到比自己小的和的决策，所以遍历到自己这么大就行了
        for (let cur = target; cur >= num; cur--) {
            canSum[cur] = canSum[cur] || canSum[cur - num];
        }
    });

    return canSum[target];
};

// test
console.log(canPartition([1, 2, 3, 5]));