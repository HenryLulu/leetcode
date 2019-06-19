/**
 * 【题目】
 * 根据一棵树的前序遍历与中序遍历构造二叉树。

例如，给出

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7

 */

/**
 * 【解析】
 * 前序遍历提供了根节点出现顺序
 * 中序遍历提供了左右子树的划分
 */

// code
var buildTree = function(preorder, inorder) {

    const build = inorder => {
        if (inorder.length === 0) return null;
        const node = {};
        node.val = preorder.shift();
        const index = inorder.indexOf(node.val);
        node.left = build(inorder.slice(0, index));
        node.right = build(inorder.slice(index + 1));
        return node;
    };

    return build(inorder);
};

// test
console.log(JSON.stringify(buildTree([3,9,20,15,7], [9,3,15,20,7])))