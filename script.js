// Lista de endpoints a monitorear
const endpoints = [
    { name: 'HTTPBin OK', url: 'https://httpbin.org/status/200' },
    { name: 'HTTPBin Error', url: 'https://httpbin.org/status/404' },
    { name: 'JSON Placeholder', url: 'https://jsonplaceholder.typicode.com/posts/1' },
    { name: 'GitHub API', url: 'https://api.github.com/users/octocat' }
    { name: 'Dolar Onza', url: ' http://dolaronza.khauta.net:2083/webBloomberg/ofertabloomberg/service/oferta/Tickers/index.php ' }
];

// Función para verificar el status de un endpoint
async function checkEndpoint(endpoint) {
    const start = Date.now();
    try {
        const response = await fetch(endpoint.url, { method: 'HEAD' }); // Usar HEAD para no descargar contenido
        const time = Date.now() - start;
        return { ...endpoint, status: response.status, time, up: response.ok };
    } catch (error) {
        const time = Date.now() - start;
        return { ...endpoint, status: 'Error de conexión', time, up: false };
    }
}

// Función para renderizar los endpoints en el DOM
function renderEndpoints(data) {
    const container = document.getElementById('endpoints-container');
    container.innerHTML = '';
    data.forEach(ep => {
        const div = document.createElement('div');
        div.className = `endpoint ${ep.up ? 'up' : 'down'}`;
        div.innerHTML = `
            <h3>${ep.name}</h3>
            <p>URL: ${ep.url}</p>
            <p>Status: ${ep.status}</p>
            <p>Tiempo de respuesta: ${ep.time} ms</p>
        `;
        container.appendChild(div);
    });
}

// Función para actualizar el dashboard
async function updateDashboard() {
    const promises = endpoints.map(checkEndpoint);
    const results = await Promise.all(promises);
    renderEndpoints(results);
}

// Inicializar y actualizar cada 30 segundos
updateDashboard();
setInterval(updateDashboard, 30000);