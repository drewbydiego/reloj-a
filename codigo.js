//const horaContainer = document.querySelector('.hora');
const minutosContainer = document.querySelector('.minutos');
const segundosContainer = document.querySelector('.segundos');
const containerTodo = document.querySelector('.container');

const containerTodoReloj = document.querySelector('.reloj-container');
//const containerTodoRelojTitulo = document.querySelector('.reloj-container');
const horaContainer = document.createElement('div');
const temporizador = document.createElement('div');
const temporizadorControladorPantalla = document.createElement('div');
const temporizadorControladorIndicador = document.createElement('div');
const recordatorioMostrar = document.createElement('div');
var contenedorRecordatorio = document.createElement ('div');
var contenedorCuadroBotones = document.createElement('div');
const botonesTemporizador = document.createElement('div');

var botonCronometro = document.querySelector('#crono');
var botonTemporizador = document.querySelector('#tempo');
var botonAlarma = document.querySelector('#ala');
var actualizarCronometro;
var actualizarCronometroMili;


//CREANDO VARIABLES DE VALIDACION DE BOTONES
var btn_Cronometro_Activado = false;
var btn_recordatorio_Activado = false;
var reloj_Arriba_Pantalla = false;
var Reloj_Inicial_Pantalla = false;
var Reloj_Inicial_PantallaCheck = false;
var btn_temporizador_Activado = false;

var cronometroDatosPausa = [0,0,1];
var PMAM;
var CronoAndando = true;
var horaActivada = false;
var MinutActivada = false;
var SecActivada = false;
var textoRecordatorio = false;

//constantes para funcionamiento del cronometro
const bloqueCronometro = document.createElement('div');
const ControlCronometro = document.createElement('div');
const IniciarReloj = document.createElement('div');
const mostrarFecha = document.createElement('div');

var HoraTempoValor;
var actualizarHora;

//variables para el temporizador
var h;
var m;
var s;

//variables para la alarma
var hA;
var mA;
var sA;
var msRecordatorio;
//store a reference to the startTimer variable
var startTimer = null;
//usarémos la funcion setInterval
//El primer parametro es para lo que se ejecutará en la funcion, el segundo es para el intervalo de tiempo
//(SE GUARDA EL SETINTERVAL DENTRO DE UNA VARIABLE PARA PODER SABER EL NUMERO DE PROCESO Y PODER PARARLO)
horaContainer.classList.add('hora');
function HoraTop(){

    if(reloj_Arriba_Pantalla == false){
        containerTodoReloj.appendChild(horaContainer);
        horaContainer.innerHTML = "RELOJ";
    }else{
        actualizarHora = setInterval(function(){
            const horario = new Date();
            containerTodoReloj.appendChild(horaContainer);
            //FORMA NUMERO DOS Refactorizado
            //horaContainer.innerHTML = horario.getHours() + ':' + horario.getMinutes() + ':' + horario.getSeconds();
            horaContainer.innerHTML = `<center><span>${horario.getHours()} : ${horario.getMinutes()}: ${horario.getSeconds()}</span></center>`;
        },1000);
    }

}
console.log(`Reloj arriba de la pantalla :${reloj_Arriba_Pantalla}`);
containerTodoReloj.addEventListener('click',function(){
    volverInicio();
    Reloj_Inicial_Pantalla = false;
    DibujarInicio();
})
//botones
//BOTON DEL CRONOMETRO--------------------------------------------
botonCronometro.addEventListener('click', function funcionBoton() {

//COMPROBANDO SI SE HA PULSADO EL BOTON DEL CRONOMETRO
if(btn_Cronometro_Activado == false){
//Agregando el reloj a la parte superior
    reloj_Arriba_Pantalla = true;
    HoraTop();
//removiendo el recordatorio
if(btn_recordatorio_Activado == true){
    containerTodo.removeChild(recordatorioMostrar);
    containerTodo.removeChild(contenedorCuadroBotones);
    btn_recordatorio_Activado = false;
}
//ELIMINANDO EL RELOJ Y FECHA INICIAL
    //COMPROBANDO SI EXISTE
    if(Reloj_Inicial_Pantalla == false){
        containerTodo.removeChild(IniciarReloj);
        containerTodo.removeChild(mostrarFecha);
        console.log(`Has eliminado el reloj de la pantalla principal`);
        Reloj_Inicial_Pantalla = true;
    }
//ELIMINANDO EL TEMPORIZADOR (SI ES QUE EXISTE)
if(btn_temporizador_Activado == true){
    containerTodo.removeChild(temporizadorControladorPantalla);
    btn_temporizador_Activado = false;
}
//AGREGANDO EL CRONOMETRO A LA PANTALLA
    bloqueCronometro.classList.add('MostrarCronometro');
    containerTodo.appendChild(bloqueCronometro);
    bloqueCronometro.innerHTML = '<center><H2>Tiempo</H2><span class="cronometroSpan">0:0</span></center><button class="inicioCronometro" id="inicioCrono" onClick=ejecutarCronometro()>></button>';
    ControlCronometro.classList.add('controlCronometro');
    containerTodo.appendChild(ControlCronometro);
    ControlCronometro.innerHTML = '<center><button class="botonCronometroReiniciar" onClick=reiniciarCronometro()><span class="SpanReinicio">Reiniciar</span><span class="SpanReinicioPequeño">></span></button><button class="botonCronometroParar" onClick=pararCronometro()><span class="spanParar">Parar</span><span class="spanPararPequeño">||</span></button></center>';
    //BOTON CRONOMETRO HA SIDO ACTIVADO
    btn_Cronometro_Activado = true;
}else if(btn_Cronometro_Activado == true){console.log(`Ya has activado el cronometro :${btn_Cronometro_Activado}`);}
});

