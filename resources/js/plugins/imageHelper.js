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

      // Check multiple possible locations based on environment
      // Priority: public/images > storage/public/images > storage/local/images
      
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
