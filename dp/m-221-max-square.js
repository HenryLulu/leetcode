/**
 * 【题目】
 * 在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。
示例:
输入: 
1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0
输出: 4
 */

/**
 * 【解析】
 * 状态转移：以某点为右下角的最大正方形的边长 = 
 *      如果这个点是1：1 + min（以它左上方点为右下角的最大正方形边长，以它左侧点为右下角的最大正方形边长，以它上侧点为右下角的最大正方形边长）
 *      如果这个点是0：0
 * 边界：任意一个超范围的点，都是0
 */

// code
var maximalSquare = function(matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) return 0;
    let MAX = 0;
    const rowCount = matrix.length, colCount = matrix[0].length;
    const maxSide = new Array(matrix.length).fill('').map(() => []);

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (matrix[row][col] == 0) {
                // 如果这个点是0，记0
                maxSide[row][col] = 0;
            } else if (row === 0 || col === 0) {
                // 如果靠边了，只能是1
                maxSide[row][col] = 1;
            } else {
                // 其他情况，取三者最小值
                maxSide[row][col] = 1 + Math.min(
                    maxSide[row - 1][col - 1],
                    maxSide[row - 1][col],
                    maxSide[row][col - 1]
                );
            }
            if (maxSide[row][col] > MAX) MAX = maxSide[row][col];
        }
    }

    return MAX * MAX;
};

// test
console.log(maximalSquare([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]));