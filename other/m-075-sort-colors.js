/**
 * 【题目】
 * 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
 */

/**
 * 【解析】
 * 遍历，把 0 和左边互换，把 2 和右边互换
 */

// code
var sortColors = function(nums) {
    let p0 = 0, p2 = nums.length - 1, cur = 0;
    while (cur <= p2) {
        switch (nums[cur]) {
            case 0:
                [nums[cur], nums[p0]] = [nums[p0], nums[cur]];
                // 这里cur可以直接下一个了，因为从前面交换过来的已经处理过了
                cur++;
                p0++;
                break;
            case 2:
                [nums[cur], nums[p2]] = [nums[p2], nums[cur]];
                // cur不能自增，因为后面换过来的数没处理过，这里其实是做了 while (cur <= p2) p2后面的活
                p2--;
                break;
            case 1:
                cur++;
        }
    }
    return nums;
};

// test
console.log(sortColors([2,0,2,1,1,0]));
console.log(sortColors([0,2,1,1,0,2]));