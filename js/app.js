'use strict'

/* btnAdd
    1. Recoger el input del usuario 
    2. Modularizar cada acción en funciones. Por ejemplo, hacer función "addToDo ()" para añadir la tarea a un array de "por hacer" y pintarlo en la sección "Por hacer"
    3. guardarlo en localStorage (Usar json objeto)


btnCompletar =>{
    El elemento que marquemos como completado tiene que cambiar al array tareas completadas. 
        Eliminio de array por hacer
        Añado la tarea en array completadas

    Pintar la tarea en completadas
    Borrar la tarea en por hacer
    Guardar Local Storage
}


btnEliminar => {
   Borrar la tarea del array que toque.
    Eliminar del DOM
    Guardar en Local Storage
}

*/ 

/* let arraytoDo = []
let arrayDone = [] */

/* Guardar múltiples arrays en una variable permite que más tarde guardemos sólo UNA clabve en localstorage */

let tareas = {
    arrayToDo: [],
    arrayDone: [],
}


// Pedir datos a Local Storage.


// Si tengo cosas => Actualizo tareas ( objeto tareas )


// Para cada una de las listas tengo que pintarlas en su sitio (con todos los eventos y demás ) 






$(".sendinput").on({
    click:function (){
        let userInput = $(".userinput").val()
        console.log(userInput);

        /* para acceder a una array dentro de una variable la estructura tiene que ser variable.array para usarloc omo una variable exacta */
        tareas.arrayToDo.push(userInput);
        /* console.log(tareas.arrayToDo)
                 */
        let sinEspacios = userInput.trim();
        if( !sinEspacios ){
            alert( "Escribe loco!" )
            
        }else{
            pintaTarea( userInput , ".porHacer");  
            guardarTarea(tareas); 
            console.log(tareas.arrayToDo)    
        }
        
      
    },
});
/* REPETIMOS EVENTO PARA ENVIAR LA INFO A TRAVÉS DE ENTER PERO CAMBIANDO LA ACCIÓN AL CAJETIN DE TEXTO EN LUGAR DE AL BOTÓN */
$(".userinput").on({
    keypress:(function(e){
        if (e.key === 'Enter' || e.keyCode === 13) {
            
            let userInput = $(".userinput").val()
            console.log(userInput);
            tareas.arrayToDo.push(userInput);
            pintaTarea( userInput , ".porHacer");  
            guardarTarea(tareas); 
            console.log(tareas.arrayToDo)  
        }
    }) 
})


// nombreTarea y dondePintar son parametros => es decir es variable local que toma el valor que le pasan en cada momento

