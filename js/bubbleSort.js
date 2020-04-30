//用于存放排序过程中的节点
function bubbleDom(){
	//pre和last为每次比较的节点，格式：{index:0,value:1} index为节点下标，value为节点值
	//exchange标记比较的节点是否交换
	this.pre={};
	this.last={};
	this.exchange=false;
}
sortInit.prototype.sortQueen=[];
sortInit.prototype.bubbleSort=function(arr){
	this.changeTime=0;
	this.compareTime=0;
	this.sortQueen=[];
	var len = arr.length;
	var sorted=true;
	for (var i = 0; i < len && sorted; i++) {
		sorted=false;
		for (var j = 0; j < len - 1 - i; j++) {
			//将比较排序过程存入bDom对象中
			var bDom=new bubbleDom();
			bDom.pre={index:j,value:arr[j]};
			bDom.last={index:j+1,value:arr[j+1]};
			if (arr[j] > arr[j+1]) {       
				var temp = arr[j+1];       
				arr[j+1] = arr[j];
				arr[j] = temp;
				bDom.exchange=true;
				// 交换次数增加
				this.changeTime++;
				sorted=true;
			}else{
				bDom.exchange=false;
			}
			// 将对象存入数组
			this.sortQueen.push(bDom);
			// 比较次数增加
			this.compareTime++;
		}
	}
}
sortInit.prototype.bubbleSortDisplay=function(bubbleDom){
	var preDom=$('#progressContainer div').eq(bubbleDom.pre.index);
	var lastDom=$('#progressContainer div').eq(bubbleDom.last.index);
	preDom.css("backgroundColor","#000000");
	lastDom.css("backgroundColor","#000000");
	setTimeout(function(){
		if(bubbleDom.exchange){
			preDom.remove(); 
			preDom.insertAfter(lastDom);
		} 
	},this.duration/2);
	setTimeout(function(){
		preDom.css("backgroundColor","#ff0000");
		lastDom.css("backgroundColor","#ff0000");
	},this.duration/2);
}
sortInit.prototype.bubbleSortAnalyse=function(bubbleDom,k){
	var pre=bubbleDom.pre.value;
	var last=bubbleDom.last.value;
	var exchange=":交换";
	if(!bubbleDom.exchange)  exchange=":不交换";
	var analyse="比较"+pre+"和"+last+exchange;
	var analyse_p=$("<p></p>");
	analyse_p.text(analyse);
	$(".analyse_container_left").append(analyse_p);
	var offset_p=45*k;
	$(".analyse_container_left").scrollTop(offset_p);
	$(".analyse_container_left p").removeClass("analyse_current_p");
	$(".analyse_container_left p").eq(k).addClass("analyse_current_p");
	// $(".analyse_container_right p").eq(2).text("比较次数为"+this.compareTime);
	// $(".analyse_container_right p").eq(3).text("交换次数为"+this.changeTime);
}
sortInit.prototype.bubbleSortStart=function(){
	var that=this;
	for(var k=0;k<this.sortQueen.length;k++){
		(function(k){
			setTimeout(function(){
				that.bubbleSortDisplay(that.sortQueen[k]);
				that.bubbleSortAnalyse(that.sortQueen[k],k);
			},that.duration*k)
		})(k);
	}
}
 