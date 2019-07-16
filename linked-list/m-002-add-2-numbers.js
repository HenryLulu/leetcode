/**
 * 【题目】
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
 */

/**
 * 【解析】
 * 这个中等？加法进位而已
 */

// code
var addTwoNumbers = function(l1, l2) {
    // 进位标记
    let carry = 0;
    // 新链表
    const newHead = {};
    let c1 = l1, c2 = l2, cSum = newHead;
    // 如果两个链表当前位有值，或者进位标记有1，则需要算下一位和
    while (c1 || c2 || carry) {
        // 取链表值或者0
        const v1 = c1 && c1.val || 0;
        const v2 = c2 && c2.val || 0;
        // 求和
        const sum = v1 + v2 + carry;
        // 生成下一位和，标记进位
        if (sum >= 10) {
            carry = 1;
            cSum.next = {
                val: sum - 10
            };
        } else {
            carry = 0;
            cSum.next = {
                val: sum
            }
        }
        // 下一位
        c1 = c1 && c1.next;
        c2 = c2 && c2.next;
        cSum = cSum.next;
    }
    return newHead.next;
};

// test
const deserialize = require('./tool/serialize').deserialize;
console.log(addTwoNumbers(deserialize([5]), deserialize([5])));