function ejecutarCronometro(){
    const IniciarCronometro = document.querySelector('.cronometroSpan');
    var contarSegundos = cronometroDatosPausa[0];
    var contarMinutos = cronometroDatosPausa[1];
    var contarMilisegundos = cronometroDatosPausa[2];
    if(CronoAndando == true){
        actualizarCronometro = setInterval(function(){
            contarSegundos = contarSegundos + 1;
            cronometroDatosPausa[0] = contarSegundos;
        },1000)
        actualizarCronometroMili = setInterval(function(){
            if(contarMilisegundos <100){
                contarMilisegundos = contarMilisegundos + 1
                cronometroDatosPausa[2] = contarMilisegundos;
            }else if(contarMilisegundos == 100){
                contarMilisegundos = 1;
                cronometroDatosPausa[2] = contarMilisegundos;
            }
            if(contarSegundos <=59){
                if(contarMinutos ==0){
                    IniciarCronometro.innerHTML = `${contarSegundos} : ${contarMilisegundos}`;
                }else{
                    IniciarCronometro.innerHTML = `${contarMinutos} : ${contarSegundos} : ${contarMilisegundos}`;
                }

                //console.log(contarMilisegundos);
            }else if(contarSegundos >= 59){
                //alert('Segundos mayores a 60');
                contarSegundos = 1;
                contarMinutos = contarMinutos + 1;
                cronometroDatosPausa[1] = contarMinutos;
                //alert(contarMinutos);
        }
        },10);
        CronoAndando = false;
    }else{

    }
;
}

function reiniciarCronometro(){
    const ReiniciarCronometro = document.querySelector('.cronometroSpan');
    clearInterval(actualizarCronometroMili);
    clearInterval(actualizarCronometro);
    ReiniciarCronometro.innerHTML = '0:0'
    cronometroDatosPausa[0] = 0;
    cronometroDatosPausa[1] = 0;
    cronometroDatosPausa[2] = 1;
    CronoAndando = true;
}

