//用于存放排序过程中的节点
function heapDom() {
	// topVal为大顶堆的最大值
	// heapVal每次调整后大顶堆的值
	// this.topVal = 0;
	this.heapVal = [];
	this.changeIndex = 0;
}
sortInit.prototype.swap = function(arr, i, j) {
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}
// 排序实现
sortInit.prototype.heapSort = function(arr) {
	let hDom = new heapDom();
	// 初始化大顶堆，从第一个非叶子结点开始
	for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
		this.adjustHeap(arr, i, arr.length);
	}
	let newArr = JSON.parse(JSON.stringify(arr))
	// hDom.heapVal = newArr;
	// hDom.changeIndex = arr.length;
	// this.sortQueen.push(hDom)
	// 排序，每一次for循环找出一个当前最大值，数组长度减一
	for (let i = Math.floor(arr.length - 1); i > 0; i--) {
		let newArr1 = JSON.parse(JSON.stringify(arr))
		this.swap(arr, 0, i); // 根节点与最后一个节点交换
		this.adjustHeap(arr, 0, i); // 从根节点开始调整，并且最后一个结点已经为当
		let hDom1 = new heapDom();
		hDom1.heapVal = newArr1;
		hDom1.changeIndex = i;
		this.sortQueen.push(hDom1)
		// 前最大值，不需要再参与比较，所以第三个参数
		// 为 i，即比较到最后一个结点前一个即可
	}
	console.log(this.sortQueen,'排序记录数组')
}

