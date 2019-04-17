const value = 'value';
function method() {
  console.log(value);
}

window.value = value;
window.method = method;
