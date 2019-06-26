/**
 * 【题目】
 * 给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。

示例 1:

输入:
11110
11010
11000
00000

输出: 1

示例 2:
输入:
11000
11000
00100
00011

输出: 3
 */

/**
 * 【解析】
 * 当遇到个没访问过的1，我们从这个1出发，可以通过【图的遍历】获取并标记相连的所有1
 * 记录上一步的执行次数，即新1的个数，即岛屿数量
 */

// code
// 广度遍历版
var numIslands = function(grid) {
    if (grid.length === 0) return 0;
    // 创建访问过标记二维数组
    const visited = new Array(grid.length).fill(0).map(() => []);
    let num = 0;

    const rowCount = grid.length;
    const colCount = grid[0].length;

    // 函数bfs：从一个1出发，遍历并标记所有“土地”
    const bfs = (x, y) => {
        num ++;
        // bfs队列，记录待遍历节点
        const Q = [[x, y]];
        while (Q.length > 0) {
            const [x, y] = Q.shift();
            // 如果出队节点超出范围 or 访问过 or 在水里，跳过
            if (x < 0 || x > rowCount - 1 || y < 0 || y > colCount - 1 || visited[x][y] || grid[x][y] === '0') continue;
            visited[x][y] = true;
            Q.push([x - 1, y]);
            Q.push([x + 1, y]);
            Q.push([x, y - 1]);
            Q.push([x, y + 1]);
        }
    };

    for (let x = 0; x < rowCount; x++) {
        for (let y = 0; y < colCount; y++) {
            if (grid[x][y] == 1 && !visited[x][y]) bfs(x, y);
        }
    }

    return num;
};

// 深度遍历版
var numIslands = function(grid) {
    if (grid.length === 0) return 0;
    // 创建访问过标记二维数组
    const visited = new Array(grid.length).fill(0).map(() => []);
    let num = 0;

    const rowCount = grid.length;
    const colCount = grid[0].length;

    // 函数dfs：从一个1出发，遍历并标记所有“土地”
    const dfs = (x, y) => {
        if (x < 0 || x > rowCount - 1 || y < 0 || y > colCount - 1 || visited[x][y] || grid[x][y] === '0') return;
        visited[x][y] = true;
        dfs(x - 1, y);
        dfs(x + 1, y);
        dfs(x, y - 1);
        dfs(x, y + 1);
    };

    for (let x = 0; x < rowCount; x++) {
        for (let y = 0; y < colCount; y++) {
            if (grid[x][y] == 1 && !visited[x][y]) {
                num++;
                dfs(x, y);
            };
        }
    }

    return num;
};

// test
console.log(numIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]));