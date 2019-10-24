let ctx, player1_y, player2_y, player1_points, player2_points
let ball_y_orientation, ball_x_orientation, ball_x, ball_y
let player1_key, player2_key
const h=500, w=800, p_w=20, p_h=200, player1_x = 10, player2_x = w - p_w - 10
function setup(){
    const canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    
    // inicializa as posições y do p1 e do p2 para metade da tela
    player1_y = player2_y = (h / 2) - (p_h/2)
    
    // inicializa pontos com 0
    player1_points = 0
    player2_points = 0

    //intervalo de 60 fps
    setInterval(loop,1000/60)

    iniciabolinha()
}

function loop(){
    //colisão barra p1
    if(ball_x >= player1_x && ball_x <= player1_x + 10 && ball_y >= player1_y && ball_y <= player1_y + p_h){
        ball_x_orientation = 1
    }
    //colisão barra p2
    else if(ball_x >= player2_x && ball_x <= player2_x + 10 && ball_y >= player2_y && ball_y <= player2_y + p_h){
        ball_x_orientation = -1
    }

    // verificação de colisão
    if(ball_y + 10 >= h || ball_y <= 0) ball_y_orientation *= -1

    //move a bola nos eixo
    ball_x += 5 * ball_x_orientation
    ball_y += 5 * ball_y_orientation

    if(ball_x+10 > w) {
        player1_points++
        iniciabolinha()
    }
    else if(ball_x < 0){
        player2_points ++
        iniciabolinha()
    }

    if(player1_key == 87 && player1_y > 0){
        player1_y -= 10
    }else if(player1_key == 83 && player1_y + p_h < h){
        player1_y += 10
    }

    if(player2_key == 38 && player2_y > 0){
        player2_y -= 10
    }else if(player2_key == 40 && player2_y + p_h < h){
        player2_y += 10
    }
    desenha()
}

function iniciabolinha(){
    console.log(`${player1_points} VS ${player2_points}`)
    ball_y_orientation = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3 
    ball_x_orientation = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3 
    ball_x = w / 2 -10
    ball_y = h / 2 -10
}

function desenha(){
    // background
    desenhoFeito(0,0,w,h,"#FFF")
    // p1
    desenhoFeito(player1_x, player1_y, p_w, p_h)
    // p2
    desenhoFeito(player2_x, player2_y, p_w, p_h)
    // toll bar
    desenhoFeito(w/2 -5,0,5,h)
    // bolinha
    desenhoFeito(ball_x, ball_y, 10, 10)
    escrevePontos()
}

function desenhoFeito(x,y,w,h,color="red"){
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h)
    ctx.fillStyle = "red"
}

function escrevePontos(){
    ctx.font = "50px monospace";
    ctx.fillStyle = "#000";
    // w/4 = 1/4 da tela = metade da tela do player 1
    ctx.fillText(player1_points, w/4, 50);
    // 3*(w/4) = 3/4 da tela = metade da tela do player 2
    ctx.fillText(player2_points, 3*(w/4), 50);
}

document.addEventListener("keydown",function(ev){
    // keyCode 87 = w, keycode 83 = s
    if(ev.keyCode == 87 || ev.keyCode == 83){
        player1_key = ev.keyCode
    }
    // keycode 38 = arrowUp, keycode 40 = arrowDown
    else if(ev.keyCode== 38 || ev.keyCode==40)
        player2_key = ev.keyCode
})

setup()