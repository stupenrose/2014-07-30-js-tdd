define([], function(){
    return function BallotOption(opts){
        var parts = $('<div>' + opts.name + 
                    '<button class="minus-button">-</button>' +
                    '<button class="plus-button">+</button>' + 
                    '<div class="green-bar" style="height:10px;display:inline-block;background:green;"></div>' + 
                    '</div>');
        var rank = 0;
        opts.view.append(parts);
        
        function updateGreenBarWidth(){
            parts.find(".green-bar").css("width", (rank *10)+ "px");
        }
        
        parts.find(".plus-button").click(function(){
            rank = rank+1;
            updateGreenBarWidth();
        });
        
        parts.find(".minus-button").click(function(){
            rank = rank-1;
            updateGreenBarWidth();
        });
        
        function getSelection(){
            return {
                    candidate:opts.name,
                    rank:rank
                    };
        }
        
        return {getSelection:getSelection};
    };
});