define(["App"], function(App){
    
    test("shows login screen by default", function(){
        // given: a blank document
        var view = $("<div/>");
        var fakeLoginScreenConstructor = function(view){
            view.append("I am the login screen");
        };
        
        // when: the instance is displayed
        var app = App({view:view, LoginScreen:fakeLoginScreenConstructor});
        
        // then: the login screen should be visible
        ok(view.text().indexOf("I am the login screen") >= 0);
    });
    
    test("moves to the elections screen after login", function(){
        // given a login screen
        var view = $("<div/>");
        var simulateLogin;
        var fakeElectionsScreenConstructor = function(opts){
            console.log('hi');
            opts.view.append("I am the elections screen");
        };

        var fakeLoginScreenConstructor = function(view, onLogin){
            view.append("I am the login screen");
            simulateLogin = onLogin;
        };
        var app = App({view:view, ElectionsScreen:fakeElectionsScreenConstructor,  LoginScreen:fakeLoginScreenConstructor});
        
        // when you log-in
        simulateLogin("sally");
        
        // then the elections screen should be visible
        ok(view.text().indexOf("I am the elections screen") >= 0);
        ok(view.text().indexOf("I am the login screen") === -1);
    });
    
    
    test("moves to the voting screen after an election has been selected", function(){
        // given a login screen
        var view = $("<div/>");
        var votingScreenOptions;
        var simulateLogin, simulateElectionSelect;
        var fakeElectionsScreenConstructor = function(opts){
            opts.view.append("I am the elections screen");
            simulateElectionSelect = opts.onSelect;
        };

        var fakeLoginScreenConstructor = function(view, onLogin){
            view.append("I am the login screen");
            simulateLogin = onLogin;
        };
        var fakeVotingScreen = function(opts){
            opts.view.append("I am the voting screen");
            votingScreenOptions = opts;
        };
        var app = App({
            view:view, 
            ElectionsScreen:fakeElectionsScreenConstructor,  
            LoginScreen:fakeLoginScreenConstructor,
            VotingScreen:fakeVotingScreen});
        
        simulateLogin("sally");
        // when you select an election
        simulateElectionSelect("tastiest fruit");
        
        // then the voting screen should be visible & the context should be correct
        ok(view.text().indexOf("I am the elections screen") === -1);
        ok(view.text().indexOf("I am the login screen") === -1);
        ok(view.text().indexOf("I am the voting screen") !== -1);
        equal(votingScreenOptions.user, "sally");
        equal(votingScreenOptions.election, "tastiest fruit");
    });
    
    

    test("posts results to server when 'vote' button is pressed", function(){
        // given a login screen
        var view = $("<div/>");
        var votingScreenOptions;
        var simulateLogin, simulateElectionSelect;
        var fakeElectionsScreenConstructor = function(opts){
            opts.view.append("I am the elections screen");
            simulateElectionSelect = opts.onSelect;
        };
        var dataSent;
        var methodSent;
        var fakeHttp = function(method, url, data){
            methodSent = method;
            dataSent = data;
            urlSent = url;
        };

        var fakeLoginScreenConstructor = function(view, onLogin){
            view.append("I am the login screen");
            simulateLogin = onLogin;
        };
        var fakeVotingScreen = function(opts){
            opts.view.append("I am the voting screen");
            votingScreenOptions = opts;
            
        };
        var app = App({
            view:view, 
            ElectionsScreen:fakeElectionsScreenConstructor,  
            LoginScreen:fakeLoginScreenConstructor,
            VotingScreen:fakeVotingScreen,
            Http:fakeHttp});
        
        simulateLogin("sally");
        simulateElectionSelect("stuff");
        
        // when you submit a vote
        votingScreenOptions.onVote([{iAmA:"json-object"}]);
        
        // then the vote should be submitted to the server
        deepEqual(dataSent, [{iAmA:"json-object"}]);
        equal(urlSent, "/vote?voter=sally&election=stuff");
        equal(methodSent, "PUT");
    });
    
});