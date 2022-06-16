let contenido = document.querySelector(".contenido");
let nuevoDatosTabla = [];
let nuevoDatosTabla2;

// ecma6
const obtenerApi = async () => {
  try {
    resultadoTabla = await fetch("https://jsonplaceholder.typicode.com/posts");
    nuevoDatosTabla = await resultadoTabla.json();
    recorrerTabla(nuevoDatosTabla);
  } catch (error) {
    console.log(error);
  }
};
obtenerApi();

// modal

const verMas = async (id) => {
  console.log(id);
  try {
    resultadoTabla2 = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    nuevoDatosTabla2 = await resultadoTabla2.json();
  } catch (error) {
    console.log(error);
  }
  const title = document.querySelector(".modal-title");
  const info = document.getElementById("infoModal");
  title.innerHTML = nuevoDatosTabla2.title;
  info.innerHTML = nuevoDatosTabla2.body;
};

//BUSCADOR
const buscarB = () => {
  let buscarInput = document.getElementById("buscar").value;
  if (buscarInput != "") {
    contenido.innerHTML = "";
    const filtrado = nuevoDatosTabla.filter(
      (elemento) => elemento.id == buscarInput
    );
    {
      //console.log(filtrado)
      if (filtrado.length === 0) {
        alert("Busqueda desde el 1 al 100");
      } else {
        filtrado.map((elemento) => {
          contenido.innerHTML += `<div class="col-12 col-sm-4 col-md-3 ">
                    <div class="card mb-4" >
                        <h3 id="producto" class="card__title p-3"style="margin: 0 auto">${elemento.id}</h3>
                             <div class="card-body"style="margin: 0 auto">
                             <button type="button" id="botonAnidir" onclick="verMas(${elemento.id})" class="btn btn-sm btn-4 addToCart" data-toggle="modal" data-target="#exampleModalCenter">Ver más</button>
                          </div>
                    </div> 
                </div>`;
        });
      }
    }
  } else {
    contenido.innerHTML = "";
    obtenerApi();
  }
};

// cards

const recorrerTabla = (nuevoDatosTabla) => {
  contenido.innerHTML = "";
  nuevoDatosTabla.map((elemento) => {
    contenido.innerHTML += `<div class="col-12 col-sm-4 col-md-3 ">
                <div class="card mb-4" >
                    <h3 id="producto" class="card__title p-3"style="margin: 0 auto">${elemento.id}</h3>
                         <div class="card-body"style="margin: 0 auto">
                         <button type="button" id="botonAnidir" onclick="verMas(${elemento.id})" class="btn btn-sm btn-4 addToCart" data-toggle="modal" data-target="#exampleModalCenter">Ver más</button>
                      </div>
                </div> 
            </div>`;
  });
};
