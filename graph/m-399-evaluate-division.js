/**
 * 【题目】
 * 给出方程式 A / B = k, 其中 A 和 B 均为代表字符串的变量， k 是一个浮点型数字。根据已知方程式求解问题，并返回计算结果。如果结果不存在，则返回 -1.0。

示例 :
给定 a / b = 2.0, b / c = 3.0
问题: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ? 
返回 [6.0, 0.5, -1.0, 1.0, -1.0 ]

基于上述例子，输入如下：
equations(方程式) = [ ["a", "b"], ["b", "c"] ],
values(方程式结果) = [2.0, 3.0],
queries(问题方程式) = [ ["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"] ]. 
输入总是有效的。你可以假设除法运算中不会出现除数为0的情况，且不存在任何矛盾的结果。
 */

/**
 * 【解析】
 * 两步
 * 1、构建树
 * 2、
 * 遍历节点，可以深度优先也可以广度优先，只要在遍历过程中缓存并累积结果就行。
 * 这里遍历的依据是，当前节点到目标节点的结果 = 当前节点到下一个节点距离 * 下个节点到目标节点的结果
 */

// code
// 深度优先
var calcEquation = function(equations, values, queries) {
    // 构建树
    const graph = {};
    for (let i = 0; i < equations.length; i++) {
        const [start, end] = equations[i];
        const s2e = values[i];
        const e2s = 1 / values[i];
        // 双向都要建
        if (!graph[start]) graph[start] = {};
        graph[start][end] = s2e;
        if (!graph[end]) graph[end] = {};
        graph[end][start] = e2s;
    }
    
    // 深度优先遍历（递归）
    const dfs = (start, end, visited) => {
        // 不存在节点时返回 -1
        if (!graph[start]) return -1;

        // 遍历当前起始节点的所有邻接节点
        const ajaOfStart = graph[start];
        for (let next in ajaOfStart) {
            if (next === end) {
                // 到达目标，返回这一步的距离
                return ajaOfStart[next];
            } else if (!visited[next]) {
                // 不是目标且没访问过
                // 标记访问过
                visited[next] = true;
                // 递归计算下个节点到目标节点结果
                const next2end = dfs(next, end, visited);
                if (next2end !== -1) {
                    return next2end * ajaOfStart[next];
                }
            }
        }
        // 不通，返回 -1
        return -1;
    };

    return queries.map(([start, end]) => {
        const visited = {};
        return dfs(start, end, visited);
    });
};

// 广度优先
var calcEquation2 = function(equations, values, queries) {
    // 构建树，同上
    const graph = {};
    for (let i = 0; i < equations.length; i++) {
        const [start, end] = equations[i];
        const s2e = values[i];
        const e2s = 1 / values[i];
        if (!graph[start]) graph[start] = {};
        graph[start][end] = s2e;
        if (!graph[end]) graph[end] = {};
        graph[end][start] = e2s;
    }

    // 广度优先，队列
    const getPath = (start, end) => {
        if (!graph[start] || !graph[end]) return -1;
        const visited = {};
        // 记录当前节点 和 当前节点前已累积到的值
        const Q = [[start, 1]];
        while (Q.length > 0) {
            const [currentNode, currentRes] = Q.shift();
            visited[currentNode] = true;
            const aja = graph[currentNode];
            // 如果邻接的有目标节点，直接返回累积值
            if (aja[end]) return currentRes * aja[end];
            // 遍历邻接节点
            for (let next in aja) {
                // 有中间节点，入队列
                if (graph[next] && !visited[next]) Q.push([next, currentRes * aja[next]]);
            }
        }
        // 不通，返回 -1
        return -1;
    };
    
    return queries.map(([start, end]) => getPath(start, end));
};

// test
console.log(calcEquation([ ["a", "b"], ["b", "c"] ], [2.0, 3.0], [ ["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"] ]));