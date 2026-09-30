import { useEffect, useState } from "react";
import { cadastrarTarefa, listarTarefas } from "./api.js";

// Componente da oficina, apresentado por Luan Felipe.
// Um componente é uma função que descreve parte da interface usando JSX.
export default function App() {
  // useState guarda informações e atualiza a tela quando elas mudam.
  const [titulo, setTitulo] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");

  // useEffect sincroniza a interface com a API quando o componente é montado.
  useEffect(() => {
    const controller = new AbortController();

    async function carregar() {
      try {
        const dados = await listarTarefas(controller.signal);
        setTarefas(dados);
      } catch (falha) {
        // O cancelamento esperado do StrictMode não é um erro para o usuário.
        if (controller.signal.aborted) return;
        setErro(mensagemDeErro(falha));
      } finally {
        if (!controller.signal.aborted) setCarregando(false);
      }
    }

    carregar();
    // Cancela a consulta anterior se o componente for desmontado.
    return () => controller.abort();
  }, []);

  async function adicionar(evento) {
    // Um formulário HTML recarrega a página por padrão. Aqui impedimos isso.
    evento.preventDefault();
    const tituloLimpo = titulo.trim();
    if (!tituloLimpo || enviando || carregando) return;

    setErro("");
    setAviso("");
    setEnviando(true);
    try {
      // await espera a API confirmar o cadastro antes de mudar a lista.
      const novaTarefa = await cadastrarTarefa(tituloLimpo);
      // Criamos uma nova lista em vez de modificar diretamente o estado.
      setTarefas((atuais) => [...atuais, novaTarefa]);
      setTitulo("");
      setAviso("Tarefa cadastrada com sucesso.");
    } catch (falha) {
      setErro(mensagemDeErro(falha));
    } finally {
      // Libera o botão mesmo quando a requisição falha.
      setEnviando(false);
    }
  }

  return (
    <main className="container">
      <header className="cabecalho">
        <p className="marca">SECCO</p>
        <p className="instituicao">Oficina Unifavip Wyden</p>
        <h1>Minhas tarefas acadêmicas</h1>
        <p className="descricao">Cadastre uma atividade e acompanhe sua lista.</p>
      </header>

      {/* onSubmit funciona tanto com o botão quanto com a tecla Enter. */}
      <form className="formulario" onSubmit={adicionar}>
        <label htmlFor="titulo">Nova tarefa</label>
        <div className="linha-formulario">
          <input
            id="titulo"
            name="titulo"
            placeholder="Ex.: entregar atividade de programação"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
            maxLength={120}
            disabled={carregando || enviando}
            required
          />
          <button
            type="submit"
            disabled={carregando || enviando || !titulo.trim()}
          >
            {enviando ? "Enviando…" : "Adicionar"}
          </button>
        </div>
        <p className="dica">Até 120 caracteres. O backend valida o título.</p>
      </form>

      {/* Renderização condicional: só mostramos mensagens quando existem. */}
      {erro && <p className="erro" role="alert">{erro}</p>}
      {aviso && <p className="sucesso" role="status">{aviso}</p>}

      <section className="lista" aria-labelledby="titulo-lista" aria-busy={carregando}>
        <div className="titulo-lista">
          <h2 id="titulo-lista">Tarefas cadastradas</h2>
          {/* Desafio extra do slide 9: usar o tamanho da lista como contador. */}
          {!carregando && <span>Total: {tarefas.length}</span>}
        </div>
        {carregando ? (
          <p className="vazio" role="status">Consultando a API…</p>
        ) : tarefas.length === 0 ? (
          // Desafio principal do slide 9: mensagem para uma lista vazia.
          <p className="vazio">Nenhuma tarefa cadastrada.</p>
        ) : (
          <ul>
            {/* map transforma cada objeto em um item visual da lista. */}
            {tarefas.map((tarefa) => (
              <li key={tarefa.id}>
                <span className="numero">#{tarefa.id}</span>
                <span>{tarefa.titulo}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer>
        <p>Everton Juan · FastAPI &nbsp; / &nbsp; Luan Felipe · React</p>
        <p>Dados em memória: reiniciar o backend apaga a lista.</p>
      </footer>
    </main>
  );
}

function mensagemDeErro(falha) {
  // Em falhas de rede, orientamos o aluno a conferir o terminal do backend.
  if (falha instanceof TypeError) {
    return "Não foi possível acessar a API. Confira se o backend está ligado na porta 8000 e recarregue a página.";
  }
  return falha.message || "Ocorreu um erro. Tente novamente.";
}
