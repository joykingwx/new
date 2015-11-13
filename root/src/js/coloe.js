/**
 * Created by Administrator on 2015/11/5 0005.
 */
var color = {
    a : '红色',
    b : "绿色",
    c : function(val){
            if(val== 'null'){
                val = color.a;
            }
            return val;
    }
};