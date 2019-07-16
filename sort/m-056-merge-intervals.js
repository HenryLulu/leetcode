/**
 * 【题目】
 * 给出一个区间的集合，请合并所有重叠的区间。
 * 输入: [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 */

/**
 * 【解析】
 * 排序 + 一次扫描
 */

// code
// var sorter = require('./common/quickSort');

var merge = function(intervals) {
    // 快排
    const stack = [[0, intervals.length - 1]];
    while (stack.length > 0) {
        const [leftIndex, rightIndex] = stack.pop();
        let flagIndex = leftIndex;
        for (let i = flagIndex + 1; i <= rightIndex; i++) {
            const cur = intervals[i];
            if (cur[0] < intervals[flagIndex][0]) {
                let j = i;
                while (j > flagIndex) {
                    intervals[j] = intervals[j - 1];
                    j--;
                }
                intervals[flagIndex] = cur;
                flagIndex++;
            }
        }
        if (flagIndex - leftIndex > 1) {
            stack.push([leftIndex, flagIndex - 1]);
        }
        if (rightIndex - flagIndex > 1) {
            stack.push([flagIndex + 1, rightIndex]);
        }
    }

    // intervals = sorter(intervals, (a, b) => a[0] > b[0]);
    
    // 合并
    for (let i = 0; i < intervals.length; i++) {
        const cur = intervals[i];
        const next = intervals[i + 1];
        if (next && next[0] <= cur[1]) {
            cur[1] = Math.max(next[1], cur[1]);
            intervals.splice(i + 1, 1);
            i--;
        }
    }

    return intervals;
};

// test
console.log(merge([[8,10],[15,18],[1,3],[2,6]]));