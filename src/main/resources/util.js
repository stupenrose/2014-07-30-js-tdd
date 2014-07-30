define([], function(){
    function getOrDefault(opts, param, defaultValue){
        if(opts && opts[param]){
            return opts[param];
        } else {
            return defaultValue;
        }
    }
    return {getOrDefault:getOrDefault};
});