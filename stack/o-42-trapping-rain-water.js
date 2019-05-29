/**
 * 【题目】
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * 数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水
 * https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png
 */

/**
 * 【解析】
 * 被水填充后，整个柱状图其实变成了几个连续柱子等高的“台阶”，台阶的高度取决于台阶边缘柱子的高度
 * 栈：遍历数组时维护一个栈，栈中保存的是被水填成的“台阶”的最右柱子
 * 如果遍历到一个比前面台阶矮的柱子，入栈，成为下一级更矮的台阶
 * 如果遍历到一个比前面台阶高的柱子，就把前面台阶填高，入栈，成为填高后台阶的最右柱子；如果还矮，再填一级。直至前面没有可填的了（遇到高台阶或者到头）
 */

// code
var trap = function (height) {
    const stack = [];
    let res = 0;
    for (let i = 0; i < height.length; i++) {
        // 每遍历到一个柱子，都向前比较，看是否比前面台阶高
        // 这里是一个while不是if，因为前面可能不只一个台阶比当前柱子矮
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            // 前面台阶比当前矮，弹出来台阶
            const lowPillarIndex = stack.pop();
            // 如果矮台阶前面没有台阶了，水存不上，不用填了
            if (stack.length === 0) {
                break;
            }
            const prePillarIndex = stack[stack.length - 1];
            const distance = i - prePillarIndex - 1;
            // 填充高度
            const boundedHeight = Math.min(height[i], height[prePillarIndex]) - height[lowPillarIndex];
            res += distance * boundedHeight;
            // 当前矮台阶填充完毕，已经长到水平线高度了
        }
        // 最终一定会：弹出至一个比当前柱子高的台阶（或者到栈底），此时把当前柱子入栈
        stack.push(i);
    }
    return res;
};

// test
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));