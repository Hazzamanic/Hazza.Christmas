(function () {
    // global variables
    var c = 80; // number of snowflakes
    var flakes = new Array(); // array to hold the flakes
    var r = 10; // maximum radius
    var w = 940; // default width of the canvas
    var h = 300; // height of the canvas

    /*
    * function that moves the flakes downwards. aka gravity
    */
    function gravity() {
        // amount to move the flakes by
        step = 0.4;
        for (i = 0; i < flakes.length; i++)
            // to create the illusion of depth, the speed is calculated using the radius 
            flakes[i][1] += step * flakes[i][2];
    }

    /*
    * this method checks the position of each flake and sometimes does stuff
    */
    function flake() {
        for (i = 0; i < flakes.length; i++)
            // checks to see if a flake has fallen off the canvas
            if (flakes[i][1] > h + r) {
                // if a flake has fallen off the canvas it plants it just above the top of the canvas for it to continue falling
                flakes[i][1] = -r;
                // creates a new random size 
                flakes[i][2] = Math.random() * r;
            }
    }

    /*
    * pretty self explanatory, it hands all the drawing on the html5 canvas
    */
    function draw(ctx) {
        // draws the blank canvas on which our flakes shall fall
        ctx.clearRect(0, 0, w, h);
        // loops through the array of flakes
        for (i = 0; i < flakes.length; i++) {
            // stole this little bit of magic from Stack Overflow, but I lost the post...
            // adjusts alpha as they fall so they fade away as they fall
            // embodying the fleeting nature of a snowflake...and it makes it look a bit cooler
            ctx.fillStyle = "rgba(255, 255, 255, " + .9 * (h - flakes[i][1]) / h + ")";
            // begin drawing line
            ctx.beginPath();
            // arc(x position, y position, radius, startingAngle, endingAngle, direction)
            // direction works like this: true for clockwise or false for counterclockwise
            // stolen from a tutorial on how to draw circles. http://www.html5canvastutorials.com for more!
            ctx.arc(flakes[i][0], flakes[i][1], flakes[i][2], 0, Math.PI * 2, true);
            // end line
            ctx.closePath();
            // fill it with our rgba colour
            ctx.fill();
        }
    }

    /*
    * this method is repeated over and over to run the animation and calculations
    * it isn't very exciting
    */
    function play(ctx) {
        draw(ctx);
        gravity();
        flake();
    }

    /*
    * function that starts everything
    */
    function init() {
        // get the canvas context
        var ctx = document.getElementById('flakes').getContext('2d');

        w = window.innerWidth;
        ctx.canvas.width = w;

        // create the flakes
        // this will create a flake spam at the start, could stagger it in future versions
        for (i = 0; i < c; i++) {
            // create a new array for each flake to hold details about said flake
            flakes[flakes.length] = new Array();
            flakes[flakes.length - 1][0] = 10 + Math.random() * (w - 2 * r); // x position
            flakes[flakes.length - 1][1] = -r; // y position
            // taken from a https://phaser.io/ example
            flakes[flakes.length - 1][2] = 0.2 * r + Math.random() * (0.8 * r); // radius
        }

        // run the animation every 45 milliseconds
        setInterval(function () { play(ctx) }, 50);
    }

    /*
    * starts the snowflakes once the page has loaded
    */
    init();
}());
// note: I'm lazy, there wont be any future versions