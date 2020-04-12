//排序类
function sortInit(){
	this.sortVal=[];//排序数值
	this.sortSpeed=3;//排序速度,每次交换间隔为7-
	this.sortNum=10;//排序个数
	this.compareTime=0;
	this.changeTime=0;
	this.duration=(7-this.sortSpeed) * 500;
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
	//排序序列初始化
	this.initInputSort=function(val){
		//显示输入数字
		$('#progressContainer').append("<p id='inputVal' class='btn'></p>");
		$('#progressContainer p').append("<form onsubmit='return false;'>请输入:</form>");
		for(var i=0;i<val;i++){
			$('#progressContainer form').append("<input type='number' required='required' id='inputBoxNum'></input>")
		}
		$('#progressContainer form').append("<button id='btn_inputComplete'  >完成</button>");
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
	//开始排序
	this.startSort=function(){
		if(currentSort=="bubbleSort") this.bubbleSortStart();
		else if(currentSort=="insertSort") this.insertSortStart();
		else alert("开发中")
	}
	this.restart=function(){
		$("#progressContainer").empty();
		$(".analyse_container_left").empty();
		var highestTimeoutId = setTimeout(";");
		for (var i = 0 ; i < highestTimeoutId ; i++) {
			clearTimeout(i); 
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
