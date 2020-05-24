//排序类
function sortInit() {
	this.sortVal = []; //排序数值
	this.sortSpeed = 3; //排序速度,每次交换间隔为7-
	this.sortNum = 10; //排序个数
	this.duration = (7 - this.sortSpeed) * 500;
	this.compareTime=0; //用于控制排序分析记录的滚动
	this.valueType = "" //random为随机排序;input为输入值
	//排序序列初始化
	this.initRandomSort = function(val, type) {
		$('#progressContainer').empty();
		//显示随机数字
		var rand_p = $("<p id='randomVal'>随机数据为</p>");
		$('#progressContainer').append(rand_p);
		for (var i = 0; i < val.length; i++) {
			(function(val) {
				var rand = $("<span></span>");
				rand.text(val);
				$('#randomVal').append(rand);

			})(val[i]);
		}
		this.valueType = "random";
		$('.newprogressContainer').remove();
		if (type == 'heap') {
			this.displayHeap(val);
		} else {
			this.displayBlock(val);
		}
		//显示图形
	}
	//输入数据
	this.inputValue = function(input) {
		this.sortVal = input;
	}
	//排序输入框序列初始化
	this.initInputSort = function(val) {
		$('#progressContainer').empty();
		//显示输入数字
		$('#progressContainer').append("<p id='inputVal' class='btn'></p>");
		$('#progressContainer p').append("<form onsubmit='return false;'>请输入:</form>");
		for (var i = 0; i < val; i++) {
			$('#progressContainer form').append("<input type='number' required='required' id='inputBoxNum'></input>")
		}
		$('#progressContainer form').append("<button id='btn_inputComplete'  >完成</button>");
		this.valueType = "input";
	}
	//生成随机数
	this.randomValue = function() {
		this.sortVal = [];
		for (var i = 0; i < this.sortNum; i++) {
			var t = Math.floor((Math.random() * 200) + 1);
			this.sortVal.push(t);
		}
	}
	//展示排序块
	this.displayBlock = function(values) {
		for (var i = 0; i < values.length; i++) {
			(function(val) {
				//数值块
				var div = $("<div class='block'></div>");
				if (val > 200) {
					div.height(200);
					div.css('marginTop', 0);
				} else {
					div.height(val);
					div.css('marginTop', 200 - val);
				}
				$('#progressContainer').append(div);
				//数值
				var span = $("<span></span>");
				span.text(val);
				div.append(span);
			})(values[i]);
		}
	}
	// 展示堆排序初始
	this.displayHeap = function(values){
		for(let i =0 ;i<values.length;i++){
			var div = $("<div class='heapNode'></div>");
			$('#progressContainer').append(div)
			$('#progressContainer').css('minHeight','350px')
			$('.heapNode').css('marginRight','50px')
			// 新建数值节点
			var span = $("<span></span>");
			div.append(span);
			span.text(values[i]);
		}
	},
	// 调整为堆
	this.adjustHeapDisplay = function(values) {
		// 存放堆的15*4方格图
		let map = [
			[false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
			[false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
			[false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
			[true, false, true, false, true, false, true, false, true, false, true, false, true, false, true]
		]
		let heap = [];
		let nodeIndex = 0;
		// 将输入放入方格图
		while (nodeIndex < values.length) {
			map.forEach((item) => {
				let h = [];
				item.forEach((i) => {
					if (i) {
						h.push(values[nodeIndex])
						nodeIndex++;
					} else {
						h.push(undefined)
					}
				})
				heap.push(h)
			})

		}
		var heapDiv = $("<div class='heapContainer'></div>");
		$('#progressContainer').append(heapDiv);
		// 遍历方格图显示
		let heapIndex = 1;
		heap.forEach((item,index) => {
			item.forEach((i) => {
				if (i != undefined) {
					//新建节点容器
					var div = $("<div class='circle'></div>");
					// 新建节点
					 if(heapIndex < Math.ceil(values.length/2)){
						if(index == 0) var heapNode = $("<div class='heapNode heapNode_left1 heapNode_right1'></div>");
						if(index == 1) var heapNode = $("<div class='heapNode heapNode_left2 heapNode_right2'></div>");
						if(index == 2) var heapNode = $("<div class='heapNode heapNode_left3 heapNode_right3'></div>");
						if(index == 3) var heapNode = $("<div class='heapNode'></div>");
					}else {
						if(heapIndex * 2 == values.length){
							var heapNode = $("<div class='heapNode heapNode_left3'></div>");
						}else{
							var heapNode = $("<div class='heapNode'></div>");
						}
					}
					// 新建数值节点
					var span = $("<span></span>");
					div.append(heapNode);
					heapNode.append(span);
					span.text(i);
					
					heapIndex++;
				} else {
					// 新建空容器
					var div = $("<div class='blank'></div>");
				}
				heapDiv.append(div);
			})
		})
	}
	// //开始排序
	this.startSort = function() {
		if (currentSort == "bubbleSort") this.bubbleSortStart();
		else if (currentSort == "insertSort") this.insertSortStart();
		else if (currentSort == "selectSort") this.selectSortStart();
		else if (currentSort == "quickSort") this.quickSortStart();
		else if (currentSort == "shellSort") this.shellSortStart();
		else if (currentSort == "mergeSort") this.mergeSortStart();
		else if (currentSort == "heapSort") this.heapSortStart();
	}
	// //重开排序
	this.restart = function() {
		$("#progressContainer").empty();
		$(".analyse_container_left").empty();
		var highestTimeoutId = setTimeout(";");
		for (var i = 0; i < highestTimeoutId; i++) {
			clearTimeout(i);
		}
	}
	//摧毁排序
	this.destroySort = function() {
		$("#progressContainer").empty();
		$(".analyse_container_left").empty();
		this.sortVal = [];
		this.sortQueen = []
		this.clearTimeOut();
	}
	this.clearTimeOut = function() {
		var highestTimeoutId = setTimeout(";");
		for (var i = 0; i < highestTimeoutId; i++) {
			clearTimeout(i);
		}
	}
}
