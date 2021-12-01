const canvas = document.getElementById("canvas1"); 
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = 
{
    x: null,
    y: null,
    radius: (canvas.height/100) * (canvas.width/100)
}

window.addEventListener('mousemove', 
    function(event)
    {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

class Particle
{
    constructor(x, y, directionX, directionY, size, color)
    {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffff';
        ctx.fill();
    }

    update()
    {
        //Set direction to stay in the canvas
        if (this.x > canvas.width || this.x < 0)
            this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0)
            this.directionY = -this.directionY;

        //Check collision with mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size)
        {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10)
                this.x += 10;
            if (mouse.x > this.x && this.x > this.size * 10)
                this.x -= 10;

            if (mouse.y < this.y && this.y < canvas.height - this.size * 10)
                this.y += 10;
            if (mouse.y > this.y && this.y > this.size * 10)
                this.y -= 10;
        }

        //Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw()
    }
}

//init particle array
function init()
{
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;

    for (let i = 0; i < numberOfParticles; i++)
    {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#ffff';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

//animation loop
function animate()
{
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++)
        particlesArray[i].update();
}

init();
animate();