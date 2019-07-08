/**
 * 【题目】
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
说明:
s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。

---
示例 1:
输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
---
示例 2:
输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
---
示例 3:
输入:
s = "ab"
p = ".*"
输出: true
解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
---
示例 4:
输入:
s = "aab"
p = "c*a*b"
输出: true
解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
---
示例 5:
输入:
s = "mississippi"
p = "mis*is*p*."
输出: false
 */

/**
 * 【解析】
 * 状态转移：
 *  s的前m位、p的前n位 是否匹配 M[m][n] = 
 *      分情况讨论：
 *      1、M[m-1][n-1] === true，且 p[n] === .||s[m]，如：s = abcd，p = abcd || abc.
 *      2、M[m-1][n] === true，且 p[n] 是 *，且 p[n-1] === .||s[m]，如：s = aa，p = a* || .*
 *      3、M[m][n-2] === true，且 p[n] 是 *，如 s = a, p = ac*
 *      上述情况满足一个即为 true
 * 边界：M[0][0] = true;
 */

// code
var isMatch = function(s, p) {
    const sLen = s.length;
    const pLen = p.length;
    const M = new Array(sLen + 1).fill('').map(() => []);
    for (let m = 0; m <= sLen; m++) {
        for (let n = 0; n <= pLen; n++) {
            if (
                ( // 边界
                    m === 0 &&
                    n === 0
                ) ||
                ( // 情况1
                    M[m-1] && M[m-1][n-1] &&
                    (p[n-1] === '.' || p[n-1] === s[m-1])
                ) ||
                ( // 情况2
                    M[m-1] && M[m-1][n] &&
                    p[n-1] === '*' &&
                    (p[n-2] === '.' || p[n-2] === s[m-1])
                ) ||
                ( // 情况3
                    M[m][n-2] &&
                    p[n-1] === '*'
                )
            ) {
                M[m][n] = true;
            } else {
                M[m][n] = false;
            }
        }
    }
    return M[sLen][pLen];
};

// test
console.log(isMatch('ab', '.*'));