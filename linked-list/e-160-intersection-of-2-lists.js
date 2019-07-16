/**
 * 【题目】
 * 编写一个程序，找到两个单链表相交的起始节点。（节点必须是同一个，而不是值相同）
 * 如：[4,3,8,4,5] [5,0,1,8,4,5] 相交于 8
 */

/**
 * 【解析】
 * 先把两个链表剪成一样长，再从头同步指针寻找重合点
 */

// code
var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;
    let lenA = 0, lenB = 0, curA = headA, curB = headB;
    // 长度计算
    while (curA) {
        lenA++;
        curA = curA.next;
    }
    while (curB) {
        lenB++;
        curB = curB.next;
    }
    // 剪长链表至长度相等（下面两个while只会执行一个）
    while (lenA > lenB) {
        headA = headA.next;
        lenA--;
    }
    while (lenB > lenA) {
        headB = headB.next;
        lenB--;
    }
    // 向后搜索
    curA = headA;
    curB = headB;
    while (curA) {
        // 遇到同节点，直接返回
        if (curA === curB) {
            return curA.val;
        }
        curA = curA.next;
        curB = curB.next;
    }
    // 搜索完无重合，返回null
    return null;
};
