define([], function(){
    return function BallotOption(opts){
        opts.view.append(opts.name);
        
        function getSelection(){
            return {
                    candidate:opts.name,
                    rank:0
                    };
        }
        
        return {getSelection:getSelection};
    };
});