function pararCronometro(){
clearInterval(actualizarCronometroMili);
clearInterval(actualizarCronometro);
CronoAndando = true;
//alert(` ${cronometroDatosPausa[1]} : ${cronometroDatosPausa[0]} : ${cronometroDatosPausa[2]}`);
}
//BOTON DEL TEMPORIZADOR-----------------------------------
botonTemporizador.addEventListener('click', function(){
//remover el bloque del recordatorio
if(btn_recordatorio_Activado == true){
    containerTodo.removeChild(recordatorioMostrar);
    containerTodo.removeChild(contenedorCuadroBotones);
    btn_recordatorio_Activado = false;
}
//Remover el Bloque del cronometro
if(btn_Cronometro_Activado ==true){
    containerTodo.removeChild(bloqueCronometro);
    containerTodo.removeChild(ControlCronometro);
    btn_Cronometro_Activado = false;
}else{
    console.log(`Ya has removido el cronometro de la pantalla ${btn_Cronometro_Activado}`);
}
//Remover el bloque de la pantalla principal
if(Reloj_Inicial_Pantalla == false){
    containerTodo.removeChild(IniciarReloj);
    containerTodo.removeChild(mostrarFecha);
    console.log(`Has eliminado el reloj de la pantalla principal`);
    Reloj_Inicial_Pantalla = true;
}else{}
//COMPROBAR SI SE HA PRECIONADO EL BOTON DEL TEMPORIZADOR
if(btn_temporizador_Activado == false){
    temporizadorControladorPantalla.classList.add('TemporizadorEnPantalla');
    containerTodo.appendChild(temporizadorControladorPantalla);
    //temporizadorControladorPantalla.innerHTML = '<h1>Countdown Timer</h1><div id="container"><p id="hour-label" class="label">Hours</p><p id="min-label" class="label">Minutes</p><p id="sec-label" class="label">Seconds</p><input id="hour" type="number" max="99" min="0" value="0" class="time"><p id="p1" class="semicolon">:</p><input id="minute" type="number" max="60" min="0" value="0" class="time"><p id="p2" class="semicolon">:</p><input id="sec" type="number" max="60" min="0" value="0" class="time"><button id="start" class="btn">Start</button></div>';
    //temporizador.classList.add('botonesTempo');
    //containerTodo.appendChild(temporizador);
    temporizadorControladorPantalla.innerHTML = '<p id="hour-label" class="label">Hours</p><p id="min-label" class="label">Minutes</p><p id="sec-label" class="label">Seconds</p><input id="hour" type="number" max="99" min="0" value="0" class="time"><p id="p1" class="semicolon">:</p><input id="minute" type="number" max="60" min="0" value="0" class="time"><p id="p2" class="semicolon">:</p><input id="sec" type="number" max="60" min="0" value="0" class="time"><button id="start" class="btn" onClick="iniciarTemporizador()">Start</button><button id="reset" class="btn2" onClick="ResetearTemporizador()">Reset</button><br>';
//VARIABLES PARA EL TEMPORIZADOR
start = document.getElementById('start');
reset = document.getElementById('reset');

h = document.getElementById("hour");
m = document.getElementById("minute");
s = document.getElementById("sec");
                                                                                                                                                                                                                   //TABLA
    //temporizador.innerHTML = '<center><HR><button class="tableroNumerico" id="uno">1</button><button class="tableroNumerico" id="dos">2</button><button class="tableroNumerico" id="tres">3</button><br><button class="tableroNumerico" id="cuatro">4</button><button class="tableroNumerico" id="cinco">5</button><button class="tableroNumerico" id="seis">6</button><button class="tableroNumerico" id="siete">7</button><button class="tableroNumerico" id="ocho">8</button><button class="tableroNumerico" id="nueve">9</button><br><button class="tableroNumericoBorrar" id="BorrarTempo">|X</button><button class="tableroNumerico" id="cero">0</button><button class="tableroNumericoIniciar" id="iniciarTempo">></button></center>';
    btn_temporizador_Activado = true;
/*CREANDO BOTONES DEL TABLERO NUMERICO
    //CREANDO BOTONES DEL TECLADO NUMERICO
    var NumerosPantalla = 0;
    var contarSegundos = [];
    var espaciosDisponibles = 6;
    const btn_uno = document.querySelector('#uno')
    const btn_dos = document.querySelector('#dos')
    const btn_tres = document.querySelector('#tres')
    const btn_cuatro = document.querySelector('#cuatro')
    const btn_cinco = document.querySelector('#cinco')
    const btn_seis = document.querySelector('#seis')
    const btn_siete = document.querySelector('#siete')
    const btn_ocho = document.querySelector('#ocho')
    const btn_nueve = document.querySelector('#nueve')
    const btn_cero = document.querySelector('#cero')
    const btn_eliminar = document.querySelector('#BorrarTempo')
    const btn_iniciar = document.querySelector('#iniciarTempo')

    var horas = "h";
    var minutos = "m";
    var segundos = "s";
    btn_uno.addEventListener('click',()=>{
    if(horaActivada == true){
        document.getElementById('Hora').value = document.getElementById('Hora').value + 1;
        HoraTempoValor = document.getElementById('Hora').value;
        console.log(HoraTempoValor);
    }
        if(MinutActivada == true){
            document.getElementById('minuto').value = document.getElementById('minuto').value + 1;
        }
        if(SecActivada == true){
            document.getElementById('segundo').value = document.getElementById('segundo').value + 1;
        }

    });
    btn_dos.addEventListener('click',()=>{
        if(horaActivada == true){
            document.getElementById('Hora').value = document.getElementById('Hora').value + 2;
        }
        if(MinutActivada == true){
            document.getElementById('minuto').value = document.getElementById('minuto').value + 2;
        }
        if(SecActivada == true){
            document.getElementById('segundo').value = document.getElementById('segundo').value + 2;
        }
    });
    btn_tres.addEventListener('click',()=>{
        if(horaActivada == true){
            document.getElementById('Hora').value = document.getElementById('Hora').value + 3;
        }
        if(MinutActivada == true){
            document.getElementById('minuto').value = document.getElementById('minuto').value + 3;
        }
        if(SecActivada == true){
            document.getElementById('segundo').value = document.getElementById('segundo').value + 3;
        }
    });

    btn_cuatro.addEventListener('click',()=>{
        if(horaActivada == true){
            document.getElementById('Hora').value = document.getElementById('Hora').value + 4;
        }
        if(MinutActivada == true){
            document.getElementById('minuto').value = document.getElementById('minuto').value + 4;
        }
        if(SecActivada == true){
            document.getElementById('segundo').value = document.getElementById('segundo').value + 4;
        }
        });

    btn_cinco.addEventListener('click',()=>{
        if(horaActivada == true){
            document.getElementById('Hora').value = document.getElementById('Hora').value + 5;
        }
        if(MinutActivada == true){
            document.getElementById('minuto').value = document.getElementById('minuto').value + 5;
        }
        if(SecActivada == true){
            document.getElementById('segundo').value = document.getElementById('segundo').value + 5;
        }
    });
    btn_seis.addEventListener('click',()=>{
        if(horaActivada == true){
            document.getElementById('Hora').value = document.getElementById('Hora').value + 6;
        }
        if(MinutActivada == true){
            document.getElementById('minuto').value = document.getElementById('minuto').value + 6;
        }
        if(SecActivada == true){
            document.getElementById('segundo').value = document.getElementById('segundo').value + 6;
        }
    });
    btn_siete.addEventListener('click',()=>{
        if(horaActivada == true){
            document.getElementById('Hora').value = document.getElementById('Hora').value + 7;
        }
        if(MinutActivada == true){
            document.getElementById('minuto').value = document.getElementById('minuto').value + 7;
        }
        if(SecActivada == true){
            document.getElementById('segundo').value = document.getElementById('segundo').value + 7;
        }
    });

    btn_ocho.addEventListener('click',()=>{
        if(horaActivada == true){
            document.getElementById('Hora').value = document.getElementById('Hora').value + 8;
        }
        if(MinutActivada == true){
            document.getElementById('minuto').value = document.getElementById('minuto').value + 8;
        }
        if(SecActivada == true){
            document.getElementById('segundo').value = document.getElementById('segundo').value + 8;
        }
    });
    btn_nueve.addEventListener('click',()=>{
        if(horaActivada == true){
            document.getElementById('Hora').value = document.getElementById('Hora').value + 9;
        }
        if(MinutActivada == true){
            document.getElementById('minuto').value = document.getElementById('minuto').value + 9;
        }
        if(SecActivada == true){
            document.getElementById('segundo').value = document.getElementById('segundo').value + 9;
        }
        }
    );

    btn_cero.addEventListener('click',()=>{
        if(horaActivada == true){
            document.getElementById('Hora').value = document.getElementById('Hora').value + 0;
        }
        if(MinutActivada == true){
            document.getElementById('minuto').value = document.getElementById('minuto').value + 0;
        }
        if(SecActivada == true){
            document.getElementById('segundo').value = document.getElementById('segundo').value + 0;
        }
    });
    btn_eliminar.addEventListener('click',()=>{console.log('has eliminado un numero de la pantalla')});
    btn_iniciar.addEventListener('click',()=>{console.log('has iniciado el temporizador')});
*/
}

});
//FUNCIONES PARA ACTIVAR LOS INPUT DEL TEMPORIZADOR


