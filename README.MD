# MERN Stack E-commerce Website

This is an e-commerce website built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a comprehensive platform for online shopping, allowing users to browse and purchase a wide range of products.

## Project Demo

https://clipchamp.com/watch/alIzguqRogl






## Features

- User authentication and registration
- User profile management
- Product listing and search functionality
- Product filtering and sorting
- Shopping cart functionality
- Secure payment integration using stripe
- Order tracking and management


## Technologies Used

- MongoDB: NoSQL database for storing product, user, and order data
- Express.js: Node.js framework for building the server-side application
- React.js: JavaScript library for building the user interface
- Node.js: JavaScript runtime environment for running server-side code
- Redux: State management library for managing application state
- React Router: Library for handling client-side routing in React
- JWT: JSON Web Tokens for secure user authentication
- Stripe: Payment gateway integration for secure and seamless transactions

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js: [Download and Install Node.js](https://nodejs.org/en/download/)
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

1. Clone the repository:

```shell
https://github.com/shravan-das/EcommerceWebsite.git
```

2. Navigate to the project directory:

```shell
cd EcommerceWebsite
```

3. Install the dependencies for the server:

```shell
cd ./backend && npm install
```

4. Install the dependencies for the frontend:

```shell
cd ../frontend && npm install
```

5. Set up environment variables:

   - Create a `.env` file in the `root` directory.
   - Add the following environment variables:
  
     ```shell
     PORT=5000
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     STRIPE_SECRET_KEY=<your-stripe-secret-key>
     ```

6. Start the server:

```shell
cd ./backend && npm run dev
```

7. Start the client:

```shell
cd ./frontend && npm run start
```

8. Open your browser and visit [http://localhost:3000](http://localhost:3000).





## Contributing

Contributions are welcome! If you find any issues or would like to add new features, please open an issue or submit a pull request.

## Acknowledgments

This project was inspired by the MERN stack and the need for a robust and user-friendly e-commerce solution. Special thanks to the open-source community for providing invaluable resources and tools.

Feel free to customize and enhance this project to meet your specific requirement.
