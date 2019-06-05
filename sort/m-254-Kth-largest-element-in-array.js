/**
 * 【题目】
 * 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * [3,2,1,5,6,4] 和 k = 2,输出: 5
 */

/**
 * 【解析】
 * 按正常思路，我们能实现一次排序，然后找到索引k的元素，但其实不必全排出来
 * 快排：局部排序：从大到小，快排一轮后，
 * 如果k正好等于划分元素，划分元素就是第k大
 * 如果k在划分左侧，下一轮只需要排左侧
 * 如果k在划分右侧，更新k，下一轮只要排右侧
 */

// code
var findKthLargest = function (nums, k) {
    let currentK = k;
    let leftIndex = 0;
    let rightIndex = nums.length - 1;
    // 注意这里的结束值，如果只剩一个元素还是要进去下，取出划分元素
    while (leftIndex <= rightIndex) {
        let targetIndex = leftIndex;
        // 一轮快排
        for (let i = targetIndex + 1; i <= rightIndex; i++) {
            const cur = nums[i];
            if (cur >= nums[targetIndex]) {
                nums.splice(i, 1);
                nums.splice(leftIndex, 0, cur);
                targetIndex++;
            }
        }
        const leftLength = targetIndex - leftIndex;
        if (leftLength === currentK - 1) {
            // 如果k正好等于划分元素，划分元素就是第k大
            return nums[targetIndex];
        } else if (leftLength < currentK - 1) {
            // 如果k在划分右侧，更新k，下一轮只要排右侧
            leftIndex = targetIndex + 1;
            currentK = currentK - 1 - leftLength;
        } else if (leftLength > currentK - 1) {
            // 如果k在划分左侧，下一轮只需要排左侧
            rightIndex = targetIndex - 1;
        }
    }
};

// test
console.log(findKthLargest([1], 1));