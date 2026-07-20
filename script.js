// =======================================
// HACKER BIRTHDAY
// PARTE 1 - MATRIX + BOOT
// =======================================

// ---------- AUDIO ----------
const typingSound = document.getElementById("typingSound");
const accessSound = document.getElementById("accessSound");
const explosionSound = document.getElementById("explosionSound");

// ---------- MATRIX ----------
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

const letters =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-<>アイウエオカキクケコサシスセソ";

const fontSize = 18;

let columns = Math.floor(canvas.width / fontSize);

let drops = [];

function resetDrops() {

    columns = Math.floor(canvas.width / fontSize);

    drops = [];

    for (let i = 0; i < columns; i++) {

        drops[i] = Math.random() * canvas.height;

    }

}

resetDrops();

window.addEventListener("resize", () => {

    resizeCanvas();

    resetDrops();

});

function drawMatrix() {

    ctx.fillStyle = "rgba(0,0,0,0.06)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#00ff66";
    ctx.font = fontSize + "px monospace";

    for(let i=0;i<drops.length;i++){

        const text =
        letters.charAt(
            Math.floor(Math.random()*letters.length)
        );

        ctx.fillText(text,i*fontSize,drops[i]);

        if(drops[i] > canvas.height && Math.random()>0.98){

            drops[i]=0;

        }

        drops[i]+=fontSize;

    }

}

setInterval(drawMatrix,35);

// =======================================
// ELEMENTOS HTML
// =======================================

const boot=document.getElementById("boot");
const message=document.getElementById("message");
const countdown=document.getElementById("countdown");
const destroy=document.getElementById("destroy");
const finalScreen=document.getElementById("final");

const progressBar=document.getElementById("progressBar");
const loadingPercent=document.getElementById("loadingPercent");

const deleteProgress=document.getElementById("deleteProgress");
const deleteText=document.getElementById("deleteText");

const counter=document.getElementById("counter");

// =======================================
// BOOT
// =======================================

let progress=0;

const bootAnimation=setInterval(()=>{

    progress++;

    progressBar.style.width=progress+"%";

    loadingPercent.textContent=progress+"%";

    if(progress>=100){

        clearInterval(bootAnimation);

        setTimeout(showMessage,800);

    }

},40);

// =======================================
// PARTE 2
// MENSAJE + TYPEWRITER + COUNTDOWN
// =======================================

function showMessage() {

    if (accessSound) {
        accessSound.currentTime = 0;
        accessSound.play().catch(()=>{});
    }

    boot.classList.add("hidden");

    message.classList.remove("hidden");

    message.classList.add("fadeIn");

    typeWriter();

    setTimeout(startCountdown,7000);

}


// =======================================
// EFECTO MAQUINA DE ESCRIBIR
// =======================================

function typeWriter(){

    const texts=document.querySelectorAll(".typing");

    texts.forEach((item)=>{

        const original=item.dataset.text || item.innerText;

        item.dataset.text=original;

        item.innerHTML="";

        let i=0;

        const writer=setInterval(()=>{

            if(i<original.length){

                item.innerHTML+=original.charAt(i);

                if(
                    typingSound &&
                    original.charAt(i)!==" "
                ){

                    typingSound.currentTime=0;

                    typingSound.play().catch(()=>{});

                }

                i++;

            }else{

                clearInterval(writer);

            }

        },28);

    });

}


// =======================================
// CUENTA REGRESIVA
// =======================================

function startCountdown(){

    message.classList.add("hidden");

    countdown.classList.remove("hidden");

    countdown.classList.add("fadeIn");

    let number=5;

    counter.innerHTML=number;

    const timer=setInterval(()=>{

        number--;

        if(number>0){

            counter.innerHTML=number;

        }else{

            clearInterval(timer);

            counter.innerHTML="💣";

            if(navigator.vibrate){

                navigator.vibrate([200,100,200]);

            }

            setTimeout(showDestroy,1200);

        }

    },1000);

}

// =======================================
// PARTE 3
// DESTRUCCIÓN + FINAL
// =======================================

function showDestroy(){

    countdown.classList.add("hidden");

    destroy.classList.remove("hidden");

    destroy.classList.add("fadeIn");

    let percent=0;

    const deleting=setInterval(()=>{

        percent+=4;

        deleteProgress.style.width=percent+"%";

        deleteText.innerHTML="Deleting message... "+percent+"%";

        if(percent>=100){

            clearInterval(deleting);

            document.body.classList.add("flash");

            setTimeout(()=>{

                document.body.classList.remove("flash");

                showFinal();

            },500);

        }

    },80);

}



function showFinal(){

    if(explosionSound){

        explosionSound.currentTime=0;

        explosionSound.play().catch(()=>{});

    }

    destroy.classList.add("hidden");

    finalScreen.classList.remove("hidden");

    finalScreen.classList.add("fadeIn");

    finalScreen.innerHTML=`

        <h1>💀</h1>

        <h2>MESSAGE DESTROYED</h2>

        <br>

        <p>Connection terminated...</p>

        <br>

        <p>ERROR 0xC0FFEE</p>

    `;

    setTimeout(()=>{

        finalScreen.innerHTML=`

            <h1>🎂</h1>

            <h2>¡FELIZ CUMPLEAÑOS JIMMY!</h2>

            <br>

            <p>

            Que sigas cumpliendo tus objetivos

            y tengas un año muy productivo.

            💪

            </p>

            <br>

            <p>

            😂 No olvidar que se devuelve el equipo.

            <br><br>

            Tus amigos del Área de TI.

            </p>

            <br>

            <p style="color:#888;font-size:16px;">

            Fin de la transmisión...

            </p>

        `;

    },4000);

}