sortInit.prototype.adjustHeap = function(arr, i, length) {
	// let arr =  JSON.parse(JSON.stringify(a));
	let temp = arr[i]; // 当前父节点
	// j<length 的目的是对结点 i 以下的结点全部做顺序调整
	for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
		temp = arr[i]; // 将 arr[i] 取出，整个过程相当于找到 arr[i] 应处于的位置
		if (j + 1 < length && arr[j] < arr[j + 1]) {
			j++; // 找到两个孩子中较大的一个，再与父节点比较
		}
		if (temp < arr[j]) {
			this.swap(arr, i, j) // 如果父节点小于子节点:交换；否则跳出
			i = j; // 交换后，temp 的下标变为 j
		} else {
			break;
		}
	}
	// console.log(arr)
}
// 排序演示
sortInit.prototype.heapSortDisplay = function(heapDom, resolveUp, isFirst, k) {
	console.log(heapDom,'当前排序记录')
	$('#progressContainer').css('minHeight', '350px')
	// 首次
	if (isFirst) {
		// let curValue = `<p class="curValue">序列生成大顶堆</p>`
		// $(".analyse_container_left").append(curValue)
		setTimeout(() => {
			$('.heapContainer').remove();
			$('#progressContainer div').remove();
		}, this.duration / 4)
		setTimeout(() => {
			this.adjustHeapDisplay(heapDom.heapVal)
			let curValue = `<p class="curValue">序列调整为大顶堆</p>`
			$(".analyse_container_left").append(curValue)
			this.compareTime++;
			var offset_p = 45 * this.compareTime;
			$(".analyse_container_left").scrollTop(offset_p);
			$('.heapNode').eq(0).css('backgroundColor', 'black')
		}, this.duration / 2)
		setTimeout(() => {
			$('.heapNode').eq(heapDom.changeIndex).css('backgroundColor', 'black')
		}, this.duration)
		setTimeout(() => {
			let topVal = $('.heapNode').eq(0).text()
			let lastVal = $('.heapNode').eq(heapDom.changeIndex).text();
			$('.heapNode').eq(0).text(lastVal)
			$('.heapNode').eq(heapDom.changeIndex).text(topVal)
			let curValue = `<p class="curValue">${topVal}和${lastVal}交换，继续调整</p>`
			$(".analyse_container_left").append(curValue)
			this.compareTime++;
			var offset_p = 45 * this.compareTime;
			$(".analyse_container_left").scrollTop(offset_p);
			resolveUp()
		}, this.duration * 1.25)
	} else {
		new Promise((resolve) => {
			$('.heapContainer').remove();
			$('#progressContainer div').remove();
			this.adjustHeapDisplay(heapDom.heapVal)
			let curValue = `<p class="curValue">继续调整为大顶堆</p>`
			$(".analyse_container_left").append(curValue)
			this.compareTime++;
			var offset_p = 45 * this.compareTime;
			$(".analyse_container_left").scrollTop(offset_p);
			let i = heapDom.changeIndex + 1;
			while (i < this.sortNum) {
				if (i % 2 == 0) $('.heapNode').eq(Math.ceil(i / 2) - 1).removeClass('heapNode_right3')
				if (i % 2 == 0) $('.heapNode').eq(Math.ceil(i / 2) - 1).removeClass('heapNode_right2')
				if (i % 2 == 0) $('.heapNode').eq(Math.ceil(i / 2) - 1).removeClass('heapNode_right1')
				if (i % 2 == 1) $('.heapNode').eq(Math.ceil(i / 2) - 1).removeClass('heapNode_left3')
				if (i % 2 == 1) $('.heapNode').eq(Math.ceil(i / 2) - 1).removeClass('heapNode_left2')
				if (i % 2 == 1) $('.heapNode').eq(Math.ceil(i / 2) - 1).removeClass('heapNode_left1')
				$('.heapNode').eq(i).css('backgroundColor', 'black')
				i++;
			}
			setTimeout(() => {
				$('.heapNode').eq(0).css('backgroundColor', 'black')
			}, this.duration / 4)
			setTimeout(() => {
				$('.heapNode').eq(heapDom.changeIndex).css('backgroundColor', 'black')
				$('.circle').eq(heapDom.changeIndex).addClass('activeCircle')
				let topVal = $('.heapNode').eq(0).text()
				let lastVal = $('.heapNode').eq(heapDom.changeIndex).text();
				$('.heapNode').eq(0).text(lastVal)
				$('.heapNode').eq(heapDom.changeIndex).text(topVal)
				let curValue = `<p class="curValue" style='color:red;'>${topVal}和${lastVal}交换</p>`
				$(".analyse_container_left").append(curValue)
				this.compareTime++;
				var offset_p = 45 * this.compareTime;
				$(".analyse_container_left").scrollTop(offset_p);
				if (k == this.sortNum - 2) resolve()
			}, this.duration / 2)
			setTimeout(() => {
				resolveUp()
			}, this.duration)
		}).then(() => {
			setTimeout(() => {
				$('.heapNode').eq(0).css('backgroundColor', 'black')
			}, this.duration / 4)
			setTimeout(() => {
				$('.heapNode').eq(1).css('backgroundColor', 'black')
			}, this.duration / 2)
			setTimeout(() => {
				let curValue = `<p class="curValue">排序结束</p>`
				$(".analyse_container_left").append(curValue)
				$('.heapNode').eq(0).removeClass('heapNode_left1')
				this.compareTime++;
				var offset_p = 45 * this.compareTime;
				$(".analyse_container_left").scrollTop(offset_p);
			}, this.duration / 4)
			setTimeout(() => {
				let div = $('.heapContainer');
				$('.heapContainer').remove();
				let temp = heapDom.heapVal[0];
				heapDom.heapVal[0] = heapDom.heapVal[1]
				heapDom.heapVal[1] = temp;
				this.displayHeap(heapDom.heapVal)
				$('#progressContainer').append(div)
				// this.adjustHeapDisplay(heapDom.heapVal)
			}, this.duration)
		})

	}
}
sortInit.prototype.heapSortAnalyse = function(curData, inOrder, preData) {

}
// 开始排序
sortInit.prototype.heapSortStart = function() {
	let promiseThenArray = [];
	// 新建异步,执行第一个数值的排序展示
	let p = new Promise((resolve) => {
		setTimeout(() => {
			this.heapSortDisplay(this.sortQueen[0], resolve, true, 0);
		}, this.duration / 8)
	})
	// 异步的第一个then，执行第二个数值的排序展示
	let pThen = promiseThen(p, 1);
	// 依次将每个异步推入数组
	promiseThenArray.push(pThen);
	for (let k = 0; k < this.sortQueen.length - 2; k++) {
		let newP = promiseThen(promiseThenArray[k], k + 2);
		promiseThenArray.push(newP);
	}
	// 执行完所有异步后整体上移
	let lastThen = promiseThenArray[promiseThenArray.length - 1];
	lastThen.then(() => {
		setTimeout(() => {
			$('#progressContainer div').removeClass(" blockInsertMargin blockInsertActive")
		})
	})
	// 异步的then返回新的异步
	var that = this;

	function promiseThen(p, k) {
		return p.then(() => {
			return new Promise((resolve) => {
				setTimeout(() => {
					that.heapSortDisplay(that.sortQueen[k], resolve, false, k);
				}, that.duration / 8)
			})
		})
	}
}
