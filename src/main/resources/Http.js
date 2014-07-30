define(["jquery"], function($){
    
    return function(method, url){
        var result;
        
        $.ajax(url, {
            method:method,
            async:false,
            success:function(data){
                result = data;
            }
        });
        
        return result;
        
    };
    
});