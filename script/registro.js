const fechNac = document.getElementById('fechaNac')
const hoy = new Date();
const minEdad = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
const maxDate = minEdad.toISOString().split('T')[0];
const form = document.getElementById('formRegistro');

fechNac.max = maxDate;

form.addEventListener('submit', (e) => {
    const password = document.getElementById('contraseña').value;
    const password2 = document.getElementById('repContraseña').value;

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!regex.test(password)) {
        e.preventDefault();
        mostrarPopup("La contraseña debe tener al menos 8 caracteres, incluir letras, números y símbolos.");
        return;
    }

    if (password !== password2) {
        e.preventDefault();
        mostrarPopup("Las contraseñas no coinciden.");
        return;
    }
});

function mostrarPopup(mensaje) {
    const popup = document.createElement("div");
    popup.id = 'popup';
    popup.textContent = mensaje;
    popup.style.display = "block";
    document.body.append(popup);
    setTimeout(() => {
        popup.style.display = "none";
    }, 5000);
}