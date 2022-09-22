
function sesion(event){
    event.preventDefault();
    console.log(event);
    
    let formulario = document.querySelector("#formulario");                          //seleccionamos el formulario y lo guardamos en una variable
    let valueEmail = formulario.email.value;                               //agarra el valor del primer input
    let valuePassword = formulario.password.value;                       // agarra el valor del segundo input por su posicion index en el console.dir(formulario)
    
    const token = generateToken(valueEmail, valuePassword);                //variable que genera el token con la funcion generateToken()
    sessionStorage.setItem("token", token);                            //para ingresar el token al session/localstorage con la variable donde guardamos la generacion del token

     

    let timerInterval

    Swal.fire({
     title: 'Cargando...',
     timer: 1000,
     timerProgressBar: true,
       didOpen: () => {
         Swal.showLoading()
           const b = Swal.getHtmlContainer().querySelector('b')
           timerInterval = setInterval(() => {
           b.textContent = Swal.getTimerLeft()
    }, 100)
  },
      willClose: () => {
       clearInterval(timerInterval)
    }
})

 .then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    
    const iniciar = tokenExistente();
    
    if (iniciar) {
        const divPrivado = document.querySelector("#contPrivado");                      //en esta variable seleccionamos el div 
        const ocultar = document.querySelector(".conteiner-1");                    // en esta variable seleccionamos el div que contiene el formulario
        divPrivado.className = "contAbierto";                                 // aca cambiamos el nombre de la clase del div seleccionado
        ocultar.classList.replace("conteiner-1", "contPrivado");              // reemplaza la clase del div que contiene el formulario por la clase que tiene display none
    }

  }

})

}

function generateToken(email, password) {
    return email + password
}

function tokenExistente(){                                                              // funcion para verificar si el token existe 
    if (sessionStorage.getItem("token") !== null){
        return true;
        } else {
            return false;
        }
}

//---------------------------------------------------------------------------------------------------------------------------------------

class alumLista {
    constructor(nombre, materia, nota1, nota2, nota3){
        this.nombre = nombre;
        this.materia = materia;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
    }
    
}

let alumnos = [];



const tablaAlumn = document.querySelector("#tablaNotas tbody");

listaActualizada();

function agregarAlumno(){
    const addAlumno = document.querySelector("#addAlumno");
    const newAlumno = new alumLista(
        addAlumno.nombreAlumno.value, 
        addAlumno.materia.value, 
        addAlumno.alumnoNota1.value, 
        addAlumno.alumnoNota2.value, 
        addAlumno.alumnoNota3.value
        );
    alumnos.push(newAlumno);
    listaActualizada();
}

function listaActualizada(){
    tablaAlumn.innerHTML="";
    
    alumnos.forEach(alumno => {
        const tablaHTML = document.createElement("tr")
        
        tablaHTML.innerHTML = 
        `<td id="nombreAlum">${alumno.nombre}</td>
        <td id="materiaAlum">${alumno.materia}</td>
        <td>${parseInt(alumno.nota1)}</td>
        <td>${parseInt(alumno.nota2)}</td>
        <td>${parseInt(alumno.nota3)}</td>
        <td>${(parseInt(alumno.nota1) + parseInt(alumno.nota2) + parseInt(alumno.nota3)) / 3}</td>
        `
        if((parseInt(alumno.nota1) + parseInt(alumno.nota2) + parseInt(alumno.nota3)) / 3 >= 7){
            tablaHTML.innerHTML = `
            <td id="nombreAlum">${alumno.nombre}</td>
            <td id="materiaAlum">${alumno.materia}</td>
            <td>${parseInt(alumno.nota1)}</td>
            <td>${parseInt(alumno.nota2)}</td>
            <td>${parseInt(alumno.nota3)}</td>
            <td>${(parseInt(alumno.nota1) + parseInt(alumno.nota2) + parseInt(alumno.nota3)) / 3}</td>
            <td class="aprobado">APROBADO</td>`
        } else {
            tablaHTML.innerHTML = `
            <td id="nombreAlum">${alumno.nombre}</td>
            <td id="materiaAlum">${alumno.materia}</td>
            <td>${parseInt(alumno.nota1)}</td>
            <td>${parseInt(alumno.nota2)}</td>
            <td>${parseInt(alumno.nota3)}</td>
            <td>${(parseInt(alumno.nota1) + parseInt(alumno.nota2) + parseInt(alumno.nota3)) / 3}</td>
            <td class="desaprobado">DESAPROBADO</td>`
        };

        

        tablaAlumn.appendChild(tablaHTML); 
        
        
    });
}
 

const tablaNueva = document.querySelector(".tablaNueva"); //lo hice para limpiar la tabla , el evento onclick esta en el html del boton

 function btnTabla(event){
            tablaNueva.innerHTML="";

            Toastify({
                text: "Tabla Limpia",               
                duration: 3000,
                gravity: "top",
                position: "center", 
                style: {
                    background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%);",
                  },
                offset: {
                    x: 50,
                    y: 100
                  }  
                }).showToast();
        } 
        



