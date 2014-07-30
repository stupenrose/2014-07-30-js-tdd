define(["jquery", "Http", "util", "ElectionsScreen"], function($, Http, util, ElectionsScreen){
    
    test("lists the elections in the system", function(){
        // given: a system with elections
        var view = $("<div></div>");
        var elections = [{name:"foo"}, {name:"bar"}];
        var fakeHttp = function(method, url){
            if(method === "GET" && url === "/elections"){
                return elections;
            }else{
                throw "NOT MOCKED: " + method + ":" + url;
            }
        };
        
        // when: the screen is created
        ElectionsScreen({view:view, http:fakeHttp});
        
        // then: the elections are visible
        var entriesOnPage = view.find("button.election-entry");
        equal(entriesOnPage.length, 2);
        equal($(entriesOnPage[0]).text(), "foo");
    });
    
    test("clicking on an election takes you to the next screen", function(){
        // given: an elections screen
        var view = $("<div></div>");
        var elections = [{name:"foo"}];
        var result;
        var fakeHttp = function(method, url){
            if(method === "GET" && url === "/elections"){
                return elections;
            }else{
                throw "NOT MOCKED: " + method + ":" + url;
            }
        };
        
        function onSelect(selection){result = selection;}
        ElectionsScreen({view:view, http:fakeHttp, onSelect:onSelect});
        
        // when: you click on an election
        view.find("button.election-entry").click();
        
        // then: the onSelect is called with the election name
        equal(result, "foo");
    });
});