/**
 * 【题目】
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
 */

/**
 * 【解析】
 * 二维
 * 状态转移：
 *      m ~ n 是回文 = 
 *          长度 > 1：m+1 ~ n-1 是回文 且 m/n相同
 *          长度 <= 1: 是回文
 */

// code
var longestPalindrome = function(s) {
    const len = s.length;

    let MAX = '';
    const isPalindrome = new Array(len + 1).fill('').map(() => []);

    for (let m = len; m >= 0; m--) {
        for (let n = m; n <= len; n++) {
            if (n - m <= 1) {
                isPalindrome[m][n] = true;
                if (n - m > MAX.length) MAX = s.substring(m, n);
            } else {
                if (isPalindrome[m + 1][n - 1] && s[m] === s[n - 1]) {
                    isPalindrome[m][n] = true;
                    if (n - m > MAX.length) MAX = s.substring(m, n);
                } else {
                    isPalindrome[m][n] = false;
                }
            }
        }
    }

    return MAX;
};

// test
console.log(longestPalindrome('bananas'));