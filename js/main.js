const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let minRadius = 2;
let growRadius = 40;
let circles = [];


let mouse = {
    x: undefined,
    y: undefined
}

let colors = [
    '#820009',
    '#FF2231',
    '#CF0714',
    '#048223',
    '#07CF38'
];

// To track and store the mouse cursor position at all times.
addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// To listen for window resizing and restart each time it resizes.
addEventListener('resize', () => {
   canvas.width = innerWidth;
   canvas.height = innerHeight;

   this.init();
});

class Circle {
    constructor(x, y, dx, dy, radius) { // Creates objects with initial properties.
        this.x = x; // x-position
        this.y = y; // y-position
        this.dx = dx; // x-velocity
        this.dy = dy; // y-velocity
        this.radius = radius; // radius
        this.color = colors[Math.floor(Math.random() * (colors.length))]; // Random color from among the stored colors.
    }

    draw() { // This function handles the drawing of each object and filling in onto the canvas based on its properties..
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // This function handles updating each object's individual properties to create the illusion of movement on the canvas.
    update() {
        // Track for screen boundary collisions
        if (this.x + this.radius > innerWidth || this.x - this.radius <= 0) { // If an object touches the horizontal screen boundaries.
            this.dx = -this.dx; // Invert its horizontal velocity.
        } else if (this.y + this.radius > innerHeight || this.y - this.radius <= 0) { // If an object touches the vertical screen boundaries.
            this.dy = -this.dy; // Invert its vertical velocity.
        }

        this.x += this.dx; // Apply the x-velocity to its x position.
        this.y += this.dy; // Apply the y-velocity to its y position.

        // If a circle comes within 40px of the mouse cursor, then grow that circle in size to create the effect.
        if (mouse.x - this.x < 40 && mouse.x - this.x > -40
            && mouse.y - this.y < 40 && mouse.y - this.y > -40) { // Checking x and y-axis for distance calculations.
            this.radius = 40; // Grow the circle
        } else if (this.radius > minRadius){ // If one's radius is > 2
            this.radius -= 1; // Slightly reduce radius each frame
        }

        this.draw(); // Redraw the object each frame with its new update properties.
    }
}

function init() {
    circles = []; // Reset all circles
    for (let i = 0; i < 900; i++) { // Then create 900 circles each with their own properties
        let radius = (Math.random() * 3) + 1; // Random radius between 1-3.
        let x = Math.random() * (innerWidth - radius * 2) + radius; // Random x position within the canvas width
        let y = Math.random() * (innerHeight - radius * 2) + radius; // Random y position within the canvas height
        let dx = (Math.random() - 0.5) * 5; // Random x-velocity
        let dy = (Math.random() - 0.5) * 5; // Random y-velocity
        circles.push(new Circle(x, y, dx, dy, radius)); // Create the circle with the above properties.
    }
}

/*
    This function handles all animation of the canvas.
    It runs continuously and clears the canvas each frame.
    Then it tracks each circle on the screen and repeatedly redraws them.
 */
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circles.length - 1; i++) {
        let circle = circles[i];
        circle.update();
    }
}

init();
animate();

