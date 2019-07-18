/**
 * 【题目】
 * 给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
例如，给出 n = 3，生成结果为：
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
 */

/**
 * 【解析】
 * 每次给字符串加一个（或），直到字符串够长
 * 起始状态：已生成空字符串
 * 终止并取值的条件：已生成字符串长度为 2n
 * 回溯操作：
 *      1、添加左括号，条件：左括号数小于n
 *      2、添加右括号，条件：右括号数小于左括号
 */

// code
var generateParenthesis = function(n) {
    const res = [];
    const backTrack = (hasGeneratedString, countLeft, countRight) => {
        if (hasGeneratedString.length === 2 * n) {
            res.push(hasGeneratedString);
            return;
        }
        if (countLeft < n) {
            backTrack(
                hasGeneratedString + '(',
                countLeft + 1,
                countRight
            );
        }
        if (countRight < countLeft) {
            backTrack(
                hasGeneratedString + ')',
                countLeft,
                countRight + 1
            );
        }
    }
    backTrack('', 0, 0);
    return res;
};

// test
console.log(generateParenthesis(3));