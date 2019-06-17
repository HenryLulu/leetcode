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
    const len = target.length;
    // 步长（每组归并目标的长度）
    let step = 2;
    while (step / 2 < len) {
        // 遍历各组
        for (let groupStartIndex = 0; groupStartIndex < len; groupStartIndex += step) {
            // 兼容左半区就到头了的情况
            const midIndex = Math.min(groupStartIndex + step / 2, len);
            // 兼容右半区到头的情况
            const nextGroupStartIndex = Math.min(groupStartIndex + step, len);
            // 组内分区: [组1(本轮处理区域) groupStartIndex ... | midIndex ... ] [组2 nextGroupStartIndex ... ] [组3]
            let merged = [], leftCurrentIndex = groupStartIndex, rightCurrentIndex = midIndex;
            while (leftCurrentIndex < midIndex && rightCurrentIndex < nextGroupStartIndex) {
                if (rule(target[rightCurrentIndex], target[leftCurrentIndex])) {
                    merged.push(target[leftCurrentIndex]);
                    leftCurrentIndex++;
                } else {
                    merged.push(target[rightCurrentIndex]);
                    rightCurrentIndex++;
                }
            }
            if (leftCurrentIndex < midIndex) {
                merged = merged.concat(target.slice(leftCurrentIndex, midIndex));
            }
            if (rightCurrentIndex < nextGroupStartIndex) {
                merged = merged.concat(target.slice(rightCurrentIndex, nextGroupStartIndex));
            }
            // 用merged替换当前组
            target.splice(groupStartIndex, step, ...merged);
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
    // 递归终点：剩一个元素
    if (target.length < 2) {
        return target;
    }
    const merged = [];
    const targetLength = target.length;
    const midIndex = Math.floor(targetLength / 2);
    // 每轮递归就是对左右两轮递归结果的合并（先递归后操作）
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