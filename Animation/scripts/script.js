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
                this.x += 20;
            if (mouse.x > this.x && this.x > this.size * 10)
                this.x -= 20;

            if (mouse.y < this.y && this.y < canvas.height - this.size * 10)
                this.y += 20;
            if (mouse.y > this.y && this.y > this.size * 10)
                this.y -= 20;
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

function connect()
{
    let opacityValue = 1;

    for (let a = 0; a < particlesArray.length; a++)
    {
        for (let b = a; b < particlesArray.length; b++)
        {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) 
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width/7) * (canvas.height/7))
            {
                opacityValue = 1 - (distance / 30000);
                ctx.strokeStyle = 'rgba(255,255,255,'+ opacityValue +')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

//animation loop
function animate()
{
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++)
        particlesArray[i].update();
    connect();
}

window.addEventListener('resize',
    function()
    {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height/100) * (canvas.width/100);
        init();
    }
)

window.addEventListener('mouseout',
    function()
    {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');

const clock = setInterval(function time()
{
    const date = new Date();
    let hr = date.getHours();
    let mn = date.getMinutes();
    let s = date.getSeconds();

    if (hr < 10)
        hr = '0' + hr;
    if (mn < 10)
        mn = '0' + mn;
    if (s < 10)
        s = '0' + s;

    hour.textContent = hr;
    minute.textContent = mn;
    second.textContent = s;


    console.log(hr, mn, s);
}, 1);

init();
animate();