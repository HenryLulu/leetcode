/**
 * 【题目】
 * 请判断一个链表是否为回文链表。

示例 1:
输入: 1->2
输出: false

示例 2:
输入: 1->2->2->1
输出: true

示例 2:
输入: 1->2->3->2->1
输出: true

进阶：
你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 */

/**
 * 【解析】
 * 首先想到用栈，但显然不符合空间复杂度。也就是只能用常数级的存储。
 * 指针
 * 通过快慢指针找到链表中点，再从中点出发向两头比较
 * 但链表只能向一个方向，所以慢指针下可以顺手把前半部分反转了方便后面比较
 */

// code
var isPalindrome = function(head) {
    // 空链表或者只有一个元素
    if (!head || !head.next) return true;
    // 快慢指针找到中点并反转左半部分
    let slow = head, quick = head, last = null;
    while (quick.next && quick.next.next) {
        quick = quick.next.next;
        const next = slow.next;
        slow.next = last;
        last = slow;
        slow = next;
    }
    let left = slow, right = slow.next;
    left.next = last;

    // 如果是奇数个（快指针正好到头），left为中点（ 比如 12321 的 3 ），向前退一节
    if (quick !== left && !quick.next) left = left.next;
    // 向两头跑
    while (left && right) {
        // 值不同，false
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }
    // 有一方没到头，false
    if (left || right) return false;
    return true;
};

// test
const deserialize = require('./tool/serialize').deserialize;
console.log(isPalindrome(deserialize([0,0])));