// Cargar el header de forma dinámica
fetch('includes/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

// Cargar el footer de forma dinámica
fetch('includes/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

//     fetch('js/script.js')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Error al cargar el archivo JS');
//         }
//         return response.text();  // Obtenemos el contenido del archivo como texto
//     })
//     .then(scriptContent => {
//         // Creamos un elemento <script> y le asignamos el contenido del archivo
//         const scriptElement = document.createElement('script');
//         scriptElement.textContent = scriptContent;

//         // Insertamos el <script> en el <body> o en el <head> para que se ejecute
//         document.body.appendChild(scriptElement);
//     })
//     .catch(error => {
//         console.error('Hubo un problema al cargar el archivo JS:', error);
//     });
    const scripts = [

        'js/jquery-3.6.0.min.js',
        'js/bootstrap.min.js',
        'js/appear.min.js',
        'js/slick.min.js',
        'js/jquery.magnific-popup.min.js',
        'js/isotope.pkgd.min.js',
        'js/wow.js',
        'js/script.js',
    ];
         // Cargar y ejecutar todos los scripts
         scripts.forEach(script => {
            loadScript(script);
        });
    function loadScript(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar el archivo JS: ${url}`);
                }
                return response.text();
            })
            .then(scriptContent => {
                // Creamos un nuevo elemento <script>
                const scriptElement = document.createElement('script');
                scriptElement.textContent = scriptContent;

                // Insertamos el script en el <body> para que se ejecute
                document.body.appendChild(scriptElement);
            })
            .catch(error => {
                console.error('Error al cargar y ejecutar el archivo JS:', error);
            });
    }