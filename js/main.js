//////////////////////////////////////页面加载
 $(document).ready(function() {

 	// --------------------------------------------页面初始化布局--------------------------------------------
 	//获取当前排序类型
 	var currSort = sessionStorage.getItem("sortType");
 	//设置排序算法信息和实现伪码
 	if (currSort != null) { //切换算法显示不同的信息，数据来自data.js
 		$("#sortInfo").html(Info[currSort + "Info"]);
 		$("code").html(Code[currSort + "Code"]);
 		currentSort = currSort + "Sort";
 		$("#" + currSort).addClass('current');
 	} else { //默认为冒泡排序
 		$("#sortInfo").html(Info["bubbleInfo"]);
 		$("code").html(Code["bubbleCode"]);
 		$("#bubble").addClass('current');
 	}

 	//算法实现代码高亮，调用highlightjs插件
 	hljs.initHighlightingOnLoad();
 	$('pre code').each(function(i, e) {
 		hljs.highlightBlock(e)
 	});

 	//新建对象
 	var sortObj = new sortInit();
 	// --------------------------------------------导航tab切换--------------------------------------------
 	// 点击导航栏后刷新界面，同时用Storage存储当前的点击的排序信息，界面加载后读取Storage显示排序信息
 	$('#tabs li').click(function() {
 		location.reload();
 		var currentTab = $(this).attr("id");
 		sessionStorage.setItem('sortType', currentTab);
 	});
 	// --------------------------------------------输入数据按钮--------------------------------------------
 	$('#input').click(function() {
 		//显示排序和分析模块
 		$(".bottom").show();
 		$(".panel").eq(1).show();

 		$(window).scrollTop(450);
 		//修改按钮控制组的位置
 		$(".btn_start_restart").width(60 + "%");

 		//如果已经进行排序，点击按钮则销毁上次排序
 		if (!($(".bottom").is(":hidden"))) sortObj.destroySort();


 		//显示输入数据
 		sortObj.initInputSort($("#inputNum").val());

 		//输入完成
 	
 		if (currSort != null) { //切换算法显示不同的信息，数据来自data.js
 			var currSortTime = currSort + "Time";
 			var currSortSpace = currSort + "Space";
 			var currSortStab = currSort + "Stab";
 		} else { //默认为冒泡排序
 			var currSortTime = "bubbleTime";
 			var currSortSpace = "bubbleSpace";
 			var currSortStab = "bubbleStab";
 		}
		console.log(currSortTime)
 		for (item in time) {
 			if (item == currSortTime) {
 				$(".analyse_container_right p").eq(0).text(time[item]);
 			}
 		}
 		for (item in space) {
 			if (item == currSortSpace) {
 				$(".analyse_container_right p").eq(1).text(space[item]);
 			}
 		}
 		for (item in stab) {
 			if (item == currSortStab) {
 				$(".analyse_container_right p").eq(2).text(stab[item]);
 			}
 		}

 		//启用禁用开始按钮
 		$("#start").hide();
 		$("#restart").hide();
 	});
 	// --------------------------------------------输入完成按钮--------------------------------------------
 	$("#progressContainer").on('click', '#btn_inputComplete', function() {
 		sortObj.clearTimeOut();
 		var input = [];
 		let hasNull = false;
 		for (var i = 0; i < $("#progressContainer input").length; i++) {
 			if ($("#progressContainer input").eq(i).val() != "") {
 				input[i] = Number($("#progressContainer input").eq(i).val());
 			} else {
 				hasNull = true;
 			}
 		}
 		if (!hasNull) {
 			sortObj.inputValue(input);
 			$('#progressContainer div').remove();
 			$(".analyse_container_left").empty();
			if(currSort == 'heap'){
				sortObj.displayHeap(sortObj.sortVal);
			}else{
				sortObj.displayBlock(sortObj.sortVal);
			}
 			$("#start").show();
 			$("#restart").show();
 			$("#start").removeAttr('disabled');
 			$("#restart").attr('disabled', true);
 			$("#start").removeClass('btn_hover');
 			$("#restart").addClass('btn_hover');
 		}
 	});
 	// --------------------------------------------随机排序按钮--------------------------------------------
 	$('#random').click(function() {
 		//显示排序和分析模块
 		$(".bottom").show();
 		$(".panel").eq(1).show();

 		//修改btn组位置
 		$(".btn_start_restart").width(60 + "%");

 		//如果已经进行排序，点击按钮则销毁上次排序
 		if (!($(".bottom").is(":hidden"))) sortObj.destroySort();

 		//随机生成数据，显示，排序
 		sortObj.randomValue();
		if(currSort == 'heap'){
			sortObj.initRandomSort(sortObj.sortVal,'heap');
		}else{
			sortObj.initRandomSort(sortObj.sortVal,'notHeap');
		}
 		$(window).scrollTop(450);

 		//启用禁用开始按钮
 		$("#start").show();
 		$("#restart").show();
 		$("#start").removeAttr('disabled');
 		$("#restart").attr('disabled', true);
 		$("#start").removeClass('btn_hover');
 		$("#restart").addClass('btn_hover');

 		//显示排序分析
 		if (currSort != null) { //切换算法显示不同的信息，数据来自data.js
 			var currSortTime = currSort + "Time";
 			var currSortSpace = currSort + "Space";
 			var currSortStab = currSort + "Stab";
 		} else { //默认为冒泡排序
 			var currSortTime = "bubbleTime";
 			var currSortSpace = "bubbleSpace";
 			var currSortStab = "bubbleStab";
 		}
		// console.log(currSortTime)
 		for (item in time) {
 			if (item == currSortTime) {
 				$(".analyse_container_right p").eq(0).text(time[item]);
 			}
 		}
 		for (item in space) {
 			if (item == currSortSpace) {
 				$(".analyse_container_right p").eq(1).text(space[item]);
 			}
 		}
 		for (item in stab) {
 			if (item == currSortStab) {
 				$(".analyse_container_right p").eq(2).text(stab[item]);
 			}
 		}
 	});
 	// --------------------------------------------数据个数,排序速度按钮--------------------------------------------
 	$("#inputRange").on("change", function() {
 		$("#inputRange").css("backgroundSize", (100 / 15) * $("#inputRange").val());
 		$("#inputNum").val($("#inputRange").val());
 		sortObj.sortNum = $("#inputRange").val();
 	})
 	$("#inputNum").on("change", function() {
 		$("#inputRange").css("backgroundSize", (100 / 15) * $("#inputNum").val());
 		$("#inputRange").val($("#inputNum").val());
 		if ($("#inputNum").val() > 15) $("#inputNum").val(15);
 		if ($("#inputNum").val() < 2) $("#inputNum").val(2);
 		sortObj.sortNum = $("#inputNum").val();
 	})
 	// --------------------------------------------//////////////排序速度控制
 	$("#speedRange").on("change", function() {
 		$("#speedRange").css("backgroundSize", (100 / 6) * $("#speedRange").val());
 		$("#sortSpeed").val($("#speedRange").val());
 		sortObj.sortSpeed = $("#speedRange").val();
 		sortObj.duration = (7 - sortObj.sortSpeed) * 500;
 	})
 	$("#sortSpeed").on("change", function() {
 		$("#speedRange").css("backgroundSize", (100 / 6) * $("#sortSpeed").val());
 		$("#speedRange").val($("#sortSpeed").val());
 		if ($("#sortSpeed").val() > 6) $("#sortSpeed").val(6);
 		if ($("#sortSpeed").val() < 1) $("#sortSpeed").val(1);
 		sortObj.sortSpeed = $("#sortSpeed").val();
 		sortObj.duration = (7 - sortObj.sortSpeed) * 500;
 	})
 	// --------------------------------------------开始,重开按钮--------------------------------------------
 	$("#start").click(function() {
		if(currSort == null) currSort = 'bubble'
		console.log(currSort)
 		var sortValue = new Array();
 		for (var i = 0; i < sortObj.sortVal.length; i++) {
 			sortValue.push(sortObj.sortVal[i]);
 		}
 		if (currSort == 'bubble') {
 			sortObj.bubbleSort(sortValue);
 		}
 		if (currSort == 'insert') {
 			sortObj.insertSort(sortValue);
 		}
 		if (currSort == 'select') {
 			sortObj.selectSort(sortValue);
 		}
		if (currSort == 'quick') {
			sortObj.quickSort(sortValue,0,sortObj.sortNum - 1);
		}
		if (currSort == 'shell') {
			sortObj.shellSort(sortValue);
		}
		if (currSort == 'merge') {
			sortObj.mergeSort(sortValue);
		}
		if (currSort == 'heap') {
			sortObj.heapSort(sortValue);
		}
 		sortObj.startSort();
 		////启用禁用开始按钮
 		$(this).attr('disabled', true);
 		$("#restart").removeAttr('disabled');
 		$(this).addClass("btn_hover");
 		$("#restart").removeClass('btn_hover');
 		//显示排序分析
		if($(window).scrollTop() > 600){
			$('.analyse_container_left').addClass('fixedAnalyse')
		}
 	})
 	$("#restart").click(function() {
 		if (sortObj.valueType == "random") {
 			sortObj.restart();
 			sortObj.initRandomSort(sortObj.sortVal,currSort)
 			sortObj.startSort();
 		} else {
 			sortObj.restart();
 			sortObj.initInputSort($("#inputNum").val());
 			for (var i = 0; i < $("#inputNum").val(); i++) {
 				$("#inputVal input").eq(i).val(sortObj.sortVal[i]);
 			}
			console.log(currSort)
			if(currSort == 'heap'){
				sortObj.displayHeap(sortObj.sortVal);
			}else{
				sortObj.displayBlock(sortObj.sortVal);
			}
 			sortObj.startSort();
 		}

 	})
 	// --------------------------------------------返回顶部按钮--------------------------------------------
 	//监听滚动条
 	$(window).scroll(function() {
 		if ($(window).scrollTop() < 400) {
 			$("#backTop").hide();
 		} else {
 			$("#backTop").show();
 		}
		// 分析面板
		if ($(window).scrollTop() < 600) {
			$('.analyse_container_left').removeClass('fixedAnalyse')
		} else {
			$('.analyse_container_left').addClass('fixedAnalyse')
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
 	CanvasParticle(config); //调用背景粒子


 });
