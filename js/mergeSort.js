//用于存放排序过程中的节点
function mergeDom() {
	// curData为当前插入元素，格式{index:0,value:1}
	// mergeHistory为比较历史数组，存放当前插入元素的比较记录，每个元素格式为{index:0,value:1}
	this.gap = 0;
	this.curVal = [];
	this.firstVal = []
	this.group = {
		first: [],
		second: [],
		third: [],
		four: [],
		five: [],
		six: [],
		seven: []
	}
}
// 排序实现
sortInit.prototype.mergeSort = function(arr) {
	 
}
// 排序演示
sortInit.prototype.mergeSortDisplay = function(mergeDom, resolveUp) {
	var that = this;
	let colors = ['mauve', 'orange', 'pink', 'blue', 'green', 'yellow', 'grey']
	for (let key in mergeDom.group) {
		if (mergeDom.group[key].length > 0) {
			mergeDom.group[key].forEach((item) => {
				$('#progressContainer div').eq(item.index).css('backgroundColor', colors[item.groupId])
			})
		}
	}
	for (let i = 0; i < mergeDom.gap; i++) {
		(function(k) {
			setTimeout(() => {
				for (let key in mergeDom.group) {
					if (mergeDom.group[key].length > 0) {
						mergeDom.group[key].forEach((item) => {
							if (item.groupId == k) {
								let curDom = $('#progressContainer div').eq(item.index);
								let curDomSpan = $('#progressContainer div span').eq(item.index);
								curDom.addClass("blockInsertActive")
								curDom.addClass("blackBlock")
								setTimeout(() => {
									curDom.addClass("blackBlock")
								}, that.duration / 4)
								setTimeout(() => {
									curDom.height(item.newValue)
									curDom.css('marginTop', 200 - item.newValue)
									curDomSpan.text(item.newValue)
								}, that.duration / 4)
							} else {
								let curDom = $('#progressContainer div').eq(item.index);
								curDom.removeClass("blockInsertActive")
								curDom.removeClass("blackBlock")
							}
						})
					}
				}
				if (k == mergeDom.gap - 1) {
					setTimeout(() => {
						let curDom = $('#progressContainer div');
						curDom.removeClass("blockInsertActive")
						curDom.removeClass("blackBlock")
					}, that.duration / 2)
					setTimeout(() => {
						$('#progressContainer div').removeClass("blockInsertMargin")
						let curDom = $('#progressContainer div');
						curDom.css("backgroundColor", 'red')
					}, that.duration)
					setTimeout(() => {
						resolveUp();
					}, that.duration * 1.5)
				}
			}, that.duration * k)
		})(i)
	}
}
sortInit.prototype.mergeSortAnalyse = function(mergeDom, resolveUp) {
	curGap = `<p class="curIndex" style='color:red;'>当前排序增量:${mergeDom.gap}</p>`
	$(".analyse_container_left").append(curGap)
	let num = "";
	setTimeout(() => {
		new Promise((resolve) => {
			for (let i = 0; i < mergeDom.gap; i++) {
				for (item in mergeDom.group) {
					mergeDom.group[item].forEach((item) => {
						setTimeout(() => {
							if (item.groupId == i) {
								if (num.indexOf(i) == -1) {
									num += i.toString();
									console.log(num)
									let curGroup = `<p class="curIndex">第${i+1}组：${item.value}</p>`
									$(".analyse_container_left").append(curGroup)
								} else {
									let p = $(".analyse_container_left p").last().text();
									$(".analyse_container_left p").last().remove();
									 let curGroup = `<p class="curIndex">${p}，${item.value}</p>`;
									$(".analyse_container_left").append(curGroup)
								}
							}
							if (i == mergeDom.gap - 1) resolve()
							this.compareTime ++;
							console.log(this.compareTime)
							var offset_p = 45 * this.compareTime;
							$(".analyse_container_left").scrollTop(offset_p);
						}, this.duration * i)
					
					})
				}
			}
		}).then(() => {
			setTimeout(() => {
				resolveUp();
			}, this.duration * 1.5)
		})
	}, this.duration / 8)
}
// 开始排序
sortInit.prototype.mergeSortStart = function() {
	// 整体下移
	$('#progressContainer div').addClass("blockInsertMargin")
	setTimeout(() => {
		$(window).scrollTop(680)
	}, 200)
	// 存放异步操作的数组
	let promiseThenArray = [];
	// 新建异步,执行第一个数值的排序展示
	let p = new Promise((resolve) => {
		setTimeout(() => {
			this.mergeSortDisplay(this.sortQueen[0], resolve);
			this.mergeSortAnalyse(this.sortQueen[0], resolve)
		}, this.duration / 4)
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
				// 整体下移
				$('#progressContainer div').addClass("blockInsertMargin")
				setTimeout(() => {
					that.mergeSortDisplay(that.sortQueen[k], resolve);
					that.mergeSortAnalyse(that.sortQueen[k], resolve);
				}, that.duration / 4)
			})
		})
	}
}
