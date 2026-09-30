// Centralizamos o endereço para não repetir a URL em vários componentes.
const API_URL = "http://127.0.0.1:8000";

async function lerResposta(resposta) {
  // fetch só rejeita automaticamente em problemas de rede, não em HTTP 422/500.
  // Por isso precisamos conferir resposta.ok antes de usar o JSON.
  if (!resposta.ok) {
    if (resposta.status === 422) {
      throw new Error("Informe um título com 1 a 120 caracteres.");
    }
    throw new Error(`A API respondeu com erro ${resposta.status}. Tente novamente.`);
  }
  // Converte o JSON da resposta em um objeto JavaScript.
  return resposta.json();
}

export async function listarTarefas(signal) {
  // O signal permite cancelar a consulta se o componente sair da tela.
  const resposta = await fetch(`${API_URL}/tarefas`, { signal });
  return lerResposta(resposta);
}

export async function cadastrarTarefa(titulo) {
  const resposta = await fetch(`${API_URL}/tarefas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // JSON.stringify transforma o objeto em texto JSON para enviar à API.
    body: JSON.stringify({ titulo }),
  });
  return lerResposta(resposta);
}
