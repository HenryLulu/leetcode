/**
  * @file: heap.js
  * @author: why
  * @date: 2019-06-05
  * https://juejin.im/post/5b3608336fb9a00e765e8ed4
  * https://juejin.im/post/5b3db7a15188251aad20eccf
*/

class Heap {
    constructor (source) {
        this.array = Array.from(source);
        this._build();
    }

    // 获取某个节点的父子节点
    _getParantIndex(index) {return Math.floor((index - 1) / 2)}
    _getLeftChildIndex(index) {return index * 2 + 1}
    _getRightChildIndex(index) {return index * 2 + 2}

    // 节点交换
    _swap(i, j) {
        // const temp = this.array[i];
        // this.array[i] = this.array[j];
        // this.array[j] = temp;
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]]
    }

    // 堆节点调整：把某个节点下沉至合理位置
    minHeapifyNode(index) {
        const size = this.array.length;
        while (true) {
            let minIndex = index;
            const leftIndex = this._getLeftChildIndex(index);
            const rightIndex = this._getRightChildIndex(index);
            if (leftIndex < size && this.array[minIndex] < this.array[leftIndex]) {
                minIndex = leftIndex;
            }
            if (rightIndex < size && this.array[minIndex] < this.array[rightIndex]) {
                minIndex = rightIndex;
            }
            if (minIndex !== index) {
                this._swap(minIndex, index);
                index = minIndex;
            } else {
                break;
            }
        }
    }
    // 小顶堆构建：从第一个有子节点的节点开始，从下至上逐个调整节点位置
    _build() {
        const size = this.array.length;
        for (let i = this._getParantIndex(size - 1); i >= 0; i--) {
            this.minHeapifyNode(i);
        }
    }
}

module.exports = Heap;

const heap = new Heap([4,1,3,2,16,9,10,14,8,7]);
console.log(heap.array)