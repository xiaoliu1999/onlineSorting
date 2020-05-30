 // 当前排序类型，默认为冒泡排序
 var currentSort="bubbleSort";
 // 各种排序的排序结束
 var Info={
	 bubbleInfo:"从前向后（或从后向前）依次比较相邻两个元素的大小,如果逆序就进行交换,使最小（最大）的元素上浮（下沉）到本次排序的最前面（最后面），从而完成一趟排序。下一趟排序时，已经有序的元素不再参与。",
	 insertInfo:"将数组的第一个数认为是有序数组，从后往前（从前往后）扫描该有序数组，把数组中其余n-1个数，根据数值的大小，插入到有序数组中，直至数组中的所有数有序排列为止。",
	 selectInfo:"第一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，然后再从剩余的未排序元素中寻找到最小（大）元素，然后放到已排序的序列的末尾。",
	 shellInfo:"把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止。",
	 heapInfo:"堆排序是选择排序的一种.利用大顶堆和小顶堆的特性,能快速选取最大值或最小值,通过堆的调整快速实现元素交换,从而优化选择排序的排序效率.是一种不稳定的排序.",
 }
 // 排序的实现伪码，使用Unicode编码存储。可在https://www.sojson.com/unicode.html 在线转换
 var Code={
	 bubbleCode:"&#102;&#117;&#110;&#99;&#116;&#105;&#111;&#110;&#32;&#98;&#117;&#98;&#98;&#108;&#101;&#83;&#111;&#114;&#116;&#40;&#97;&#114;&#114;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#118;&#97;&#114;&#32;&#115;&#111;&#114;&#116;&#101;&#100;&#61;&#116;&#114;&#117;&#101;&#59;&#47;&#47;&#26631;&#35760;&#27492;&#36255;&#25490;&#24207;&#26159;&#21542;&#26377;&#20132;&#25442;&#10;&#9;&#102;&#111;&#114;&#32;&#40;&#118;&#97;&#114;&#32;&#105;&#32;&#61;&#32;&#48;&#59;&#32;&#105;&#32;&#60;&#32;&#97;&#114;&#114;&#46;&#108;&#101;&#110;&#103;&#116;&#104;&#38;&#38;&#32;&#115;&#111;&#114;&#116;&#101;&#100;&#59;&#32;&#105;&#43;&#43;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#115;&#111;&#114;&#116;&#101;&#100;&#61;&#102;&#97;&#108;&#115;&#101;&#59;&#10;&#9;&#9;&#102;&#111;&#114;&#32;&#40;&#118;&#97;&#114;&#32;&#106;&#32;&#61;&#32;&#48;&#59;&#32;&#106;&#32;&#60;&#32;&#97;&#114;&#114;&#46;&#108;&#101;&#110;&#103;&#116;&#104;&#45;&#32;&#49;&#32;&#45;&#32;&#105;&#59;&#32;&#106;&#43;&#43;&#41;&#32;&#123;&#10;&#9;&#9;&#9;&#105;&#102;&#32;&#40;&#97;&#114;&#114;&#91;&#106;&#93;&#32;&#62;&#32;&#97;&#114;&#114;&#91;&#106;&#43;&#49;&#93;&#41;&#32;&#123;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#47;&#47;&#30456;&#37051;&#20803;&#32032;&#20004;&#20004;&#23545;&#27604;&#10;&#9;&#9;&#9;&#9;&#118;&#97;&#114;&#32;&#116;&#101;&#109;&#112;&#32;&#61;&#32;&#97;&#114;&#114;&#91;&#106;&#43;&#49;&#93;&#59;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#47;&#47;&#20803;&#32032;&#20132;&#25442;&#10;&#9;&#9;&#9;&#9;&#97;&#114;&#114;&#91;&#106;&#43;&#49;&#93;&#32;&#61;&#32;&#97;&#114;&#114;&#91;&#106;&#93;&#59;&#10;&#9;&#9;&#9;&#9;&#97;&#114;&#114;&#91;&#106;&#93;&#32;&#61;&#32;&#116;&#101;&#109;&#112;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#115;&#111;&#114;&#116;&#101;&#100;&#61;&#116;&#114;&#117;&#101;&#59;&#10;&#9;&#9;&#9;&#125;&#10;&#9;&#9;&#125;&#10;&#9;&#125;&#10;&#9;&#114;&#101;&#116;&#117;&#114;&#110;&#32;&#97;&#114;&#114;&#59;&#10;&#125;",
	 insertCode:"&#102;&#117;&#110;&#99;&#116;&#105;&#111;&#110;&#32;&#105;&#110;&#115;&#101;&#114;&#116;&#105;&#111;&#110;&#83;&#111;&#114;&#116;&#40;&#97;&#114;&#114;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#118;&#97;&#114;&#32;&#108;&#101;&#110;&#32;&#61;&#32;&#97;&#114;&#114;&#46;&#108;&#101;&#110;&#103;&#116;&#104;&#59;&#10;&#32;&#32;&#32;&#32;&#118;&#97;&#114;&#32;&#112;&#114;&#101;&#73;&#110;&#100;&#101;&#120;&#44;&#32;&#99;&#117;&#114;&#114;&#101;&#110;&#116;&#59;&#10;&#32;&#32;&#32;&#32;&#102;&#111;&#114;&#32;&#40;&#118;&#97;&#114;&#32;&#105;&#32;&#61;&#32;&#49;&#59;&#32;&#105;&#32;&#60;&#32;&#108;&#101;&#110;&#59;&#32;&#105;&#43;&#43;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#112;&#114;&#101;&#73;&#110;&#100;&#101;&#120;&#32;&#61;&#32;&#105;&#32;&#45;&#32;&#49;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#99;&#117;&#114;&#114;&#101;&#110;&#116;&#32;&#61;&#32;&#97;&#114;&#114;&#91;&#105;&#93;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#119;&#104;&#105;&#108;&#101;&#40;&#112;&#114;&#101;&#73;&#110;&#100;&#101;&#120;&#32;&#62;&#61;&#32;&#48;&#32;&#38;&#38;&#32;&#97;&#114;&#114;&#91;&#112;&#114;&#101;&#73;&#110;&#100;&#101;&#120;&#93;&#32;&#62;&#32;&#99;&#117;&#114;&#114;&#101;&#110;&#116;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#97;&#114;&#114;&#91;&#112;&#114;&#101;&#73;&#110;&#100;&#101;&#120;&#43;&#49;&#93;&#32;&#61;&#32;&#97;&#114;&#114;&#91;&#112;&#114;&#101;&#73;&#110;&#100;&#101;&#120;&#93;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#112;&#114;&#101;&#73;&#110;&#100;&#101;&#120;&#45;&#45;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#125;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#97;&#114;&#114;&#91;&#112;&#114;&#101;&#73;&#110;&#100;&#101;&#120;&#43;&#49;&#93;&#32;&#61;&#32;&#99;&#117;&#114;&#114;&#101;&#110;&#116;&#59;&#10;&#32;&#32;&#32;&#32;&#125;&#10;&#32;&#32;&#32;&#32;&#114;&#101;&#116;&#117;&#114;&#110;&#32;&#97;&#114;&#114;&#59;&#10;&#125;",
	 selectCode:"&#102;&#117;&#110;&#99;&#116;&#105;&#111;&#110;&#32;&#115;&#101;&#108;&#101;&#99;&#116;&#105;&#111;&#110;&#83;&#111;&#114;&#116;&#40;&#97;&#114;&#114;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#118;&#97;&#114;&#32;&#109;&#105;&#110;&#73;&#110;&#100;&#101;&#120;&#44;&#32;&#116;&#101;&#109;&#112;&#59;&#10;&#32;&#32;&#32;&#32;&#102;&#111;&#114;&#32;&#40;&#118;&#97;&#114;&#32;&#105;&#32;&#61;&#32;&#48;&#59;&#32;&#105;&#32;&#60;&#32;&#97;&#114;&#114;&#46;&#108;&#101;&#110;&#103;&#116;&#104;&#45;&#32;&#49;&#59;&#32;&#105;&#43;&#43;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#109;&#105;&#110;&#73;&#110;&#100;&#101;&#120;&#32;&#61;&#32;&#105;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#102;&#111;&#114;&#32;&#40;&#118;&#97;&#114;&#32;&#106;&#32;&#61;&#32;&#105;&#32;&#43;&#32;&#49;&#59;&#32;&#106;&#32;&#60;&#32;&#108;&#101;&#110;&#59;&#32;&#106;&#43;&#43;&#41;&#32;&#123;&#47;&#47;&#23547;&#25214;&#26368;&#23567;&#30340;&#25968;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#105;&#102;&#32;&#40;&#97;&#114;&#114;&#91;&#106;&#93;&#32;&#60;&#32;&#97;&#114;&#114;&#91;&#109;&#105;&#110;&#73;&#110;&#100;&#101;&#120;&#93;&#41;&#32;&#123;&#32;&#32;&#32;&#32;&#32;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#109;&#105;&#110;&#73;&#110;&#100;&#101;&#120;&#32;&#61;&#32;&#106;&#59;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#125;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#125;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#116;&#101;&#109;&#112;&#32;&#61;&#32;&#97;&#114;&#114;&#91;&#105;&#93;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#97;&#114;&#114;&#91;&#105;&#93;&#32;&#61;&#32;&#97;&#114;&#114;&#91;&#109;&#105;&#110;&#73;&#110;&#100;&#101;&#120;&#93;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#97;&#114;&#114;&#91;&#109;&#105;&#110;&#73;&#110;&#100;&#101;&#120;&#93;&#32;&#61;&#32;&#116;&#101;&#109;&#112;&#59;&#10;&#32;&#32;&#32;&#32;&#125;&#10;&#32;&#32;&#32;&#32;&#114;&#101;&#116;&#117;&#114;&#110;&#32;&#97;&#114;&#114;&#59;&#10;&#125;",
	shellCode:"&#102;&#117;&#110;&#99;&#116;&#105;&#111;&#110;&#32;&#115;&#104;&#101;&#108;&#108;&#83;&#111;&#114;&#116;&#40;&#97;&#114;&#114;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#118;&#97;&#114;&#32;&#108;&#101;&#110;&#32;&#61;&#32;&#97;&#114;&#114;&#46;&#108;&#101;&#110;&#103;&#116;&#104;&#44;&#116;&#101;&#109;&#112;&#44;&#103;&#97;&#112;&#32;&#61;&#32;&#49;&#59;&#10;&#32;&#32;&#32;&#32;&#119;&#104;&#105;&#108;&#101;&#40;&#103;&#97;&#112;&#32;&#60;&#32;&#108;&#101;&#110;&#47;&#51;&#41;&#32;&#123;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#47;&#47;&#21160;&#24577;&#23450;&#20041;&#38388;&#38548;&#24207;&#21015;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#103;&#97;&#112;&#32;&#61;&#103;&#97;&#112;&#42;&#51;&#43;&#49;&#59;&#10;&#32;&#32;&#32;&#32;&#125;&#10;&#32;&#32;&#32;&#32;&#102;&#111;&#114;&#32;&#40;&#103;&#97;&#112;&#59;&#32;&#103;&#97;&#112;&#32;&#62;&#32;&#48;&#59;&#32;&#103;&#97;&#112;&#32;&#61;&#32;&#77;&#97;&#116;&#104;&#46;&#102;&#108;&#111;&#111;&#114;&#40;&#103;&#97;&#112;&#47;&#51;&#41;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#102;&#111;&#114;&#32;&#40;&#118;&#97;&#114;&#32;&#105;&#32;&#61;&#32;&#103;&#97;&#112;&#59;&#32;&#105;&#32;&#60;&#32;&#108;&#101;&#110;&#59;&#32;&#105;&#43;&#43;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#116;&#101;&#109;&#112;&#32;&#61;&#32;&#97;&#114;&#114;&#91;&#105;&#93;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#102;&#111;&#114;&#32;&#40;&#118;&#97;&#114;&#32;&#106;&#32;&#61;&#32;&#105;&#45;&#103;&#97;&#112;&#59;&#32;&#106;&#32;&#62;&#61;&#32;&#48;&#32;&#38;&#38;&#32;&#97;&#114;&#114;&#91;&#106;&#93;&#32;&#62;&#32;&#116;&#101;&#109;&#112;&#59;&#32;&#106;&#45;&#61;&#103;&#97;&#112;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#97;&#114;&#114;&#91;&#106;&#43;&#103;&#97;&#112;&#93;&#32;&#61;&#32;&#97;&#114;&#114;&#91;&#106;&#93;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#125;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#97;&#114;&#114;&#91;&#106;&#43;&#103;&#97;&#112;&#93;&#32;&#61;&#32;&#116;&#101;&#109;&#112;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#125;&#10;&#32;&#32;&#32;&#32;&#125;&#10;&#32;&#32;&#32;&#32;&#114;&#101;&#116;&#117;&#114;&#110;&#32;&#97;&#114;&#114;&#59;&#10;&#125;",
	heapCode:"&#118;&#97;&#114;&#32;&#108;&#101;&#110;&#59;&#32;&#32;&#32;&#32;&#47;&#47;&#22240;&#20026;&#22768;&#26126;&#30340;&#22810;&#20010;&#20989;&#25968;&#37117;&#38656;&#35201;&#25968;&#25454;&#38271;&#24230;&#65292;&#25152;&#20197;&#25226;&#108;&#101;&#110;&#35774;&#32622;&#25104;&#20026;&#20840;&#23616;&#21464;&#37327;&#10;&#102;&#117;&#110;&#99;&#116;&#105;&#111;&#110;&#32;&#98;&#117;&#105;&#108;&#100;&#77;&#97;&#120;&#72;&#101;&#97;&#112;&#40;&#97;&#114;&#114;&#41;&#32;&#123;&#32;&#32;&#32;&#47;&#47;&#24314;&#31435;&#22823;&#39030;&#22534;&#10;&#32;&#32;&#32;&#32;&#108;&#101;&#110;&#32;&#61;&#32;&#97;&#114;&#114;&#46;&#108;&#101;&#110;&#103;&#116;&#104;&#59;&#10;&#32;&#32;&#32;&#32;&#102;&#111;&#114;&#32;&#40;&#118;&#97;&#114;&#32;&#105;&#32;&#61;&#32;&#77;&#97;&#116;&#104;&#46;&#102;&#108;&#111;&#111;&#114;&#40;&#108;&#101;&#110;&#47;&#50;&#41;&#59;&#32;&#105;&#32;&#62;&#61;&#32;&#48;&#59;&#32;&#105;&#45;&#45;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#104;&#101;&#97;&#112;&#105;&#102;&#121;&#40;&#97;&#114;&#114;&#44;&#32;&#105;&#41;&#59;&#10;&#32;&#32;&#32;&#32;&#125;&#10;&#125;&#10;&#102;&#117;&#110;&#99;&#116;&#105;&#111;&#110;&#32;&#104;&#101;&#97;&#112;&#105;&#102;&#121;&#40;&#97;&#114;&#114;&#44;&#32;&#105;&#41;&#32;&#123;&#32;&#32;&#32;&#32;&#32;&#47;&#47;&#22534;&#35843;&#25972;&#10;&#32;&#32;&#32;&#32;&#118;&#97;&#114;&#32;&#108;&#101;&#102;&#116;&#32;&#61;&#32;&#50;&#32;&#42;&#32;&#105;&#32;&#43;&#32;&#49;&#44;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#114;&#105;&#103;&#104;&#116;&#32;&#61;&#32;&#50;&#32;&#42;&#32;&#105;&#32;&#43;&#32;&#50;&#44;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#108;&#97;&#114;&#103;&#101;&#115;&#116;&#32;&#61;&#32;&#105;&#59;&#10;&#10;&#32;&#32;&#32;&#32;&#105;&#102;&#32;&#40;&#108;&#101;&#102;&#116;&#32;&#60;&#32;&#108;&#101;&#110;&#32;&#38;&#38;&#32;&#97;&#114;&#114;&#91;&#108;&#101;&#102;&#116;&#93;&#32;&#62;&#32;&#97;&#114;&#114;&#91;&#108;&#97;&#114;&#103;&#101;&#115;&#116;&#93;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#108;&#97;&#114;&#103;&#101;&#115;&#116;&#32;&#61;&#32;&#108;&#101;&#102;&#116;&#59;&#10;&#32;&#32;&#32;&#32;&#125;&#10;&#10;&#32;&#32;&#32;&#32;&#105;&#102;&#32;&#40;&#114;&#105;&#103;&#104;&#116;&#32;&#60;&#32;&#108;&#101;&#110;&#32;&#38;&#38;&#32;&#97;&#114;&#114;&#91;&#114;&#105;&#103;&#104;&#116;&#93;&#32;&#62;&#32;&#97;&#114;&#114;&#91;&#108;&#97;&#114;&#103;&#101;&#115;&#116;&#93;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#108;&#97;&#114;&#103;&#101;&#115;&#116;&#32;&#61;&#32;&#114;&#105;&#103;&#104;&#116;&#59;&#10;&#32;&#32;&#32;&#32;&#125;&#10;&#32;&#32;&#32;&#32;&#105;&#102;&#32;&#40;&#108;&#97;&#114;&#103;&#101;&#115;&#116;&#32;&#33;&#61;&#32;&#105;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#115;&#119;&#97;&#112;&#40;&#97;&#114;&#114;&#44;&#32;&#105;&#44;&#32;&#108;&#97;&#114;&#103;&#101;&#115;&#116;&#41;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#104;&#101;&#97;&#112;&#105;&#102;&#121;&#40;&#97;&#114;&#114;&#44;&#32;&#108;&#97;&#114;&#103;&#101;&#115;&#116;&#41;&#59;&#10;&#32;&#32;&#32;&#32;&#125;&#10;&#125;&#10;&#102;&#117;&#110;&#99;&#116;&#105;&#111;&#110;&#32;&#115;&#119;&#97;&#112;&#40;&#97;&#114;&#114;&#44;&#32;&#105;&#44;&#32;&#106;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#118;&#97;&#114;&#32;&#116;&#101;&#109;&#112;&#32;&#61;&#32;&#97;&#114;&#114;&#91;&#105;&#93;&#59;&#10;&#32;&#32;&#32;&#32;&#97;&#114;&#114;&#91;&#105;&#93;&#32;&#61;&#32;&#97;&#114;&#114;&#91;&#106;&#93;&#59;&#10;&#32;&#32;&#32;&#32;&#97;&#114;&#114;&#91;&#106;&#93;&#32;&#61;&#32;&#116;&#101;&#109;&#112;&#59;&#10;&#125;&#10;&#102;&#117;&#110;&#99;&#116;&#105;&#111;&#110;&#32;&#104;&#101;&#97;&#112;&#83;&#111;&#114;&#116;&#40;&#97;&#114;&#114;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#98;&#117;&#105;&#108;&#100;&#77;&#97;&#120;&#72;&#101;&#97;&#112;&#40;&#97;&#114;&#114;&#41;&#59;&#10;&#10;&#32;&#32;&#32;&#32;&#102;&#111;&#114;&#32;&#40;&#118;&#97;&#114;&#32;&#105;&#32;&#61;&#32;&#97;&#114;&#114;&#46;&#108;&#101;&#110;&#103;&#116;&#104;&#45;&#49;&#59;&#32;&#105;&#32;&#62;&#32;&#48;&#59;&#32;&#105;&#45;&#45;&#41;&#32;&#123;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#115;&#119;&#97;&#112;&#40;&#97;&#114;&#114;&#44;&#32;&#48;&#44;&#32;&#105;&#41;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#108;&#101;&#110;&#45;&#45;&#59;&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#104;&#101;&#97;&#112;&#105;&#102;&#121;&#40;&#97;&#114;&#114;&#44;&#32;&#48;&#41;&#59;&#10;&#32;&#32;&#32;&#32;&#125;&#10;&#32;&#32;&#32;&#32;&#114;&#101;&#116;&#117;&#114;&#110;&#32;&#97;&#114;&#114;&#59;&#10;&#125;",
}
// 排序算法的时间复杂度
var time={
	bubbleTime:"时间复杂度:O（n²）",
	insertTime:"时间复杂度:O（n²）",
	selectTime:"时间复杂度：O(n²)",
	shellTime:"时间复杂度：O(nlogn)",
	heapTime:"时间复杂度：O(nlogn)",
	
}
// 排序算法的空间复杂度
var space={
	bubbleSpace:"空间复杂度：O（1）",
	insertSpace:"空间复杂度：O（1）",
	selectSpace:"空间复杂度：O(1)",
	shellSpace:"空间复杂度：O(1)",
	heapSpace:"空间复杂度：O(1)",
}
var stab={
	bubbleStab:"稳定性：稳定",
	insertStab:"稳定性：稳定",
	selectStab:"稳定性：不稳定",
	shellStab:"稳定性：不稳定",
	heapStab:"稳定性：不稳定",
}
