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
