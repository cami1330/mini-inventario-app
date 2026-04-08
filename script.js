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
    li.innerHTML=`${producto.nombre} -$${producto.precio}
     <button  onclick="eliminarProducto(${index})">Eliminar</button> 
      <button onclick="editarProducto(${index})">Editar</button>`;
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
  
  if(nombre===""||precio===""){
    alert("por favor completa todos los campos");
    return;
  }
  
  inventario.push({
    nombre:nombre,
  precio:Number(precio)
  });
  

  guardarDatos();//despues de agrgar los guarda en esta funcion 
  //limpiar inputs
 
 document.getElementById("nombre").value="";
 document.getElementById("precio").value="";
  
  
  mostrarProductos();
  
 mostrarMensaje("Producto agregado");
};

function eliminarProducto(index){
  
  let confrimar=confirm("¿seguro deseas eliminar el producto?");
  
  if(!confirmar){
    return;
  }
  inventario.splice(index,1);
  guardarDatos();
  mostrarProductos();
   mostrarMensaje("Producto eliminado");
}

function editarProducto(index){
  let nuevoNombre= prompt("Nuevo nombre:");
  let nuevoPrecio = prompt("Nuevo precio:");
  
  if (nuevoNombre==="" || nuevoPrecio===""){
    alert("datos invalidos");
    return
  };
  
  inventario[index].nombre=nuevoNombre;
  inventario[index].precio=nuevoPrecio;
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

  setTimeout(() => {
    mensaje.textContent = "";
  }, 2000);
}
 mostrarProductos();
