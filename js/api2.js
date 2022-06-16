let contenido = document.querySelector(".contenido");
let nuevoDatosTabla = [];

// ecma6
const obtenerApi = async () => {
  try {
    resultadoTabla = await fetch("js/nuevojson2.json");
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
    contenido.innerHTML += `<div class="col-12 col-sm-4 col-md-3 " >
                <div class="card mb-4 "  >
                    <img src="${elemento.img}" alt="">
                    <button type="button" id="botonAnidir" onclick="verMas(${elemento.id})" class="btn btn-sm btn-4 addToCart" data-toggle="modal" data-target="#exampleModalCenter">Ver más</button>
                </div>
            </div>`;
  });
};

//MOSTRAR MODAL
const verMas = (id) => {
  let object = nuevoDatosTabla.find((elemento) => elemento.id === id);
  const title = document.querySelector(".modal-title");
  const info = document.getElementById("infoModal");
  title.innerHTML = object.title;
  info.innerHTML = object.body;
  console.log(object);
};
