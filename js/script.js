// Encuentra todos los enlaces que tienen el atributo data-page
const links = document.querySelectorAll('a[data-page]');

// Para cada enlace, añade un evento click
links.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();  // Evita la acción por defecto del enlace
        // Obtén el valor del atributo data-page, que contiene el nombre del archivo HTML a cargar
        const page = this.getAttribute('data-page');
        // Usa fetch para obtener el contenido de la página solicitada
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar la página');
                }
                return response.text();
            })
            .then(data => {
                if (document.getElementById('myVideo')) {
                    document.getElementById('myVideo').remove()
                }
                // document.getElementById('content').innerHTML = data;
                document.getElementById("dinamicContent").innerHTML = data;
                document.getElementById("main-header").classList.add('main-header', 'header-three', 'text-white')
                document.getElementById("menu-mobile").classList.add('collapsed')
                document.getElementById("menu-mobile").classList.add('collapsed')
                document.getElementById("navbarSupportedContent1").classList.add('collapsed')
                document.getElementById("navbarSupportedContent1").classList.remove('show')
                document.getElementById("menu-mobile").setAttribute("aria-expanded", "false")
                handlePreloader();

            })
            .catch(error => {
                console.error('Hubo un problema con la carga de la página:', error);
                document.getElementById('content').innerHTML = '<p>Error al cargar la página.</p>';
            });
    });
});

// 30. Preloader
function handlePreloader() {
    if ($('.preloader').length) {
        $('.preloader').delay(200).fadeOut(500);
    }
}
handlePreloader();
