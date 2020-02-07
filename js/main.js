 //////////////////////////////////////页面加载
 $(document).ready(function() {
	 ////////////tab选项卡效果
 	$(".content_container").hide(); // Initially hide all content
 	$("#tabs li:first").attr("id", "current"); // Activate first tab
 	$("#content div:first").fadeIn(); // Show first tab content
 	$('#tabs a').click(function(e) {
 		e.preventDefault();
 		$(".content_container").hide(); //Hide all content
 		$("#tabs li").attr("id", ""); //Reset id's
 		$(this).parent().attr("id", "current"); // Activate this
 		$('#' + $(this).attr('title')).fadeIn(); // Show content for current tab
 	});
	
	////////////背景粒子
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
	//调用
	CanvasParticle(config);
	
	

	 ////////////iframe高度自适应
	 var iframeHeight=window.localStorage.getItem("iframeHeight");
	 $("#iframes").height(iframeHeight);
	 ////////////返回顶部按钮
	 $("#backTop").hide();
	 $("#backTop span").hide();
	 
	////////监听iframe高度,iframe高度改变即为显示排序过程
	window.addEventListener("storage", function (e) {
		//iframe高度自适应
	   var iframeHeight=window.localStorage.getItem("iframeHeight");
	   $("#iframes").height(iframeHeight);
	   //显示返回顶部按钮
	   if(iframeHeight>600) {
		   $("#backTop").show();
	   }
	   $(window).scrollTop(480);
	   
	});
	$(window).scroll(function(){//开始监听滚动条
		if($(window).scrollTop()<480){
			$("#backTop").hide();
		}else{
			$("#backTop").show();
		}
	});


 });
 
 //////////////////////////////////////返回顶部效果
 $("#backTop").hover(function(){
 	$("#backTop").css("opacity","1");
 	$("#backTop img").hide();
 	$("#backTop span").show();
 },function(){
 	$("#backTop").css("opacity","0.5");
 	$("#backTop img").show();
 	$("#backTop span").hide();
 });
 $("#backTop").click(function(){
	 $(window).scrollTop(0);
 });
 
