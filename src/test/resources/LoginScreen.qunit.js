define(["jquery"], function($){
    
    
    function LoginScreen(myDom, onLogin){
        var parts = $('<div><input type="text"/><button>login</button></div>');
        
        myDom.append(parts);
        
        parts.find("button").click(function(){
            onLogin(parts.find("input").val());
        });
    }
    
    test("has a text box for the username and a login button", function(){
        // given
        
        var view = $("<div/>");
        
        // when
        LoginScreen(view);
        
        // then
        var inputs = view.find("input");
        equal(inputs.length, 1);
        equal(view.find("button").length, 1);
        
        
        
    });
    
    
    test("invokes onLogin callback when the user logs in", function(){
        // given
        var view = $("<div/>");
        var userWhoLoggedIn;
        var callback = function(user){
            userWhoLoggedIn = user;
        };
        LoginScreen(view, callback);
        view.find("input").val("freddy");
        
        // when
        view.find("button").click();
        
        // then
        equal(userWhoLoggedIn, "freddy");
        $("body").append(view);
    });
});