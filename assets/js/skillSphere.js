class Skill {
    constructor(origin, title, x, y, z) {
        this.origin = origin;
        this.title = title;

        this.position = {
            x: x,
            y: y,
            z: z,
        }
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
        let newSize = 20 + (this.position.z) / 50;
        return String(newSize) + "px Arial";
    }
    getColor() {
        // This function returns the appropriate font color for the word
        // such that it will appear with the correct level of depth inside
        // of the skill ball
        let newOpacity = (this.position.z / this.origin.x);
        if (newOpacity < 0) newOpacity = 0;
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
const brainWidth = 30;

let origin = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    z: 0
}

let radius = canvas.width / 3;


const skills = [
    new Skill(origin, "JavaScript", 0.75 * radius, 0.75 * radius, 0.75 * radius),
    new Skill(origin, "C/C++", 0.75 * radius, 0.75 * radius, -0.75 * radius),
    new Skill(origin, "Swift", 0.75 * radius, -0.75 * radius, 0.75 * radius),
    new Skill(origin, "RISC-V", -0.75 * radius, 0.75 * radius, 0.75 * radius),
    new Skill(origin, "Python", -0.75 * radius, -0.75 * radius, -0.75 * radius),
    new Skill(origin, "HTML5", 0.75 * radius, -0.75 * radius, -0.75 * radius),
    new Skill(origin, "CSS", -0.75 * radius, -0.75 * radius, 0.75 * radius),
    new Skill(origin, "SQL", -0.75 * radius, 0.75 * radius, -0.75 * radius),
    new Skill(origin, "GIT", 0, 0, radius),
    new Skill(origin, "Keras", 0, radius, 0),
    new Skill(origin, "TensorFlow", radius, 0, 0),
    new Skill(origin, "OpenCV", -radius, 0, 0),
    new Skill(origin, "OpenGL", 0, -radius, 0),
    new Skill(origin, "Linux", 0, 0, -radius),
];

let oldCursor = {x: 1, y: 1};
let newCursor = {x: 0, y: 0};

canvas.addEventListener('mousemove', function(evt) {
    // Update the positions of the old cursor and new cursor
    oldCursor.x = newCursor.x;
    oldCursor.y = newCursor.y;

    let rect = canvas.getBoundingClientRect();
    newCursor.x = evt.clientX - rect.left;
    newCursor.y = evt.clientY - rect.top;

    rotateY3D(newCursor.x - oldCursor.x);
    rotateX3D(oldCursor.y - newCursor.y);
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

