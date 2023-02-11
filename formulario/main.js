const content = document.getElementById("content");
const form = document.getElementById("form");
const deleteBtn = document.getElementById("delete");

const formValidation = () => {
  const inputs = document.querySelectorAll("form [required]");
  inputs.forEach((input) => {
    const span = document.createElement("span");
    span.id = input.name;
    span.textContent = input.title;
    span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", span);
  });

  document.addEventListener("keyup", (e) => {
    if (e.target.matches(".form-contact [required]")) {
      const input = e.target,
        pattern = input.pattern || input.dataset.pattern;

      if (pattern) {
        let regex = new RegExp(pattern);
        return !regex.exec(input.value)
          ? document.getElementById(input.name).classList.remove("none")
          : document.getElementById(input.name).classList.add("none");
      }

      if (!input) {
        console.log(input.dataset.pattern);
        return input.value === ""
          ? document.getElementById(input.name).classList.add("none")
          : document.getElementById(input.name).classList.remove("none");
      }
    }
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let dataForm = new FormData(form); // valores del formulario
  let formObj = convertFormdataToObj(dataForm);

  setDataObj(formObj);
  insertDataRows(formObj);
  form.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  let registeredData = JSON.parse(localStorage.getItem("item")) || [];

  registeredData.forEach((registry) => {
    insertDataRows(registry);
  });
});

deleteBtn.addEventListener("click", () => {
  localStorage.removeItem("item");
  location.reload();
});

function convertFormdataToObj(dataForm) {
  let nombre = dataForm.get("nombre");
  let apellido = dataForm.get("apellido");
  let correo = dataForm.get("correo");
  let opciones = dataForm.get("opciones");
  let genero = dataForm.get("genero");

  return {
    nombre,
    apellido,
    correo,
    opciones,
    genero,
  };
}

function setDataObj(formObj) {
  let arrObjs = JSON.parse(localStorage.getItem("item")) || [];
  arrObjs.push(formObj);

  let newObj = JSON.stringify(arrObjs);
  localStorage.setItem("item", newObj);
}

const insertDataRows = (dataForm) => {
  let table = document.getElementById("table"); // tabla donde se renderiza la data
  let newRow = table.insertRow(-1);

  // let gottenObj = localStorage.getItem("item");
  // let userData = JSON.parse(gottenObj);

  let newNameCell = newRow.insertCell(0);
  newNameCell.textContent = dataForm["nombre"];

  let newLastNameCell = newRow.insertCell(1);
  newLastNameCell.textContent = dataForm["apellido"];

  let newEmailCell = newRow.insertCell(2);
  newEmailCell.textContent = dataForm["correo"];

  let newOptionsCell = newRow.insertCell(3);
  newOptionsCell.textContent = dataForm["opciones"];

  let newGenderCell = newRow.insertCell(4);
  newGenderCell.textContent = dataForm["genero"];
};

formValidation();
