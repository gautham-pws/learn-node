/project-root
│
├── /src
│ ├── /routes # Routes handle endpoint paths and map them to controllers
│ │ ├── authRoutes.js # Example: routes related to authentication
│ │ ├── productRoutes.js
│ │ └── index.js # Central file to import and use all routes
│ │
│ ├── /middleware # Middleware for authentication, role checking, etc.
│ │ ├── authMiddleware.js # Handles authentication logic
│ │ ├── roleMiddleware.js # Handles role-based access control
│ │ └── rbacMiddleware.js # RBAC logic
│ │
│ ├── /controllers # Controllers manage request and response logic
│ │ ├── authController.js # Authentication-related logic
│ │ ├── productController.js # Logic related to product operations
│ │ └── userController.js # User management
│ │
│ ├── /services # Business logic and database interactions
│ │ ├── authService.js # Handles user authentication logic
│ │ ├── productService.js # Product-related business logic
│ │ └── userService.js # User management logic
│ │
│ ├── /models # Database models/schemas
│ │ ├── userModel.js # User schema definition
│ │ ├── productModel.js # Product schema definition
│ │ └── index.js # Import and manage all models
│ │
│ └── /config # Configuration files for environment, database, etc.
│ └── dbConfig.js # Database connection setup
│
├── /tests # Unit tests for services, controllers, middleware
│ ├── authService.test.js
│ └── productController.test.js
│
├── app.js # Entry point for the app
├── package.json # Dependencies and scripts
└── README.md # Project documentation
