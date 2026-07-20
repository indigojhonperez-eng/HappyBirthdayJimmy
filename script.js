// ===================================
// MATRIX RAIN
// ===================================

const canvas=document.getElementById("matrix");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const letters="アカサタナハマヤラABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&<>";

const fontSize=18;

const columns=Math.floor(canvas.width/fontSize);

const drops=[];

for(let i=0;i<columns;i++){

drops[i]=1;

}

function drawMatrix(){

ctx.fillStyle="rgba(0,0,0,0.06)";

ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#00ff66";

ctx.font=fontSize+"px monospace";

for(let i=0;i<drops.length;i++){

const text=letters.charAt(Math.floor(Math.random()*letters.length));

ctx.fillText(text,i*fontSize,drops[i]*fontSize);

if(drops[i]*fontSize>canvas.height && Math.random()>0.975){

drops[i]=0;

}

drops[i]++;

}

}

setInterval(drawMatrix,33);

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

});


// ===============================
// HACKER BIRTHDAY
// ===============================

const boot = document.getElementById("boot");
const message = document.getElementById("message");
const countdown = document.getElementById("countdown");
const destroy = document.getElementById("destroy");
const finalScreen = document.getElementById("final");

const progressBar = document.getElementById("progressBar");
const loadingPercent = document.getElementById("loadingPercent");

const deleteProgress = document.getElementById("deleteProgress");
const deleteText = document.getElementById("deleteText");

const counter = document.getElementById("counter");

let progress = 0;

// ===============================
// BARRA DE CARGA
// ===============================

const bootAnimation = setInterval(() => {

    progress++;

    progressBar.style.width = progress + "%";
    loadingPercent.innerHTML = progress + "%";

    if(progress >= 100){

        clearInterval(bootAnimation);

        setTimeout(showMessage,800);

    }

},40);


// ===============================
// MENSAJE
// ===============================

function showMessage(){

    boot.classList.add("hidden");

    message.classList.remove("hidden");

    message.classList.add("fadeIn");

    setTimeout(startCountdown,7000);

}



// ===============================
// CUENTA REGRESIVA
// ===============================

function startCountdown(){

    message.classList.add("hidden");

    countdown.classList.remove("hidden");

    let number = 5;

    counter.innerHTML = number;

    const timer = setInterval(()=>{

        number--;

        counter.innerHTML = number;

        if(number==0){

            clearInterval(timer);

            setTimeout(showDestroy,1000);

        }

    },1000);

}



// ===============================
// ELIMINANDO MENSAJE
// ===============================

function showDestroy(){

    countdown.classList.add("hidden");

    destroy.classList.remove("hidden");

    let deletePercent=0;

    const deleting=setInterval(()=>{

        deletePercent+=4;

        deleteProgress.style.width=deletePercent+"%";

        deleteText.innerHTML="Deleting... "+deletePercent+"%";

        if(deletePercent>=100){

            clearInterval(deleting);

            setTimeout(showFinal,1200);

        }

    },80);

}



// ===============================
// FINAL
// ===============================

function showFinal(){

    destroy.classList.add("hidden");

    finalScreen.classList.remove("hidden");

    finalScreen.classList.add("fadeIn");

}
