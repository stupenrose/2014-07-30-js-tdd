define(["jquery", "LoginScreen", "util", "ElectionsScreen", "VotingScreen"], function($, LoginScreen, util, ElectionsScreen, VotingScreen){

    return function App(opts){
        var 
            view = util.getOrDefault(opts, "view", $("body")),
            makeLoginScreen = util.getOrDefault(opts, "LoginScreen", LoginScreen),
            makeElectionsScreen = util.getOrDefault(opts, "ElectionsScreen", ElectionsScreen),
            makeVotingScreen = util.getOrDefault(opts, "VotingScreen", VotingScreen),
            currentUser;
        
        function handleElectionSelection(electionName){
            view.empty();
            makeVotingScreen({view: view, user:currentUser, election:electionName});
        }
        
        function handleLoginSelection(user){
            console.log("logging in");
            view.empty();
            currentUser = user;
            makeElectionsScreen({view:view, onSelect:handleElectionSelection});
        }
//        
        makeLoginScreen(view, handleLoginSelection);
    };
    
});