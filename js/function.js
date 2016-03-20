// 1.兼容函数 
// 功能
// 参数说明：
    function getClass(classname,obj){
        var obj=obj||document;
        if(obj.getElementsByClassName){ // 判断是w3c浏览器
            return obj.getElementsByClassName(classname); //结果返回
        }else{  //否则是IE8
            var all=obj.getElementsByTagName("*"); //用标签名先获取到所有元素，是一个集合
            var arr=[]; //新数组，用来保存找到的元素
            for(i=0;i<all.length;i++){ //遍历这个all
                if(checkRel(all[i].className,classname)){
                    arr.push(arr[i]);
                }
            }
        }
        return arr
    }
    // "inner one"["inner","one"]
    // 参数说明：str：多个类名集合以后的字符串
    //           val:想找的类名
    function checkRel(str,val){
        var newarr=str.split(" "); //字符串转换成数组，以空格拆分
        for (var i=0;i<newarr.length;i++){ //遍历数组
            if(newarr[i]==val){ //如果数组中的与val相同
                return true; // 否则true，说明找到
            }
        }
        return false;  // 否则返回false,说明没有找到
    }

/*********************************/

    /*2.可以获取与设置纯文本的兼容问题
    obj:那个对象用这个方法
    val:接受第二个实参，表示设置一个文本*/
    function getText(obj,val){  //undefined  
        if(val==undefined){  //如果val为undefined，表示之表示一个参数，这个函数实现的功能获取文本
            if(obj.innerText){  //如果为真是ie8浏览器
                return obj.innerText;
            }
            else{  // 是w3c浏览器
                return obj.textContent
            }
        }else{
            if(obj.innerText||obj.innerText==""){// ie8,当浏览器有innerText这个属性时，或者当对象的内容为空字符串时，都可以给这个对象设置文本
                obj.innerText=val;
            }
            else{ // W3C
                obj.textContent=val;
            }
        }
    }


/*********************************/

// 3.获取样式
// obj:哪个对象  attr:哪个属性
function getStyle(obj,attr){
    if(obj.currentStyle){ //IE8
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
} 

/*********************************/

// 4.获取对象
/*
    $(".box");   类名
    $("#fisrt"); ID名
    $("div");    标签名
*/
function $(select,obj){
    var obj=obj||document;
    if(typeof select=="string"){
        select=select.replace(/^\s*|\s*$/g,"");
        if(select.charAt(0)=="."){  //类名
            return getClass(select.slice(1),obj);
        }else if(select.charAt(0)=="#"){  //Id名
            return obj.getElementById(select.slice(1),obj);
        }else if(/^[a-z|1-6]{1,10}$/g.test(select)){// 标签名
            return obj.getElementsByTagName(select);
        }
    }else if(typeof select=="function"){  // 表示是一个函数
        window.onload=function(){
            select();
        }
    }
}