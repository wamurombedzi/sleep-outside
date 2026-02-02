export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  const element = qs(selector);
  if (element) {
    element.addEventListener('touchend', (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener('click', callback);
  }
}

export function getParam(param) {
  const UrlParams = new URLSearchParams(window.location.search);
  return UrlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  if (!parentElement) return;
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`No se pudo cargar el template en: ${path}`);
  }
  const template = await res.text();
  return template;
}

export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) {
    // eslint-disable-next-line no-console
    console.error('Error: El parentElement proporcionado es null. Revisa tus IDs en el HTML.');
    return;
  }

  const fragment = document.createRange().createContextualFragment(template);
  parentElement.replaceChildren(fragment);

  if (callback) {
    callback(data);
  }
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('/partials/header.html');
  const footerTemplate = await loadTemplate('/partials/footer.html');

  const headerElement = document.querySelector('header');
  const footerElement = document.querySelector('footer');

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener('click', function (e) {
    if (e.target.tagName === 'SPAN') {
      this.remove();
    }
  });

  const main = document.querySelector('main');
  if (main) {
    main.prepend(alert);
  }

  if (scroll) {
    window.scrollTo(0, 0);
  }
}