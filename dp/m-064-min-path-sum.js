/**
 * 【题目】
 * 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。说明：每次只能向下或者向右移动一步。

示例:
输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。
 */

/**
 * 【解析】
 * 状态转移：走到某一块的最小路径和 = 当前块值 + min（ 走到上边块的最小路径和，走到左边块的最小路径和 ）
 * 边界：左上角块（0，0）最小路径和 = 块值
 */

// code
var minPathSum = function(grid) {
    const rowCount = grid.length;
    if (rowCount === 0) return 0;
    const colCount = grid[0].length;
    const minPathSum = grid.map(() => []);
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            // 边界：左上角块（0，0）最小路径和 = 块值
            if (row === 0 && col === 0) minPathSum[row][col] = grid[0][0];
            // 区分计算，考虑靠边的元素
            else if (row === 0) minPathSum[row][col] = grid[row][col] + minPathSum[row][col - 1];
            else if (col === 0) minPathSum[row][col] = grid[row][col] + minPathSum[row - 1][col];
            else minPathSum[row][col] = grid[row][col] + Math.min(minPathSum[row][col - 1], minPathSum[row - 1][col]);
        }
    }
    return minPathSum[rowCount - 1][colCount - 1];
};

// test
console.log(minPathSum([
    [1,3,1],
    [1,5,1],
    [4,2,1]
]));