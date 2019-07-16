/**
 * 【题目】
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：
给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个节点后，链表变为 1->2->3->5.
 */

/**
 * 【解析】
 * 比如 12345，2
 * 双指针：让快指针先走2步（到3），快慢再一起走，这样当快指针走到头（5后面），慢指针指到的就是待删除节点（4）
 * 可以用一个last跟随慢指针标记上一个节点（3），虽然浪费个变量，但思路清晰很多
 * 极端情况：如果快指针先走就走到头了，即要删除的是 head，则需要判断下
 */

// code
var removeNthFromEnd = function(head, n) {
    let quick = head, slow = head, last = null;
    // 快指针先走
    while (n > 0) {
        quick = quick.next;
        n--;
    }
    // 快慢一起走，直到快到头
    while (quick) {
        quick = quick.next;
        last = slow;
        slow = slow.next;
    }
    // 极端情况：要删的就是 head
    if (!last) return head.next;
    // 普通情况：把 last next 改成 待删除节点 next
    last.next = slow.next;
    return head;
};

// test
const deserialize = require('./tool/serialize').deserialize;
console.log(removeNthFromEnd(deserialize([1,2]), 2));