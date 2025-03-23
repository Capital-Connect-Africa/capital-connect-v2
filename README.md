# Capital Connect V2
Welcome to the official capital connect frontend app code repository.

## Contribution
If you can access this repository from your account, congratulations because you can contribute to this codebase.

## Installation
To install this project:

1. Clone this repository:
```bash
git clone https://github.com/Capital-Connect-Africa/capital-connect-v2.git
```

2. At the project's root folder and install the required packages by using the command:
```bash
npm install
```
3. Deploy to localhost:
```bash
ng serve
```

## Deployments
* Local: 
```bash
http://localhost:4200
```
* Staging: 
```bash

```
* Live: 
```bash
https://app.capitalconnect.africa
```

## Tech Stack
* Angular 19
* Typescript

### Structure

```md
capital-connect-v2  - App's root directory
├── node_modules - organizes app dependencies
├── public - for organizing public static assets
├── src - organizes the app's build files
│   └── app - organizes the app's business logic
│       ├── core
│       │   ├── enums - defines possible instances of an item
│       │   │   └── animation.state.enum - animation states
│       │   └── interceptors - intercepts http requests
│       │       ├── auth.interceptor - adds access token to http request
│       │       └── http.error.interceptor - handles request & response errors
│       ├── components
│       │   ├── button - reusable button component
│       │   ├── input-field - reusable form input components
│       │   ├── loader - custom loader
│       │   ├── select-button - button like component behaves like a radio button
│       │   ├── slider - carousel
│       │   └── toast - for handling toast messages
│       ├── features - App modules
│       │   └── auth - app module that handles user authentication
│       │       ├── store - auth level signal store
│       │       ├── services - auth level services
│       │       └── interfaces - auth level cutom types
│       └── views - contains module level presentation layer (htmls)
│           └── auth - auth module presentation layer
│               ├── components - auth module level shared components
│               │   └── auth-layout - defines base UI structure for all auth pages
│               ├── pages - auth app pages
│               │   ├──  signin - for user authentication
│               │   ├── signup - for creating user accounts
│               │   └── verify-email - for email verification
│               └── routes - defines routes to auth pages
├── asstes - organizes static assets
├── environments - organizes app environments
└── package.json - dependancy file
```