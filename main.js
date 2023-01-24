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
      console.log(input);
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
formValidation();
