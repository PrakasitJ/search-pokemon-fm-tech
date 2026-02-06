# ⚡ PokéWiki - Advanced Pokedex & Team Builder

A high-performance, Modern Pokedex application built with **Next.js 16** and **GraphQL**. 

This project goes beyond a simple list, offering deep insights into combat stats, type effectiveness, and evolution chains to help trainers build the perfect team.

![Pokemon Wiki Banner](https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png)

## 🚀 Features

### 🔍 Advanced Search & Filtering
- **Smart Autocomplete**: Instantly find Pokemon by name or specific attacks.
- **Multi-Parameter Filtering**: Filter by Type, Weakness, Resistance, HP, CP, Height, Weight, and Evolution Stage.
- **Responsive Design**: optimized for desktop and mobile trainers.

### 📊 Detailed Analytics
- **Combat Stats**: Visual bars for Max CP and Max HP relative to Gen 1 limits.
- **Type Effectiveness Matrix**: 
    - 🛡️ **Defensive**: See exactly what a Pokemon is resistant or weak to (2x / 0.5x).
    - ⚔️ **Offensive**: View attack coverage.
- **Smart Counters**: The app calculates the best counters considering both type advantages and weaknesses.

### 🧬 Evolution Chains
- Interactive evolution trees showing ancestors and direct descendants.
- Navigation shortcuts between evolution stages.

### 🎨 Modern UI/UX
- **Dark Mode Support**: Automatically respects system preferences.
- **Turbopack Powered**: Blazing fast local development speed.
- **Server Side Rendering (SSR)**: Excellent SEO and initial load performance for individual Pokemon pages.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data & API**: [Apollo Client](https://www.apollographql.com/) + [GraphQL Pokemon API](https://graphql-pokemon2.vercel.app/) ([Docs](https://wayfair.github.io/dociql/))
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Testing**: Jest + React Testing Library

## 📦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/PrakasitJ/search-pokemon-fm-tech.git
   cd search-pokemon-fm-tech
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🧪 Running Tests

This project uses Jest for unit and integration testing.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
