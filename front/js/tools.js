function store(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
  return JSON.parse(localStorage.getItem(key));
}

function has(key) {
  return !localStorage.getItem(key);
}

function price(amount) {
  // Create our number formatter.
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  return formatter.format(amount);
}

function getDataFromURL(key) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params[key];
}
