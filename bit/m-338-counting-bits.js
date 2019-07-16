/**
 * 【题目】
 * 给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。

示例 1:
输入: 2
输出: [0,1,1]

示例 2:
输入: 5
输出: [0,1,1,2,1,2]
 */

/**
 * 【解析】
 * 状态转移：
 * 如果n是奇数，它的二进制1的数量比n-1多1（最后一位由1变0）
 * 如果n是偶数，它的二进制1的数量 = n/2的数量（除以进制，相当于末尾去个0）
 * 边界：0的二进制1数 = 0；1的二进制1数 = 1
 */

// code
var countBits = function(num) {
    if (num === 0) return [0];
    const bitsCount = [0, 1];
    for (let i = 2; i <= num; i++) {
        bitsCount[i] = i % 2 === 1
            ? bitsCount[i - 1] + 1
            : bitsCount[i / 2];
    }
    return bitsCount;
};
// test
console.log(countBits(2))