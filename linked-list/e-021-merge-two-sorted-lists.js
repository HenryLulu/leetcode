/**
 * 【题目】
 * 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
示例：
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
 */

/**
 * 【解析】
 * 迭代：两个指针向后走，选出小的来，直到至少一个list空
 */

// code
var mergeTwoLists = function(cur1, cur2) {
    const start = {
        next: null
    };
    let cur = start;
    while (cur1 && cur2) {
        if (cur1.val < cur2.val) {
            cur.next = cur1;
            cur1 = cur1.next;
        } else {
            cur.next = cur2;
            cur2 = cur2.next;
        }
        cur = cur.next;
        cur.next = null;
    }
    if (cur1) cur.next = cur1;
    if (cur2) cur.next = cur2;
    return start.next;
};

// test
const deserialize = require('./tool/serialize').deserialize;
console.log(mergeTwoLists(deserialize([1,2,4]), deserialize([1,3,4])));