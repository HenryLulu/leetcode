/**
 * 【题目】
 * 序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。
请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。
示例: 
你可以将以下二叉树：

    1
   / \
  2   3
     / \
    4   5

序列化为 "[1,2,3,null,null,4,5]"
 */

/**
 * 【解析】
 * 这就是做题时候写的工具功能啊……见 ./tool/convertDataStruct.js
 * 【序列化】树对象转数组
 * 队列实现深度遍历：如果当前节点node存在，数组存入node.val，入队node.left/right；如果不存在，数组存入null
 * 【反序列化】数组转树对象
 * 观察数组规律：0是root，后面每两位一组，都一定是一个已构建节点的左右子节点值
 * 队列存储已构建但未定义左右子节点的节点
 */

// code
var serialize = function(root) {
    if (!root) return [];
    const arr = [];
    // 队列：存储待序列化的节点
    const queue = [root];
    while (queue.length > 0) {
        const curNode = queue.shift();
        // 如果是个null，也要放进结果
        if (curNode === null) arr.push(null);
        if (!curNode) continue;
        arr.push(curNode.val);
        // 左右子树入队
        queue.push(curNode.left);
        queue.push(curNode.right);
    }
    return arr;
};

var deserialize = function(arr) {
    if (arr.length === 0) return null;
    const root = {
        val: arr[0]
    };
    // 队列：存储已构建但未定义左右子树的
    const queue = [root];
    for (let i = 1; i < arr.length; i += 2) {
        const curParent = queue.shift();
        const curLeft = arr[i];
        const curRight = arr[i + 1];
        if (curLeft || curLeft === 0) {
            curParent.left = {
                val: curLeft
            };
            queue.push(curParent.left);
        }
        if (curLeft === null) {
            curParent.left = null;
        }
        if (curRight || curRight === 0) {
            curParent.right = {
                val: curRight
            };
            queue.push(curParent.right);
        }
        if (curRight === null) {
            curParent.right = null;
        }
    }
    return root;
};
// test
