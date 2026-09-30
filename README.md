# Oficina React e FastAPI — Secco / Unifavip Wyden

Projeto da oficina de 2 horas. **Everton Juan** conduz o backend e **Luan Felipe** conduz o frontend. O objetivo é cadastrar e listar tarefas acadêmicas em uma aplicação web.

O código está comentado em português. A versão entregue já funciona e inclui os desafios de lista vazia e contador. Use `GUIA_OFICINA.md` para apresentar o projeto por etapas.

## 1. Preparação

- Instale **Python 3.11 ou superior**: https://www.python.org/downloads/
- Instale **Node.js 22.12 ou superior** (uma versão LTS compatível): https://nodejs.org/
- Instale **VS Code**: https://code.visualstudio.com/
- Extraia o ZIP e abra a pasta **oficina-react-fastapi** em `Arquivo > Abrir Pasta`.
- A primeira instalação das dependências precisa de internet. Depois, a aplicação roda localmente.

Abra o terminal integrado pelo menu `Terminal > Novo Terminal`. No Windows/PowerShell, confira:

```powershell
py --version
node --version
npm.cmd --version
```

Se um comando não for encontrado, confira a instalação e feche e abra novamente o VS Code. Se `py` não existir mas `python` funcionar, substitua `py` por `python` no comando de criação do ambiente.

## 2. Backend no Windows (terminal 1)

Comece na pasta raiz do projeto e execute cada linha:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Usamos o Python diretamente dentro de `.venv`, sem ativação. Assim não é necessário alterar a política de execução do PowerShell.

Mantenha esse terminal ligado. Abra:

- API: http://127.0.0.1:8000
- Documentação interativa: http://127.0.0.1:8000/docs

Na documentação, abra `POST /tarefas`, clique em **Try it out**, informe o JSON abaixo e clique em **Execute**:

```json
{ "titulo": "Entregar atividade de programação" }
```

Você deve receber **201 Created** e uma tarefa com `id`. Depois execute `GET /tarefas` para visualizar a lista. Títulos vazios, formados só por espaços ou maiores que 120 caracteres geram **422**.

## 3. Frontend no Windows (terminal 2)

Abra **outro terminal**, começando na pasta raiz do projeto:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Abra **http://127.0.0.1:5173**. Cadastre uma tarefa pelo formulário e recarregue a página. A lista vem da API.

`npm.cmd` evita o problema de execução do arquivo `npm.ps1` no PowerShell. `npm ci` instala as versões registradas no `package-lock.json`.

## 4. Como ligar novamente nas próximas aulas

As dependências precisam ser instaladas somente na primeira vez. Depois, na raiz do projeto:

**Terminal 1:**

```powershell
cd backend
.\.venv\Scripts\python.exe -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

**Terminal 2:**

```powershell
cd frontend
npm.cmd run dev
```

Para encerrar cada servidor, pressione **Ctrl+C** no terminal correspondente.

## 5. Linux, WSL ou macOS

Na raiz do projeto, use o primeiro terminal para o backend:

```bash
cd backend
python3 -m venv .venv
./.venv/bin/python -m pip install -r requirements.txt
./.venv/bin/python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

No segundo terminal, também a partir da raiz:

```bash
cd frontend
npm ci
npm run dev
```

No WSL, execute os dois servidores no mesmo ambiente e abra essa pasta com a extensão WSL do VS Code. Se `venv` não estiver disponível no Ubuntu, instale o pacote `python3-venv` antes de criar o ambiente.

## 6. Arquivos e responsabilidades

