## Personal Bookshelf 

This React application allows users to search for books using the Open Library API and maintain a personal bookshelf in the browser using localStorage.

## Tech Stack

- HTML: For the structure of the web pages.
- CSS: For styling the components.
- JavaScript: For implementing the functionality.
- React: For managing state and components.


## Features Implemented

# Book Search Page:

<img src="./src/assests/Screenshot from 2024-06-10 12-52-38.png"/>

Input field for users to type in a book's name.

Real-time display of search results as the user types.

Utilizes the Open Library API for fetching search results.

Displays search results in a list of cards.

# Personal Bookshelf Page:

<img src="./src/assests/Screenshot from 2024-06-10 12-53-06.png"/>
Users can add books from the search results to their personal bookshelf.

Utilizes the Web Storage API (localStorage) to store the user's bookshelf persistently.

Separate page to display the user's personal bookshelf.

Button on the search results page directs users to their personal bookshelf page.

# Tech Stack & Styling:

<img src="./src/assests/Screenshot from 2024-06-10 12-53-31.png"/>
Initialized with Create React App (CRA).

Styling done using CSS modules.

Client-side rendering only; no server-side rendering.

Responsive design for both pages.

# Evaluation Criteria

Efficient API Usage and Data Fetching: Proper usage of the Open Library API for fetching search results.

Proper React Component Structure and Interactivity: Components structured in a logical manner, with clear separation of concerns.

Smooth User Experience and Intuitive Interface: Intuitive interface for searching books and managing personal bookshelf.

Effective Styling and Layout Presentation: Styling enhances the user experience and makes the interface visually appealing.

## Demo : [https://bookshelf-mu-three.vercel.app/]