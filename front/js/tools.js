function store(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
  return JSON.parse(localStorage.getItem(key));
}

function has(key) {
  return !localStorage.getItem(key);
}