| Arquivo | O que faz |
| --- | --- |
| `backend/main.py` | Cria a API, configura CORS, valida os dados e implementa as rotas. |
| `backend/requirements.txt` | Fixa as versões principais das dependências Python. |
| `frontend/package.json` | Declara os comandos e dependências do frontend. JSON puro não aceita comentários. |
| `frontend/package-lock.json` | Registra as versões resolvidas pelo npm. Arquivo gerado automaticamente. |
| `frontend/index.html` | Fornece o elemento em que o React renderiza a interface. |
| `frontend/vite.config.js` | Configura React e mantém o servidor na porta 5173. |
| `frontend/src/main.jsx` | Inicializa o React e importa o CSS. |
| `frontend/src/App.jsx` | Contém formulário, estados, eventos, mensagens e lista. |
| `frontend/src/api.js` | Envia requisições GET e POST para o backend. |
| `frontend/src/styles.css` | Define cores, espaços e comportamento em telas pequenas. |
| `.vscode/tasks.json` | Oferece tarefas para iniciar cada servidor. |
| `.vscode/launch.json` | Permite depurar o backend com F5. |
| `GUIA_OFICINA.md` | Orienta os instrutores nos 10 slides. |

As configurações do VS Code aceitam comentários no formato JSON com comentários (JSONC). `package.json` e os arquivos gerados pelo npm precisam permanecer JSON válido.

## 7. Rodar e depurar no VS Code

Depois de instalar as dependências:

1. Use `Terminal > Executar Tarefa` e escolha **Oficina: backend**.
2. Repita e escolha **Oficina: frontend**.
3. Abra http://127.0.0.1:5173.

Para depurar Python, aceite a instalação da extensão Python sugerida pelo VS Code. Use `Ctrl+Shift+P > Python: Select Interpreter` e selecione o executável de `backend/.venv`. Com o backend normal parado, coloque um breakpoint dentro de `cadastrar_tarefa`, escolha **Oficina: depurar FastAPI** e pressione **F5**. Envie uma tarefa para acompanhar as variáveis. Não rode a depuração e o servidor normal na mesma porta ao mesmo tempo.

## 8. Entendendo a comunicação

Ao abrir a página, `useEffect` solicita `GET /tarefas`. O backend devolve um array JSON e `setTarefas` atualiza a tela.

Ao enviar o formulário, `adicionar` impede o recarregamento padrão. `cadastrarTarefa` envia `POST /tarefas` com o título em JSON. O Pydantic valida o conteúdo, a API cria o identificador e devolve a tarefa. O React inclui essa resposta no estado.

Recarregar o navegador faz uma nova consulta. **Reiniciar o backend apaga a lista**, pois os dados ficam apenas na memória. Salvar `main.py` com `--reload` também pode reiniciar o processo. O projeto usa um único processo local para a demonstração.

## 9. Problemas comuns

| Sintoma | Como resolver |
| --- | --- |
| `py`, `node` ou `npm` não reconhecido | Confirme a instalação e reinicie o VS Code. |
| `.venv` não encontrado | Execute a criação do ambiente dentro de `backend`. |
| `No module named uvicorn` | Instale o requirements com o Python da mesma `.venv`. |
| `Could not import module main` | Execute o servidor de dentro de `backend`. |
| Porta 8000 ou 5173 em uso | Pare o outro servidor pelo terminal em que ele está rodando. |
| `npm ci` não encontra package.json | Execute o comando dentro de `frontend`. |
| A tela informa que não alcança a API | Ligue o backend na porta 8000 e recarregue a tela. |
| Erro de CORS | Use a origem da oficina, `http://127.0.0.1:5173`. Confira `allow_origins` em `main.py`. |
| Dados sumiram ao editar Python | O `--reload` reiniciou o processo e apagou a lista em memória. |

Para verificar o build do frontend, execute `npm.cmd run build` no Windows ou `npm run build` nos demais ambientes. Isso gera a pasta `dist`. Esse comando não inicia o backend.

## 10. Referências oficiais

- React: https://react.dev/learn
- Estado: https://react.dev/reference/react/useState
- Efeitos: https://react.dev/reference/react/useEffect
- Vite e versões de Node: https://vite.dev/guide/
- FastAPI: https://fastapi.tiangolo.com/tutorial/
- CORS: https://fastapi.tiangolo.com/tutorial/cors/

O exercício não inclui login, banco de dados, exclusão nem implantação. A evolução sugerida é persistir os dados e adicionar o estado de conclusão das tarefas.
