/**
 * 【题目】
 * 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被计为是不同的子串。

示例 1:
输入: "abc"
输出: 3
解释: 三个回文子串: "a", "b", "c".

示例 2:
输入: "aaa"
输出: 6
说明: 6个回文子串: "a", "a", "a", "aa", "aa", "aaa".
 */

/**
 * 【解析】
 * 状态转移：对于[left, right)坐标间的子串，当[left+1, right-1)回文且left、right相同，[left, right)回文
 * 边界：left和right相等时回文（空子串）；left + 1 = right时回文（单个字母）
 */

// code
var countSubstrings = function(s) {
    let count = 0;
    const len = s.length;
    const isPalindrome = new Array(len + 1).fill('').map(() => []);
    // 注意这里的遍历方式，因为小left依赖大left，left从大到小遍历；大right依赖小right，从小到大遍历。
    for (let left = len; left >= 0; left--) {
        for (let right = left; right <= len; right++) {
            if (right === left) {
                isPalindrome[left][right] = true;
            } else if (right - left === 1) {
                isPalindrome[left][right] = true;
                count++;
            } else {
                test = isPalindrome[left + 1][right - 1] && s[left] === s[right - 1];
                isPalindrome[left][right] = test;
                if (test) {
                    count++;
                }
            }
        }
    }
    return count;
};

// test
console.log(countSubstrings('aaa'));