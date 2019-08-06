const player1 = 'X'; // Jogador 1
const player2 = 'O'; // Jogador 2
var playtime = player1; // Quem joga no momento
var gameover = false; // Encera o jogo quando for true

atualizaMostrador();
inicializarEspacos();

function atualizaMostrador() {
    if (gameover) { return false;}

    if (playtime == player1){
        var player = document.querySelectorAll('div#mostrador img')[0];
        player.setAttribute('src', './img/x.png');
    } else {
        var player = document.querySelectorAll('div#mostrador img')[0];
        player.setAttribute('src', './img/o.png');
    }
}

function inicializarEspacos() {
    var espacos = document.getElementsByClassName('espaco');
    for (let i = 0; i < espacos.length; i++) {
        espacos[i].addEventListener('click', function () {
            if (gameover){return false;}

            if(this.getElementsByTagName('img').length == 0){
                if (playtime == player1){
                    this.innerHTML = "<img src='./img/x.png'>";
                    this.setAttribute('jogada', player1);
                    playtime = player2;
                } else {
                    this.innerHTML = "<img src='./img/o.png'>";
                    this.setAttribute('jogada', player2);
                    playtime = player1;
                }
                atualizaMostrador();
                verificarVencedor();
            }
        });
    }
}

function verificarVencedor() {
    var a1 = document.getElementById('a1').getAttribute('jogada');
    var a2 = document.getElementById('a2').getAttribute('jogada');
    var a3 = document.getElementById('a3').getAttribute('jogada');

    var b1 = document.getElementById('b1').getAttribute('jogada');
    var b2 = document.getElementById('b2').getAttribute('jogada');
    var b3 = document.getElementById('b3').getAttribute('jogada');

    var c1 = document.getElementById('c1').getAttribute('jogada');
    var c2 = document.getElementById('c2').getAttribute('jogada');
    var c3 = document.getElementById('c3').getAttribute('jogada');

    vencedor = '';

    if ((a1 == b1 && a1 == c1 && a1!= '') || (a1 == a2 && a1 == a3 && a1!= '') || (a1 == b2 && a1 == c3 && a1!= '')) {
        vencedor = a1;
    } else if((b2 == b1 && b2 == b3 && b2 != '') || (b2 == a2 && b2 == c2 && b2 !='') || (b2 == a3 && b2 == c1 && b2 != '')){
        vencedor = b2;
    } else if ((c3 == c2 && c3 == c1 && c3 != '') || (c3 == b2 && c3 == a1 && c3 != '')){
        vencedor = c3;
    }

    if(vencedor != ''){
        gameover = true;
        setTimeout(function(){ 
            Swal.fire({
                title: `O vencedor foi o: '${vencedor}'`,
                width: 350,
                padding: '3em',
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("./img/nyan-cat.gif")
                  center left
                  no-repeat
                `
              })}, 100);
    }

    if (vencedor != a1 && vencedor != b2 && vencedor != c3) {
        gameover = true;
        setTimeout(function(){ 
            Swal.fire({
                title: `DEU VELHA!`,
                width: 350,
                padding: '3em',
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("./img/idosa.gif")
                  center left
                  no-repeat
                `
              })}, 100);
    }
}

window.onload = function carregar(){
    var data = new Date();
    var hora = data.getHours();
    var bg = document.querySelector('section');
    var txt = document.querySelector('h1.texto');
    var txt1 = document.querySelector('p.texto');

    if (hora >= 6 && hora < 12){
        bg.style.background = 'url(./img/bg.jpg)';
    } else if (hora <= 18 && hora>=12){
        bg.style.background = 'url(./img/bg-tarde.png)';
    } else {
        bg.style.background = 'url(./img/bg-noite.png)';
        txt.style.color = '#fff';
        txt1.style.color = '#fff';
    }
}