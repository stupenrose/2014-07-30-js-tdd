define(["VotingScreen"], function(VotingScreen){
    test("all the candidates show up", function(){
        
        // given: an election with candidates
        var view = $("<div></div>");
        var candidates = [{candidate:"larry"}, {candidate:"ralph"}];
        var fakeHttp = function(method, url){
            if(method==="GET" && url === "/vote?voter=Andrew&election=foo"){
                return candidates;
            }
        };
        var fakeBallotOptionConstructor = function(opts){
            opts.view.append('<div class="fake-option">fake ' + opts.name + '</div>');
        };
        
        // when: the ballot is displayed
        VotingScreen({user:"Andrew", election:"foo", view:view, Http:fakeHttp, BallotOption:fakeBallotOptionConstructor});
        
        // then: all the options are visible
        var options = view.find(".fake-option");
        equal(options.length, 2);
        equal($(options[0]).text(), "fake larry");
        equal($(options[1]).text(), "fake ralph");
    });
    
    test("ballot selections are sent when the voter votes", function(){
        
        // given: an election with candidates
        var view = $("<div></div>");
        var candidates = [{candidate:"larry"}, {candidate:"ralph"}];
        var fakeHttp = function(method, url){
            if(method==="GET" && url === "/vote?voter=Andrew&election=foo"){
                return candidates;
            }
        };
        var voteCast;
        var fakeBallotOptionConstructor = function(opts){
            opts.view.append('<div class="fake-option">fake ' + opts.name + '</div>');
            
            var ranks = {"larry":1, "ralph":33};
            
            return {getSelection:function(){
                return {candidate:opts.name, rank:ranks[opts.name]};
            }};
        };
        
        function onVote(selections){
            voteCast = selections;
        }
        VotingScreen({user:"Andrew", election:"foo", view:view, Http:fakeHttp, BallotOption:fakeBallotOptionConstructor, onVote:onVote});
        
        // when: the vote is finalized
        view.find(".vote-button").click();
        
        // then: all the options are visible
        deepEqual([{candidate:"larry", rank:1}, {candidate:"ralph", rank:33}], voteCast);
    });
    
});