define(["LoginScreen"], function(LoginScreen){
    
    test("allows users to log-in", function(){
        // given
        var view, userReceived;
        
        view = $("<div/>");
        
        LoginScreen(view, function(user){
            userReceived = user;
        });
        
        view.find("input").val("sally");
        
        // when
        view.find("button").click();
        
        // then
        equal(userReceived, "sally");
    });
});