const empleados = document.getElementById('empleados');

const fetchEmpleados = async (cantidad) => {
    try {
        const respuesta = await fetch(`https://randomuser.me/api/?results=${cantidad}`);
        if (!respuesta.ok) throw new Error('Error al conectar la API');

        const datos = await respuesta.json();
        return datos.results;

    } catch (error) {
        console.log('Fallo el sistema de nomina: ', error)
        empleados.innerHTML = `<p class="error">Hubo un problema al cargar los empleados. Por favor, intente más tarde.</p>`;
        return [];
    }
};


// Función que genera el HTML de una sola Tarjeta (Card)

const crearTarjetaEmpleado = (empleado) => {
    const { picture, name, location, email, phone, cell } = empleado;

    return `
        <article class="card-empleado">
            <div class="card-header">
                <img src="${picture.large}" alt="Foto de ${name.first}" class="foto-perfil">
                <h2>${name.title} ${name.first} ${name.last}</h2>
            </div>
            <div class="card-body">
                <div class="seccion-domicilio">
                    <h3>📍 Domicilio Registrado</h3>
                    <p>${location.street.name} ${location.street.number}</p>
                    <p>${location.city}, ${location.country}</p>
                </div>
                <hr>
                <div class="seccion-contacto">
                    <h3>📞 Datos de Contacto</h3>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Tel. Fijo:</strong> ${phone}</p>
                    <p><strong>Celular:</strong> ${cell}</p>
                </div>
            </div>
        </article>
    `;
};

// 4. Función orquestadora: Trae los datos y los pinta en el DOM
const inicializarPortal = async () => {
    // Pedimos 12 empleados para el ejemplo
    const listaEmpleados = await fetchEmpleados(12);

    // Si la API falla, listaEmpleados será un array vacío y no rompe nada
    if (listaEmpleados.length > 0) {
        // Mapeamos el array de datos a un array de strings HTML y los unimos
        const htmlTarjetas = listaEmpleados.map(crearTarjetaEmpleado).join('');

        // Inyectamos todo el bloque HTML en el contenedor de una sola vez (mejor rendimiento)
        if (empleados) {
            empleados.innerHTML = htmlTarjetas;
        }
    }
};

// 5. Arrancamos la app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarPortal);

// Escucha del botón manual
document.getElementById('btn')?.addEventListener('click', inicializarPortal);