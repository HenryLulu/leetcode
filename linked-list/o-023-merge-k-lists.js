/**
 * 【题目】
 * 合并 k 个排序链表，返回合并后的排序链表。
示例:
输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6
 */

/**
 * 【解析】
 * 方法一：分治归并，俩俩合并
 * 方法二：几个一起比，每替换进来一个，小顶堆获得当前最小头
 */

// code
// 分治
var mergeKLists = function(lists) {
    if (lists.length === 0) return null;
    if (lists.length === 1) return lists[0];
    const mid = Math.floor(lists.length / 2);
    const l1 = mergeKLists(lists.slice(0, mid));
    const l2 = mergeKLists(lists.slice(mid));
    const newHead = {};
    let c1 = l1, c2 = l2, cMerge = newHead;
    while (c1 && c2) {
        if (c1.val < c2.val) {
            cMerge.next = c1;
            c1 = c1.next;
        } else {
            cMerge.next = c2;
            c2 = c2.next;
        }
        cMerge = cMerge.next;
    }
    if (c1) cMerge.next = c1;
    if (c2) cMerge.next = c2;
    return newHead.next || null;
};

// 小顶堆
var mergeKLists = function(lists) {
    const minHeap = lists.filter(head => !!head);
    if (minHeap.length === 0) return null;
    // 堆调整函数：把某个节点的大值下沉至合理位置
    const minHeapify = targetNodeIndex => {
        while (true) {
            const currentNodeIndex = targetNodeIndex;
            const leftChildIndex = currentNodeIndex * 2 + 1;
            const rightChildIndex = currentNodeIndex * 2 + 2;
            let minIndex = currentNodeIndex;
            if (minHeap[leftChildIndex] && minHeap[leftChildIndex].val < minHeap[minIndex].val) {
                minIndex = leftChildIndex;
            }
            if (minHeap[rightChildIndex] && minHeap[rightChildIndex].val < minHeap[minIndex].val) {
                minIndex = rightChildIndex;
            }
            if (minIndex === currentNodeIndex) {
                break;
            } else {
                [minHeap[minIndex], minHeap[currentNodeIndex]] = [minHeap[currentNodeIndex], minHeap[minIndex]];
                targetNodeIndex = minIndex;
            }
        }
    };
    // 构建小顶堆
    for (let i = Math.floor((minHeap.length - 1) / 2); i >= 0; i--) {
        minHeapify(i);
    }

    // 不断取堆顶拿到最小值
    const newHead = {};
    let cur = newHead;
    while (minHeap.length > 1) {
        cur.next = minHeap[0];
        cur = cur.next;
        if (minHeap[0].next) {
            minHeap[0] = minHeap[0].next;
        } else {
            minHeap[0] = minHeap.pop();
        }
        minHeapify(0);
    }
    cur.next = minHeap[0];

    return newHead.next;
};

// test
const deserialize = require('./tool/serialize').deserialize;
console.log(mergeKLists([
    deserialize([1,4,5]),
    deserialize([1,3,4]),
    deserialize([2,6])
]));