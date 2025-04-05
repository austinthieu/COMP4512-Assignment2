# Art Gallery Dashboard

This is an art gallery dashboard built using **React**, **TypeScript**, and **Vite**. The project includes a user interface for browsing galleries, viewing paintings, adding favorites, and sorting through collections.

## Features
- **Gallery Management:** View different art galleries and their paintings.
- **Painting Display:** Display a collection of paintings and filter by year, gallery, or artist.
- **Favorites:** Allow users to mark paintings as favorites.
- **Sorting & Filtering:** Sort paintings by title, artist, or year.
- **Interactive Map:** Used Leaflet for displaying maps related to gallery locations.
- **Backend Integration:** Data is stored and managed through Supabase.

## Tech Stack
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Vite**: A fast build tool and development server.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs.
- **Leaflet**: A JavaScript library for interactive maps.
- **Supabase**: A backend-as-a-service platform for database management.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/austinthieu/COMP4513-Assign2.git
cd COMP4513-Assign2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Make sure to set up the necessary environment variables in a `.env` file for Supabase credentials:

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-supabase-api-key
```

### 4. Run the development server

```bash
npm run dev
```

This will start the Vite development server and open the project in your default browser.

## Development

### Folder Structure

```
src/
├── assets/           # Static assets such as images and icons
├── components/       # Reusable components like Buttons, Card, etc.
├── utils/            # Utility functions
├── App.tsx           # Main React component
└── index.tsx         # Entry point for React app
```


## Deployment

To deploy the project, you can build it using the following command:

```bash
npm run build
```

This will create an optimized production build in the `dist/` directory. You can then deploy the build to your favorite hosting provider (e.g., Vercel, Netlify, or a custom server).

## Contributing

If you would like to contribute to this project, feel free to fork it, create a branch, and submit a pull request. Please ensure your changes follow the project's coding conventions and that all tests pass.

## License

This project is open-source and available under the MIT License.

---

Let me know if you need more details or assistance with the project setup!
