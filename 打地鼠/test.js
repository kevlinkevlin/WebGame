window.onload = function () {
    //初始化
    class_game._init();
};
//全局




var dingshiqi = null;
var clicked = 0;           //已经打到的地鼠
var all = 0;               //所有的地鼠
var text1Id = "score";        //文字的ID
var text2Id = "all_dig";        //文字的ID
//var text3Id = "time_pass";      //時間倒數       
var isClick = false;   //判斷按鈕事件
var time = 1000;       //地鼠出来間隔的時間
var diglett_num = 1;          //每次出来的地鼠數量


//打地鼠事件
function click_box(_this) {
    var id = _this.id;
    var class_name = _this.className;
    if(class_name !== "box"){
    class_base._get(id).setAttribute("class","diglett_down");
    }
    if (class_name === "cat_gold"){
        clicked += 10;
    }else if (class_name === "cat_silver"){
        clicked += 8;
    }else if (class_name === "cat_bronze"){
        clicked += 5;
    }else if (class_name === "cat_red"){
        clicked += 3;
    }
    class_base.setText(text1Id,clicked);
}
//按钮點擊事件
function click_button(_this) {
    all = 0;
    clicked = 0;
    diglett_num = 1;
    countDown();
    class_base.setText("score",clicked);
    class_base._get("button").style.display = "none";
    class_base._get("transparent").style.display = "none";
    class_game._draw_diglett();
    class_game._timecount();

    }

var class_game = {
    _column : 4, //行內個數
    _row : 4,   //列內個數
    _box_width : 0,  //格子寬度
    _box_height : 0,  //格子高度
    _box_range : 0,   //全部格子範圍
    _gametime : 30,

    _init : function() {
        this._draw();       //繪制地圖,得到一些必要的元素
        //this._draw_diglett();      //生成地鼠
    },

//生成地圖
    _draw : function(){
        var _map_width =  90;  //game_panel 寬度比例;
        var _map_height = 90;  //game_panel 高度比例;
        var _to_bottom_range = 0;  //讓格子往下移，排版用

        class_base._get("game_panel").setAttribute("style","width:" + _map_width + "%; height:" + _map_height + "%;")
        //設置地圖的寬和高
        if(class_base._get("game_panel").offsetWidth/this._row > class_base._get("game_panel").offsetHeight/this._column)
        {
        this._box_range = class_base._get("game_panel").offsetHeight;
        this._box_width = class_base._get("game_panel").offsetHeight/this._column;
        this._box_height = class_base._get("game_panel").offsetHeight/this._column;
        }else{
        this._box_range = class_base._get("game_panel").offsetWidth;
        this._box_width = class_base._get("game_panel").offsetWidth/this._row;
        this._box_height = class_base._get("game_panel").offsetWidth/this._row;
        _to_bottom_range = class_base._get("game_panel").offsetHeight - this._box_range;
        }

        
        //生成畫布 
        for (let i = 0 ; i < this._column ; i++){
            for (let j = 0 ; j < this._row ; j++){  
                var _div = class_base._create("canvas");
                _div.setAttribute("class","box");
                _div.setAttribute("id",i*this._row+j);
                _div.setAttribute("style" , "left:"+(this._box_width*j + 
                class_base._get("game_panel").offsetWidth/2 - this._box_range/2)+"px; top:"+
                (_to_bottom_range + this._box_height*i) + "px; width:" + this._box_width + "px; height:" 
                + this._box_height + "px;");
                _div.setAttribute("onclick","click_box(this)");
                class_base._get("game_panel").appendChild(_div);
            }
        }
        //得到按鈕
        var _button = class_base._get("button");
        _button.setAttribute("onclick","click_button(this)");
    },

//清除函数
    _clear : function () {
        for(let i = 0 ; i < this._column ; i ++){
            for (let j = 0 ; j < this._row ; j ++){
                var _diglett_id = i*this._row+j;
                class_base._get(_diglett_id).setAttribute("class","box");
            }
        }
    },

//生成地鼠,動態的生成隨機數量的地鼠
    _draw_diglett : function () {
        this._clear();  //清除以前的地鼠
       
        if(parseInt(diglett_num) % 1 === 0){
            all += parseInt(diglett_num); //添加地鼠總合
                   
        }
        //隨機生成地鼠id
        for (let i = 0 ; i < diglett_num ; i++){
            var num = this._row * this._column;
            var _diglett_id = Math.floor(Math.random() * num) % num;
            console.log(_diglett_id);
            //生成地鼠
            var kind = Math.ceil(Math.random() * 4);
            switch(kind)
            {
                case 1:
                class_base._get(_diglett_id).setAttribute("class","cat_gold");
                break;
                case 2:
                class_base._get(_diglett_id).setAttribute("class","cat_silver");
                break;
                case 3:
                class_base._get(_diglett_id).setAttribute("class","cat_bronze");
                break;
                case 4:
                class_base._get(_diglett_id).setAttribute("class","cat_red");
                break;
                default:
                break;
            }


        }
        //重置文本
        var text2 = class_base._get(text2Id);
        text2.innerHTML = all ;


        dingshiqi = setTimeout(function () {            
        class_game._draw_diglett();
        if(class_game._gametime < 10 && diglett_num == 1)
        {   
            console.log(class_game._gametime);
            diglett_num++;
        }else if(class_game._gametime < 5 && diglett_num == 2)
        {   
            console.log(class_game._gametime);
            diglett_num++;
        }


        if(class_game._gametime < -0.1)
        {   
            class_game._gametime = 30;  //重置_gametime
            class_game._clear();
            window.clearInterval(timecount);
            window.clearTimeout(dingshiqi);
            class_base._get("transparent").style.display = "block";
            setTimeout(function(){class_base._get("button").style.display = "block";
            },1000)
            
        }
        },time);
    },

//計時器

    _timecount : function(){
        var text3 = class_base._get("time_pass");
        timecount = setInterval(function(){
        class_game._gametime -= 0.1;
        //text3.innerHTML = Math.round(class_game._gametime*10)/10;
        },100);
        }


};
//