function horaTempoAC(){
        horaActivada = true
        if(horaActivada == true){
            MinutActivada = false;
            SecActivada = false;
        }

}
function MinuTempoAC(){
    MinutActivada = true
    if(MinutActivada == true){
        horaActivada = false;
        SecActivada = false;
    }}
function SecuTempoAC(){
    SecActivada = true
    if(SecActivada == true){
        horaActivada = false;
        MinutActivada = false;
    }
}
function volverInicio(){
    //removiendo el recordatorio
if(btn_recordatorio_Activado == true){
    containerTodo.removeChild(recordatorioMostrar);
    containerTodo.removeChild(contenedorCuadroBotones);
    btn_recordatorio_Activado = false;
}
    //Remover el bloque del cronometro
    if(btn_Cronometro_Activado ==true){
        containerTodo.removeChild(bloqueCronometro);
        containerTodo.removeChild(ControlCronometro);
        btn_Cronometro_Activado = false;
    }else{
        console.log(`Ya has removido el cronometro de la pantalla ${btn_Cronometro_Activado}`);
    }
        //remover el temporizador
if(btn_temporizador_Activado == true){
    containerTodo.removeChild(temporizadorControladorPantalla);
    btn_temporizador_Activado = false;
}
}
//BOTON DE LA ALARMA---------------------------------------------------
botonAlarma.addEventListener('click',function(){
//COMPROBANDO SI SE HA PULSADO EL BOTON DE LA ALARMA
if(btn_recordatorio_Activado == false){

    //Remover el bloque del cronometro
    if(btn_Cronometro_Activado ==true){
        containerTodo.removeChild(bloqueCronometro);
        containerTodo.removeChild(ControlCronometro);
        btn_Cronometro_Activado = false;
    }else{
        console.log(`Ya has removido el cronometro de la pantalla ${btn_Cronometro_Activado}`);
    }
    //Remover el bloque de la pantalla principal
if(Reloj_Inicial_Pantalla == false){
    containerTodo.removeChild(IniciarReloj);
    containerTodo.removeChild(mostrarFecha);
    console.log(`Has eliminado el reloj de la pantalla principal`);
    Reloj_Inicial_Pantalla = true;
}else{}
    //remover el temporizador
if(btn_temporizador_Activado == true){
    containerTodo.removeChild(temporizadorControladorPantalla);
    btn_temporizador_Activado = false;
}
contenedorRecordatorio.classList.add('contenedorRecordatorio');
containerTodo.appendChild(contenedorRecordatorio);

recordatorioMostrar.classList.add('recordatorio');
containerTodo.appendChild(recordatorioMostrar);
recordatorioMostrar.innerHTML = '<p id="hour-label" class="label">Horas</p><p id="min-label" class="label">Minutos </p><p id="sec-label" class="label">Segundos</p><input id="hour" type="number" max="99" min="0" value="0" class="time"><p id="p1" class="semicolon">:</p><input id="minute" type="number" max="60" min="0" value="0" class="time"><p id="p2" class="semicolon">:</p><input id="sec" type="number" max="60" min="0" value="0" class="time"<br>';


contenedorCuadroBotones.classList.add('vistasRecordatorio');
containerTodo.appendChild(contenedorCuadroBotones);
contenedorCuadroBotones.innerHTML = '<center><input type="text"class="cuadroRecordatorio" id="cuadroRecor" value="Escribe un recordatorio" onClick="cambioTextoAlarma()"><br><button id="est" class="btn" onClick="iniciarTemporizadorA()">Iniciar</button><button id="el" class="btn2" onClick="ResetearTemporizadorA()">Borrar</button><br></br> </center>'

containerTodo.appendChild(contenedorCuadroBotones);
hA = document.getElementById("hour");
mA = document.getElementById("minute");
sA = document.getElementById("sec");
msRecordatorio = document.getElementById("cuadroRecor");

btn_recordatorio_Activado = true;
}
});

