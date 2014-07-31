define(["jquery", "LoginScreen", "util", "ElectionsScreen", "VotingScreen", "Http"], function($, LoginScreen, util, ElectionsScreen, VotingScreen, Http){

    return function App(opts){
        var 
            view = util.getOrDefault(opts, "view", $("body")),
            makeLoginScreen = util.getOrDefault(opts, "LoginScreen", LoginScreen),
            makeElectionsScreen = util.getOrDefault(opts, "ElectionsScreen", ElectionsScreen),
            makeVotingScreen = util.getOrDefault(opts, "VotingScreen", VotingScreen),
            http = util.getOrDefault(opts, "Http", Http),
            currentUser, 
            currentElectionName;
        
        
        function submitVote(selections){
            http("PUT", "/vote?voter=" + currentUser + "&election=" + currentElectionName, selections);
        }
        
        function handleElectionSelection(electionName){
            view.empty();
            currentElectionName = electionName;
            makeVotingScreen({
                    view: view, 
                    user:currentUser, 
                    election:electionName,
                    onVote:submitVote});
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