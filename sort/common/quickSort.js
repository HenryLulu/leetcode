/**
  * @file: quickSort.js
  * @author: why
  * @date: 2019-06-12
*/

/**
 * 快排函数-非递归版本（原地排序，节约空间）
 * @param {Array} target 目标数组
 * @param {Function} rule 比较规则（同js sort函数的参数）
 * @returns {Array}
 */
function nonRecursive (target, rule) {
    const stack = [[0, target.length - 1]];
    while (stack.length > 0) {
        const [leftIndex, rightIndex] = stack.pop();
        let flagIndex = leftIndex;
        for (let i = flagIndex + 1; i <= rightIndex; i++) {
            const cur = target[i];
            if (rule(target[flagIndex], cur)) {
                let j = i;
                while (j > flagIndex) {
                    target[j] = target[j - 1];
                    j--;
                }
                target[flagIndex] = cur;
                flagIndex++;
            }
        }
        if (flagIndex - leftIndex > 1) {
            stack.push([leftIndex, flagIndex - 1]);
        }
        if (rightIndex - flagIndex > 1) {
            stack.push([flagIndex + 1, rightIndex]);
        }
    }
    return target;
}

/**
 * 快排函数-递归版本
 * @param {Array} target 目标数组
 * @param {Function} rule 比较规则（同js sort函数的参数）
 * @returns {Array}
 */
function recursive(target, rule) {
    // 递归终点：剩一个元素
    if (target.length <= 1) {
        return target;
    }
    const left = [], right = [], flag = target[0];
    for (let i = 1; i < target.length; i++) {
        if (rule(flag, target[i])) {
            left.push(target[i]);
        } else {
            right.push(target[i]);
        }
    }
    return recursive(left, rule).concat([flag]).concat(recursive(right, rule));
}

// console.log([5,1,2,6,2,3].sort((a, b) => a > b))
// console.log(nonRecursive([5,1,2,6,2,3], (a, b) => a > b))
// console.log(recursive([5,1,2,6,2,3], (a, b) => a > b))

module.exports = nonRecursive;
// module.exports = recursive;