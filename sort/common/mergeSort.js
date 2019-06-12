/**
  * @file: mergeSort.js
  * @author: why
  * @date: 2019-06-12
*/

/**
 * 归并排序-非递归版本
 * @param {Array} target 目标数组
 * @param {Function} rule 比较规则（同js sort函数的参数）
 * @returns {Array}
 */
function nonRecursive(target, rule) {
    let step = 1;
    const len = target.length;
    while (step < len) {
        for (let i = 0; i < len; i += step * 2) {
            const leftStartIndex = i;
            const leftEndIndex = Math.max(i + step - 1, len - 1);
            const rightStartIndex = Math.max(i + step, len - 1);
            const rightEndIndex = Math.max(i + step * 2 - 1, len - 1);
            const merged = [];
            let leftCurrentIndex = leftStartIndex;
            let rightCurrentIndex = rightStartIndex;
            while (leftEndIndex - leftCurrentIndex > 0 && rightEndIndex - rightCurrentIndex > 0) {
                if (rule(target[rightCurrentIndex], target[leftCurrentIndex])) {
                    merged.push(target[leftCurrentIndex]);
                    leftCurrentIndex++;
                } else {
                    merged.push(target[rightCurrentIndex]);
                    rightCurrentIndex++;
                }
            }
            target.splice(leftStartIndex, rightEndIndex - leftStartIndex, ...merged);
        }
        step *= 2;
    }
    return target;
}

/**
 * 归并排序-递归版本
 * @param {Array} target 目标数组
 * @param {Function} rule 比较规则（同js sort函数的参数）
 * @returns {Array}
 */
function recursive(target, rule) {
    if (target.length < 2) {
        return target;
    }
    const merged = [];
    const targetLength = target.length;
    const midIndex = Math.floor(targetLength / 2);
    const left = recursive(target.slice(0, midIndex), rule);
    const right = recursive(target.slice(midIndex, targetLength), rule);
    while (left.length > 0 && right.length > 0) {
        if (rule(right[0], left[0])) {
            merged.push(left[0]);
            left.shift();
        } else {
            merged.push(right[0]);
            right.shift();
        }
    }
    return merged.concat(left).concat(right);
}

// console.log([5,1,2,6,2,3].sort((a, b) => a > b))
console.log(nonRecursive([5,1,2,6,2,3], (a, b) => a > b))
// console.log(recursive([5,1,2,6,2,3], (a, b) => a > b))