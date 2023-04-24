import "./main.css";

type Auto = {
  modelo: string;
  color: string;
  año: number;
};

let auto: Auto = {
  modelo: "",
  color: "",
  año: 0,
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /*html*/ `
<main>
<header>
  <nav class="navbar bg-danger p-3">
    <p class="text-light mb-0 fs-3" >Concesionario</p>
  </nav>
</header>
<div class="container-fluid py-2">
  <div class="row">
    <div class="col-12">
    <div id="codigo" ></div>
      <h3>Juan Diavanera Automoviles</h3>
    <div>
  </div>
  <div class="row">
    <div class="col-12" >
      <form class="row gy-3" id="formulario-carros" >
        <div class="col-md-3">
          <label for="modelo" class="form-label">Modelo</label>
          <input name="modelo" id="modelo" class="form-control" />
        </div>
        <div class="col-md-3">
          <label for="color" class="form-label">Color</label>
          <input name="color" id="color" class="form-control" />
        </div>
        <div class="col-md-3">
          <label for="año" class="form-label">año</label>
          <input name="año" id="año" class="form-control" />
        </div>
        <div class="col-md-6">
        <button class="btn btn-outline-danger">Buscar</button>
        </div>
      </form>
     </div>
       <div class="col-12">
    <div class="row gy-3" id="lista-carros" ></div>
     </div>
    </div>
</div>
</main>
`;

const modelo = document.querySelector<HTMLInputElement>('[name="modelo"]')!;
const color = document.querySelector<HTMLInputElement>('[name="color"]')!;
const año = document.querySelector<HTMLInputElement>('[name="año"]')!;

const formularioCarros = document.getElementById(
  "formulario-carros"
)! as HTMLFormElement;
const listaCarro = document.getElementById("lista-carros")! as HTMLDivElement;
const codigo = document.getElementById("codigo")! as HTMLDivElement;

modelo.addEventListener("input", (event) => {
  auto.modelo = (event.target as HTMLInputElement).value;
});
color.addEventListener("input", (event) => {
  auto.color = (event.target as HTMLInputElement).value;
});
año.addEventListener("input", (event) => {
  auto.año = Number((event.target as HTMLInputElement).value);
});

function formularioEsValido() {
  if (auto.modelo === "") return false;
  if (auto.color === "") return false;
  if (auto.año <= 0) return false;
  return true;
}

formularioCarros.addEventListener("submit", (event) => {
  event.preventDefault();
  const esValido = formularioEsValido();
  if (esValido) {
    CrearCarro();
    reset();
    codigo.innerHTML = /*html*/ `
    <div class="alert alert-success alert-dismissible" role="alert" >
    Los datos se han enviadode manera exitosa.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
  } else {
    codigo.innerHTML = /*html*/ `
    <div class="alert alert-danger alert-dismissible" role="alert">
    Tu datos no se encuentran en la base de datos
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
  }

  const close = document.querySelector<HTMLButtonElement>(
    '[aria-label="Close"]'
  )!;
  close.addEventListener("click", () => {
    codigo.innerHTML = "";
  });
});

function reset() {
  auto = {
    modelo: "",
    color: "",
    año: 0,
  };
  formularioCarros.reset();
}

function CrearCarro() {
  const div = document.createElement("div");
  div.classList.add("col-md-4");
  div.innerHTML = /*html*/ `
 <div class="card">
 <div class="card-body">
  <p class="card-text"><b>Modelo:</b>${auto.modelo}</p>
  <p class="card-text"><b>Color:</b>${auto.color}</p>
  <p class="card-text"><b>Año:</b>${auto.año}</p>
 </div>
</div>
`;
  listaCarro.appendChild(div);
}
