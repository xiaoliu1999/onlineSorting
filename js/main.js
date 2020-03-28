 //////////////////////////////////////页面加载
 $(document).ready(function() {

// --------------------------------------------页面初始化布局--------------------------------------------
		 //页面刷新后停留在当前排序
		 var currSort=sessionStorage.getItem("sortType");
		 //设置排序算法信息和实现伪码
		  if(currSort!=null){ 
		 	 $("#sortInfo").html(Info[currSort+"Info"]);
		 	 $("code").html(Code[currSort+"Code"]);
		 	 currentSort=currSort+"Sort";
		  }else{
			  $("#sortInfo").html(Info["bubbleInfo"]);
			  $("code").html(Code["bubbleCode"]);
		  }
		  
		 //代码高亮
		 hljs.initHighlightingOnLoad();
	    $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
		
		 //新建对象
	     var sortObj=new sortInit();
// --------------------------------------------导航tab切换--------------------------------------------
 	$('#tabs li').click(function() {
		location.reload();
		var currentTab=$(this).attr("id");
		sessionStorage.setItem('sortType',currentTab);
		//动态加载js
		// var src="<script src='js/" + currentSort +".js' type='text/javascript' charset='utf-8'> </scrip"+"t>";
 	});
// --------------------------------------------输入数据按钮--------------------------------------------
	$('#input').click(function(){
		 //显示排序和分析模块
		 $(".bottom").show();
		 $(".panel").eq(1).show();
		 
		 $(window).scrollTop(450);
		 //修改btn组位置
		 $(".btn_start_restart").width(60+"%");
		 
		 //如果已经进行排序，点击按钮则销毁上次排序
		 if(!($(".bottom").is(":hidden"))) sortObj.destroySort();
		 
		   
		 //显示输入数据
		 sortObj.initInputSort($("#inputNum").val());
		
		 //输入完成
		//显示排序分析
		 $(".analyse_container_right p").eq(0).text(time.bubbleTime);
		 $(".analyse_container_right p").eq(1).text(space.bubbleTime);
		 
		 //启用禁用开始按钮
		  $("#start").hide();
		  $("#restart").hide();
	});
// --------------------------------------------输入完成按钮--------------------------------------------
	$("#progressContainer").on('click','#btn_inputComplete',function(){
	    sortObj.clearTimeOut();
	     var input=[];
	     for(var i=0;i<$("#progressContainer input").length;i++){
	     	input.push(Number($("#progressContainer input").eq(i).val()));
	     }
	     sortObj.inputValue(input);
	     $('#progressContainer div').remove();
	     $(".analyse_container_left").empty();
	     sortObj.displayBlock(input);
	     $("#start").show();
	     $("#restart").show();
	     $("#start").removeAttr('disabled');
	     $("#restart").attr('disabled',true);
		 $("#start").removeClass('btn_hover');
		 $("#restart").addClass('btn_hover');
		 
		 
	});
// --------------------------------------------随机排序按钮--------------------------------------------
	$('#random').click(function(){
		//显示排序和分析模块
		$(".bottom").show();
		$(".panel").eq(1).show();

		//修改btn组位置
		$(".btn_start_restart").width(60+"%");
		
		//如果已经进行排序，点击按钮则销毁上次排序
		if(!($(".bottom").is(":hidden"))) sortObj.destroySort();
		
		//随机生成数据，显示，排序
		sortObj.randomValue();
		sortObj.initRandomSort(sortObj.sortVal);
		
		 $(window).scrollTop(450);
		
		//启用禁用开始按钮
		$("#start").show();
		$("#restart").show();
		$("#start").removeAttr('disabled');
		$("#restart").attr('disabled',true);
		$("#start").removeClass('btn_hover');
		$("#restart").addClass('btn_hover');
		
		//显示排序分析
		 $(".analyse_container_right p").eq(0).text(time.bubbleTime);
		 $(".analyse_container_right p").eq(1).text(space.bubbleTime);
				
		
	});
// --------------------------------------------数据个数,排序速度按钮--------------------------------------------
	$("#inputRange").on("change",function(){
		$("#inputRange").css("backgroundSize",(100/15)*$("#inputRange").val());
	  $("#inputNum").val($("#inputRange").val());
	  sortObj.sortNum=$("#inputRange").val();
	})
	$("#inputNum").on("change",function(){
		$("#inputRange").css("backgroundSize",(100/15)*$("#inputNum").val());
	  $("#inputRange").val($("#inputNum").val());
	  if($("#inputNum").val()>15) $("#inputNum").val(15);
	  if($("#inputNum").val()<2) $("#inputNum").val(2);
	  sortObj.sortSpeed=$("#inputNum").val();
	})
// --------------------------------------------//////////////排序速度控制
	$("#speedRange").on("change",function(){
		$("#speedRange").css("backgroundSize",(100/6)*$("#speedRange").val());
	  $("#sortSpeed").val($("#speedRange").val());
	  sortObj.sortSpeed=$("#speedRange").val();
	})
	$("#sortSpeed").on("change",function(){
	  $("#speedRange").css("backgroundSize",(100/6)*$("#sortSpeed").val());
	  $("#speedRange").val($("#sortSpeed").val());
	  if($("#sortSpeed").val()>6) $("#sortSpeed").val(6);
	  if($("#sortSpeed").val()<1) $("#sortSpeed").val(1);
	  sortObj.sortSpeed=$("#sortSpeed").val();
	})
// --------------------------------------------开始,重开按钮--------------------------------------------
	$("#start").click(function(){
		var sortValue=new Array();
		for(var i=0;i<sortObj.sortVal.length;i++ ){
			sortValue.push(sortObj.sortVal[i]);
		}
		sortObj.bubbleSort(sortValue);
		sortObj.startSort();
		////启用禁用开始按钮
		$(this).attr('disabled',true);
		$("#restart").removeAttr('disabled');
		$(this).addClass("btn_hover");
		$("#restart").removeClass('btn_hover');
		//显示排序分析
	})
	$("#restart").click(function(){
		if(sortObj.valueType=="random"){
			sortObj.restart();
			sortObj.initRandomSort(sortObj.sortVal)
			sortObj.startSort();
		}else{
			sortObj.restart();
			 sortObj.initInputSort($("#inputNum").val());
			 for(var i=0;i<$("#inputNum").val();i++){
				 $("#inputVal input").eq(i).val(sortObj.sortVal[i]);
			 }
			 sortObj.displayBlock(sortObj.sortVal);
			 sortObj.startSort();
		}
		
	})
// --------------------------------------------返回顶部按钮--------------------------------------------
	 //监听滚动条
	 $(window).scroll(function(){
		if($(window).scrollTop()<400){
			$("#backTop").hide();
		}else{
			$("#backTop").show();
		}
	 });
	
 // --------------------------------------------背景粒子初始化--------------------------------------------
	var config = {
		vx: 4, //点x轴速度,正为右，负为左
		vy: 4, //点y轴速度
		height: 2, //点高宽，其实为正方形，所以不宜太大
		width: 2,
		count: 100, //点个数
		color: "121, 162, 185", //点颜色
		stroke: "130,255,255", //线条颜色
		dist: 6000, //点吸附距离
		e_dist: 20000, //鼠标吸附加速距离
		max_conn: 10 //点到点最大连接数
	}
	CanvasParticle(config);	//调用背景粒子
	
	
 });
 

 
