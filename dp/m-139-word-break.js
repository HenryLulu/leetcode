/**
 * 【题目】
 * 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
 * 说明：拆分时可以重复使用字典中的单词。你可以假设字典中没有重复的单词。
示例 1：
输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。

示例 2：
输入: s = "applepenapple", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
     注意你可以重复使用字典中的单词。

示例 3：
输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
 */

/**
 * 【解析】
 * 状态转移：前n位能被拆分 = m～n位是字典里一个词 且 前m位能被拆分
 * 边界：前0位能被拆分
 */

// code
var wordBreak = function(s, wordDict) {
    const ifCanBeBroken = [true];
    for (let n = 1; n <= s.length; n++) {
        ifCanBeBroken[n] = false;
        for (let m = n - 1; m >= 0; m--) {
            if (wordDict.indexOf(s.slice(m, n)) > -1 && ifCanBeBroken[m]) {
                ifCanBeBroken[n] = true;
                break;
            }
        }
    }
    return ifCanBeBroken[s.length];
};

// test
console.log(wordBreak('applepenapple', ["apple", "pen"]));
console.log(wordBreak('catsandog', ["cats", "dog", "sand", "and", "cat"]));