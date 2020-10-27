const contenedorCursos = document.getElementById('contenedor-cursos');

class Cursos {
    async traerCursos() {
        try {
            let resultado = await fetch('cursos.json');
            let infoCursos = await resultado.json();
            let cursos = infoCursos.cursos;
            cursos = cursos.map(curso => {
                const {id, titulo, img, precio, href} = curso;
                return {id, titulo, img, precio, href};
            });
            return cursos;
        } catch (error) {
            console.log(error);
        }
    }
}

class UI {
    mostrarCursos(cursos) {
        let resultado = '';
        cursos.forEach(curso => {
            resultado += `
            <div class="card card-cursos ml-2 mr-2 mb-4 mt-5" style="width: 20rem;">
                <img src="${curso.img}" class="card-img-top" alt="${curso.titulo}">
                <div class="card-body text-center">
                    <h5 class="card-title">${curso.titulo}</h5>
                    <p class="card-text">$${curso.precio}</p>
                    <a href="${curso.href}" class="btn mt-4">Ver más</a>
                    <a href="${curso.id}" class="btn btn-reservar mt-4" id="${curso.id}">Comprar</a>
                </div>
            </div>
            `;
        });
        contenedorCursos.innerHTML = resultado;
    }
}


// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const cursos = new Cursos();

    cursos.traerCursos()
        .then(cursos => ui.mostrarCursos(cursos));
});

