/**
 * Image Helper Plugin for Vue 3
 * Provides image_url() function to automatically resolve image paths
 * for both local development and production environments
 */

export default {
  install(app, options = {}) {
    // Define the image_url function
    const imageUrl = (path) => {
      // Remove leading slash if present
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;

      // Check if we're in development mode by looking at Vite HMR
      const isDev = import.meta.env.DEV;

      // For development, use direct path; for production, use /images/
      if (isDev) {
        // In dev, try common locations
        return `/images/${cleanPath}`;
      }

      // For production: /images/ folder in public
      const paths = [
        `/images/${cleanPath}`,
        `/storage/images/${cleanPath}`,
        `/storage/local/images/${cleanPath}`,
      ];

      // Return the first path (they'll be checked by browser, fallback handled by server)
      return paths[0];
    };

    // Make it available globally
    app.config.globalProperties.$imageUrl = imageUrl;
    app.provide('imageUrl', imageUrl);

    // Also export as a composable
    app.mixin({
      methods: {
        $imageUrl(path) {
          return imageUrl(path);
        }
      }
    });
  }
};
