const form = document.getElementById("serviceForm");
const resetBtn = document.getElementById("resetBtn");

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const dni = document.getElementById("dni");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const medioContacto = document.getElementById("medioContacto");
const calle = document.getElementById("calle");
const numero = document.getElementById("numero");
const piso = document.getElementById("piso");
const departamento = document.getElementById("departamento");
const ciudad = document.getElementById("ciudad");
const provincia = document.getElementById("provincia");
const codigoPostal = document.getElementById("codigoPostal");
const tipoServicio = document.getElementById("tipoServicio");
const comentarios = document.getElementById("comentarios");
const terminos = document.getElementById("terminos");

const successAlert = document.getElementById("successAlert");
const warningAlert = document.getElementById("warningAlert");

const summaryNombreCompleto = document.getElementById("summaryNombreCompleto");
const summaryEmail = document.getElementById("summaryEmail");
const summaryTelefono = document.getElementById("summaryTelefono");
const summaryCiudad = document.getElementById("summaryCiudad");
const summaryServicio = document.getElementById("summaryServicio");

const errorFields = {
  nombre: document.getElementById("nombreError"),
  apellido: document.getElementById("apellidoError"),
  dni: document.getElementById("dniError"),
  fechaNacimiento: document.getElementById("fechaNacimientoError"),
  email: document.getElementById("emailError"),
  telefono: document.getElementById("telefonoError"),
  medioContacto: document.getElementById("medioContactoError"),
  calle: document.getElementById("calleError"),
  numero: document.getElementById("numeroError"),
  ciudad: document.getElementById("ciudadError"),
  provincia: document.getElementById("provinciaError"),
  codigoPostal: document.getElementById("codigoPostalError"),
  tipoServicio: document.getElementById("tipoServicioError"),
  terminos: document.getElementById("terminosError")
};

function clearErrors() {
  Object.values(errorFields).forEach((element) => {
    element.textContent = "";
  });

  [
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    email,
    telefono,
    medioContacto,
    calle,
    numero,
    ciudad,
    provincia,
    codigoPostal,
    tipoServicio
  ].forEach((field) => {
    field.classList.remove("input-error");
  });
}

function setError(field, message) {
  errorFields[field].textContent = message;
  document.getElementById(field).classList.add("input-error");
}

function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function validarSoloNumeros(valor) {
  return /^\d+$/.test(valor);
}

function updateSummary() {
  const nombreCompleto = `${nombre.value.trim()} ${apellido.value.trim()}`.trim();

  summaryNombreCompleto.textContent = nombreCompleto || "Sin completar";
  summaryEmail.textContent = email.value.trim() || "Sin completar";
  summaryTelefono.textContent = telefono.value.trim() || "Sin completar";
  summaryCiudad.textContent = ciudad.value.trim() || "Sin completar";
  summaryServicio.textContent =
    tipoServicio.options[tipoServicio.selectedIndex].text !== "Seleccioná un servicio"
      ? tipoServicio.options[tipoServicio.selectedIndex].text
      : "Sin seleccionar";
}

function validateForm() {
  clearErrors();
  let isValid = true;

  if (nombre.value.trim() === "") {
    setError("nombre", "Ingresá el nombre.");
    isValid = false;
  }

  if (apellido.value.trim() === "") {
    setError("apellido", "Ingresá el apellido.");
    isValid = false;
  }

  if (dni.value.trim() === "") {
    setError("dni", "Ingresá el DNI.");
    isValid = false;
  } else if (!validarSoloNumeros(dni.value.trim()) || dni.value.trim().length < 7 || dni.value.trim().length > 8) {
    setError("dni", "El DNI debe contener 7 u 8 números.");
    isValid = false;
  }

  if (fechaNacimiento.value === "") {
    setError("fechaNacimiento", "Seleccioná la fecha de nacimiento.");
    isValid = false;
  }

  if (email.value.trim() === "") {
    setError("email", "Ingresá el correo electrónico.");
    isValid = false;
  } else if (!validarEmail(email.value.trim())) {
    setError("email", "Ingresá un correo electrónico válido.");
    isValid = false;
  }

  if (telefono.value.trim() === "") {
    setError("telefono", "Ingresá el teléfono.");
    isValid = false;
  } else if (!/^[0-9\s()+-]{6,20}$/.test(telefono.value.trim())) {
    setError("telefono", "Ingresá un teléfono válido.");
    isValid = false;
  }

  if (medioContacto.value === "") {
    setError("medioContacto", "Seleccioná un medio de contacto.");
    isValid = false;
  }

  if (calle.value.trim() === "") {
    setError("calle", "Ingresá la calle.");
    isValid = false;
  }

  if (numero.value.trim() === "") {
    setError("numero", "Ingresá el número.");
    isValid = false;
  } else if (!validarSoloNumeros(numero.value.trim())) {
    setError("numero", "El número debe contener solo dígitos.");
    isValid = false;
  }

  if (ciudad.value.trim() === "") {
    setError("ciudad", "Ingresá la ciudad.");
    isValid = false;
  }

  if (provincia.value.trim() === "") {
    setError("provincia", "Ingresá la provincia.");
    isValid = false;
  }

  if (codigoPostal.value.trim() === "") {
    setError("codigoPostal", "Ingresá el código postal.");
    isValid = false;
  } else if (!/^[A-Za-z0-9\s-]{4,8}$/.test(codigoPostal.value.trim())) {
    setError("codigoPostal", "Ingresá un código postal válido.");
    isValid = false;
  }

  if (tipoServicio.value === "") {
    setError("tipoServicio", "Seleccioná un tipo de servicio.");
    isValid = false;
  }

  if (!terminos.checked) {
    errorFields.terminos.textContent = "Debés aceptar los términos y condiciones.";
    isValid = false;
  }

  return isValid;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  updateSummary();

  const valid = validateForm();

  if (valid) {
    successAlert.classList.remove("hidden");
    warningAlert.classList.add("hidden");
  } else {
    warningAlert.classList.remove("hidden");
    successAlert.classList.add("hidden");
  }
});

resetBtn.addEventListener("click", function () {
  form.reset();
  clearErrors();
  successAlert.classList.add("hidden");
  warningAlert.classList.add("hidden");
  updateSummary();
});

[
  nombre,
  apellido,
  dni,
  fechaNacimiento,
  email,
  telefono,
  medioContacto,
  calle,
  numero,
  piso,
  departamento,
  ciudad,
  provincia,
  codigoPostal,
  tipoServicio,
  comentarios
].forEach((field) => {
  field.addEventListener("input", updateSummary);
  field.addEventListener("change", updateSummary);
});

updateSummary();