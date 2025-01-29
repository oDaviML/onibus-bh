# 🚍 Ônibus BH

A **Ônibus BH** é uma aplicação que fornece informações em tempo real sobre o transporte público de Belo Horizonte.

## ✨ Funcionalidades

- 📊 **Localização em tempo real**: Obtenha as coordenadas dos ônibus, atualizadas a cada 20 segundos.
- 🔍 **Consulta de linhas**: Pesquise e visualize informações detalhadas sobre as linhas de ônibus.

---

## 🛠 Tecnologias Utilizadas

- **Frontend**: React com Vite
- **Roteamento**: TanStack Router
- **Gerenciamento de estado e requisições**: TanStack Query e Axios
- **Mapas interativos**: React Leaflet
- **Estilização**: Tailwind CSS e Shadcn UI

---

## 🚀 Instalação Local

1. Clone o repositório:

   ```bash
   git clone https://github.com/oDaviML/onibus-bh.git
   cd onibus-bh
   ```

2. Inicie a aplicação utilizando Docker:

   ```bash
   docker compose up -d --build
   ```

   Ou, caso prefira rodar localmente sem Docker:

   ```bash
   npm install
   npm run dev
   ```

3. Acesse a aplicação pelo navegador:

   - [http://localhost:3000/](http://localhost:3000/)

---

## 🌐 Acesso Online

Acesse a versão hospedada na Netlify:

- [Ônibus BH Online](https://onibusbh.netlify.app/)

---

## 💻 API

A aplicação consome dados de uma API própria. O código-fonte e mais detalhes podem ser encontrados no repositório abaixo:

- [Repositório da API](https://github.com/oDaviML/api-onibusbh)

---

Desenvolvido com ❤️ por [DaviML](https://github.com/oDaviML).

