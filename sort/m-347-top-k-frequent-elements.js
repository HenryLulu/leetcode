/**
 * 【题目】
 * 
 */

/**
 * 【解析】
 * 堆，分两步：
 * 第一步，出现频率统计
 * 第二步，构建堆，维护一个K大小的堆，表示当前出现次数最多的K个元素，调整至小堆顶。
 * 继续向后搜，如果频率高于堆顶，替换到堆顶，并调整新来元素的位置
 */

// code
var topKFrequent = function(nums, k) {
    // 1 统计出现概率
    const map = {};
    nums.forEach(num => {
        if (map[num]) {
            map[num] ++;
        } else {
            map[num] = 1;
        }
    });

    // 2 构建大小为K的最小堆，并更新
    const heap = Object.keys(map).slice(0, k);
    const nodesToAdd = Object.keys(map).slice(k);
    // 方法：调整单个节点位置
    const heapifyNode = index => {
        const size = heap.length;
        while (true) {
            let minIndex = index;
            const leftChildIndex = index * 2 + 1;
            const rightChildIndex = index * 2 + 2;
            leftChildIndex < size && map[heap[leftChildIndex]] < map[heap[minIndex]] && (minIndex = leftChildIndex);
            rightChildIndex < size && map[heap[rightChildIndex]] < map[heap[minIndex]] && (minIndex = rightChildIndex);
            if (minIndex === index) {
                break;
            } else {
                [heap[minIndex], heap[index]] = [heap[index], heap[minIndex]];
                index = minIndex;
            }
        }
    };
    // 构建初始堆
    for (let i = Math.floor((heap.length - 1) / 2); i >= 0; i--) {
        heapifyNode(i);
    }
    // 逐个换入新元素
    nodesToAdd.forEach(num => {
        if (map[num] > map[heap[0]]) {
            heap[0] = num;
            heapifyNode(0);
        }
    });
    return heap;
};

// test
console.log(topKFrequent([6,0,1,4,9,7,-3,1,-4,-8,4,-7,-3,3,2,-3,9,5,-4,0], 6));