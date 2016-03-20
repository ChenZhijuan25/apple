window.onload=function(){
	// var imgbox=$(".imgbox")[0];

	// 	var btn=$(".btn");
	// 	var num=1;
	// 	function move(){
	// 		if(num==4){
	// 			animate(imgbox,{left:-800*num},600,Tween.Linear,function(){imgbox.style.left=0;});
	// 			num=0;
	// 		}else{
	// 			animate(imgbox,{left:-800*num},600,Tween.Linear);
	// 		}
 //            for(var i=0;i<btn.length;i++){
 //                btn[i].style.background="#000";
 //            }
 //            btn[num].style.background="#fff";
	// 		num++;
	// 	}

       //-----lunbo--------
  var num =0;
    var move=function(){
        num++;
        if (num == $(".box .list").length - 1){
            $(".box").animate({marginLeft: -num * 100 + "%"},function(){
                $(".box").css({marginLeft:0});
            });
            num=0;
        }else {
            $(".box").animate({marginLeft:-num*100+"%"});
        }
        $(".boxs li").css({background:"#888",border:"none"});
        $(".boxs li").eq(num).css({background:"none",border:"1px solid blue"});
    }
    var t= setInterval(move,2000);
    $(".boxs li").click(function(){
        clearInterval(t);
        var index = $(this).index(".boxs li");
        num=index;
        $(".boxs li").css({background:"#888",border:"none"});
        $(this).css({background:"none",border:"1px solid #6262EE"});
        $(".box").animate({marginLeft:-num*100+"%"});
    })
    $(".box").hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,4000);
    })
    $(".boxs li").hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,4000);
    })
    $(".title").click(function(){
        $(this).next(".list-list").slideToggle({display:"block"});
    })
    touch.on(".box","dragstart",function(){
        margin=$(".box")[0].offsetLeft;
    })
    touch.on(".box","drag",function(e){
        $(".box").css({marginLeft:margin+e.x});
    })
    touch.on(".box","dragend",function(e){
        if(Math.abs(e.x)>300|| e.factor<5){
            if(e.direction=="left"){
                num++;
                if (num==$(".box .list").length-1){
                    $(".box").animate({marginLeft:-num*100+"%"},function(){
                        $(".box").css({maginLeft:0});
                    });
                    num=0;
                }else {
                    $(".box").animate({marginLeft:-num*100+"%"});
                }
            }else if(e.direction=="right") {
                num--;
                if (num==-1){
                    num=0;
                    $(".box").animate({marginLeft:-num*100+"%"});
                }else {
                    $(".box").animate({marginLeft:-num*100+"%"});
                }
            }
        }else{
            $(".box").animate({marginLeft:-num*100+"%"});
        }
        console.log(e.factor);//速率
    })
    $(".box").mousedown(function(e){
        e.preventDefault();
    })
    touch.on('.rotate', 'touchstart', function(ev){
        ev.startRotate();
        ev.preventDefault();
    });
    touch.on(".rotate","rotate",function(e){
        $(this).css("transform","rotate("+e.rotation+"deg)");
    })
}