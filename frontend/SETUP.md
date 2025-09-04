# Fin-Agentix Frontend Setup Guide

This document provides step-by-step instructions for setting up and running the Fin-Agentix frontend application.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

1. **Node.js and npm**
   - Required Version: Node.js >= 16.x
   - Download from: https://nodejs.org/
   - Verify installation:
     ```powershell
     node --version
     npm --version
     ```

2. **Git**
   - Download from: https://git-scm.com/
   - Verify installation:
     ```powershell
     git --version
     ```

## Installation Steps

1. **Clone the Repository** (if you haven't already)
   ```powershell
   git clone https://github.com/Kayamsaikrishna/Fin-Agentix-IND.git
   cd Fin-Agentix-IND/frontend
   ```

2. **Install Dependencies**
   ```powershell
   npm install
   ```

3. **Set Up Environment Variables**
   - Copy the development environment file:
     ```powershell
     copy .env.development .env.local
     ```
   - Update the environment variables in `.env.local` as needed

## Available Scripts

- **Start Development Server**
  ```powershell
  npm run dev
  ```
  This will start the Vite development server

- **Build for Production**
  ```powershell
  npm run build
  ```
  This will create an optimized production build

- **Preview Production Build**
  ```powershell
  npm run preview
  ```
  This will serve the production build locally

- **Run Tests**
  ```powershell
  npm run test
  ```
  For running unit tests

- **Run Tests with Coverage**
  ```powershell
  npm run test:coverage
  ```

- **Lint Code**
  ```powershell
  npm run lint
  ```
  To check for linting errors

- **Fix Linting Issues**
  ```powershell
  npm run lint:fix
  ```

- **Format Code**
  ```powershell
  npm run format
  ```
  This will format all TypeScript/TSX files using Prettier

## Key Dependencies

The application uses the following major dependencies:

### Core Dependencies
- React 18
- TypeScript
- Vite (Build tool)
- React Router DOM (Routing)
- Redux Toolkit (State management)
- React Query (Data fetching)
- i18next (Internationalization)

### UI Components and Styling
- Material-UI
- Tailwind CSS
- Styled Components
- Framer Motion (Animations)
- React Select
- React Table
- React Toastify (Notifications)

### Form Handling and Validation
- React Hook Form
- Yup (Form validation)

### Development Tools
- ESLint
- Prettier
- TypeScript
- Vitest (Testing)
- React Testing Library

## Browser Support

The application is optimized for modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

1. If you encounter node module issues:
   ```powershell
   rm -r node_modules
   rm package-lock.json
   npm install
   ```

2. If you face build errors:
   ```powershell
   npm run lint:fix
   npm run format
   ```

3. Clear Vite cache if needed:
   ```powershell
   npm run dev --force
   ```

## Tailwind CSS Setup and Configuration

### Installation
1. **Install Tailwind CSS and its peer dependencies:**
   ```powershell
   npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
   ```

2. **Initialize Tailwind CSS:**
   ```powershell
   npx tailwindcss init -p
   ```
   This will create `tailwind.config.js` and `postcss.config.js` files.

### Configuration Files

1. **tailwind.config.js**
   ```javascript
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {
         // Your custom theme extensions
       },
     },
     plugins: [],
   }
   ```

2. **postcss.config.js**
   ```javascript
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

3. **Add Tailwind directives to your CSS**
   In your `src/styles/global.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### Usage with Material-UI

Our project uses both Tailwind CSS and Material-UI. To ensure proper integration:

1. **Component Styling Priority:**
   - Use Tailwind for custom layouts and basic styling
   - Use Material-UI components for complex UI elements
   - Use styled-components for dynamic styling

2. **CSS Order:**
   - Material-UI styles are injected at runtime
   - Tailwind classes take precedence for overrides
   - Custom CSS should be added last

3. **Best Practices:**
   - Use Tailwind's `@apply` directive for reusable styles
   - Utilize Tailwind's configuration file for theme customization
   - Follow the project's existing patterns for consistency

### Troubleshooting Tailwind

1. **Classes not applying:**
   - Ensure your files are included in the `content` array of `tailwind.config.js`
   - Check if PostCSS is properly configured
   - Clear your browser cache

2. **Conflicts with Material-UI:**
   - Use `important: true` in Tailwind config if needed
   - Utilize Material-UI's `sx` prop for specific overrides

3. **Performance Optimization:**
   - Use PurgeCSS (built into Tailwind) by properly configuring content paths
   - Enable JIT mode for faster development builds

## Additional Notes

- Make sure your Node.js version matches the project requirements
- The application uses Vite for faster development and build times
- Tailwind CSS is used for styling along with Material-UI components
- The project follows TypeScript strict mode for better type safety
