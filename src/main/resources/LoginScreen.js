define([], function(){
    
    return function LoginScreen(view, onLogin){
        
        var parts = $('<div><h1>Who are you?</h1><input type="text"></input><button>login</button></div>');

        parts.appendTo(view);
        
        parts.find("button").click(function(){
            var user = parts.find("input").val();
            console.log("user logged on:", user);
            onLogin(user);
        });
    };
});