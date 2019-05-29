/**
 * 【题目】
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
求在该柱状图中，能够勾勒出来的矩形的最大面积。
比如：[2,1,5,6,2,3]，最大矩形是5、6构成的 5*2
 */

/**
 * 【解析】
 * 我们需要对每个矩形进行【找边】操作（不一定按顺序）：向左/右找到第一个比自己矮的柱子，围成的就是包含当前柱子，以当前柱子为高度的最大矩形
 * 并在这个遍历过程中更新记录
 * 但是这样需要左右找两次，时间复杂度太高
 *
 * 单调栈：
 * 从左向右遍历柱子，不【找边】
 * 栈中存着当前柱子左侧，递增的柱子
 * 即遍历时，看栈顶，逐个弹出比自己高的，弹出的逐个【找边】，直到栈顶比自己矮，压进去
 * 这时对于栈中的某个柱子来说，栈中前一个柱子就是左侧第一个比自己矮的柱子，而栈外遍历的当前柱子就是我们要的右侧柱子
 */

// code
var largestRectangleArea = function (heights) {
    const stack = [];
    // 这个很关键，因为我们需要 “遍历到的柱子比栈顶小” 来触发栈顶柱子【找边】，最后一个怎么办呢？加入一个 -1 触发他
    heights.push(-1);
    const len = heights.length;
    let largestArea = 0;
    for (let i = 0; i < len; i++) {
        // 如果栈不空，且栈顶比当前柱子高，弹出栈顶，【找边】并计算面积
        while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
            const pillarToCalLargestIndex = stack.pop();
            // 如果弹出后栈空了，说明此时的栈顶是之前最小的了，这个栈顶柱子向左所有柱子都比它高
            const leftLowPillarIndex = stack.length > 0 ? stack[stack.length - 1] : -1;
            const rightLowPillarIndex = i;
            const distance = rightLowPillarIndex - leftLowPillarIndex - 1;
            const largestAreaBasedOnCurrentPillar = heights[pillarToCalLargestIndex] * distance;
            if (largestAreaBasedOnCurrentPillar > largestArea) {
                largestArea = largestAreaBasedOnCurrentPillar;
            }
        }
        stack.push(i);
    }
    return largestArea;
};

// test
console.log(largestRectangleArea([2,1,5,6,2,3]));