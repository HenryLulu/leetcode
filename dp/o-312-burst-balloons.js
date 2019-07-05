/**
 * 【题目】
 * 
 */

/**
 * 【解析】
 * 二维
 * 状态转移：m～n区间内气球戳爆的最多硬币 = 
 *      对区间内每个气球（位置为l），求当这个气球最后爆掉情况下的最多硬币值：
 *          m-1气球值 * l气球值 * n+1气球值（最后一戳）
 *          + m～l-1区间内气球戳爆的最多硬币（左侧）
 *          + l+1～n区间内气球戳爆的最多硬币（右侧）
 *      其中的最大值
 * 边界：当m-1/n+1不存在，为1，且不需要依赖状态
 */

// code
var maxCoins = function(nums) {
    const len = nums.length;
    if (len === 0) return 0;
    const maxCoins = new Array(len).fill('').map(() => []);
    for (let m = len - 1; m >= 0; m--) {
        for (let n = m; n < len; n++) {
            // m~n区间（包括m/n）
            let MAX = 0;
            let bl;
            for (let l = m; l <= n; l++) {
                const leftCoin = m === 0 ? 1 : nums[m - 1];
                const rightCoin = n === len - 1 ? 1 : nums[n + 1];
                let sum = leftCoin * rightCoin * nums[l];
                if (l !== m) {
                    sum += maxCoins[m][l - 1];
                }
                if (l !== n) {
                    sum += maxCoins[l + 1][n];
                }
                if (sum > MAX) {
                    MAX = sum;
                    bl = l;
                }
            }
            maxCoins[m][n] = MAX;
        }
    }
    return maxCoins[0][len - 1];
};

// test
console.log(maxCoins([]));