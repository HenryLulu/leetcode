/**
 * 【题目】
 * 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。

示例 1:
输入: "(()"
输出: 2
解释: 最长有效括号子串为 "()"

示例 2:
输入: ")()())"
输出: 4
解释: 最长有效括号子串为 "()()"

 */

/**
 * 【解析】
 * 状态转移：(((((())
 *  【以第 n 位为结尾的最长有效子串长度】L[n] = 
 *      如果这位是个（，肯定为【0】；
 *      如果是个），在 n-1 位，可能遇到一个有效子串的结尾：L[n-1] > 0；或者一个 L[n-1] = 0。把它看成一个封闭的整体。
 *          1、如果整体前面，即 n-1-L[n-1] 不是个（，就无法与 n 位结合，n位就是【0】
 *          2、如果整体前面是个（，才组成有效括号子串，这个子串的长度：
 *              首先，至少包含了前一位长度，加上新增两位，为 1 + L[n-1] + 1，完了吗？没完！
 *              其次存在这种情况，即新增的（ 的左侧，如果还是个有效括号子串，那就会和后面连成更长的子串
 *              最终长度为【 1 + L[n-1] + 1 + L[n-L[n-1]-1-1] 】
 * 边界：L[0] = 0
 */

// code
var longestValidParentheses = function(s) {
    if (s.length === 0) return 0;
    const L = [0];
    let MAX = 0;
    for (let n = 1; n < s.length; n++) {
        if (s[n] === '(' || s[n-1-L[n-1]] !== '(') {
            L[n] = 0;
        } else {
            let len = 1 + L[n-1] + 1;
            if (s[n - len]) {
                len += L[n - len];
            }
            L[n] = len;
        }
        if (L[n] > MAX) MAX = L[n];
    }
    return MAX;
};

// test
console.log(longestValidParentheses(')()())'));