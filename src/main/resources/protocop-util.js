define([], function(){
    function decoratedConstructor(type, c){
        function wrapper(){
            return type.dynamic(c.apply(this, arguments));
        }
        wrapper.type = type;
        return wrapper;
    }
    
    return {
        decoratedConstructor:decoratedConstructor
    };
});