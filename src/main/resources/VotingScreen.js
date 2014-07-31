define(["util", "Http", "BallotOption"], function(util, Http, BallotOption){
    return function VotingScreen(opts){
        var http = util.getOrDefault(opts, "Http", Http);
        var makeBallotOption = util.getOrDefault(opts, "BallotOption", BallotOption);
        
        var candidates = http("GET", "/vote?voter=" + opts.user + "&election=" + opts.election);
        var widgets = $.map(candidates, function(candidate){
            return makeBallotOption({view:opts.view, name:candidate.candidate});
        });
        
        var button = $('<button class="vote-button">vote</button>');
        
        button.click(function(){
            var votes = $.map(widgets, function(widget){
                return widget.getSelection();
            });
            opts.onVote(votes);
        });
        
        opts.view.append(button);
    };
});