function pintaTarea( nombreTarea, dondePintar ){
    let $svgCheck = $("<svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='check-circle' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='currentColor' d='M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z'></path></svg>").attr("class","svgtodo")

    
    let $div_tarea = $("<div>", {"class":"tarea"})
    /* IMPORTANTE: si usamos .html, este elemento tiene que estar ANTES del resto de hijos para evitar que los sobreescriba y borre. Se puede evitar escribiendo .text en lugar, para evitarlo */
    /* $div_tarea.text(nombreTarea) */

    let $div_tareaporhacer = $("<div>", {"class":"tareaporhacer"})
    $div_tareaporhacer.text(nombreTarea)
    /* otra opción menos modular sería: let $div = $("<div class='porhacer'>  </div>") */
    let $iconosToDo = $("<div>", {"class":"iconosporhacer"})
    /* console.log($iconosToDo) */
    let $iconosBasura = $("<div>",{class:"iconosbasura"})

    /* borrar tarea, tiene que estar dentro de la función para que se cree con el contenido dinámico, porque si estuviese fuera no funcionaría */

    
    $($iconosBasura).on({
        click:function(){
            
            removeTarea($iconosBasura, nombreTarea)
        }       
    })

    let $svgTrash = "<svg class='basura' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='trash' fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path fill='white' d='M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z'></path></svg>"
    let $svgOpenTrash = "<svg class='opentrash' id='a2636ab8-4750-45e6-9e1d-7362ac7157c1' data-name='Capa 1' xmlns='http://www.w3.org/2000/svg' width='25px' height='25px' viewBox='0 0 413.7847 560.5923'><defs><style>.b44389e2-c017-4315-a2b7-71de0f58c691{fill:rgb(255, 53, 2);}</style></defs><path class='b44389e2-c017-4315-a2b7-71de0f58c691' d='M432.2,112.1,323.9,81.2l-3.7-19.3a22.539,22.539,0,0,0-16-17.5L201.1,14.9a22.2281,22.2281,0,0,0-22.7,6.5L165,35.9,56.7,5A15.0074,15.0074,0,0,0,38.1,15.3L29.9,44.2A15.0074,15.0074,0,0,0,40.2,62.8L415.7,169.9a15.0074,15.0074,0,0,0,18.6-10.3l8.2-28.9A15.0074,15.0074,0,0,0,432.2,112.1ZM57.8,520a48.0328,48.0328,0,0,0,47.9,45H351.5a48.0328,48.0328,0,0,0,47.9-45l21.2-339H36.6Z' transform='translate(-29.3077 -4.4077)'/></svg>"
    
    /* CREACIÓN DE TAREAS POR HACER EN EL DOM */
    $div_tarea.append($div_tareaporhacer)
    $div_tarea.append($iconosToDo)
    
    $iconosToDo.append($svgCheck)
    $iconosToDo.append($iconosBasura)
    $iconosBasura.append($svgTrash)
    $iconosBasura.append($svgOpenTrash)
    
    $(dondePintar).append($div_tarea)



    // if(dondePintar == ".porHacer"){
        // Evento de completAR
        /* EVENTO DEL BOTÓN COMPLETAR. MOVER DE COLUMNA, CAMBIAR DATOS DE ARRAY Y ACTUALIZAR LOCAL STORAGE */
            $($iconosToDo).on({
                click:function(){
                    
                    pintaTareaCompletada(nombreTarea, ".contenedorTareasDone");
    
                    /* AQUÍ ME FALTA UN MODO DE PASAR UN OBJETO DEL ARRAY TODO AL DONE */
                    tareas.arrayDone.push(nombreTarea)
                    removeTarea($iconosBasura, nombreTarea)
                    guardarTarea(tareas); 
                    console.log(tareas) 
                    
                    let indice = tareas.arrayToDo.indexOf(nombreTarea)  
                    console.log(tareas.arrayToDo)
                    console.log("este es el arrayDone")
                    console.log(tareas.arrayDone)
                }
            })
    // }else{
        // Evento de descompletar
    // }
    
}

 /* FUNCIÓN PARA GUARDAR EN LOCALSTORAGE, LE DAMOS UNA CLAVE "TAREA" Y LO CONVERTIMOS A JSON-STRING */
function guardarTarea(objetoGuardar) {
    localStorage.setItem("Tarea", JSON.stringify(objetoGuardar))
}

function removeTarea(element, nombreTarea){

    
    console.log('$(element).parents(".porHacer") ')
    console.log($(element).parents(".porHacer") )

    if($(element).parents(".porHacer").length>0){
        // Tarea se encuentra en Tareas por hacer

        $(element).parents(".tarea").remove();
        let indice = tareas.arrayToDo.indexOf(nombreTarea)  
        console.log(indice)
            

        if( indice>-1 ){

            tareas.arrayToDo.splice(indice, 1)
            console.log("este es el array")
            console.log(tareas.arrayToDo)
        }
    }else{
        // Completadas
    }

    // Podría preguntar si mi padre es por hacer o completadas
   
    /* NO se hace un removeitem sino que mantememos el setItem de la función guardar, porque queremos ACTUALIZAR los datos, no ELIMINARLOS como tal */
    guardarTarea(tareas)
}


/**
 * 
 * @param {*} nombreTarea 
 * @param {string} dondePintar - La clase del contenedor de la tarea donde se va a pintar ( Puede contener los valores .miConteniero ) 
 */
