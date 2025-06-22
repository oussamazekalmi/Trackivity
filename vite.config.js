import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Port par défaut de Vite
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
      // eslint-disable-next-line no-undef
      '/@users': path.resolve(__dirname, 'users.json'), // Alias pour le fichier users.json
      // eslint-disable-next-line no-undef
      '/@activities': path.resolve(__dirname, 'activities.json'), // Alias pour le fichier activities.json
      // eslint-disable-next-line no-undef
      '/@registrations': path.resolve(__dirname, 'registrations.json'), // Alias pour le fichier registrations.json
    },
  },
})

// import usersData from '/@users';
// import activitiesData from '/@activities';
// import registrationsData from '/@registrations';
