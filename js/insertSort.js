//用于存放排序过程中的节点
function insertDom() {
	// curData为当前插入元素，格式{index:0,value:1}
	// insertHistory为比较历史数组，存放当前插入元素的比较记录，每个元素格式为{index:0,value:1}
	this.curData = {};
	this.insertHistory = [];
}
// 排序实现
sortInit.prototype.insertSort = function(arr) {
	this.changeTime = 0;
	this.compareTime = 0;
	this.sortQueen = [];
	var len = arr.length;
	var preIndex, current;
	for (var i = 0; i < len; i++) {
		preIndex = i - 1;
		current = arr[i];
		// 新建对象,存放插入数值
		var iDom = new insertDom();
		iDom.curData = { index:i , value:current}
		while(preIndex >= 0 && arr[preIndex] > current) {
			// 交换次数增加
			this.compareTime++;
			// 存放插入位置查找历史
			var ins = { index:preIndex , value:arr[preIndex] };
			iDom.insertHistory.push(ins);
			arr[preIndex+1] = arr[preIndex];
			preIndex--;
		}
		arr[preIndex+1] = current;
		// 将当前趟排序存入数组
		this.sortQueen.push(iDom);
		// 比较次数增加
		this.changeTime++;
	}
	console.log(this.sortQueen);
}
// 排序演示
sortInit.prototype.insertSortDisplay = function(insertDom,resolveUp) {
	var curDom = $('#progressContainer div').eq(insertDom.curData.index);
	var preDom = $('#progressContainer div').eq(insertDom.curData.index-1)
	var curLength=insertDom.insertHistory.length;
	var curIndex=insertDom.curData.index;
	// 当前block上移
	curDom.addClass("blockInsertActive")
	curDom.siblings().removeClass("blockInsertActive")
	// 第一个block，插入直接下移
	if(curIndex == 0){
		this.insertSortAnalyse(insertDom.curData.value,true);
		setTimeout(()=>{
			resolveUp();
		},this.duration/8)
	// 不是第一个且不需插入，不交一次后下移
	}else if(curLength==0){
		this.insertSortAnalyse(insertDom.curData.value,true);
		new Promise((resolve)=>{
			setTimeout(()=>{
				preDom.addClass("blockBlack")
				curDom.addClass("blockBlack")
			},this.duration/8)
			setTimeout(()=>{
				resolve();
			},this.duration/6)
		}).then(()=>{
			preDom.removeClass("blockBlack")
			curDom.removeClass("blockBlack")
			resolveUp();
		})
	// 向前插入，插入完毕下移
	}else{
		new Promise((resolve) =>{
			let curK=0;
			for(let k=0;k<curLength;k++){
				let cDom = $('.blockInsertActive');
				setTimeout(()=>{
					let pDom = $('#progressContainer div').eq(insertDom.insertHistory[k].index);
					setTimeout(()=>{
						pDom.addClass("blockBlack")
						cDom.addClass("blockBlack")
					},this.duration/10)
					this.insertSortAnalyse(insertDom.curData.value,false,insertDom.insertHistory[k].value);
					setTimeout(()=>{
						pDom.removeClass("blockBlack")
						cDom.removeClass("blockBlack")
						cDom.remove();
						cDom.insertBefore(pDom)
						cDom.addClass("blockInsertActive")
						curK++;
						// 当前数值插入完毕，向上返回
						if(curK==curLength){
							resolve();
						}
					},this.duration/4)
					
				},(this.duration/3)*(k+1))
				// console.log("当前k="+curK)
			}
		// 向前插入完毕，结束当前数值插入,resolveUp返回insertSortStart 结束本趟排序
		}).then(()=>{
			setTimeout(()=>{
				var cDom = $('.blockInsertActive');
				cDom.removeClass("blockBlack")
				resolveUp();
			},this.duration/8)
			
		})
	}
}
sortInit.prototype.insertSortAnalyse = function(curData,inOrder,preData) {
	console.log("当前："+curData);
	console.log("是否有序："+inOrder);
	console.log("比较："+preData);
	let curP;
	if(inOrder) {
		curP=`<p class="curData">${curData}：已有序</p>`
	}else{
		curP=`<p class="curData">${curData}：向前寻找插入位置</p>`
	}
	 $(".analyse_container_left").append(curP)
	var offset_p = 45 * this.compareTime;
	$(".analyse_container_left").scrollTop(offset_p);
	// $(".analyse_container_right p").eq(2).text("比较次数为" + this.compareTime);
	// $(".analyse_container_right p").eq(3).text("交换次数为" + this.changeTime);
}
// 开始排序
sortInit.prototype.insertSortStart = function() {
	// 整体下移
	$('#progressContainer div').addClass("blockInsertMargin")
	setTimeout(()=>{
		$(window).scrollTop(1000)
	},200)
	// 存放异步操作的数组
	let promiseThenArray=[];
	// 新建异步,执行第一个数值的排序展示
	let p = new Promise((resolve) =>{
		setTimeout(()=>{
			this.insertSortDisplay(this.sortQueen[0],resolve);
		},this.duration/4)
	})
	// 异步的第一个then，执行第二个数值的排序展示
	let pThen=promiseThen(p,1);
	// 依次将每个异步推入数组
	promiseThenArray.push(pThen);
	for(let k=0;k<this.sortQueen.length-2;k++){
		let newP=promiseThen(promiseThenArray[k],k+2);
		promiseThenArray.push(newP);
	}
	// 执行完所有异步后整体上移
	let lastThen = promiseThenArray[promiseThenArray.length-1];
	lastThen.then(()=>{
		setTimeout(()=>{
			$('#progressContainer div').removeClass(" blockInsertMargin blockInsertActive")
		})
	})
	// 异步的then返回新的异步
	var that=this;
	function promiseThen(p,k){
		return p.then(()=>{
			return new Promise((resolve)=>{
				setTimeout(()=>{
					that.insertSortDisplay(that.sortQueen[k],resolve);
				},that.duration/4)
			})
		})
	}
}
