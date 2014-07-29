define(["iUser"], function module(Foo){
    
    return function constructor(rawFoo){
        var safeFoo = Foo.dynamic(rawFoo);
        
        return {
            sayHi:function(){
                return "hi " + safeFoo.name;
            }
        };
    };
});