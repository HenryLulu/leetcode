/**
 * 【题目】
 * 链表排序：在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。
 * 输入: -1->5->3->4->0, 输出: -1->0->3->4->5
 */

/**
 * 【解析】快慢指针、归并排序
 * 整体用归并排序，递归merge
 * merge中针对链表，用快慢指针获取链表中点，关于快慢指针：https://blog.csdn.net/qq_21815981/article/details/79833976
 * O(n log n)就是归并排序实现的复杂度
 * 由于链表可以通过改变next指针调整结构，归并不需要像数组那样额外开辟空间存储，空间复杂度为常数级
 */

// code
var sortList = function(head) {
    return head ? mergeSort(head) : head;
};

const mergeSort = head => {
    // 如果只剩一个元素，递归结束
    if (!head.next) {
        return head;
    }
    // 快慢指针找到中点，拆分链表
    let p = head, q = head, pre = null;
    while (q && q.next) {
        pre = p;
        q = q.next.next;
        p = p.next;
    }
    pre.next = null;

    // 递归排序左右链表
    const leftHead = mergeSort(head);
    const rightHead = mergeSort(p);

    // 合并链表
    const mergedHead = {};
    let curMerged = mergedHead;
    let curLeft = leftHead;
    let curRight = rightHead;
    while (curLeft && curRight) {
        if (curLeft.val < curRight.val) {
            curMerged.next = curLeft;
            curLeft = curLeft.next;
        } else {
            curMerged.next = curRight;
            curRight = curRight.next;
        }
        curMerged = curMerged.next;
    }
    curLeft && (curMerged.next = curLeft);
    curRight && (curMerged.next = curRight);
    return mergedHead.next;
}
// test
const list = {
    val: 4,
    next: {
        val: 2,
        next: {
            val: 1,
            next: {
                val: 3
            }
        }
    }
}
console.log(JSON.stringify(sortList(list)));