document.addEventListener('DOMContentLoaded', () => {
    getDatos();
})

async function getDatos() {
    try {
        // Send the POST request using the fetch API
        let respuesta = await fetch('../controller/GetDatosUsuario.php')
        // Parse the response as JSON
        const datos = await respuesta.json();

        // Check if there's an error message in the response
        if (datos.error) {
            console.error('Error:', datos.error);
        } else {
            // Handle the valid data response
            console.log('User data:', datos);
            // You can further process the `datos` here, e.g., display it on the page
        }

    } catch (error) {
        // Log any errors that occur during the fetch process
        console.error('Error:', error);
    }
}

