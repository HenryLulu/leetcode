/**
 * 【题目】
 * 一个机器人位于一个 m x n 网格的左上角。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角。
 * 问总共有多少条不同的路径？
 * 输入: m = 3, n = 2  输出: 3
 */

/**
 * 【解析】
 * 状态转移：到某点的路径数 = 到其上方点的路径数 + 到其左侧点的路径数
 * 边界：到起点的路径数 = 1
 */

// code
var uniquePaths = function(m, n) {
    const pathCount = new Array(m).fill('').map(() => []);
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (row === 0 && col === 0) pathCount[row][col] = 1;
            else if (row === 0) pathCount[row][col] = pathCount[row][col - 1];
            else if (col === 0) pathCount[row][col] = pathCount[row - 1][col];
            else pathCount[row][col] = pathCount[row - 1][col] + pathCount[row][col - 1];
        }
    }
    return pathCount[m - 1][n - 1]
};

// test
console.log(uniquePaths(3,3));