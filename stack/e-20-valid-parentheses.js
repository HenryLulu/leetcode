/**
 * 【题目】
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 有效字符串需满足：左括号必须用相同类型的右括号闭合。左括号必须以正确的顺序闭合。
 * 如：输入: "{[]}"，输出: true
 */

/**
 * 【解析】
 * 栈：左括号入栈、右括号出栈，最终栈空有效
 */

// code
var isValid = function (s) {
    const len = s.length;
    const stack = [];
    for (let i = 0; i < len; i++) {
        let cur = s[i];
        if (cur === '(' || cur === '[' || cur === '{') {
            stack.push(cur);
        } else {
            let out = stack.pop();
            if (
                out === '(' && cur === ')' ||
                out === '{' && cur === '}' ||
                out === '[' && cur === ']'
               ) {
                continue;
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;
};

// test
console.log(isValid('()[]{}'));