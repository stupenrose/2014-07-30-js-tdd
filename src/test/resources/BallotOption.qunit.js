define(["BallotOption"], function(BallotOption){

    test("shows name & rank of candidate", function(){
        // given
        var candidate = "trudy";
        var view = $("<div/>");
        
        // when
        BallotOption({view:view, name:candidate});
        
        // then
        equal(view.text(), candidate);
    });
    
    test("rank is zero by default", function(){
        // given
        var candidate = "trudy";
        var view = $("<div/>");
        var testSubject = BallotOption({view:view, name:candidate});
        
        // when
        var result = testSubject.getSelection();
        
        // then
        deepEqual({candidate:"trudy", rank:0}, result);
    });
    
    test("rank is zero by default", function(){
        // given
        var candidate = "trudy";
        var view = $("<div/>");
        var testSubject = BallotOption({view:view, name:candidate});
        
        // when
        var result = testSubject.getSelection();
        
        // then
        deepEqual({candidate:"trudy", rank:0}, result);
    });
});