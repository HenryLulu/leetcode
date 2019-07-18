/**
 * 【题目】
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

示例:
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 */

/**
 * 【解析】
 * 终止和取值的条件：剩余数字为0
 * 回溯操作：
 *      对剩余数字的第一位，对应的每个字母：
 *          加入到字符串中
 */

// code
var letterCombinations = function(digits) {
    if (digits.length === 0) return [];
    const MAP = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'};
    const res = [];
    const backTrack = (hasGeneratedString, restDigits) => {
        if (restDigits.length === 0) {
            res.push(hasGeneratedString);
            return;
        }
        const letters = MAP[restDigits[0]];
        for (let i = 0; i < letters.length; i++) {
            backTrack(
                hasGeneratedString + letters[i],
                restDigits.slice(1)
            );
        }
    };
    backTrack('', digits);
    return res;
};

// test
console.log(letterCombinations('23'));