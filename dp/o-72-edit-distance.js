/**
 * 【题目】
 * 给定两个单词 word1 和 word2，计算出将 word1 转换成 word2 所使用的最少操作数 。
 * 你可以对一个单词进行如下三种操作：插入一个字符、删除一个字符、替换一个字符
示例
输入: word1 = "horse", word2 = "ros"
输出: 3
解释: 
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
 */

/**
 * 【解析】
 * 从左向右对单词进行调整，每一步都执行三种操作之一，这样我们只要关注【0-当前位】子字符串最后一位的操作就行
 * 状态转移：
 *      从原字符串前 m 位，转换到目标字符串前 n 位，需要的最少步数 = 以下最小
 *          1、在最后插入一个字符（xxx --> xxxa）：1 + 从原字符串前 m 位转换到目标字符串前 n-1 位需要的最少步数
 *          2、删除最后一个字符（xxxa --> xxx）：1 + 从原字符串前 m-1 位转换到目标字符串前 n 位需要的最少步数
 *          3、替换最后一个字符（xxxa --> xxxb）：0（不需要交换）/ 1（需要交换） + 从原字符串前 m-1 位转换到目标字符串前 n-1 位需要的最少步数
 * 边界：
 *      从原字符串前 0/x 位，转换到目标字符串前 0/x 位，需要的最少步数 = x
 */

// code
var minDistance = function(word1, word2) {
    const mLen = word1.length;
    const nLen = word2.length;
    const cache = new Array(mLen + 1).fill('').map(() => []);
    for (let m = 0; m <= mLen; m++) {
        for (let n = 0; n <= nLen; n++) {
            // 三种边界
            if (m === 0 && n === 0) {
                cache[m][n] = 0;
            } else if (m === 0) {
                cache[m][n] = n;
            } else if (n === 0) {
                cache[m][n] = m;
            }
            // 1 - 1以上
            else {
                let MIN;
                if (word1[m - 1] === word2[n - 1]) {
                    MIN = cache[m - 1][n - 1];
                } else {
                    MIN = cache[m - 1][n - 1] + 1;
                }
                MIN = Math.min(
                    MIN,
                    1 + cache[m][n - 1],
                    1 + cache[m - 1][n]
                );
                cache[m][n] = MIN;
            }
        }
    }
    return cache[mLen][nLen];
};

// test
console.log(minDistance('ab', 'aa'));