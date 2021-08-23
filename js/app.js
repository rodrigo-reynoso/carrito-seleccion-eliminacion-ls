// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];
console.log(listaCursos);

// EventsListener
eventsListenrs();
function eventsListenrs() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click',eliminarCurso);
    btnVaciarCarrito.addEventListener('click',()=>{
        articulosCarrito = [];
        limpiarHTML();
    })
    document.addEventListener('DOMContentLoaded',()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('articulos')) || []; // o array vacio por las dudas que no haya nada, y no me marque un null, ya que, con un null no hay methods como los array methods
        mostrarHTML()
    })
}

// Function
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const idCurso = e.target.getAttribute('data-id'); 
        articulosCarrito.forEach((curso,index) =>{
             if(curso.id === idCurso && curso.cantidad > 1){
                     curso.cantidad = curso.cantidad - 1;
                     // console.log(curso.cantidad);
                     return; // va si o si, para que se frene el codigo siguiente     
             } 
             if(curso.cantidad === 1 && curso.id === idCurso) {
             articulosCarrito = articulosCarrito.filter(curso => curso.id !== idCurso);
             } 
            // articulosCarrito.splice(index,1)
        })   
        mostrarHTML();
    }
}

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {

        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
function leerDatosCurso(curso) {
    //Primero creo el objeto, luego lo muestro y luego lo elimino. Por ultimo itero para agregar la cantidad
    const datosCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // .some te dice si un elemento ya existe ESTO SE HACE LUEGO DE PONERLO EN EL HTML
    const existe = articulosCarrito.some(curso =>curso.id === datosCurso.id)
    //console.log(existe)
    if(existe){
        const cursos = articulosCarrito.map(curso=>{
            if(curso.id === datosCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        articulosCarrito =[...cursos]
    }else {
        articulosCarrito = [...articulosCarrito, datosCurso];
        // console.log(articulosCarrito);
    }  
    mostrarHTML();
}

function mostrarHTML() {

    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src='${curso.imagen}' width='100'>
        </td>
        <td>
            ${curso.nombre}
        </td> 
        <td>
            ${curso.precio}
        </td>
        <td>
            ${curso.cantidad}
        </td>
        <td>
            <a href='#' class='borrar-curso' data-id='${curso.id}'> X </a>
        </td>
        `
        contenedorCarrito.appendChild(row);
    });
    // Sincronizar localStorage
    localStorage.setItem('articulos',JSON.stringify(articulosCarrito));
}

function limpiarHTML() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';

    // Forma rápida
    // mientras la condicion sea verdadera
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}