function pintaTareaCompletada (nombreTarea, dondePintar){
    let $div_tareaDone = $("<div>", {"class":"cajadone"})
   
    let $div_tareaHecha = $("<div>", {"class":"tareahecha"})
    $div_tareaHecha.text(nombreTarea)
    
    let $iconosBasura = $("<div>",{"class":"iconos"})
    
    
    let $svgTrash = "<svg class='basura' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='trash' fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path fill='white' d='M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z'></path></svg>"
    let $svgOpenTrash = "<svg class='opentrash' id='a2636ab8-4750-45e6-9e1d-7362ac7157c1' data-name='Capa 1' xmlns='http://www.w3.org/2000/svg' width='25px' height='25px' viewBox='0 0 413.7847 560.5923'><defs><style>.b44389e2-c017-4315-a2b7-71de0f58c691{fill:rgb(255, 53, 2);}</style></defs><path class='b44389e2-c017-4315-a2b7-71de0f58c691' d='M432.2,112.1,323.9,81.2l-3.7-19.3a22.539,22.539,0,0,0-16-17.5L201.1,14.9a22.2281,22.2281,0,0,0-22.7,6.5L165,35.9,56.7,5A15.0074,15.0074,0,0,0,38.1,15.3L29.9,44.2A15.0074,15.0074,0,0,0,40.2,62.8L415.7,169.9a15.0074,15.0074,0,0,0,18.6-10.3l8.2-28.9A15.0074,15.0074,0,0,0,432.2,112.1ZM57.8,520a48.0328,48.0328,0,0,0,47.9,45H351.5a48.0328,48.0328,0,0,0,47.9-45l21.2-339H36.6Z' transform='translate(-29.3077 -4.4077)'/></svg>"


    /* borrar tarea, tiene que estar dentro de la función para que se cree con el contenido dinámico, porque si estuviese fuera no funcionaría */

    
    $($iconosBasura).on({
        click:function(){
            
            removeTareaDone($iconosBasura, nombreTarea)
        }       
    })


    /* CREACIÓN DE TAREAS POR HACER EN EL DOM */
    $div_tareaDone.append($div_tareaHecha)
    $div_tareaDone.append($iconosBasura)
     
    $iconosBasura.append($svgTrash)
    $iconosBasura.append($svgOpenTrash)
    
       
    $(dondePintar).append($div_tareaDone)

    /* Pusheamos valor desde arrayToDo a la arrayDone */


    let indice = tareas.arrayToDo.indexOf(nombreTarea)  
    console.log(indice)
    

    if( indice>-1 ){

        tareas.arrayToDo.splice(indice, 1)
        console.log("este es el array toDo con splice")
        console.log(tareas.arrayToDo)
    }

}
function removeTareaDone(element, nombreTarea){

    $(element).parents(".cajadone").remove();


    // Podría preguntar si mi padre es por hacer o completadas

    let indice = tareas.arrayDone.indexOf(nombreTarea)  
    console.log(indice)
    

    if( indice>-1 ){

        tareas.arrayDone.splice(indice, 1)
        console.log("este es el array done")
        console.log(tareas.arrayDone)
    }
    /* NO se hace un removeitem sino que mantememos el setItem de la función guardar, porque queremos ACTUALIZAR los datos, no ELIMINARLOS como tal */
    guardarTarea(tareas)
}




let datosAlmacenados = localStorage.getItem("Tarea")

console.log(datosAlmacenados)
    

if(datosAlmacenados){
    let datosRecuperados = JSON.parse(datosAlmacenados)
    console.log(datosRecuperados)
    tareas = datosRecuperados;

}

console.log(tareas.arrayToDo.length)

/* if (datosAlmacenados.length>0){
 */
if (datosAlmacenados.length>0){
    
    for(let i = 0; i < (tareas.arrayToDo).length; i++){
        console.log("heyt")
        console.log(tareas.arrayToDo[i])
        pintaTarea( tareas.arrayToDo[i], ".porHacer");  
    }
    

    

    for(let i = 0; i < (tareas.arrayDone).length; i++){
        console.log("heyt")
        console.log(tareas.arrayDone[i])
        pintaTareaCompletada(tareas.arrayDone[i], ".contenedorTareasDone");
    }
    
}



