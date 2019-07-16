/**
  * @file: serialize.js
  * @author: why
  * @date: 2019-07-08
*/

const deserialize = arr => {
    if (arr.length === 0) return null;
    const head = {
        val: arr[0],
        next: null
    };
    let cur = head;
    for (let i = 1; i < arr.length; i++) {
        const next = {
            val: arr[i],
            next: null
        };
        cur.next = next;
        cur = next;
    }
    return head;
};

exports.deserialize = deserialize;