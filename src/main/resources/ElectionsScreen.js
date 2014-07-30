define(["util", "Http"], function(util, Http){
    return function ElectionsScreen(opts){
        var elections, http, view;
        
        view = opts.view;
        
        
        http = util.getOrDefault(opts, "http", Http);
        
        elections = http("GET", "/elections");
        
        view.append("<h1>On What do you Want to Vote?</h1>");
        
        
        $.each(elections, function(idx, election){
            var button = $('<button class="election-entry">' + election.name + '</button>');
            console.log("showing", election);
            button.click(function(){
                console.log("clicked on ", election);
                opts.onSelect(election.name);
            });
            button.appendTo(view);
        });
    };
});