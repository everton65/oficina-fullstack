# Guia de condução dos 10 slides

Use o projeto completo para demonstrar o resultado no começo. Na parte prática, explique pequenos trechos e deixe as duplas repetir. Um instrutor apresenta enquanto o outro circula. Reserve as instalações para antes do encontro.

## Slide 1 — React e FastAPI (5 min, ambos)

Apresentem Everton Juan, responsável pelo FastAPI, e Luan Felipe, responsável pelo React. Perguntem quem já conhece Python ou JavaScript. Organizem as duplas.

## Slide 2 — Tarefas acadêmicas (5 min, ambos)

Com os dois servidores ligados, cadastrem “Entregar atividade de programação” na tela. Recarreguem a página. Expliquem que os dados estão na memória da API e que reiniciar o backend apaga a lista.

## Slide 3 — Interface e API (10 min, Everton)

Abram `src/api.js` e `backend/main.py` lado a lado. Mostrem o mesmo nome `/tarefas` nos dois arquivos. Expliquem que GET consulta e POST cadastra. No navegador, usem F12 > Network/Rede para observar uma requisição.

## Slide 4 — Primeira rota (15 min, Everton)

Expliquem a importação de FastAPI, `app = FastAPI()` e `@app.get("/")`. Abram a raiz da API e `/docs`. Para construir essa etapa do zero, usem uma pasta de trabalho separada e apenas esse trecho do backend. Mantenham a versão final disponível para recuperação.

**Checkpoint:** cada dupla visualiza a mensagem da API.

## Slide 5 — Cadastro e listagem (20 min, Everton)

Expliquem `TarefaEntrada`, a validação de título e a lista temporária. Mostrem GET e POST. No `/docs`, testem uma tarefa válida, um título vazio e um título com espaços. Expliquem 200, 201 e 422.

**Checkpoint:** a dupla cadastra pelo `/docs` e consulta a tarefa pelo GET.

## Slide 6 — Interface React (15 min, Luan)

Mostrem `index.html`, `main.jsx` e a função `App`. Expliquem o JSX pelo título, campo e botão. O CSS já vem pronto. Peçam aos alunos que mudem o título visível em `App.jsx` e observem a atualização automática.

**Checkpoint:** a dupla localiza e altera o texto da tela.

## Slide 7 — Estado e eventos (15 min, Luan)

Mostrem `useState`, `value`, `onChange` e `onSubmit`. Demonstrem como `titulo` acompanha a digitação. Expliquem que `preventDefault` impede o recarregamento no envio.

Para mostrar o alerta do slide, substituam TEMPORARIAMENTE `onSubmit={adicionar}` por `onSubmit={(e) => { e.preventDefault(); alert(titulo); }}` e depois restaurem `onSubmit={adicionar}`. Assim a mudança não dispara um cadastro real durante essa demonstração.

**Checkpoint:** a dupla entende de onde vem o título enviado.

## Slide 8 — Integração (20 min, ambos)

Luan mostra `api.js`: `fetch`, método, headers e corpo. Everton mostra CORS e a rota no Python. Depois, expliquem `useEffect`, consulta inicial e atualização da lista após o POST. Mostrem a resposta JSON em F12 > Network/Rede.

No desenvolvimento, StrictMode pode iniciar uma consulta adicional. A limpeza do efeito cancela a consulta anterior. Isso não duplica cadastros, pois o POST é um evento do formulário.

**Checkpoint:** a dupla cadastra pela interface e recarrega a página com o backend ligado.

## Slide 9 — Desafio em duplas (10 min, ambos)

A versão completa já contém os desafios comentados. Para os alunos implementarem, retirem previamente a mensagem de lista vazia e o contador numa cópia do projeto.

- Principal: exibir “Nenhuma tarefa cadastrada” quando `tarefas.length === 0`.
- Extra: mostrar `tarefas.length` acima da lista.

Peçam para testar primeiro com lista vazia e depois com uma tarefa. Para zerar a lista de demonstração, reiniciem o backend e recarreguem a página.

## Slide 10 — Demonstração final (5 min, ambos)

Uma dupla apresenta. Perguntem quem renderiza o formulário, quem valida o título e qual método busca a lista. Proponham banco de dados e conclusão de tarefas como evolução. Compartilhem este projeto com a turma.

## Preparação dos instrutores

- Testar os comandos nos computadores que serão usados, especialmente no Windows.
- Instalar as dependências antes da aula e testar o cadastro completo.
- Ter a versão completa para recuperar duplas que se atrasem.
- Usar zoom no editor para a turma enxergar os comentários e o código.
- Evitar acrescentar login ou banco durante as 2 horas previstas.

Total: **120 minutos**.
