let inventario=JSON.parse(localStorage.getItem("inventario")) ||[
  {nombre:"pan",
  precio:2000
  },
  {nombre:"leche",
  precio:3500
  }
];
let lista =document.getElementById("lista-productos");
/*function mostrarProductos(){
  lista.innerHTML= "";
  
  inventario.forEach(producto=>{
    let li=document.createElement("li");
    li.textContent=`${producto.nombre}-$${producto.precio}`;
    lista.appendChild(li);
  });
}*/

function mostrarProductos(){
  lista.innerHTML="";
  inventario.forEach((producto,index)=>{
    let li =document.createElement("li");
    li.innerHTML=`<span>
  <strong>${producto.nombre}</strong><br>
  $${producto.precio} (${producto.categoria})
</span>
     <button  onclick="eliminarProducto(${index})">❌</button> 
      <button onclick="mostrarFormularioEditar(${index})">✏️</button>
      
      <div id="editar-${index}" style="display:none; margin-top:10px;">
      <input type="text"id="nombre-${index}" value="${producto.nombre}">
      <input type="number" id="precio-${index}" value="${producto.precio}">
      <input type="text" id="categoria-${index}" value="${producto.categoria}">
        <button onclick="guardarEdicion(${index})">Guardar</button>
         <button onclick="cancelarGuardarDatos(${index})">Cancelar</button>
      
      
      </div>
      
      `;
    lista.appendChild(li);
  })
}

function guardarDatos(){
   //guardar los datos en localStorage
  localStorage.setItem("inventario", JSON.stringify(inventario));
}
function agregarProducto(){
 
  
  let nombre=document.getElementById("nombre").value;
  let precio=document.getElementById("precio").value;
  let categoria=document.getElementById("categoria").value;
  
  if(nombre===""||precio===""){
    alert("por favor completa todos los campos");
    return;
  }
  
  inventario.push({
    nombre:nombre,
  precio:Number(precio),
    categoria:categoria
  });
  

  guardarDatos();//despues de agrgar los guarda en esta funcion 
  //limpiar inputs
 
 document.getElementById("nombre").value="";
 document.getElementById("precio").value="";
  
  
  mostrarProductos();
  
 mostrarMensaje("Producto agregado");
};

function eliminarProducto(index){
  
  let confirmar=confirm("¿seguro deseas eliminar el producto?");
  
  if(!confirmar){
    return;
  }
  inventario.splice(index,1);
  guardarDatos();
  mostrarProductos();
   mostrarMensaje("Producto eliminado");
}

function guardarEdicion(index) {
 
  let nuevoNombre=document.getElementById(`nombre-${index}`).value;
  let nuevoPrecio = document.getElementById(`precio-${index}`).value;
  let nuevaCategoria = document.getElementById(`categoria-${index}`).value;

  inventario[index].nombre = nuevoNombre;
  inventario[index].precio = Number(nuevoPrecio);
  inventario[index].categoria = nuevaCategoria;

  
  let form=document.getElementById(`editar-${index}`);
  form.style.display="none";
  guardarDatos();
  mostrarProductos();
  mostrarMensaje("Producto actualizado");
}

function buscarProducto() {
  let texto = document.getElementById("buscar").value.toLowerCase();

  let resultados = inventario.filter(producto =>
    producto.nombre.toLowerCase().includes(texto)
  );

  lista.innerHTML = "";

  resultados.forEach(producto => {
    let li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    lista.appendChild(li);
  });
}
//sort para ordenar de menor a mayor
function ordenarMenor() {
  inventario.sort((a, b) => a.precio - b.precio);
  mostrarProductos();
}
//mayor a menor 
function ordenarMayor() {
  inventario.sort((a, b) => b.precio - a.precio);
  mostrarProductos();
}

function mostrarMensaje(texto) {
   let mensaje = document.getElementById("mensaje");
  mensaje.textContent = texto;
  mensaje.style.opacity = 1;

  setTimeout(() => {
    mensaje.style.opacity = 0;
  }, 2000);
}

function filtrarCategoria(cat){
  let filtrar=inventario.filter(p=>p.categoria===cat);
  lista.innerHTML="";
  filtrar.forEach(producto=>{
    let li=document.createElement("li");
    li.textContent=`${producto.nombre} -$${producto.precio} (${producto.categoria})`
    lista.appendChild(li);
  });
}

function mostrarFormularioEditar(index){
  
   // cerrar todos primero
  document.querySelectorAll('[id^="editar-"]').forEach(el => {
    el.style.display = "none";
  });
  let form=document.getElementById(`editar-${index}`);//funcion para llamr el form de editar
  form.style.display="block"
;

}
  //boton de cancelar en el formulario de editar
function cancelarGuardarDatos(index){
 
  let form=document.getElementById(`editar-${index}`);
  form.style.display="none";

}
 mostrarProductos();
