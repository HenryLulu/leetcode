# 动态规划
## 思路
### 子问题
> 将问题分解为若干个重叠的单阶段子问题，通过各个单阶段间的关系，逐个求解并保存子问题结果，最终获得原问题结果。
### 三要素
用DP解题，先确定以下关键信息
* 阶段
* 阶段状态
* 状态转移方程：这是个找规律的活，如何通过前面的阶段结果递推出当前阶段结果
另外，我们还需要确定边界，即“不依赖其他阶段就有结果的阶段”，以确定递推的终点。      
#### 例子
比如最简单的台阶问题（在一步迈1-2个台阶的情况下，走n级台阶有多少种走法）：
* 状态转移方程：f(n)表示上n级台阶的走法，fn(n) = fn(n-1) + fn(n-2)
* 边界：fn(0) = 1; fn(1) = 1

## 实现
我们可以从两个角度实现状态转移方程，并存储阶段状态。还以台阶问题为例。
### 自定向下
* 从【总走法 = 上最后一阶走法 = 上倒数第一节走法 + 上倒数第二节走法】出发
* 递归向前计算，直到计算到 0、1
* 期间把计算到的结果存储起来
### 自底向上
* 从【第二步走法 = 第一步走法 + 第零步走法】出发，这里需要注意依赖顺序，被依赖的要先算出来
* 循环向后计算，直到最后一节
* 期间把计算到的结果存储起来