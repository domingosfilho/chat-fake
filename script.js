document.addEventListener("DOMContentLoaded", () => {

    const contatos = [
        { nome: "João Fake", foto: "img/09A.png", mensagens: [] },
        { nome: "Maria", foto: "img/10A.png", mensagens: [] },
        { nome: "Carlos Bot", foto: "img/11A.png", mensagens: [] },
        { nome: "Esquenta Fake", foto: "img/01.png", mensagens: [] }
    ];

    let atual = 0;

    function hora() {
        return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    function carregarContatos() {
        let lista = document.querySelector(".contatos");
        lista.innerHTML = "";

        contatos.forEach((c, i) => {
            let div = document.createElement("div");
            div.className = "contato";
            div.onclick = () => selecionar(i);

            div.innerHTML = `
                <img src="${c.foto}">
                <div class="info">
                    <div class="topo">
                        <b>${c.nome}</b>
                    </div>
                </div>
            `;

            lista.appendChild(div);
        });
    }

    function selecionar(i) {
        atual = i;
        let c = contatos[i];

        let foto = document.querySelector("#foto");
        let nome = document.querySelector(".nome");

        // 🔥 GARANTE QUE EXISTE
        if (foto) {
            foto.src = c.foto;
        } else {
            console.log("❌ IMG #foto NÃO ENCONTRADA");
        }

        if (nome) {
            nome.innerText = c.nome;
        }

        render();
    }

    function render() {
        let chat = document.querySelector(".chat-body");
        chat.innerHTML = "";

        contatos[atual].mensagens.forEach(m => {
            let div = document.createElement("div");
            div.className = "msg " + m.tipo;
            div.innerHTML = `${m.texto} <span class="hora">${m.hora}</span>`;
            chat.appendChild(div);
        });

        chat.scrollTop = chat.scrollHeight;
    }

    function enviar() {
        let input = document.getElementById("inputMsg");
        let texto = input.value.trim();

        if (!texto) return;

        contatos[atual].mensagens.push({
            texto,
            tipo: "enviada",
            hora: hora()
        });

        input.value = "";

        render();

        setTimeout(() => {
            contatos[atual].mensagens.push({
                texto: "Resposta fake 🤖",
                tipo: "recebida",
                hora: hora()
            });

            render();
        }, 1000);
    }

    document.getElementById("inputMsg").addEventListener("keydown", (e) => {
        if (e.key === "Enter") enviar();
    });

    carregarContatos();
    selecionar(0);

});