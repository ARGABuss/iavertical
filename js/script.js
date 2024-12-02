sessionStorage.removeItem("lastClickPage")
// Encuentra todos los enlaces que tienen el atributo data-page
const links = document.querySelectorAll('a[data-page]');

// Para cada enlace, añade un evento click
links.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();  // Evita la acción por defecto del enlace
        // Obtén el valor del atributo data-page, que contiene el nombre del archivo HTML a cargar
        const page = this.getAttribute('data-page');
        if (sessionStorage.getItem("lastClickPage") !== page) {
            getPageHTML(page);
        }
        sessionStorage.setItem("lastClickPage", page)
    });
});

function getPageHTML(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la página');
            }
            return response.text();
        })
        .then(data => {
            // history.pushState({ page }, '', `/${page}`);
            // // Opcional: manejar el evento popstate para la navegación hacia atrás
            // window.onpopstate = function(event) {
            //     if (event.state) {
            //         cargarContenido(event.state.page); // Volver a cargar la página anterior
            //     }
            // }

            document.getElementById('main-section').classList.remove("bg-black", 'text-white');
            if (document.getElementById('myVideo')) {
                document.getElementById('myVideo').remove();
            }
            document.location.href = `#${page.split("/")[1]}`;
            // document.getElementById('content').innerHTML = data;
            document.getElementById("dinamicContent").innerHTML = data;
            document.getElementById("main-header").classList.add('main-header', 'header-three', 'text-white');
            document.getElementById("menu-mobile").classList.add('collapsed');
            document.getElementById("navbarSupportedContent1").classList.add('collapsed');
            document.getElementById("navbarSupportedContent1").classList.remove('show');
            document.getElementById("menu-mobile").setAttribute("aria-expanded", "false");
            handlePreloader();
            getBackground();
            if (page.includes("pqrs")) {
                cargarScript('https://cdn.jsdelivr.net/npm/emailjs-com@2.4.1/dist/email.min.js');

                const btn = document.getElementById('button');

                document.getElementById('form')
                    .addEventListener('submit', function (event) {
                        event.preventDefault();
                        emailjs.init('mGiZ7TohNYQrV0Y2L')

                        btn.innerHTML  = 'Enviando...';

                        const serviceID = 'default_service';
                        const templateID = 'template_8jie9m9';
                        const consentimientoCheckbox = document.getElementById('consentimientocheck');
                        const consentimientoField = document.createElement('input');

                        consentimientoField.type = 'hidden';
                        consentimientoField.id = 'consentimiento';
                        consentimientoField.name = 'consentimiento';
                        consentimientoField.value = consentimientoCheckbox.checked ? 'Aceptado' : 'No aceptado';

                        // Agregar el campo al formulario
                        this.appendChild(consentimientoField);

                        emailjs.sendForm(serviceID, templateID, this)
                            .then(() => {
                                btn.innerHTML = 'Enviar PQR';
                                btns.disabled = true;

                                document.getElementById('response-message').innerHTML = `
                             <div class="alert alert-success">¡PQR enviado correctamente!</div>`
                            }, (err) => {
                                btn.innerHTML = 'Enviar PQR';
                                document.getElementById('response-message').innerHTML = `
                             <div class="alert alert-danger">Error al enviar el PQR. Por favor, inténtalo de nuevo. <br/> ${err.text}</div>`
                            });
                    });
            }
        })
        .catch(error => {
            console.error("ARGA--->", error);
            document.getElementById("dinamicContent").innerHTML = '<h2>Estamos trabajando para mejorar tu experiencia <br> volveremos pronto...</h2>';

        });
}

// Preloader
function handlePreloader() {
    if ($('.preloader').length) {
        $('.preloader').delay(200).fadeOut(500);
    }
}
handlePreloader();
if (document.location.hash.replace("#", "")) {
    getPageHTML(`pages/${document.location.hash.replace("#", "")}`);
}
$(window).on('scroll', function () {
    // Header Style and Scroll to Top
    function headerStyle() {
        if ($('.main-header').length) {
            var windowpos = $(window).scrollTop();
            var siteHeader = $('.main-header');
            var scrollLink = $('.scroll-top');
            if (windowpos >= 50) {
                siteHeader.addClass('fixed-header');
                scrollLink.fadeIn(300);
            } else {
                siteHeader.removeClass('fixed-header');
                scrollLink.fadeOut(300);
            }
        }
    }

    headerStyle();

});

function getBackground() {
    const random = Math.random();
    if (random > 0.5) {
        document.getElementById('logo').src = 'images/logos/logo-negro.png';
        document.getElementById('logom').src = 'images/logos/logo-negro.png';
        document.getElementById("main-div-header").style.backgroundColor = '#4fc7e7';
        document.getElementsByTagName('h2')[0].classList.add("coloriavazul")
    } else {
        document.getElementById('logo').src = 'images/logos/logo.png';
        document.getElementById('logom').src = 'images/logos/logo.png';
        document.getElementById("main-div-header").style.backgroundColor = '';
        document.getElementsByTagName('h2')[0].classList.add("coloriavazulOs")
    }
}

function cargarScript(ruta) {
    var script = document.createElement('script');
    script.src = ruta;
    document.head.appendChild(script);
    // Inicializar EmailJS
    (function () {
        try {
            emailjs.init(
                {
                    publicKey: "EjhIhpJnsylsS4z1D",
                });

        } catch (error) {
            console.log('error al cargar el email lib', ruta)
        }
    })();
}

// Ejemplo de uso: