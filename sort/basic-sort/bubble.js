/**
 * 【题目】
 * 冒泡排序及优化
 */

/**
 * 【解析】
 * 基础:
 * 从左侧开始，每轮冒泡出一个最值到右侧：53241 --> 3241|5 --> 231|45 --> 21|345 --> 1|2345
 */

// code
// 基础
const sort = arr => {
    const len = arr.length;
    let times = 0;
    for (let end = len - 1; end > 0; end--) {
        for (let i = 0; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            }
            times++
        }
    }
    console.log(times)
    return arr;
};

// 优化一：如果某一轮排序完全没有交换，说明单调，后面不用排了
const sort1 = arr => {
    const len = arr.length;
    let times = 0;
    for (let end = len - 1; end > 0; end--) {
        let noExchange = true;
        for (let i = 0; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                noExchange = false;
            }
            times++;
        }
        if (noExchange) break;
    }
    console.log(times)
    return arr;
};

// 优化二：如果某一位后面再没交换过，说明这一位后面已经排好了，以后都不用排了，可以直接在这结束
const sort2 = arr => {
    const len = arr.length;
    let times = 0;
    for (let end = len - 1; end > 0; end--) {
        let lastExchanged = end;
        for (let i = 0; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                lastExchanged = i + 1;
            }
            times++
        }
        end = lastExchanged;
    }
    console.log(times)
    return arr;
};

// test
console.log(sort([1,2,5,7,4,3,6,8,9,10]));
console.log(sort1([1,2,5,7,4,3,6,8,9,10]));
console.log(sort2([1,2,5,7,4,3,6,8,9,10]));