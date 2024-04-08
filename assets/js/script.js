// contrução das tabs (Seg, Ter, ... Dom)
document.addEventListener("DOMContentLoaded", main);

async function main() {
  const navTabs = document.querySelectorAll(".nav__tab");
  const actionButtonsContainer = document.querySelector(".action-buttons");
  const formsContainer = document.querySelectorAll(".form-container");
  const formPascom = await getForm("pascom");

  navTabs.forEach((tab) =>
    tab.addEventListener("click", () => tabClickHandle(tab, navTabs))
  );

  formBuilder(formsContainer, formPascom);

  Array.from(actionButtonsContainer.children).forEach(actionButtonsHandle);
}

async function getForm(formName) {
  const response = await fetch("assets/forms/" + formName + ".html");
  return await response.text();
}

function tabClickHandle(tab, navTabs) {
  const contents = document.querySelectorAll(".content__box");

  removeClass(navTabs, "nav__tab--active");
  removeClass(contents, "content__box--show");

  tab.classList.add("nav__tab--active");
  contents.forEach((content) => {
    if (content.id.includes(tab.id)) {
      content.classList.add("content__box--show");
    }
  });
}

function removeClass(elements, nameClass) {
  if (isElementCollection(elements)) {
    elements.forEach((element) => {
      element.classList.remove(nameClass);
    });
  } else {
    elements.classList.remove(nameClass);
  }
}

function addClass(elements, nameClass) {
  if (isElementCollection(elements)) {
    elements.forEach((element) => {
      element.classList.add(nameClass);
    });
  } else {
    elements.classList.add(nameClass);
  }
}

function isElementCollection(elements) {
  return elements instanceof NodeList || elements instanceof HTMLCollection;
}

function formBuilder(formsParent, form) {
  formsParent.forEach((parent) => (parent.innerHTML = form));
  localNameHandle();
}

function localNameHandle() {
  const formLocalName = document.querySelector(".form__local-name");
  const inputs = formLocalName.querySelectorAll("input");
  const labels = formLocalName.querySelectorAll("label");

  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) {
        labels.forEach((label) => {
          if (label.getAttribute("for") == input.id) {
            addClass(label, "active");
          } else {
            removeClass(label, "active");
          }
        });
      }
    });
  });
}

function actionButtonsHandle(button) {
  button.addEventListener("click", clickButtonHandle);

  function clickButtonHandle() {
    const activeContainer = document.querySelector(".content__box--show");
    const formContainer = activeContainer.querySelector(".form-container");
    const forms = activeContainer.querySelectorAll(".form");

    switch (button.id) {
      case "btn-duplicate":
        if (confirmOperation("DUPLICAR o formulario?")) {
          duplicateForm(formContainer, forms);
        }
        break;

      case "btn-reset":
        if (confirmOperation("APAGAR tudo?")) {
          resetForm(forms);
        }
        break;

      default:
        console.error("Não existe esse id nos botões de ação");
        break;
    }
  }

  function confirmOperation(string) {
    return confirm(string);
  }

  function duplicateForm(parent, forms) {
    if (isElementCollection(forms)) {
      forms.forEach((form) => {
        parent.appendChild(form);
      });
    } else {
      parent.appendChild(forms);
    }
  }

  function resetForm(forms) {
    if (isElementCollection(forms)) {
      forms.forEach((form) => {
        form.reset();
      });
    } else {
      forms.reset();
    }
  }
}
