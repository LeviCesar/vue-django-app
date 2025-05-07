FROM python:3.12-slim

WORKDIR /backend

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instalar o Poetry
RUN curl -sSL https://install.python-poetry.org | python3 - \
  && ln -s /root/.local/bin/poetry /usr/local/bin/poetry

# Copiar os arquivos de dependência do Poetry
COPY pyproject.toml poetry.lock* /backend/

# Instalar dependências sem tentar instalar o projeto
RUN poetry config virtualenvs.create false \
  && poetry install --no-root --no-interaction --no-ansi

# Copiar o restante da aplicação
# COPY . /backend/