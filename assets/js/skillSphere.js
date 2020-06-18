class Skill {
    constructor(origin, radius, title, x, y, z) {
        this.origin = origin;
        this.title = title;
        this.radius = radius;

        this.position = {
            x: x * radius,
            y: y * radius,
            z: z * radius,
        }

        this.fontMiddle = 25;
        this.fontRange = 5;
    }
    draw(context){
        // context.fillStyle = "grey";
        // if (this.title == "Brain") context.fillStyle = "red";
        let xPos = this.position.x + this.origin.x;
        let yPos = this.position.y + this.origin.y;
        // let size = this.getSize()
        context.font = this.getFont();
        context.fillStyle = this.getColor();
        context.textAllign = "center";
        context.fillText(this.title, xPos, yPos);
    }
    getFont() {
        // This function returns the appropriate font size for the word
        // such that it will appear with the correct level of depth inside
        // of the skill ball
        let newSize = this.fontMiddle + (this.position.z / this.radius) * this.fontRange;
        return String(newSize) + "px Arial";
    }
    getColor() {
        // This function returns the appropriate font color for the word
        // such that it will appear with the correct level of depth inside
        // of the skill ball
        let newOpacity = 0.5 + ((this.position.z / this.radius) / 2);
        // if (newOpacity < 0) newOpacity = 0;
        // console.log(newOpacity.toFixed(1));
        return "rgba(250, 250, 250," + newOpacity.toFixed(3) + ")";

    }
    getX() {
        // Returns the current x Position
        return this.position.x;
    }
    getY() {
        // Returns the current y Position
        return this.position.y;
    }
    getZ() {
        // Returns the current z Position
        return this.position.z;
    }
    setX(x) {
        // Updates the current x Position
        this.position.x = x;
    }
    setY(y) {
        // Updates the current y Position
        this.position.y = y;
    }
    setZ(z) {
        // Updates the current z Position
        this.position.z = z;
    }
}


const canvas = document.getElementById("sphereCanvas");
const context = canvas.getContext("2d");
const brainImage = document.getElementById("brainImage");
const brainWidth = 50;



let radius = 200;

let origin = {
    x: 265,
    y: 285,
    z: 0
}

const skills = [
    new Skill(origin, radius, "JavaScript", 0.75, 0.75, 0.75),
    new Skill(origin, radius, "C/C++", 0.75, 0.75, -0.75),
    new Skill(origin, radius, "Swift", 0.75, -0.75, 0.75),
    new Skill(origin, radius, "RISC-V", -0.75, 0.75, 0.75),
    new Skill(origin, radius, "Python", -0.75, -0.75, -0.75),
    new Skill(origin, radius, "HTML5", 0.75, -0.75, -0.75),
    new Skill(origin, radius, "CSS", -0.75, -0.75, 0.75),
    new Skill(origin, radius, "SQL", -0.75, 0.75, -0.75),
    new Skill(origin, radius, "GIT", 0, 0, 1),
    new Skill(origin, radius, "Keras", 0, 1, 0),
    new Skill(origin, radius, "TensorFlow", 1, 0, 0),
    new Skill(origin, radius, "OpenCV", -1, 0, 0),
    new Skill(origin, radius, "OpenGL", 0, -1, 0),
    new Skill(origin, radius, "Linux", 0, 0, -1)
];

let oldCursor = {x: 1, y: 1};
let newCursor = {x: 0, y: 0};

canvas.addEventListener('mousemove', function(evt) {
    // Update the positions of the old cursor and new cursor if the mouse is within
    // 150% of the radius from the middle of the skillSphere

    let rect = canvas.getBoundingClientRect();

    let widthSquared = Math.pow((evt.clientX - rect.left)- origin.x, 2);
    let heightSquared = Math.pow((evt.clientY - rect.top) - origin.y, 2);
    let distFromOrigin = Math.sqrt(widthSquared + heightSquared);

    if (distFromOrigin < 1.5 * radius) {
        oldCursor.x = newCursor.x;
        oldCursor.y = newCursor.y;

        newCursor.x = evt.clientX - rect.left;
        newCursor.y = evt.clientY - rect.top;
    }
    
});


function rotateX3D(theta) {
    theta = theta / 100;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    
    for (var n=0; n<skills.length; n++) {
        var skill = skills[n];
        var y = skill.getY();
        var z = skill.getZ();
        skill.setY(y * cosTheta - z * sinTheta);
        skill.setZ(z * cosTheta + y * sinTheta);
    }
}

function rotateY3D(theta) {
    theta = theta / 100;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);

    for (var n=0; n<skills.length; n++) {
        var skill = skills[n];
        var x = skill.getX();
        var z = skill.getZ();
        skill.setX(x * cosTheta + z * sinTheta);
        skill.setZ(z * cosTheta - x * sinTheta);
    }
}

let lastUpdate = 0;

function playLoop(timestamp) {
    // This function is responisble for plaing the looper and allowing new recording
    // let deltaTime = timestamp - lastUpdate;


    // update the position of the skills
    if (timestamp - lastUpdate > 20) {
        rotateY3D(newCursor.x - oldCursor.x);
        rotateX3D(oldCursor.y - newCursor.y);
        lastUpdate = timestamp;
    }

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw the brain
    context.drawImage(brainImage, origin.x - (brainWidth / 4), origin.y - (brainWidth / 2), brainWidth, brainWidth);

    // draw all the skills
    for (let i = 0; i < skills.length; i++) {
        skills[i].draw(context);
    }

    // Repeat
    requestAnimationFrame(playLoop);
    
}
playLoop(0);

