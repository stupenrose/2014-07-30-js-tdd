define([ "iUser", "bar"], function(iUser, Bar) {
    
    test("my bar test", function(){
        var fakeUser = iUser.stub({name:"larry"});
        
        var bar = Bar(fakeUser);
        
        equal(bar.sayHi(), "hi larry");
    });
});