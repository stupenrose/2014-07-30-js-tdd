define([], function(){
    function BallotOption(opts){
        opts.view.append(opts.name);
    }
    
    test("shows name & rank of candidate", function(){
        // given
        var candidate = "trudy";
        var view = $("<div/>");
        
        // when
        BallotOption({view:view, name:candidate});
        
        // then
        equal(view.text(), candidate);
        var bar = view.find(".bar");
        
    });
    
});