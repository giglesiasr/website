let contenido = document.querySelector(".contenido");
let nuevoDatosTabla = [];
let lugarFavoritos = document.querySelector("#favoritos");

//BUSCADOR
const buscarB = () => {
  let buscarInput = document.getElementById("buscar").value;
  if (buscarInput != "") {
    contenido.innerHTML = "";
    const arrayFiltrar = nuevoDatosTabla.filter(
      (cosa) =>
        cosa.nombre.toUpperCase().indexOf(buscarInput.toUpperCase()) > -1
    );
    {
      arrayFiltrar.map((elemento) => {
        contenido.innerHTML += `<div class="col-12 col-sm-4 col-md-3 ">
                <div class="card mb-4" >
                    <h3 id="producto" class="card__title p-3"style="margin: 0 auto">${elemento.nombre}</h3>
                        <img id="imagenP" class="card__img  px-1" width="100%" src="${elemento.imagenP}" alt="productos">
                         <div class="card-body"style="margin: 0 auto">
                         <p id="precio" class="card__text">Precio $${elemento.precio}</p>
                         <button type="button" id="botonAnidir" class="btn btn-sm btn-4 addToCart" onclick="anadirFavoritos(${elemento.id})">Añadir a favoritos</button>
                         <button type="button" id="botonAnidir" onclick="verMas(${elemento.id})" class="btn btn-sm btn-4 addToCart" data-toggle="modal" data-target="#exampleModalCenter">Ver más</button>
                      </div>
                </div> 
            </div>`;
      });
    }
  } else {
    contenido.innerHTML = "";
    obtenerApi();
  }
};

// ecma6
const obtenerApi = async () => {
  try {
    resultadoTabla = await fetch("js/nuevojson.json");
    nuevoDatosTabla = await resultadoTabla.json();
    recorrerTabla(nuevoDatosTabla);
    console.log(nuevoDatosTabla);
  } catch (error) {
    console.log(error);
  }
};
obtenerApi();

//MOSTRAR CARTAS
const recorrerTabla = (nuevoDatosTabla) => {
  contenido.innerHTML = "";
  nuevoDatosTabla.map((elemento) => {
    elemento.favorite = false; //agrgar un nuevo propiedad a el objeto
    console.log(elemento.id);
    contenido.innerHTML += `<div class="col-12 col-sm-4 col-md-3 ">
                <div class="card mb-4" >
                    <h3 id="producto" class="card__title p-3"style="margin: 0 auto">${elemento.nombre}</h3>
                        <img id="imagenP" class="card__img  px-1" width="100%" src="${elemento.imagenP}" alt="productos">
                         <div class="card-body"style="margin: 0 auto">
                         <p id="precio" class="card__text">Precio $${elemento.precio}</p>
                         <button type="button" id="botonAnidir" class="btn btn-sm btn-4 addToCart" onclick="anadirFavoritos(${elemento.id})">Añadir a favoritos</button>
                         <button type="button" id="botonAnidir" onclick="verMas(${elemento.id})" class="btn btn-sm btn-4 addToCart" data-toggle="modal" data-target="#exampleModalCenter">Ver más</button>
                      </div>
                </div> 
            </div>`;
  });
};

//SECCIÓN FAVORITOS
let favoritos = []; //se crea arreglo vacío
const anadirFavoritos = (id) => {
  //se captura el id al precionar el boton
  let producto = nuevoDatosTabla.filter((item) => item.id === id); //guarda un array con 1 objeto que coincide con el id
  let verificar = favoritos.some((item) => item.id === id); //recorre favoritos y si coincide id muestra true o flase,
  if (verificar === false) {
    //si es false lo agrega
    favoritos.push(producto[0]); //empujara el objeto que esta en la posicion 0 del array con un producto  al array favoritos
  }
};

//MOSTRAR FAVORITOS
const mostrarFavoritos = () => {
  lugarFavoritos.innerHTML = "";

  if (favoritos.length > 0) {
    //si el alargo del array favoritos es mayor a cero entonces recorrera
    favoritos.map((elemento) => {
      lugarFavoritos.innerHTML += `
                ${elemento.nombre} <br>
                `;
    });
  } else {
    //si el largo del arreglo es cero
    lugarFavoritos.innerHTML = `
        <p>No hay favoritos agregados</p> <br>
        `;
  }
};

//MOSTRAR MODAL
const verMas = (id) => {
  let object = nuevoDatosTabla.find((elemento) => elemento.id === id);
  const title = document.querySelector(".modal-title");
  title.innerHTML = object.nombre;
  console.log(object);
};

//LOADING
setTimeout(function () {
  let loading = document.querySelector(".container_loading");
  loading.style.display = "none";
}, 2000);
