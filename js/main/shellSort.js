//用于存放排序过程中的节点
function shellDom() {
	// curData为当前插入元素，格式{index:0,value:1}
	// shellHistory为比较历史数组，存放当前插入元素的比较记录，每个元素格式为{index:0,value:1}
	this.gap = 0;
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
sortInit.prototype.shellSort = function(arr) {
	this.sortQueen = [];
	var len = arr.length;
	var temp;
	var gap = parseInt(len / 2)
	for (gap; gap > 0; gap--) {
		var sDom = new shellDom();
		sDom.gap = gap;
		for (let i = 0; i < this.sortNum; i++) {
			if (i % gap == 0) sDom.group.first.push({
				index: i,
				value: arr[i],
				groupId: 0
			})
			if (i % gap == 1) sDom.group.second.push({
				index: i,
				value: arr[i],
				groupId: 1
			})
			if (i % gap == 2) sDom.group.third.push({
				index: i,
				value: arr[i],
				groupId: 2
			})
			if (i % gap == 3) sDom.group.four.push({
				index: i,
				value: arr[i],
				groupId: 3
			})
			if (i % gap == 4) sDom.group.five.push({
				index: i,
				value: arr[i],
				groupId: 4
			})
			if (i % gap == 5) sDom.group.six.push({
				index: i,
				value: arr[i],
				groupId: 5
			})
			if (i % gap == 6) sDom.group.seven.push({
				index: i,
				value: arr[i],
				groupId: 6
			})
		}
		for (var i = gap, k = 0; i < len; i++, k++) {
			temp = arr[i];
			if (k < gap) {
				var f = {
					index: k,
					value: arr[k]
				}
			}
			var his = {
				index: i,
				value: arr[i],
				insertHistory: []
			}
			for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
				arr[j + gap] = arr[j];
			}
			arr[j + gap] = temp;
		}
		for (let index = 0; index < this.sortNum; index++) {
			if (index % gap == 0) sDom.group.first[index / gap].newValue = arr[index];
			if (index % gap == 1) sDom.group.second[(index - 1) / gap].newValue = arr[index];
			if (index % gap == 2) sDom.group.third[(index - 2) / gap].newValue = arr[index];
			if (index % gap == 3) sDom.group.four[(index - 3) / gap].newValue = arr[index];
			if (index % gap == 4) sDom.group.five[(index - 4) / gap].newValue = arr[index];
			if (index % gap == 5) sDom.group.six[(index - 5) / gap].newValue = arr[index];
			if (index % gap == 6) sDom.group.seven[(index - 6) / gap].newValue = arr[index];
		}
		this.sortQueen.push(sDom)
	}
	console.log(this.sortQueen,'排序记录数组')
}
// 排序演示
sortInit.prototype.shellSortDisplay = function(shellDom, resolveUp) {
	console.log(shellDom,'当前排序记录')
	var that = this;
	let colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF']
	for (let key in shellDom.group) {
		if (shellDom.group[key].length > 0) {
			shellDom.group[key].forEach((item) => {
				$('#progressContainer div').eq(item.index).css('backgroundColor', colors[item.groupId])
			})
		}
	}
	for (let i = 0; i < shellDom.gap; i++) {
		(function(k) {
			setTimeout(() => {
				for (let key in shellDom.group) {
					if (shellDom.group[key].length > 0) {
						shellDom.group[key].forEach((item) => {
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
				if (k == shellDom.gap - 1) {
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
sortInit.prototype.shellSortAnalyse = function(shellDom, resolveUp) {
	curGap = `<p class="curIndex" style='color:red;'>当前排序增量:${shellDom.gap}</p>`
	$(".analyse_container_left").append(curGap)
	let num = "";
	setTimeout(() => {
		new Promise((resolve) => {
			for (let i = 0; i < shellDom.gap; i++) {
				for (item in shellDom.group) {
					shellDom.group[item].forEach((item) => {
						setTimeout(() => {
							if (item.groupId == i) {
								if (num.indexOf(i) == -1) {
									num += i.toString();
									let curGroup = `<p class="curIndex">第${i+1}组：${item.value}</p>`
									$(".analyse_container_left").append(curGroup)
								} else {
									let p = $(".analyse_container_left p").last().text();
									$(".analyse_container_left p").last().remove();
									 let curGroup = `<p class="curIndex">${p}，${item.value}</p>`;
									$(".analyse_container_left").append(curGroup)
								}
							}
							if (i == shellDom.gap - 1) resolve()
							this.compareTime ++;
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
sortInit.prototype.shellSortStart = function() {
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
			this.shellSortDisplay(this.sortQueen[0], resolve);
			this.shellSortAnalyse(this.sortQueen[0], resolve)
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
					that.shellSortDisplay(that.sortQueen[k], resolve);
					that.shellSortAnalyse(that.sortQueen[k], resolve);
				}, that.duration / 4)
			})
		})
	}
}
