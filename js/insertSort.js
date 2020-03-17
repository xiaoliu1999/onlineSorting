//用于存放排序过程中的节点
function insertDom(){
	//current当前节点相邻节点，格式：{index:0,value:1} index为节点下标，value为节点值
	//before当前节点之前需要移动的节点数组，数组元素格式：{index:0,value:1} index为节点下标，value为节点值 
	//exchange标记相邻节点是否交换
	this.current={};
	this.before=new Array();
}
//排序类
function insert(){
	this.sortVal=[];//排序数值
	this.sortSpeed=3;//排序速度,每次交换间隔为7-
	this.sortNum=10;//排序个数
	this.sortQueen=[];//用于存放排序过程中的数组
	this.compareTime=0;
	this.changeTime=0;
	this.valueType=""//random为随机排序;input为输入值
	//排序序列初始化
	this.initRandomSort=function(val){
		//显示随机数字
		var rand_p=$("<p id='randomVal'>随机数据为</p>");
		$('#progressContainer').append(rand_p);
		for(var i=0;i<val.length;i++){
			(function(val){
				var rand=$("<span></span>");
				rand.text(val);
				$('#randomVal').append(rand);
				
			})(val[i]);
		}
		this.valueType="random";
		//显示图形
		this.displayBlock(val);
	}
	//排序序列初始化
	this.initInputSort=function(val){
		//显示输入数字
		$('#progressContainer').append("<p id='inputVal' class='btn'>请输入:</p>");
		for(var i=0;i<val;i++){
			$('#progressContainer p').append("<input type='number' id='inputBoxNum'></input>")
		}
		$('#progressContainer p').append("<button id='btn_inputComplete'>完成</button>");
		this.valueType="input";
	}
	//展示排序块
	this.displayBlock=function(values){
		for(var i=0;i<values.length;i++){
			(function(val){
				//数值块
				var div=$("<div class='block'></div>");
				if(val>200) div.height(200);
				else div.height(val);
				div.css('marginTop',200-val);
				$('#progressContainer').append(div);
				//数值
				var span=$("<span></span>");
				span.text(val);
				div.append(span);
			})(values[i]);
		}
	}
	//排序实现
	this.insertSort=function(arr){
		this.changeTime=0;
		this.compareTime=0;
		this.sortQueen=[];
		var preIndex, current;
		for (var i = 1; i < arr.length; i++) {
			preIndex = i - 1;
			current = arr[i];
			var iDom=new insertDom();
			iDom.current={index:i,value:current};
			while(preIndex >= 0 && arr[preIndex] > current) {
				iDom.push({index:preIndex,value:arr[preIndex]});
				arr[preIndex+1] = arr[preIndex];
				preIndex--;
			}
			arr[preIndex+1] = current;
			console.log(iDom);
		}
		     
	}
	//排序动画演示
	this.displaySort=function(insertDom){
		var preDom=$('#progressContainer div').eq(insertDom.pre.index);
		var lastDom=$('#progressContainer div').eq(insertDom.last.index);
		preDom.css("backgroundColor","#000000");
		lastDom.css("backgroundColor","#000000");
		setTimeout(function(){
			if(insertDom.exchange){
				preDom.remove(); 
				preDom.insertAfter(lastDom);
			} 
		},(7-this.sortSpeed)*500/2);
		setTimeout(function(){
			preDom.css("backgroundColor","#ff0000");
			lastDom.css("backgroundColor","#ff0000");
		},(7-this.sortSpeed)*500/2);
	}
	//排序分析展示
	this.showSort=function(insertDom,k){
		var pre=insertDom.pre.value;
		var last=insertDom.last.value;
		var exchange=":交换";
		if(!insertDom.exchange)  exchange=":不交换";
		var analyse="比较"+pre+"和"+last+exchange;
		var analyse_p=$("<p></p>");
		analyse_p.text(analyse);
		$(".analyse_container_left").append(analyse_p);
		var offset_p=45*k;
		$(".analyse_container_left").scrollTop(offset_p);
		$(".analyse_container_left p").removeClass("analyse_current_p");
		$(".analyse_container_left p").eq(k).addClass("analyse_current_p");
	}
	//开始排序
	this.startSort=function(){
		var that=this;
		for(var k=0;k<this.sortQueen.length;k++){
			(function(k){
				setTimeout(function(){
					that.displaySort(that.sortQueen[k]);
					that.showSort(that.sortQueen[k],k);
				},(7-that.sortSpeed)*500*k)
			})(k);
		}
	}
	this.restart=function(){
		$("#progressContainer").empty();
		$(".analyse_container_left").empty();
		var highestTimeoutId = setTimeout(";");
		for (var i = 0 ; i < highestTimeoutId ; i++) {
			clearTimeout(i); 
		}
	}
	//输入数据
	this.inputValue=function(input){
		this.sortVal=input;
	}
	//生成随机数
	this.randomValue=function(){
		this.sortVal=[];
		for(var i=0;i<this.sortNum;i++){
			var t=Math.floor((Math.random()*200)+1);
			this.sortVal.push(t);
		}
	}
	//摧毁排序
	this.destroySort=function(){
		$("#progressContainer").empty();
		$(".analyse_container_left").empty();
		this.sortVal=[];
		this.sortQueen=[]
		this.clearTimeOut();
	}
	this.clearTimeOut=function(){
		var highestTimeoutId = setTimeout(";");
		for (var i = 0 ; i < highestTimeoutId ; i++) {
			clearTimeout(i); 
		}
	}
}
