# Shopping List Generator

Link to the hosted project: <a href="https://shopping-list-organizer.herokuapp.com/signup" target="_blank">Shopping List Generator</a>

This project was built in Angular 10.
Uses a MySQL database and is hosted on Heroku.

## Main Features

- Users can create an account and securely log in to be redirected to a shopping list generator.
- Within the shopping list, the user can add specific items along with the quantity and price.
- Table displays the items and calculates the relative price of the item and grand total so that the user can track their budget.
- User can delete specific items from the list
- Data is stored in MySQL database, so the user can log out and come back to the info later.

## Security

- Passwords are hashed using bcrypt before stored in database and remains unknown/inaccessable to the developer (me).
- SSL certificate on web page to provide end-to-end encryption.
- Auth Guards are in place to keep unauthorized users from accessing certain url endpoints.
- JWT (JSON Web Tokens) are created and later deleted for each session, to ensure that only the user may create, read, update, or delete their shopping-list data.
- SQL queries have parameterized statements to help prevent SQL injections.
- Database config variables are safely hidden to those searching the source code.

## Other Features

- Responsive UI that can be viewed on both mobile and desktop.
- Material design, a clean UI, and a matching color palette create a pleasant user experience.
- Pipes are used to better display certain data, such as currency.
- Interfaces are implemented to easily manipulate, use, and package SQL data.
