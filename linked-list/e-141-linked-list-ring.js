/**
 * 【题目】
 * 给定一个链表，判断链表中是否有环。
 */

/**
 * 【解析】
 * 快慢指针：从头开始，一个每次进一步，一个每次进两步，如果有环，总能再次重合
 */

// code
var hasCycle = function(head) {
    if (!(head && head.next && head.next.next)) return false;
    let slow = head.next, quick = head.next.next;
    while (quick) {
        if (quick === slow) return true;
        quick = quick.next && quick.next.next;
        slow = slow.next;
    }
    return false;
};

// test
console.log(fn(arg));