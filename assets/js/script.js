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
  const inputs = formLocalName.querySelectorAll(
    "input[name='local-name-option']"
  );

  formLocalName.addEventListener("click", () => {
    inputs.forEach((input) => {
      // if (input.checked) {
      //   addClass(input.nextSibling, "active");
      //   console.log("ACTIVE" + input.nextSibling); //APAGAR APAGAR APAGAR
      // } else {
      //   removeClass(input.nextSibling, "active");
      //   console.log("TIREI!" + input.nextSibling); //APAGAR APAGAR APAGAR
      // }
      console.log(input);
    });
  });
}

function actionButtonsHandle(button) {
  button.addEventListener("click", clickButtonHandle);

  function clickButtonHandle() {
    const activeContainer = document.querySelector(".content__box--show");
    const formParent = activeContainer.querySelector(".content__forms");
    const forms = formParent.querySelectorAll(".form");

    switch (button.id) {
      case "btn-duplicate":
        if (confirm("DUPLICAR o formulario?")) {
          duplicateForm(formParent, forms);
        }
        break;

      case "btn-reset":
        if (confirm("APAGAR tudo?")) {
          resetForm(forms);
        }
        break;

      default:
        console.error("Não existe esse id nos botões de ação");
        break;
    }
  }

  function duplicateForm(parent, childs) {
    for (let child of childs) {
      let newDiv = document.createElement("div");
      addClass(newDiv, "form-container");
      newDiv.innerHTML = child.outerHTML;
      parent.appendChild(newDiv);
    }
  }

  function resetForm(forms) {
    const activeInput = document.querySelector(".active");
    if (activeInput) removeClass(activeInput, "active");

    if (isElementCollection(forms)) {
      forms.forEach((form) => {
        form.reset();
      });
    } else {
      forms.reset();
    }
  }
}
