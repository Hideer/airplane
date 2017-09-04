function getrandom(min,max){//随机获取一个区间的数值--min是区间最小值--max是区间最大值
				return Math.floor(Math.random()*max)+min;
			}
			document.write(getroundom(1,10));
			
function toTwo ( n ) {//将小于两位数的时间转换成01-09格式
	return n < 10 ?  '0' + n : '' + n;
}
			

function getStyle(obj,name){//js 获取样式表的属性值！！
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
				//利用三目运算符判断（前提只呢是两个条件）
	  			/*if(obj.currentStyle){
	 				return  obj.currentStyle[name];	
	   			}else{
	 				return  getComputedStyle(obj,false)[name];
	  			}*/
}

var Oevn = ev || event;//兼容ev与event的写法没成功；
/*document.onkeydown=function(ev){
	if(ev.keyCode == 13){
		if(oinp.value == ocode.innerHTML){
			alert('恭喜你验证成功');
		}else{
			alert('请重新输入');
			oinp.value =='';
			funcode();
		}
	}
}*/

function getScrollTop(){//兼容浏览器获取scrollTop的写法
	document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
}

function byClass(sClass,sParent){//sClass:类名   sParent:父框
	var sParent=sParent||document;//如果有父框，获取父框下面的具有这个类的元素，否则父框就是document
	var eles=sParent.getElementsByTagName('*');//通配符，获取sParent下面所有的元素。
	var elearr=[];//存放类名匹配成功的元素对象。
	for(var i=0;i<eles.length;i++){
		if(eles[i].className==sClass){//所有元素的类名和当前传入的类名进行比较
			elearr.push(eles[i]);//将满足条件的元素push数组。
		}
	}
	return elearr;
}


//需要封装一个获取TagName和ClassName的函数
//封装2 id+class
function $(para,obj){
    if(para.charAt(0) == '#' ){
    //通过截取字符串来判断执行的是获取id还是class
        var arr = para.split("#");
        var idName = arr[1];
        return document.getElementById(idName);
    } else if(para.charAt(0) == '.') {
        var arr1 = para.split(".");
        var classming = arr1[1];
        obj = obj||document;
        if(obj.getElementsByClassName){
            return obj.getElementsByClassName(classming);
        } else {
            var boxClass = obj.getElementsByTagName('*');
            var arrClass = [];
            for (var i = 0; i < boxClass.length; i++) {
                var nameBox = boxClass[i].className.split(' ');
                for (var j = 0; j < nameBox.length; j++) {
                    if (nameBox[j] == classming) {
                        arrClass.push(boxClass[i]);
                    }
                };
            };
        }
    	return(arrClass);
    } else {
        return false;
    }
}


function cancelBubble(e) {//取消事件冒泡
var evt = e ? e : window.event;
if (evt.stopPropagation) {
//W3C
evt.stopPropagation();
}
else {
//IE
evt.cancelBubble = true;
} 

//cookie的获取与修改和删除
//1.获取cookie的方法。
function setcookie(key,value,day){
	var date=new Date();
	date.setDate(date.getDate()+day);//设置过期时间
	document.cookie=key+'='+encodeURI(value)+';expires='+date;
}
//2.获取cookie:传入key，输出key对应的value;
function getcookie(key){
	var arr=decodeURI(document.cookie).split('; ');//编码后拆分成数组
	for(var i=0;i<arr.length;i++){
		var newarr=arr[i].split('=');//对数组的每一项再次拆分
		if(newarr[0]==key){//比较key值
			return newarr[1];//输出key对应的value
		}
	}
}
//	删除cookie:修改过期时间，将过期时间修改成一个过去的时间
//	添加cookie时设置过期时间。
	function delcookie(key){
		setcookie(key,'value',-1);//-1:代表过去时间
	}


// alert(arr.sort(compare));//对数组进行排序参数可以使函数可以利用函数来自定义自己的排序规则
function compare(value1, value2) {//自定义排序函数
if (value1 < value2) {
	return 1;
	} else if (value1 > value2) {
	return -1;
	} else {
	return 0;
	}
}


function lowmove(target){//简单移动函数移动效果（逐渐变慢）
	var speed=0;
	clearInterval(timer);//事件先清除所有前面定时器
	timer=setInterval(function(){
		speed+=(target-oMask.offsetLeft)/6;
		speed*=0.8;
		if(Math.abs(speed)<1 && Math.abs(target-oMask.offsetLeft)<1){
			clearInterval(timer);
			oMask.style.left=target+'px';
		}
		oMask.style.left=oMask.offsetLeft+speed+'px';
	},12)
}

function move(obj,json,fn){//缓冲运动的封装
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bstop=true;//假设所有的属性都到目标点了。
		for(var attr in json){
			//求当前值
			var current=null;
			if(attr=='opacity'){
				current=Math.round(getstyle(obj,attr)*100);
			}else{
				current=parseInt(getstyle(obj,attr));
			}
			//判断速度
			var speed=(json[attr]-current)/7;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			//判断定时器停止和输出
			if(current!=json[attr]){//当前值不等于目标，继续运动。
				if(attr=='opacity'){
					obj.style[attr]=(current+speed)/100;
					obj.style.filter='alpha(opacity='+(current+speed)+')';
				}else{
					obj.style[attr]=current+speed+'px';
				}
				bstop=false;
			}
		}
		if(bstop){
			clearInterval(obj.timer);
			fn&&fn();	
		}
			
	},20)
}


//判断从物体什么方向移动出的！！！！（0,1,2,3“分别代表上右下左”）
/*var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);//求出坐标的原点就是物体的最中心点
var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);//同上
var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;//利用算出的direction判断是从哪个方向移入移除*/ 