//funcion al iniciarse la pagina
window.addEventListener('load', function() {
DibujarInicio();
HoraTop();
});
function cambioTextoAlarma(){
    if(textoRecordatorio == false){
        msRecordatorio.value = "";
        textoRecordatorio = true;
    }
    }
function DibujarInicio() {

    IniciarReloj.classList.add('RelojInicio');
    containerTodo.appendChild(IniciarReloj);

    mostrarFecha.classList.add('inicioFecha');
    containerTodo.appendChild(mostrarFecha);

    const RelojPantalla = setInterval(function(){
        const horario = new Date();
        var hoy = new Date(horario);
        if(horario.getHours()>=12){PMAM = "PM";
        }else if(horario.getHours()<=12){PMAM = "AM"}
        IniciarReloj.innerHTML = `<center><H1>${horario.getHours()}:${horario.getMinutes()} ${PMAM}</H1></center>`;
        mostrarFecha.innerHTML = `<H2>${horario.getDate()} / ${horario.getMonth()+1} / ${horario.getFullYear()}</H2>`;
    },1000);

}
/*
function inicio(){
    Reloj_Inicial_Pantalla = false;
    if(btn_Cronometro_Activado == true){
        containerTodo.removeChild(bloqueCronometro);
        containerTodo.removeChild(ControlCronometro);
        console.log(`El cronometro ha sido removido de la pantalla : ${btn_Cronometro_Activado}`);
        btn_Cronometro_Activado = false;
//SE DETIENE EL INTERVALO QUE EJECUTA EL RELOJ EN EL TOP Y SE PONE EN FALSE
        clearInterval(actualizarHora);
        reloj_Arriba_Pantalla = false;
        console.log(`Reloj arriba de la pantalla :${reloj_Arriba_Pantalla}`);
        HoraTop();
    }else{console.log(`El cronometro en pantalla no ha sido activado : ${btn_Cronometro_Activado}`);
}
    IniciarReloj.classList.add('RelojInicio');
    containerTodo.appendChild(IniciarReloj);

    mostrarFecha.classList.add('inicioFecha');
    containerTodo.appendChild(mostrarFecha);

    const RelojPantalla = setInterval(function(){
        const horario = new Date();
        var hoy = new Date(horario);
        if(horario.getHours()>=12){PMAM = "PM";
        }else if(horario.getHours()<=12){PMAM = "AM"}
        IniciarReloj.innerHTML = `<center><H1>${horario.getHours()}:${horario.getMinutes()} ${PMAM}</H1></center>`;
        mostrarFecha.innerHTML = `<H2>${horario.getDate()} / ${horario.getMonth()+1} / ${horario.getFullYear()}</H2>`;
    },1000);
    clearInterval(actualizarHora);
}
*/

