function mostrarPopup(mensaje) {
  fetch('../controller/vaciarArchivo.php', {method: 'POST'})
  const popup = document.createElement("div");
  popup.id = 'popup';
  popup.textContent = mensaje;
  popup.style.display = "block";
  document.body.append(popup);
  setTimeout(() => {
      popup.style.display = "none";
  }, 5000);
}

fetch('../resources/logs/errorlog.txt')
  .then(response => response.text())
  .then(text => {
    if(text != ''){
      mostrarPopup(text);
    }
    
  })

  