var class_base = {
    //封装document.getElementById
    _get : function(_id){
        return document.getElementById(_id);
    },
    _create : function (_element) {
        return document.createElement(_element);
    },
    setText : function (id , text) {
        document.getElementById(id).innerHTML = text;
    }
};


/*計時器實現*/
var gameTime = class_game._gametime;
var showTime = function(){
    totle = totle - 1;
    if (totle == 0) {    
        clearInterval(s);
        clearInterval(t1);  
    } else {
        if (totle > 0 && MS > 0) {
            MS = MS - 1;
            if (MS < 10) {
                MS = "0" + MS
            };
        };
        if (MS == 0 && SS > 0) {
            MS = 10;
            SS = SS - 1;
            if (SS < 10) {
                SS = "0" + SS
            };
        };
        if (SS == 0 && MM > 0) {
            SS = 60;
            MM = MM - 1;
            if (MM < 10) {
                MM = "0" + MM
            };
        };
    };
    $(".time").html(SS + "s");  
};
var start1 = function(){
    //i = i + 0.6;
    i = i + 360/((gameTime)*10);  //旋转的角度  90s 为 0.4  60s为0.6
    count = count + 1;
    if(count <= (gameTime/2*10)){  // 一半的角度  90s 为 450
        $(".pie2").css("backgroundColor", "#fff");
        $(".pie1").css("-o-transform","rotate(" + i + "deg)");
        $(".pie1").css("-moz-transform","rotate(" + i + "deg)");
        $(".pie1").css("-webkit-transform","rotate(" + i + "deg)");
    }else{
        $(".pie2").css("backgroundColor", "#d13c36");
        $(".pie2").css("-o-transform","rotate(" + i + "deg)");
        $(".pie2").css("-moz-transform","rotate(" + i + "deg)");
        $(".pie2").css("-webkit-transform","rotate(" + i + "deg)");
    }
};
var countDown = function() {
    i = 0;
    j = 0;
    count = 0;
    MM = 0;
    SS = gameTime;
    MS = 0;
    totle = (MM + 1) * gameTime * 10;
    d = 180 * (MM + 1);
    start1();
    t1 = setInterval("start1()", 100);
    showTime();
    s = setInterval("showTime()", 100); 
}
  



