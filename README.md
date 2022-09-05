# Pokedex Dashboard

A simple implementation of a Pokedex-alike app with a dashboard UI feel, built using Next.js and Chakra UI

### Build With

- [Next.js](https://nextjs.org)
- [Chakra UI](https://chakra-ui.com)
- [SWR](https://swr.vercel.app)
- [PokeAPI](https://pokeapi.co)

### Directory Structure

- `/components` - Component that accept props without functionality 
- `/containers` - Component that deliver props, included with functionality
- `/hooks` - User-defined custom hooks
- `/layouts` - User-defined layout component
- `/libs` - Reusable local library
- `/pages` - Pages that will rendered
- `/pages/api` - User-defined serverless API
- `/public` - Public assets (images, icons, etc.)
- `/utils` - Custom functionality/helper

### File Naming Convention

In general, the naming convention used on this repository is filename with suffix for each directory: 
```
<filename>.<type>.tsx or <filename>.<type>.ts
```

For example, if we want to write a layout component it should be `main.layout.tsx`, so we will know that we have a **layout** named **main**.

For writing custom hooks, it should be written using camelCase format like `useCustomHooks.hooks.ts`

#### Additional Info: Component/Container
The component and container may look similar, I adopted the [Dumb Components and Smart Components](https://www.shade.codes/dumb-components-and-smart-components/) concept to separate component that rarely and frequently updated by props

### Installation

Clone the repo

```sh
git clone https://github.com/technowizard/pokedex-dashboard.git

cd pokedex-dashboard
```

Install packages and dependencies

```sh
yarn // or yarn install
```

Make `.env` file on the root directory, or rename the `.env.example` and input the PokeAPI URL

```
NEXT_PUBLIC_POKEAPI_URL='POKEAPI_URL'
```

### Run the app in development mode

```sh
yarn dev
```
