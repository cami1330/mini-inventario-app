let inventario=JSON.parse(localStorage.getItem("inventario")) ||[
  {nombre:"pan",
  precio:2000,
  cantidad:0
  },
  {nombre:"leche",
  precio:3500,
  cantidad:0
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
  $${producto.precio} |cantidad: ${producto.cantidad} (${producto.categoria})<br> total:$${producto.precio*producto.cantidad}|
</span>

<button onClick="disminuirCantidad(${index})">➖</button>
<button onClick="aumentarCantidad(${index})">➕</button>
     <button  onclick="eliminarProducto(${index})">❌</button> 
      <button onclick="mostrarFormularioEditar(${index})">✏️</button>
      
      <div id="editar-${index}" style="display:none; margin-top:10px;">
      <input type="text"id="nombre-${index}" value="${producto.nombre}">
      <input type="number" id="precio-${index}" value="${producto.precio}">
      <input type="number" id="cantidad-${index}" value="${producto.cantidad}">
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
  let cantidad=document.getElementById("cantidad").value;
  let categoria=document.getElementById("categoria").value;
  
  if(nombre===""||precio==="" || cantidad===""){
    alert("por favor completa todos los campos");
    return;
  }
  
  inventario.push({
    nombre:nombre,
  precio:Number(precio),
    cantidad:Number(cantidad),
    categoria:categoria
  });
  

  guardarDatos();//despues de agrgar los guarda en esta funcion 
  //limpiar inputs
 
 document.getElementById("nombre").value="";
 document.getElementById("precio").value="";
  document.getElementById("cantidad").value="";
  
  
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
  let nuevaCantidad=document.getElementById(`cantidad-${index}`).value;
  let nuevaCategoria = document.getElementById(`categoria-${index}`).value;

  inventario[index].nombre = nuevoNombre;
  inventario[index].precio = Number(nuevoPrecio);
  inventario[index].cantidad=Number(nuevaCantidad);
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
    li.textContent = `${producto.nombre} - $${producto.precio}-${producto.cantidad}`;
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

//CERRAR DIV DE INVENTARIO TOTAL 

function cerrarYAbrirTotalInventario(){
  let inv=document.getElementById("divInventario");
 if(inv.style.display === "none"){
   inv.style.display="block";
 }else{
   inv.style.display="none";
 };
}


  //boton de cancelar en el formulario de editar
function cancelarGuardarDatos(index){
 
  let form=document.getElementById(`editar-${index}`);
  form.style.display="none";

}
//calcular el total del inventario 
function actualizarResumen(){
  //contador de la cantidad de producto que hay
  let contador=inventario.length;
  
 
let totalCantidad = inventario.reduce((acumu, producto) => {
    return acumu + producto.cantidad;
  }, 0);
  
   //total de dinero
 let total=inventario.reduce((acumulador,producto)=>{
   return acumulador+ (producto.precio*producto.cantidad);
 }, 0);
 
 document.getElementById("total").textContent=`Total de dinero:${total}` ;
 document.getElementById("contador").textContent=`Productos registrados:${contador}`;
  
  document.getElementById("cantidad1").textContent=`Cantidad total de productos:${totalCantidad}`;
}

function disminuirCantidad(index){
  
  //if para que no disminuya si es menor a cero
  if(inventario[index] > 1){
  inventario[index].cantidad--;
  }
  guardarDatos();
  mostrarProductos();
  actualizarResumen();
}

function aumentarCantidad(index){
  inventario[index].cantidad++;
  guardarDatos();
  mostrarProductos();
  actualizarResumen();
}


//vaciar inventario

function vaciarInventario(){
  let confirmar=confirm("¿Seguro que quieres eliminar todo el inventario?");
   if(!confirmar) return;
   inventario = [];

  guardarDatos();
  mostrarProductos();
  actualizarResumen();
  mostrarMensaje("Inventario eliminado");
  
}
//llamar funciones
 mostrarProductos();
actualizarResumen();
