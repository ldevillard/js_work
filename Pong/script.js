const canvas = document.getElementById("canvas");
const PLAYER_HEIGHT = 100;
const PLAYER_WIDTH = 15;
canvas.width = window.innerWidth / 1.5;
canvas.height = window.innerHeight / 1.5;

var game = 
{
    player:
    {
        x: 10,
        y: canvas.height / 2 - PLAYER_HEIGHT / 2
    },
    computer:
    {
        x: canvas.width - 10 - PLAYER_WIDTH,
        y: canvas.height / 2 - PLAYER_HEIGHT / 2
    },
    ball:
    {
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: 10,
        speed:
        {
            x: 6,
            y: 6
        }
    }
}

function getRandomInt(max)
{
    return Math.floor(Math.random() * max);
}

function init_ball()
{
    var i = getRandomInt(4);

    if (i == 0)
    {
        game.ball.speed.x = 6;
        game.ball.speed.y = 6;
    }
    else if (i == 1)
    {
        game.ball.speed.x = -6;
        game.ball.speed.y = 6;
    }
    else if (i == 2)
    {
        game.ball.speed.x = -6;
        game.ball.speed.y = -6;
    }
    else if (i == 3)
    {
        game.ball.speed.x = 6;
        game.ball.speed.y = -6;
    }
}

function draw_panel()
{
    var context = canvas.getContext('2d');

    //Background
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    //Middle Line
    context.strokeStyle = 'grey';
    context.lineWidth = 2.5;
    context.setLineDash([25, 15]);
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();

    //Players
    context.fillStyle = 'white';
    context.fillRect(game.player.x, game.player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    context.fillRect(game.computer.x, game.computer.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    //Ball
    context.beginPath();
    context.fillStyle = 'white';
    context.arc(game.ball.x, game.ball.y, game.ball.r, 0, Math.PI * 2, false);
    context.fill();
}

canvas.addEventListener('mousemove',
    function (event) {
    // Get the mouse location in the canvas
    var canvasLocation = canvas.getBoundingClientRect();
    var mouseLocation = event.clientY - canvasLocation.y;
    game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
}
)

function computer_move()
{
    game.computer.y += game.ball.speed.y * 0.85;
}

function collide(player)
{
     // The player does not hit the ball
     if (game.ball.y < player.y || game.ball.y > player.y + PLAYER_HEIGHT) {
        // Set ball and players to the center
        game.ball.x = canvas.width / 2;
        game.ball.y = canvas.height / 2;
        game.player.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
        game.computer.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
        
        // Reset speed
        init_ball();
    }
    else
    {
        // Increase speed and change direction
        if (Math.abs(game.ball.speed.x) < 25)
            game.ball.speed.x *= -1.2;
        else
            game.ball.speed.x *= -1;
    }
}

function ball_move()
{
    if (game.ball.y - game.ball.r < 0 || game.ball.y + game.ball.r > canvas.height)
        game.ball.speed.y *= -1;

    if (game.ball.x + game.ball.r > canvas.width - PLAYER_WIDTH)
        collide(game.computer);
    else if (game.ball.x < PLAYER_WIDTH + game.ball.r)
        collide(game.player);

    game.ball.x += game.ball.speed.x;
    game.ball.y += game.ball.speed.y;
}

function play ()
{
    draw_panel();

    computer_move();
    ball_move();

    requestAnimationFrame(play);
}

init_ball();
play();
