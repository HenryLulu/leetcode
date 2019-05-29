/**
 * 【题目】
 * 给定一个经过编码的字符串，返回它解码后的字符串。
编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
s = "3[a]2[bc]", 返回 "aaabcbc".
s = "3[a2[c]]", 返回 "accaccacc".
s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef".
 */

/**
 * 【解析】
 * 栈：栈中存三种东西，重复数字、[、字母
 * 当扫到]，向前找到[，应用重复规则，把栈顶当前规则中的编码字符串替换为解码字符串：3[as --> asasas
 */

// code
var decodeString = function (s) {
    const stack = [];
    // 因为数有可能不止一位，所以用正则代替for，这样字母也可以一下处理多个了
    const reg = /\d+|\[|\]|[^\d\[\]]+/g;
    let match;
    while (match = reg.exec(s)) {
        const currentStackContent = match[0];
        if (+currentStackContent) {
            stack.push(+currentStackContent);
        } else if (currentStackContent !== ']') {
            stack.push(currentStackContent);
        } else if (currentStackContent === ']') {
            let fullString = '';
            let currentPartialString;
            while (currentPartialString = stack.pop()) {
                if (currentPartialString !== '[') {
                    fullString = currentPartialString + fullString;
                } else if (currentPartialString === '[') {
                    let repeatTimes = stack.pop();
                    while (repeatTimes--) {
                        stack.push(fullString);
                    }
                    break;
                }
            }
        }
    }
    return stack.join('');
};

// test
console.log(decodeString('2[ab10[c]]3[cd]ef'));