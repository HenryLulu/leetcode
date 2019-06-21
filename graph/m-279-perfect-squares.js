/**
 * 【题目】
 * 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
 */

/**
 * 【解析】
 * 两种解法：动态规划、图BFS，这里只实现图，动态规划解法参考dp目录下同名js
 * 从n到0，每个数都是一个节点，当其中某两个数相差一个平方数，则节点间连通
 * 求完全平方数的个数最少的情况就是求从n到0的最短路径，即广度优先搜索（BFS）
 */

// code
var numSquares = function(n) {
    const queue = [[n, 0]];
    // 重要：记录已遍历过节点，先遍历过的肯定是最优解
    const visited = {};
    while (queue.length > 0) {
        // 取出待遍历节点及其步数
        const [currentNumber, currentStep] = queue.shift();
        // 逐个减去平方数
        for (let i = 1; ; i++) {
            // 获得邻接节点
            const adjacentNumber = currentNumber - i * i;
            // 如果小于0，过了，跳出循环
            if (adjacentNumber < 0) break;
            // 如果正好是0，就是最先到达的路径了，返回结果
            if (adjacentNumber === 0) return currentStep + 1;
            // 如果大于0且没遍历过，入队，继续等待遍历
            if (!visited[adjacentNumber]) {
                queue.push([adjacentNumber, currentStep + 1]);
                visited[adjacentNumber] = true;
            }
        }
    }
};

// test
console.log(numSquares(12));