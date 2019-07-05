/**
 * 【题目】
 * 给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

示例:
输入:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
输出: 6
 */

/**
 * 【解析】
 * 尝试【以m行n列点为右下角的矩形】作为状态，前面不好找。
 * 换个思路：一个矩形就是连续几行【1】范围的交集，遍历比较就好
 * 
 * 状态转移：
 *      m～n行的【1】交集 = m～n-1行【1】交集 再和n行【1】取交集
 * 边界：
 *      单行交集就是自身
 */

// code
var maximalRectangle = function(matrix) {
    if (matrix.length === 0) return 0;
    const rowCount = matrix.length;
    const cache = new Array(rowCount).fill('').map(() => []);
    let MAX = 0;
    for (let m = 0; m < rowCount; m++) {
        for (let n = m; n < rowCount; n++) {
            if (m === n) {
                cache[m][n] = matrix[m];
            } else {
                cache[m][n] = matrix[n].map((current1or0, index) => {
                    if (cache[m][n - 1][index] === '1' && current1or0 === '1') {
                        return '1';
                    } else {
                        return '0';
                    }
                });
            }
            cache[m][n].join('').split(/0+/g).forEach(count1 => {
                const rec = count1.length * (n - m + 1);
                if (rec > MAX) MAX = rec;
            });
        }
    }
    return MAX;
};

// test
console.log(maximalRectangle([
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]
]));