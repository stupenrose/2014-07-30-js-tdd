define([ "iUser", "User"], function(iUser, User) {
    
    test("quacks like a iUser", function() {
        equal(iUser.check(User("sam")).matches, true);
    });
    
});