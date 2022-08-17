![alt text](https://github.com/Marek-Barela/Tracker/blob/main/src/assets/tracker.png?raw=true)

# IP Tracker

React application that returns information about specific IP or URL address based on [IP-API](https://ipapi.co/)

User can provide URL from google maps or from inside of the application

## Features

- Map location and Information about visitors IP
- Map location and Information about provided IP address
- Map location and informations about latitude and longitude for provided URL ( if you want more detailed information, you'll need to provide an IP address )
- User can also use link from google maps
- Search input that remember the user's previous searches with autocomplete
- User history in the sidebar panel. The user can click on the item to view the information again.
- The application will maintain the history during the session and will be deleted when the user leaves the application

## Live

You can see the full project [here](https://web-ip-tracker.netlify.app/)

## Tech - Stack

- HTML5
- CSS3
- Typescript
- React
- Redux RTK
- Redux persist
- MUI
- React Leaflet
- Downshift
- Styled components

## Installation

Clone repository, install the dependencies and start the server.

```sh
npm install
```

or

```sh
yarn
```

After installation run command:

```sh
npm start
```

or

```sh
yarn start
```
