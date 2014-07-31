define(["jquery"], function($){
    
    return function(method, url, data){
        var result;
        
        var opts = {
                url:url,
                type:method,
                async:false,
                data:JSON.stringify(data),
                contentType:"application/json",
                success:function(data){
                    result = data;
                }
            };
        
        $.ajax(opts);
        
        return result;
        
    };
    
});