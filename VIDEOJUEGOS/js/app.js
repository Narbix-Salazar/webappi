const apiKey = '73050acb50974ead81cd53200e3ec6c0'; 
const urlAPI = `https://api.rawg.io/api/games?key=${apiKey}`;

const videojuegos = {
    render: () => {
        const container = document.querySelector('#videojuegos-list');
        let contentHTML = '';

        fetch(urlAPI)
            .then(res => res.json())
            .then((json) => {
                if (json.results.length === 0) {
                    contentHTML = '<li class="list-group-item">No se encontraron juegos.</li>';
                } else {
                    json.results.forEach(game => {
                        const imageUrl = game.background_image;
                        const gameUrl = game.slug; 

                        contentHTML += `
                            <li class="list-group-item">
                                <div class="row align-items-center">
                                    <div class="col-md-3">
                                        <a href="https://rawg.io/games/${gameUrl}" target="_blank">
                                            <img src="${imageUrl}" alt="${game.name}" class="img-thumbnail">
                                        </a>
                                    </div>
                                    <div class="col-md-9">
                                        <h5>${game.name}</h5>
                                        <p class="mb-0">${game.released ? `Lanzamiento: ${game.released}` : 'Fecha de lanzamiento no disponible'}</p>
                                        <a href="https://rawg.io/games/${gameUrl}" target="_blank" class="btn btn-primary mt-2">Ver más</a>
                                    </div>
                                </div>
                            </li>`;
                    });
                }
                container.innerHTML = contentHTML;
            })
            .catch((error) => {
                console.error('Error al cargar juegos:', error);
                container.innerHTML = '<li class="list-group-item">Hubo un error al cargar los juegos.</li>';
            });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const loadGamesBtn = document.getElementById('loadGamesBtn');
    loadGamesBtn.addEventListener('click', videojuegos.render);
});
