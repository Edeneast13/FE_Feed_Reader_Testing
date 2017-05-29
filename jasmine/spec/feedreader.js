/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //test that checks to make sure the urls in allFeeds are defined and are not empty 
        it('urls are defined and not empty', function(){
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i]['url']).toBeDefined();
                expect(allFeeds[i]['url']).not.toBe('');
            }
         });

        //test that checks to make sure the names in allFeeds are defined and are not empty 
        it('names are defined and not empty', function(){
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i]['name']).toBeDefined();
                expect(allFeeds[i]['name']).not.toBe('');
            }
         });
    });

    //test that checks menu changes
    describe('The menu', function(){
        var menuIcon; 
        
        beforeEach(function(){
            menuIcon = $('.menu-icon-link');
        });
        
        //checks to make sure the menu is hidden by default
        it('is hidden at start', function(){
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
        
        //checks to make sure menu dissapears when it is clicked the second time 
        it('dissapears when clicked twice', function(){
            if($("body").hasClass("menu-hidden")){
                menuIcon.click();
                expect($("body").hasClass("menu-hidden")).toBe(false);
            }
            
            if(!$("body").hasClass("menu-hidden")){
                menuIcon.click();
                expect($("body").hasClass("menu-hidden")).toBe(true);
            }
        });
    });
    
    //test that checks the initial entries
    describe("Initial Entries", function(){
        var initialEntries;
        
        //checks load feed completion functionality
        beforeEach(function(done){
            loadFeed(0, function(){
                initialEntries = $(".feed").html();
            });
            done();
        });
        
        //checks for null entries
        it('is present', function(){
            expect(initialEntries).not.toBe(null);
        });
    });
    
    //test that checks new feed functionality
    describe("New Feed Selection", function(){
        var initialEntries;
        
        beforeEach(function(done){
            loadFeed(1, function(){
                initialEntries = $(".feed").html();
            });
            done();
        });
        
        it("content actually changes on new feed", function(done){
            loadFeed(2, done);
            expect($(".feed").html()).not.toEqual(initialEntries);
        });
    });
}());
