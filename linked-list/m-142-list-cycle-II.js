/**
 * 【题目】
 * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 */

/**
 * 【解析】
 * 快慢指针
 * 假设：
 *      从头到入环点距离 a
 *      从入环点到相遇点距离 b
 *      从相遇点再到入环点距离 c
 * 那么：
 *      快指针走了 a + b + c + b
 *      慢指针走了 a + b
 *      即 a + b + c + b = 2(a + b)
 *      a = c
 * 这样，从 头 和 相遇点 同时出发，相交点就是入环点
 */

// code
var detectCycle = function(head) {
    if (!head || !head.next) return null;
    // 快慢指针
    let slow = head.next, quick = head.next.next;
    while (quick) {
        if (slow === quick) {
            // 相遇，break
            break;
        } else if (quick.next && quick.next.next) {
            // 没相遇，下一步
            slow = slow.next;
            quick = quick.next.next;
        } else {
            // 到头，无环
            return null;
        }
    }

    // 只有相遇了才会走到这
    // 双指针，分别从 头 和 相遇点 出发
    let fromHead = head, fromMeet = quick;
    while (fromHead && fromMeet) {
        if (fromHead === fromMeet) {
            // 走到相遇点，即入环处
            return fromHead;
        } else {
            fromHead = fromHead.next;
            fromMeet = fromMeet.next;
        }
    }
    // 理论上走不到这
    return null;
};

// test
const head = {
    val: 1,
    next: {
        val: 2
    }
}
// head.next.next = head;
console.log(detectCycle(head));