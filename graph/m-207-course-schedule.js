/**
 * 【题目】
 * 现在你总共有 n 门课需要选，记为 0 到 n-1。
在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: [0,1]
给定课程总量以及它们的先决条件，判断是否可能完成所有课程的学习？

示例 1:
输入: 2, [[1,0]] 
输出: true
解释: 总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。所以这是可能的。
示例 2:
输入: 2, [[1,0],[0,1]]
输出: false
解释: 总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0；并且学习课程 0 之前，你还应先完成课程 1。这是不可能的。
 */

/**
 * 【解析】
 * 首先这是一个图，我们以【先修课程 --> 后修课程】的顺序记录图中边缘方向，再通过某种方式判断能否完成
 * 思路一：拓扑排序
 * 一个典型的拓扑排序问题（请看README），任意一组【先修/后修课程】，先修总在后修前面。我们只要看能不能排出来就好，不但能知道能否完成，还能给出完成顺序
 * 思路二：判断环
 * 如果存在环，肯定有循环依赖。
 */

// code
// 思路一：拓扑排序
var canFinish = function(numCourses, prerequisites) {
    // 构建图
    const G = new Array(numCourses).fill(0).map(item => []);
    // 记录各节点入度
    const inDegree = new Array(numCourses).fill(0);
    prerequisites.forEach(([courseId, preCourseId]) => {
        // 注意边的起止点和给的相反
        G[preCourseId].push(courseId);
        inDegree[courseId]++;
    });

    // 拓扑排序操作
    // 队列记录待清除（记为排序）的节点，即入度（依赖课程）为0的节点
    const Q = [];
    inDegree.forEach((degree, id) => {
        if (degree === 0) Q.push(id);
    });

    // 逐个清除入度为0节点
    while (Q.length > 0) {
        const courseToRemove = Q.shift();
        G[courseToRemove].forEach(nextCourseId => {
            // 清除后，后续课程的入度都减一
            inDegree[nextCourseId]--;
            // 如果后续课程入度为0了，也进入队列
            if (inDegree[nextCourseId] === 0) Q.push(nextCourseId);
        });
    }

    // 返回是否还有有度节点
    return inDegree.reduce((sum, item) => sum + item) === 0;
};

// 思路二：判断环
var canFinish = function(numCourses, prerequisites) {
    // 构建图
    const G = new Array(numCourses).fill(0).map(item => []);
    prerequisites.forEach(([courseId, preCourseId]) => {
        G[preCourseId].push(courseId);
    });

    // 深度优先判断环
    // passed：标记已经检查过且无环的节点，避免重复检查
    const passed = {};
    // 递归函数：从当前节点开始遍历，并返回遍历中是否存在环（true）
    const dfsAndJudgeRing = (courseId, visited) => {
        // 如果检查过节点，返回“无环”
        if (passed[courseId]) return false;
        // 如果本轮遍历访问过，有环，返回true
        if (visited[courseId]) return true;
        // 标记当前节点已访问
        visited[courseId] = true;
        // 继续遍历后续节点
        for (let id of G[courseId]) {
            // 如果后面成环了，本轮遍历也就成环了
            if (dfsAndJudgeRing(id, visited)) return true;
        }
        // 标记已检查
        passed[courseId] = true;
        return false;
    };

    for (let i = 0; i < numCourses; i++) {
        // 以每个节点开始的遍历（暂且称为“一轮”遍历）都启用一个新visited，记录当前启动遍历访问过的节点
        const visited = {};
        if (dfsAndJudgeRing(i, visited)) return false;
    }

    return true;
};

// test
console.log(canFinish(2, [[1,0],[0,1]]));
console.log(canFinish(8, [[1,0],[2,6],[1,7],[6,4],[7,0],[0,5]]));