<div align="center">

![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-FF4154?logo=reactquery&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/Shadcn%2FUI-New-000000?logo=shadcnui&logoColor=white)

**O Agregador de Ofertas de Jogos Moderno e Performático.**

[Reportar Bug](https://github.com/guikino/drophunter/issues)

</div>

---

## 📖 Sobre o Projeto

**DropHunter** é uma aplicação web desenvolvida para monitorar preços de jogos em múltiplas lojas digitais (Steam, Epic Games, GOG, etc.) utilizando a API da CheapShark. 

O foco deste projeto foi criar uma **Experiência de Usuário (UX)** fluida e uma **Performance** excepcional, resolvendo problemas comuns de frontend, além de ter sido projetado garantindo 100% de responsividade em qualquer tela ou dispositivo.

## 🚀 Como Funciona

O DropHunter facilita a busca pelas melhores ofertas de jogos. Ele consome dados em tempo real para exibir descontos e ofertas relevantes:

- **Busca Dinâmica Otimizada (Debounce):** Para otimizar o uso da API e entregar velocidade ao usuário, o site aplica *debounce* na busca. Apenas após o usuário parar de digitar, a requisição é feita.
- **Filtros Avançados:** Você pode refinar sua busca utilizando nossa barra lateral. Filtre os jogos por:
  - Preço Máximo
  - Nota Mínima no Metacritic
  - Loja Específica (Steam, Nuuvem, GOG, etc.)
  - Apenas Jogos em Promoção
  - Diferentes métodos de ordenação (Melhores Ofertas, Menor Preço, Data de Lançamento, etc.)
- **Acesso Direto à Loja:** Encontrou uma oferta que gostou? Ao clicar em "View Deal", você será redirecionado para a página do jogo com o preço exato já aplicado na respectiva loja!

## ⚙️ Tecnologias Utilizadas

Este projeto foi construído utilizando as ferramentas mais modernas do ecossistema React:

- **[React](https://reactjs.org/) + [Vite](https://vitejs.dev/):** Base de desenvolvimento ágil com *Hot Module Replacement* super veloz.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para evitar erros e garantir confiabilidade do código.
- **[Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/):** Estilização utilitária de ponta, permitindo criar um layout belo, modo escuro/claro nativo, responsividade plena e componentes reutilizáveis.
- **[TanStack Query (React Query)](https://tanstack.com/query/latest):** Gerenciamento assíncrono de estado impecável. Responsável por lidar com o *caching*, *fetching*, revalidações das listagens de jogos e paginações sem comprometer a performance.
- **[CheapShark API](https://apidocs.cheapshark.com/):** A API utilizada por trás das cortinas para trazer dados reais, cobrindo múltiplas lojas e cotações.

## 🛠️ Como Executar Localmente

### Pré-requisitos
- Node.js instalado (v18+ recomendado).
- Gerenciador de pacotes npm, yarn ou pnpm.

1. Faça o clone do repositório:
```bash
git clone https://github.com/guikino/drophunter.git
```

2. Entre no diretório do projeto:
```bash
cd drophunter
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. O aplicativo estará disponível no navegador, geralmente em `http://localhost:5173`.
