# Labseq Frontend - React + Vite

Frontend simples para visualizar valores da sequência labseq.

## Como usar

1. **Instalar dependências:**
npm install
2. **Iniciar o servidor:**
npm run dev
3. **Ver um número da sequência:**
- Acesse: `http://localhost:5173/labseq/N`
- Substitua `N` pelo número que você quer calcular

**Exemplos:**
- `http://localhost:5173/labseq/0` → mostra N=0, VALUE=0
- `http://localhost:5173/labseq/10` → mostra N=10, VALUE=3  
- `http://localhost:5173/labseq/100` → mostra N=100, VALUE=...

## Requisitos

- Backend Quarkus rodando em `http://localhost:8080`
- Node.js instalado

## O que faz

Pega o valor **N** da URL, chama o backend `/labseq/{n}`, e exibe:
- **N:** o índice da sequência
- **VALUE:** o valor calculado l(n)

**Sequência labseq:** l(0)=0, l(1)=1, l(2)=0, l(3)=1, l(n)=l(n-4)+l(n-3) para n>3
