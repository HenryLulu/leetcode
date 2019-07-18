# 回溯算法
## 回溯算法的使用场景和思路
其实就是一种暴力搜索算法。

### 使用场景
某些问题，本质上是个排列组合问题，需要列出全部或符合条件的部分组合方式。
比如：
* 22: 从n对括号生成有效字符串
* 17: 数字按键可能打出的字母串
* 46: 集合的所有排列
* 78: 集合的所有子集

### 一棵树
对于这种问题，通常采用的策略是，每次前进一步，列出这一步所有可能的选择，再对每个选择执行下一步。    
直到获得想要的结果，比如走完所有数字按键、消耗掉所有集合元素。  
这看起来就像是一个不断分叉的树结构，我们要到达每个叶子节点（终点）。    

### 回溯算法的实现
回溯算法就是基于前几步获得的可能的部分结果，继续进行下一步选择。    
直到叶子节点，给出当前部分结果（就是全部结果）。    
在前进的过程中或者获得全部结果的那一刻，也可以加入逻辑判断。决定这条分支是否已经失效，不需要进行下去了；或者这个结果不符合要求。 

### 回溯算法的关键点
* 起点是什么，比如一个空字符串
* 终点是什么，比如字符串够长了
* 回溯的每一步要做什么？这一步考虑进来的有哪些可能性；排除掉哪些分支

## 程序模版
### 一个结果池
用来存放符合条件的叶子节点路径
```
const res = [];
```
### 一个回溯计算函数
这是回溯算法的核心，表示每一步的操作
```
// 通常需要接收两个输入：1、这一步前已经生成的部分结果，1、这一步可以供选择的资源表示。在此基础上，也可以加入其他标记
const backTrack = (hasGeneratedPart, restUsable) => {
    // 回溯终点：何时生成结果？
    if (...) {
        res.push(hasGeneratedPart);
        return;
    }
    // 下一步分支：通常通过剩余资源状态，for 遍历所有下一步可能性，并递归进入下一步
    for (...) {
        backTrack(...);
    }
};
```
### 起点
从树的根节点出发
```
// 通常从 空的部分结果 和 全部可用资源 出发
backTrack([], nums);
```