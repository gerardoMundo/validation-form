const content = document.getElementById("content");
const form = document.getElementById("form");

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

  const insertDataRows = (dataForm) => {
    let table = document.getElementById("table"); // tabla donde se renderiza la data
    let newRow = table.insertRow(-1);

    let newNameCell = newRow.insertCell(0);
    newNameCell.textContent = dataForm.get("nombre");

    let newLastNameCell = newRow.insertCell(1);
    newLastNameCell.textContent = dataForm.get("apellido");

    let newEmailCell = newRow.insertCell(2);
    newEmailCell.textContent = dataForm.get("correo");

    let newOptionsCell = newRow.insertCell(3);
    newOptionsCell.textContent = dataForm.get("opciones");

    let newGenderCell = newRow.insertCell(4);
    newGenderCell.textContent = dataForm.get("genero");
  };

  insertDataRows(dataForm);
});

formValidation();
