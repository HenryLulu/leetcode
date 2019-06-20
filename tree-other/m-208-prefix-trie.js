/**
 * 【题目】
 * 实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。

示例:

Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // 返回 true
trie.search("app");     // 返回 false
trie.startsWith("app"); // 返回 true
trie.insert("app");   
trie.search("app");     // 返回 true
说明:

你可以假设所有的输入都是由小写字母 a-z 构成的。
保证所有输入均为非空字符串。
 */

/**
 * 【解析】
 * 
 */

// code
var Trie = function() {
    this.root = {};
};

Trie.prototype.insert = function(word) {
    let cur = this.root;
    // 遍历每个字母，构建树
    for (let i = 0; i < word.length; i++) {
        // 如果节点已存在就不用构建了
        if (!cur[word[i]]) {
            cur[word[i]] = {};
        }
        cur = cur[word[i]];
    }
    // 把最后的节点标记为end
    cur.isEnd = true;
};

Trie.prototype.search = function(word) {
    let cur = this.root;
    // 遍历字母，逐个比对
    for (let i = 0; i < word.length; i++) {
        if (cur[word[i]]) {
            cur = cur[word[i]];
        } else {
            // 没匹配到的 false
            return false;
        }
    }
    // 返回end标记
    return !!cur.isEnd;
};

Trie.prototype.startsWith = function(word) {
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
        if (cur[word[i]]) {
            cur = cur[word[i]];
        } else {
            return false;
        }
    }
    return true;
};

// test
var trie = new Trie();
trie.insert('app');
trie.insert('apps');
console.log(trie.search("app"));     // 返回 false
console.log(trie.startsWith("apps")); // 返回 true
