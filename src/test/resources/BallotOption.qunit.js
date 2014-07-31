define(["BallotOption"], function(BallotOption){

    test("shows name & rank of candidate", function(){
        // given
        var candidate = "trudy";
        var view = $("<div/>");
        
        // when
        BallotOption({view:view, name:candidate});
        
        // then
        equal(view.text(), "trudy-+");
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
    
    test("pressing the + button increments the rank", function(){
        // given
        var candidate = "trudy";
        var view = $("<div/>");
        var testSubject = BallotOption({view:view, name:candidate});

        $("body").append(view); // hack!!
        // when
        view.find(".plus-button").click();
        
        // then
        var result = testSubject.getSelection();
        deepEqual({candidate:"trudy", rank:1}, result);
        var width = view.find(".green-bar").css("width");
        equal(width, "10px");
    });
    
    test("pressing the - button increments the rank", function(){
        // given
        var candidate = "trudy";
        var view = $("<div/>");
        var testSubject = BallotOption({view:view, name:candidate});
        view.find(".plus-button").click();
        view.find(".plus-button").click();
        view.find(".plus-button").click();

        $("body").append(view); // hack!!
        
        // when
        view.find(".minus-button").click();
        
        // then
        var result = testSubject.getSelection();
        deepEqual({candidate:"trudy", rank:2}, result);
        var width = view.find(".green-bar").css("width");
        equal(width, "20px");
    });
});