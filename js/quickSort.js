//用于存放每趟排序过程中的节点
function quickDom() {
	// pivot为基准，对象格式为{index:1,value:20}
	// left为对象数组，存放小于当前基准的值
	// right为对象数组，存放大于当前基准的值
	this.pivot = {}
	this.left = []
	this.right = []
}

sortInit.prototype.quickSort = function(arr, low, high) {

}
// 排序演示
sortInit.prototype.quickSortDisplay = function(quickDom, resolveUp, start, end) {
	let that = this;
	let count = 0;
	console.log(quickDom, '当前排序记录')
	console.log(this.sortVal, '当前排序数组')
	let num = quickDom.left.length + quickDom.right.length + 1;
	// 生成新容器
	var div = $("<div class='newprogressContainer'></div>");
	div.insertBefore($('#progressContainer'))
	setTimeout(() => {
		$('#progressContainer div').eq(quickDom.pivot.index).css("backgroundColor", "#000000")
	}, this.duration / 4)
	new Promise((resolve) => {
		setTimeout(() => {
			$('#progressContainer div').eq(quickDom.pivot.index).css("backgroundColor", "#ff0000")
			// 插入基准
			var pivotDiv =
				`<div class='newBlock pivot' style='height:${quickDom.pivot.value}px;'><span>${quickDom.pivot.value}</span></div>`;
			$('.newprogressContainer').append(pivotDiv)
			let left = quickDom.left;
			let right = quickDom.right;
			let arr = JSON.parse(JSON.stringify(this.sortVal));
			arr.splice(quickDom.pivot.index, 1);
			let curPivot = $('.pivot')
			curPivot.css("backgroundColor", "#000000")
			setTimeout(() => {
				for (let i = start, time = 1; i <= end; i++, time++) {
					(function(k, t) {
						setTimeout(function() {
							var c = $('#progressContainer div').eq(k);
							c.css("backgroundColor", "#000000")
							setTimeout(() => {
								var c = $('#progressContainer div').eq(k);
								c.css("backgroundColor", "#ff0000")
								left.forEach((item) => {
									var curD =
										`<div class='newBlock' style='height:${that.sortVal[k]}px;'><span>${that.sortVal[k]}</span></div>`;
									if (item.index == k) {
										$('.newprogressContainer').prepend(curD)
										var curDom = $('.newprogressContainer div').eq(0);
										curDom.insertBefore(curPivot)
										count++;
									}
								})
								right.forEach((item) => {
									if (item.index == k) {
										// console.log(item.index)
										var curD =
											`<div class='newBlock' style='height:${that.sortVal[k]}px;'><span>${that.sortVal[k]}</span></div>`;
										$('.newprogressContainer').prepend(curD)
										var curDom = $('.newprogressContainer div').eq(0);
										curDom.insertAfter(curPivot)
										count++;
									}
								})
								if (count == end - start) resolve()
							}, that.duration / 4)
						}, (that.duration / 2) * t);
					})(i, time)
				}
			}, this.duration / 2)
		}, this.duration / 2)
	}).then(() => {
		setTimeout(() => {
			let doms = $('.newprogressContainer div span');
			let oldDoms = $('#progressContainer div');
			let oldDomSpan = $('#progressContainer div span');
			let newVal = [];
			let newPivotIndex;
			for (let i = start; i <= end; i++) {
				let h = doms.eq(i).text()
				oldDoms.eq(i).height(h);
				oldDomSpan.eq(i).text(h);
				this.sortVal[i] = h;
				if ($('.newprogressContainer div').eq(i).hasClass('pivot')) {
					oldDoms.eq(i).css("backgroundColor", 'black')
					newPivotIndex = i;
				}
			}
			console.log(this.sortVal, '新的排序数组')
			let left = [];
			let right = [];
			for (let i = 0; i <= end - start; i++) {
				if (i < newPivotIndex) left.push(this.sortVal[i])
				if (i > newPivotIndex) right.push(this.sortVal[i])
			}
			console.log(left, 'left')
			console.log(right, 'right')
			// preDom.css("backgroundColor", "#ff0000")
			$('.newprogressContainer').remove();
			resolveUp();

		}, 2000)
	})
}
sortInit.prototype.quickSortAnalyse = function(quickDom, k, showTitle) {
	let i = quickDom.quickHistory.length;
	let curIndex = `<p class="curIndex" style="color:red;">第${k+1}趟排序</p>`
	let curValue = `<p class="curValue">最小值：${quickDom.quickHistory[i-1].value}</p>`
	let toIndex = quickDom.toIndex.index + 1;
	let lastP = `<p class="curValue">和第${toIndex}个数交换位置</p>`
	if (showTitle) {
		$(".analyse_container_left").append(curIndex)
	}
	if (!showTitle) {
		$(".analyse_container_left").append(curValue)
		$(".analyse_container_left").append(lastP)
	}
	var offset_p = 45 * this.compareTime;
	$(".analyse_container_left").scrollTop(offset_p);
}
// 开始排序
sortInit.prototype.quickSortStart = function() {
	$('#progressContainer div').addClass("blockInsertMargin")
	// 整体下移
	setTimeout(() => {
		$(window).scrollTop(680)
	}, 200)
	// // 存放异步操作的数组
	let promiseThenArray = [];
	// // 新建异步,执行第一个数值的排序选择
	let p = new Promise((resolve) => {
		setTimeout(() => {
			// this.quickSortDisplay(this.sortQueen[0], resolve, 0, 9);
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
					// 参数依次为当前趟排序，结束函数，当前起始位置
					$('#progressContainer div').addClass("blockInsertMargin")
					// that.quickSortDisplay(that.sortQueen[k], resolve,that.sortQueen[k-1]);

				}, that.duration / 8)
			})
		})
	}
}
