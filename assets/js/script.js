// contrução das tabs (Seg, Ter, ... Dom)
document.addEventListener("DOMContentLoaded", main);

async function main() {
  const navTabs = document.querySelectorAll(".nav__tab");
  const formsContainer = document.querySelectorAll(".content__forms");
  const formPascom = await getForm("pascom");

  navTabs.forEach((tab) =>
    tab.addEventListener("click", () => tabClickHandle(tab, navTabs))
  );

  formBuilder(formsContainer, formPascom);
  const radioInputs = document.querySelectorAll('input[type="radio"]');
  radioInputs.forEach(radioInputHandle);
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

function formBuilder(formsParent, form) {
  formsParent.forEach((parent) => (parent.innerHTML = form));
}

function radioInputHandle(input) {
  input.addEventListener("change", () => {
    if (input.checked) {
      addClass(input.parentElement, "box-radio--active");
    } else {
      removeClass(input.parentElement, "box-radio--active");
    }
  });
}

function isElementCollection(elements) {
  return elements instanceof NodeList || elements instanceof HTMLCollection;
}
