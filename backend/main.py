"""API da oficina Secco / Unifavip Wyden, conduzida por Everton Juan.

Execute dentro da pasta backend: python -m uvicorn main:app --reload
Os dados ficam na memória: reiniciar o processo apaga todas as tarefas.
"""

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field

# FastAPI cria a aplicação e gera a documentação interativa em /docs.
app = FastAPI(title="Oficina Secco: tarefas acadêmicas", version="1.0.0")

# O navegador trata portas e nomes de host diferentes como origens diferentes.
# Esta lista permite que a tela React, na porta 5173, consulte nossa API.
# CORS é uma regra de acesso do navegador, não um mecanismo de autenticação.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class TarefaEntrada(BaseModel):
    """Formato do JSON enviado pelo frontend: {"titulo": "Estudar React"}."""

    # Remove espaços nas pontas ANTES de validar o comprimento do título.
    model_config = ConfigDict(str_strip_whitespace=True)
    titulo: str = Field(min_length=1, max_length=120)


class TarefaSaida(BaseModel):
    """Formato devolvido pela API. O servidor gera o identificador."""

    id: int
    titulo: str


# Nossa lista faz o papel de armazenamento temporário para a aula.
# Usamos apenas um processo local. Um banco de dados é o próximo passo.
tarefas: list[TarefaSaida] = []


@app.get("/")
def inicio():
    """Primeira rota da aula: confirme que o backend está funcionando."""
    return {"mensagem": "Olá, Unifavip! A API da Secco está funcionando."}


@app.get("/tarefas", response_model=list[TarefaSaida])
def listar_tarefas():
    """GET consulta os dados, sem cadastrar ou alterar nada."""
    return tarefas


@app.post(
    "/tarefas",
    response_model=TarefaSaida,
    status_code=status.HTTP_201_CREATED,
)
def cadastrar_tarefa(dados: TarefaEntrada):
    """POST recebe o JSON, valida o título e acrescenta uma tarefa à lista."""
    # Como a oficina só adiciona tarefas, tamanho + 1 gera um id sequencial.
    # Se você adicionar exclusão depois, substitua essa estratégia de ids.
    tarefa = TarefaSaida(id=len(tarefas) + 1, titulo=dados.titulo)
    tarefas.append(tarefa)
    return tarefa
