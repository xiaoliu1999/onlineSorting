//用于存放每趟排序过程中的节点
function selectDom() {
	// selectHistory为选择对象数组，存放选中的所有极小值，对象格式为{index:1,value:20}
	// toIndex为选出的最小数据放置的位置，对象格式为{index:1,value:20}
	this.selectHistory = []
	this.toIndex = {};
}

sortInit.prototype.selectSort = function(arr) {
	this.changeTime = 0;
	this.compareTime = 0;
	this.sortQueen = [];
	var len = arr.length;
	var minIndex, temp;
	for (var i = 0; i < len - 1; i++) {
		minIndex = i;
		let min = minIndex;
		// 新建对象，存放选择的第一个极小值和最终放置位置
		var sDom = new selectDom();
		var firstDom = {
			index: i,
			value: arr[i],
		};
		var to = {
			index: i,
			value: arr[i]
		}
		sDom.selectHistory.push(firstDom);
		sDom.toIndex = to;
		for (var j = i + 1; j < len; j++) {
			this.compareTime++;
			if (arr[j] < arr[minIndex]) {
				// 将所有的极小值存入数组
				var nextDom = {
					index: j,
					value: arr[j],
				};
				sDom.selectHistory.push(nextDom);
				minIndex = j;
			}
		}
		temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
		if(minIndex != min){
			this.changeTime++;
		}
		// 将当前趟排序存入数组
		this.sortQueen.push(sDom);
	}
}
// 排序演示
sortInit.prototype.selectSortDisplay = function(selectDom, resolveUp, kIndex) {
	console.log(selectDom)
	console.log("当前k:" + kIndex)
	var that = this;
	new Promise((resolve) => {
		that.selectSortAnalyse(selectDom, kIndex, true);
		for (let i = kIndex, time = 0; i < this.sortNum; i++, time++) {
			var minIndex = 0;
			(function(k) {
				setTimeout(function() {
					var curDom = $('#progressContainer div').eq(i);
					// 如果当前节点是排序过程中的极小值之一，则将其上升
					if (i == selectDom.selectHistory[minIndex].index) {
						
						if (i != 0) {
							var preDom = $('#progressContainer div').eq(i - 1);
							preDom.css("backgroundColor", "#ff0000")
						}
						curDom.css("backgroundColor", "#000000")
						curDom.addClass("blockInsertActive")
						curDom.siblings().removeClass("blockInsertActive")
						// 极小值index+1，寻找下一个极小值
						if (minIndex < selectDom.selectHistory.length - 1) {
							minIndex++;
						}
						// 否则，仅仅将其变黑表示比较
					} else {
						curDom.css("backgroundColor", "#000000")
						curDom.siblings('div').css("backgroundColor", "#ff0000")
					}
					// 最后一个比较完毕，返回，结束本趟排序
					if (i == that.sortNum - 1) {
						setTimeout(() => {
							curDom.css("backgroundColor", "#ff0000")
							resolve()
						}, (that.duration / 2))
					}
				}, (that.duration / 4) * k);
			})(time)
		}
	}).then(() => {
		that.selectSortAnalyse(selectDom, kIndex, false);
		// 将节点插入到应插入的位置
		setTimeout(() => {
			let i = selectDom.selectHistory.length;
			if (i != 0) {
				// 交换最小值和当且位置的数
				let curDom = $('#progressContainer div').eq(selectDom.selectHistory[i - 1].index);
				let toDom = $('#progressContainer div').eq(selectDom.toIndex.index);
				toDom.insertBefore(curDom)
				toDom = $('#progressContainer div').eq(selectDom.toIndex.index);
				curDom.insertBefore(toDom)
			}
		}, this.duration / 4)
		// 节点落下
		setTimeout(() => {
			let curDom = $('#progressContainer div').eq(selectDom.toIndex.index);
			curDom.removeClass("blockInsertActive")
			resolveUp();
		}, this.duration / 2)
	})
}
sortInit.prototype.selectSortAnalyse = function(selectDom, k,showTitle) {
	let i = selectDom.selectHistory.length;
	let curIndex = `<p class="curIndex" style="color:red;">第${k+1}趟排序</p>`
	let curValue = `<p class="curValue">最小值：${selectDom.selectHistory[i-1].value}</p>`
	let toIndex = selectDom.toIndex.index + 1;
	let lastP = `<p class="curValue">和第${toIndex}个数交换位置</p>`
	if (showTitle ) {
		$(".analyse_container_left").append(curIndex)
	}
	if (!showTitle) {
		$(".analyse_container_left").append(curValue)
		$(".analyse_container_left").append(lastP)
	}
	var offset_p = 45 * this.compareTime;
	$(".analyse_container_left").scrollTop(offset_p);
	// $(".analyse_container_right p").eq(2).text("比较次数为" + this.compareTime);
	// $(".analyse_container_right p").eq(3).text("交换次数为" + this.changeTime);
}
// 开始排序
sortInit.prototype.selectSortStart = function() {
	// 整体下移
	$('#progressContainer div').addClass("blockInsertMargin")
	setTimeout(()=>{
		$(window).scrollTop(1000)
	},200)
	// 存放异步操作的数组
	let promiseThenArray = [];
	// 新建异步,执行第一个数值的排序选择
	let p = new Promise((resolve) => {
		setTimeout(() => {
			this.selectSortDisplay(this.sortQueen[0], resolve, 0);
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
					that.selectSortDisplay(that.sortQueen[k], resolve, k);

				}, that.duration / 8)
			})
		})
	}
}
