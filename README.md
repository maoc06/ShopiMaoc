# Shopi Maoc (Angular ecommerce store)

🤓 This is a small class project done in angular from an ecommerce store 🛒.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

## Features

- Authentication with firebase (Email verification before allowing entry).
- Role-based authorization.
- Admins can add / disable / delete / modify products, customers and payment methods.
- Customers can add / delete products to cart.
- Customers and Admins can view purchase history.
- Payment simulation (does not validate credit cards).

## How to use

- Clone the project `git clone https://github.com/maoc06/ShopiMaoc`

- Install dependencies with `npm install` or `yarn install`

- Run `ng serve` for a dev server.

- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Configuration

Configure the environment variables file with the following template:

  export const environment = {
    production: true,
    apiUrl: 'the url/endpoint backend',
    firebaseConfig: {
      apiKey: "YOUR API KEY HERE",
      authDomain: "YOUR AUTH DOMAIN HERE",
      databaseURL: "DATABASE URL HERE",
      projectId: "YOUR PROJECT ID HERE",
      storageBucket: "URL STORAGE BUCKET HERE",
      messagingSenderId: "MESSAGING ID HERE",
      appId: "APP ID HERE"
    },
  };

> If you want to use the same backend created for the demo, clone and configure the [back repository](https://github.com/maoc06/ShopiMaoc-Backend)
