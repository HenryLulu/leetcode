/**
 * 【题目】
 * 两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。
给出两个整数 x 和 y，计算它们之间的汉明距离。
注意：
0 ≤ x, y < 231.

示例:
输入: x = 1, y = 4
输出: 2
解释:
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
上面的箭头指出了对应二进制位不同的位置。
 */

/**
 * 【解析】
 * 就是个异或操作，操作完统计 1 的个数，就是不断右移和 1 与
 */

// code
var hammingDistance = function(x, y) {
    let count = 0;
    // 异或
    let xor = x ^ y;
    while (xor > 0) {
        // 和 1 与
        if (xor & 1 === 1) {
            count++;
        }
        // 右移
        xor = xor >> 1;
    }
    return count;
};

// test
console.log(fn(arg));