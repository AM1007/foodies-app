# Foodies - Recipe Sharing Platform

## Overview

Foodies is a modern recipe sharing platform built with React, Redux, and a
responsive design. The application allows users to browse recipes by categories,
search for recipes by ingredients and regions, create and share their own
recipes, and connect with other food enthusiasts.

## Features

- **User Authentication**: Secure registration and login system
- **Recipe Discovery**: Browse recipes by categories, ingredients, or regions
- **Recipe Details**: View detailed recipe information including ingredients and
  preparation steps
- **User Profiles**: Personalized profiles showing user's recipes and activity
- **Social Features**: Follow other users and save favorite recipes
- **Recipe Creation**: User-friendly form to create and publish recipes
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
  devices

## Technology Stack

- **Frontend**: React, Redux Toolkit, React Router
- **Form Handling**: React Hook Form, Yup validation
- **Styling**: CSS Modules, Modern Normalize
- **UI Components**: Custom components with a consistent design system
- **HTTP Client**: Axios with request/response interceptors
- **Other Tools**: Framer Motion, Swiper, React Spinners

## Installation and Setup

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/foodies.git
   cd foodies
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run the development server:

   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## Project Structure

The project follows a modular architecture:

- `/src/components`: Reusable UI components
- `/src/pages`: Page components corresponding to routes
- `/src/redux`: Redux store configuration and slices
- `/src/api`: API client configuration
- `/src/hooks`: Custom React hooks
- `/src/context`: React Context providers

## API Integration

The application connects to a backend service for data persistence. The API
handles:

- User authentication and profile management
- Recipe storage and retrieval
- Social connections between users
- Favorites management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Acknowledgments

- Design inspiration from
  [Figma](https://www.figma.com/design/TKl7kDNvwtz62RsuWNnQ5E/Foodies?node-id=44-1285&t=cdAKXANTFNP01ZUb-0)
