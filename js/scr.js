/* let mensaje = (prompt ("Diganos su nombre:  "));

let mensaje2 = (prompt ("Diganos su apellido:  "));

 console.log (typeof(mensaje2)); 
console.log (mensaje+mensaje2); */

function usuario() {
  var nombre = prompt("Bienvenido, danos tu nombre");
  var apellido = prompt("Ahora danos tu apellido, gracias :D");
  document.querySelector(".name").innerHTML = nombre + " " + apellido;
}

setTimeout(usuario, 1000);
