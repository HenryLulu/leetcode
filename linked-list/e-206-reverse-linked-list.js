/**
 * 【题目】
 * 反转一个单链表。
示例:
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL

进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
 */

/**
 * 【解析】
 * 迭代：两个指针同步向后，一个指向上家（新链表下家），一个指向本身，修改next方向
 */

// code
// 迭代
var reverseList = function(head) {
    if (!head) return null;
    let cur = head;
    let pre = null;
    while (cur) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        if (next) {
            cur = next;
        } else {
            return cur;
        }
    }
};
// 递归
var reverseList = function(head) {
    if (!head || !head.next) return head;
    let newHead = head;
    let last = null;
    while (newHead.next) {
        last = newHead;
        newHead = newHead.next;
    }
    last.next = null;
    newHead.next = reverseList(head);
    return newHead;
};
var reverseList = function(head) {
    if (!head || !head.next) return head;
    const reversedHead = reverseList(head.next);
    let tail = reversedHead;
    while (tail.next) {
        tail = tail.next;
    }
    tail.next = head;
    head.next = null;
    return reversedHead;
};

// test
const deserialize = require('./tool/serialize').deserialize;
console.log(reverseList(deserialize([1,2,3,4,5])));