function iniciarTemporizador(){

    //initialize the variable
    function startInterval(){
        startTimer = setInterval(function() {
            timer();

        }, 1000);
    }
    startInterval();

}

function ResetearTemporizador(){
    h.value = 0;
    m.value = 0;
    s.value = 0;
    //stop the timer after pressing "reset"
    stopInterval()
}

function timer(){
    var horamostrar = h.value;
    var minutoMostrar = m.value;
    var segundoMostrar = s.value;
    if(h.value == 0 && m.value == 0 && s.value == 0){
        h.value = 0;
        m.value = 0;
        s.value = 0;
    } else if(s.value != 0){
        s.value--;
        if(s.value <=0){
            alert(`SE ACABÓ EL TIEMPO! \n Tiempo establecido: ` + horamostrar + 'h ' + minutoMostrar + 'm ' + segundoMostrar + 's');
            stopInterval();
        }
    } else if(m.value != 0 && s.value == 0){
        s.value = 59;
        m.value--;
    } else if(h.value != 0 && m.value == 0){
        m.value = 60;
        h.value--;
    }
    return;
}

//stop the function after pressing the reset button,
//so the time wont go down when selecting a new time after pressing reset
function stopInterval() {
    clearInterval(startTimer);
}

//FUNCIONES PARA HACER FUNCIONAR LA ALARMA
function iniciarTemporizadorA(){
    var horamostrarA = hA.value;
    var minutoMostrarA = mA.value;
    var segundoMostrarA = sA.value;
    //initialize the variable
    function startIntervalA(){
        startTimerA = setInterval(function() {
            timerA();
        }, 1000);
    }
    startIntervalA();

}

function ResetearTemporizadorA(){
    hA.value = 0;
    mA.value = 0;
    sA.value = 0;
    //stop the timer after pressing "reset"
    stopIntervalA()
}

function timerA(){
    if(hA.value == 0 && mA.value == 0 && sA.value == 0){
        hA.value = 0;
        mA.value = 0;
        sA.value = 0;
    } else if(sA.value != 0){
        sA.value--;
        if(sA.value <= 0){alert(msRecordatorio.value); stopIntervalA();}
    } else if(mA.value != 0 && sA.value == 0){
        sA.value = 59;
        mA.value--;
    } else if(hA.value != 0 && mA.value == 0){
        mA.value = 60;
        hA.value--;
    }
    return;
}

//stop the function after pressing the reset button,
//so the time wont go down when selecting a new time after pressing reset
function stopIntervalA() {
    clearInterval(startTimerA);
}