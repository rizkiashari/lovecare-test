# LoveCare Web - Rick & Morty Explorer

A modern web application built with Next.js to explore the Rick & Morty API. This project demonstrates clean architecture principles with clear separation between business logic and UI, fast data fetching, responsive layout, and great UX with loading states.

## Features

- **Character Listing**: Browse Rick & Morty characters with debounced search and status filtering
- **Character Details**: View detailed information about each character including:
  - Character image, status, species, and gender
  - Origin and current location
  - List of episodes the character appears in
- **Pagination**: Navigate through characters with URL state preservation
- **Responsive Design**: Optimized for all screen sizes with Tailwind CSS
- **Performance**: Server-side rendering with Next.js App Router
- **Type Safety**: Fully typed with TypeScript

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Data Fetching**:
  - Server-side: Next.js Server Components
  - Client-side: TanStack React Query
- **HTTP Client**: Axios
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (check `.nvmrc` for the recommended version)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd lovecare-web
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

This project follows Clean Architecture principles with clear separation of concerns:

```bash
lovecare-web/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page (character listing)
│   ├── about/             # About page
│   └── character/[id]/    # Character detail pages
├── components/            # React UI components
│   ├── CharacterCard.tsx
│   ├── CharacterDetail.tsx
│   ├── CharacterGrid.tsx
│   ├── EpisodeModal.tsx
│   ├── Header.tsx
│   ├── Pagination.tsx
│   └── SearchFilters.tsx
├── domain/                # Domain entities and types
│   ├── character.ts
│   └── episode.ts
├── model/                 # API response models
│   ├── character.ts
│   └── episode.ts
├── repository/            # Data access layer (API calls)
│   ├── characterRepository.ts
│   └── episodeRepository.ts
├── service/               # Business logic layer
│   ├── characterService.ts
│   └── episodeService.ts
├── hooks/                 # React hooks for client-side data fetching
│   ├── character/
│   ├── episode/
│   └── useDebouncedCallback.ts
└── lib/                   # Utility functions
    ├── pagination.ts
    └── rickAndMorty.ts
```

## Architecture

### Layer Separation

1. **Domain**: Core business entities and data types (`domain/`)
2. **Model**: API response models and mapping functions (`model/`)
3. **Repository**: Data access layer for API calls (`repository/`)
4. **Service**: Business logic layer (`service/`)
5. **Hooks**: React hooks for client-side data fetching (`hooks/`)
6. **Components**: Presentational UI components (`components/`)

### Technical Decisions

- **Next.js App Router**: Server-first rendering for better performance
- **TypeScript**: Type safety and maintainability
- **Tailwind CSS**: Fast, consistent styling with responsive design
- **Route-level Loading UI**: Using `loading.tsx` files for better UX
- **Typed API Client**: Axios with typed responses and error handling
- **React Query**: Client-side data fetching and caching
- **Custom Hooks**: Reusable data fetching logic with debounced search
- **Client-side Pagination**: Handled on client for first 50 results for speed

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack React Query](https://tanstack.com/query/latest)
- [Rick & Morty API](https://rickandmortyapi.com/)

## Author

**Rizki Ashari\***

## License

This project is private.
