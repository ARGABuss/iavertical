sessionStorage.removeItem("lastClickPage")
// Encuentra todos los enlaces que tienen el atributo data-page
const links = document.querySelectorAll('a[data-page]');

// Para cada enlace, añade un evento click
links.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();  // Evita la acción por defecto del enlace
        // Obtén el valor del atributo data-page, que contiene el nombre del archivo HTML a cargar
        const page = this.getAttribute('data-page');
        if (sessionStorage.getItem("lastClickPage") !== page)
        {
            fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar la página');
                }
                return response.text();
            })
            .then(data => {
                console.log("argapage",page)
                document.getElementById('main-section').classList.remove("bg-black", 'text-white')
                if (document.getElementById('myVideo')) {
                    document.getElementById('myVideo').remove()
                }
                // document.getElementById('content').innerHTML = data;
                document.getElementById("dinamicContent").innerHTML = data;
                document.getElementById("main-header").classList.add('main-header', 'header-three', 'text-white')
                document.getElementById("menu-mobile").classList.add('collapsed')
                document.getElementById("navbarSupportedContent1").classList.add('collapsed')
                document.getElementById("navbarSupportedContent1").classList.remove('show')
                document.getElementById("menu-mobile").setAttribute("aria-expanded", "false")
                handlePreloader();
                getBackground();

            })
            .catch(error => {
                document.getElementById("dinamicContent").innerHTML = '<h2>Estamos trabajando para mejorar tu experiencia <br> volveremos pronto...</h2>';

            });
        }
        sessionStorage.setItem("lastClickPage",page)
    });
});

// Preloader
function handlePreloader() {
    if ($('.preloader').length) {
        $('.preloader').delay(200).fadeOut(500);
    }
}
handlePreloader();

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
        document.getElementById("main-div-header").style.backgroundColor  = '#4fc7e7';
        document.getElementsByTagName('h2')[0].classList.add("coloriavazul")
    } else {
        document.getElementById('logo').src = 'images/logos/logo.png';
        document.getElementById('logom').src = 'images/logos/logo.png';
        document.getElementById("main-div-header").style.backgroundColor  = '';
        document.getElementsByTagName('h2')[0].classList.add("coloriavazulOs")
    }
}