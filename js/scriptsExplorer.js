const materiaExplorer = [
    {
        titulo: "A influência do esporte no âmbito social e cultural",
        imagem: "./css/img/esporte-img0.png",
        tags: ["Cultura", "Esportes"],
        categoria: "Cultura",
        link: "./materias/cultura1.html"
    },
    {
        titulo: "10 Dicas de Alimentação Saudável no Esporte",
        imagem: "./css/img/alimentacao-img1.png",
        tags: ["Saúde", "Esporte", "Culinaria"],
        categoria: "Saude",
        link: "./materias/saude1.html"
    },
    {
        titulo: "Forró: quando a dança vira cultura e educação",
        imagem: "./css/img/forro-img0.png",
        tags: ["Dança", "Cultura"],
        categoria: "Danca",
        link: "./materias/danca1.html"
    },
    {
        titulo: "Torcida Organizada do Corinthians segue proibida nos estádios",
        imagem: "./css/img/corinthians-capa.png",
        tags: ["Esportes"],
        categoria: "Esportes",
        link: "./materias/esporte1.html"
    },
    {
        titulo: "Copa do Brasil 2025: Oitavas definem os oito classificados para as quartas de finais!",
        imagem: "./css/img/esporte2-img2.png",
        tags: ["Esportes"],
        categoria: "Esportes",
        link: "./materias/esporte2.html"
    },
    {
        titulo: "2025 - Um Ano de Grandes Conquistas e Emoções no Vôlei",
        imagem: "./css/img/volei-capa.png",
        tags: ["Esportes"],
        categoria: "Esportes",
        link: "./materias/volei1.html"
    },
    {
        titulo: "Artes Marciais: Cultura, Saúde e Disciplina",
        imagem: "./css/img/artes-marciais-capa.png",
        tags: ["Artes Marciais", "Saúde", "Cultura"],
        categoria: "ArtesMarciais",
        link: "./materias/artesmarciais1.html"
    },
    {
        titulo: "Educação para o lazer como formação integral",
        imagem: "./css/img/lazerimg1.png",
        tags: ["Lazer", "Esportes", "Cultura"],
        categoria: "Lazer",
        link: "./materias/lazer1.html"
    }
];

const listaContainer = document.getElementById("listaMaterias");
const materiasContainer = document.getElementById("materiasContainer");
const pesquisarInput = document.getElementById("pesquisar");
const btnMostrarTudo = document.getElementById("btnMostrarTudo");

// Pega todos os cards existentes
document.querySelectorAll(".materia-card").forEach(card => {
    card.addEventListener("click", ev => {
        ev.preventDefault(); // evita o link
        const categoria = card.dataset.categoria; // pega a categoria do card
        renderLista(categoria, { hideCards: true }); // chama a mesma função do dropdown
    });
});


// Renderiza a lista expandida
function renderLista(filtro = "", options = {}) {
    listaContainer.innerHTML = "";
    const filtroLower = filtro.toLowerCase().trim();

    const matches = materiaExplorer.filter(m => {
        if (!filtroLower) return true;
        if (m.categoria.toLowerCase() === filtroLower) return true;
        if (m.titulo.toLowerCase().includes(filtroLower)) return true;
        if (m.tags.some(t => t.toLowerCase().includes(filtroLower))) return true;
        return false;
    });

    matches.forEach(materia => {
        const item = document.createElement("div");
        item.className = "materia-item";
        item.style.backgroundImage = `url('${materia.imagem}')`;

        item.innerHTML = `
              <div class="conteudo">
                <div class="action">
                  <a href="${materia.link}" class="ler-btn">Ler a Matéria</a>
                </div>
                <div class="info">
                  <h2>${materia.titulo}</h2>
                  <div class="small-desc">Categoria: ${materia.categoria}</div>
                </div>
                <div class="meta">
                  <div class="tags">${materia.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
                </div>
              </div>
            `;
        listaContainer.appendChild(item);
    });

    materiasContainer.style.display = (options.hideCards || filtroLower) ? "none" : "";

    if (matches.length === 0) {
        const no = document.createElement("div");
        no.style.padding = "18px";
        no.style.color = "#555";
        no.textContent = "Nenhuma matéria encontrada.";
        listaContainer.appendChild(no);
    }
}

pesquisarInput.addEventListener("input", e => {
    renderLista(e.target.value, { hideCards: true });
});

document.querySelectorAll(".dropdown-content a").forEach(link => {
    link.addEventListener("click", ev => {
        ev.preventDefault();
        renderLista(link.dataset.categoria, { hideCards: true });
    });
});

btnMostrarTudo.addEventListener("click", () => {
    pesquisarInput.value = "";
    materiasContainer.style.display = "";
    renderLista("", { hideCards: false });
});

// inicializa
renderLista("", { hideCards: false });