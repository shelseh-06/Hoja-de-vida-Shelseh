// Esperamos a que el HTML cargue completamente
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MENÚ MÓVIL
    // ==========================================
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    menuBtn.addEventListener('click', () => {
        // Al hacer clic, pone o quita la clase 'open' en el menú
        navLinks.classList.toggle('open');
    });

    // ==========================================
    // 2. MODO OSCURO
    // ==========================================
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement; // La etiqueta <html>

    themeBtn.addEventListener('click', () => {
        // Pone o quita la clase 'dark' en el HTML
        html.classList.toggle('dark');
        
        // Cambia el emoji de sol a luna
        if (html.classList.contains('dark')) {
            themeBtn.textContent = '☀️';
        } else {
            themeBtn.textContent = '🌙';
        }
    });

    // ==========================================
    // 3. PROYECTOS (Leer JSON y crear tarjetas)
    // ==========================================
    const contenedor = document.getElementById('proyectos-container');
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    let listaProyectos = []; // Aquí guardaremos los datos

    // Función para dibujar las tarjetas en el HTML
    const mostrarProyectos = (proyectos) => {
        contenedor.innerHTML = ''; // Limpia el "Cargando..."
        
        proyectos.forEach(proyecto => {
            // Creamos una tarjeta por cada proyecto
            contenedor.innerHTML += `
                <div class="proyecto-card">
                    <span class="cat">${proyecto.categoria}</span>
                    <h3>${proyecto.titulo}</h3>
                    <p>${proyecto.descripcion}</p>
                    <a href="${proyecto.enlace}">Ver proyecto →</a>
                </div>
            `;
        });
    };

    // Traemos los datos del archivo proyectos.json
    fetch('proyectos.json')
        .then(respuesta => respuesta.json()) // Lo convierte a formato legible
        .then(datos => {
            listaProyectos = datos; // Guardamos la lista
            mostrarProyectos(listaProyectos); // Mostramos todos al inicio
        });

    // Lógica de los botones de filtro
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Quitamos el color activo de todos los botones
            botonesFiltro.forEach(b => b.classList.remove('activo'));
            // Se lo ponemos al botón que se hizo clic
            boton.classList.add('activo');

            const filtro = boton.getAttribute('data-filter');
            
            if (filtro === 'todos') {
                mostrarProyectos(listaProyectos);
            } else {
                // Filtramos los proyectos por la categoría seleccionada
                const filtrados = listaProyectos.filter(p => p.categoria === filtro);
                mostrarProyectos(filtrados);
            }
        });
    });

    // ==========================================
    // 4. VALIDACIÓN DEL FORMULARIO
    // ==========================================
    const form = document.getElementById('contact-form');
    const exito = document.getElementById('form-success');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        let esValido = true;
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            const errorMsg = input.nextElementSibling; // El <p> de error
            
            // checkValidity() revisa si cumple las reglas (required, tipo email, etc.)
            if (!input.checkValidity()) {
                input.classList.add('invalid');
                if (errorMsg) errorMsg.classList.add('show');
                esValido = false;
            } else {
                input.classList.remove('invalid');
                if (errorMsg) errorMsg.classList.remove('show');
            }
        });

        if (esValido) {
            form.reset(); // Limpia los campos
            exito.classList.add('show'); // Muestra el mensaje verde
            setTimeout(() => exito.classList.remove('show'), 3000); // Lo oculta a los 3 seg
        }
    });
});