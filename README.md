# Opacity

Opacity is a web application that makes government less opaque by showing users who their elected representatives are based on the user's location. The user inputs a postal code from any Canadian Province, and the site generates a page with interactive profiles of each of their representatives categorized by the branch of government to which they were elected.

**Technologies Used:**

- Javascript,
- React,
- MongoDB,
- Node JS,
- Express,
- [Represent API](https://represent.opennorth.ca/)
- Google Maps API (Geocoding and Embedded Map)
- Styled Components
- Framer Motion Library
- CSS

## How it works:

- When the user submits a postal code, it is converted to lat & lng coordinates, and the province in which it is located using Google's Geocoding API

- These coordinates are then used to fetch personal information about any elected representative associated with those coordinates using the Represent API
- Some information, including provincial and federal election dates, election websites, and provincial map polygons, are retrieved from a MongoDB database created specifically for this project.
- All API requests are handled via a server written on Node.js using the Express.js framework
- Part of the information received by the Represent API and MongoDB are map polygons of the representative's electoral boundaries. When the representative is clicked on, this polygon is sent to an embedded Google map component in the frontend and displayed at the top of the page.
- This information is used on the frontend using React, Styled Components, and Framer Motion so it can be presented to the user in an organized and easy to understand manner. The webiste is responsive and each representative's information is interactive:
  - Phone numbers prompt the user to use their devices phone client
  - Email addresses open a user's email client with a new email addressed to the representative
  - Addresses open a browser tab with a google map search of the address
  - When clicked, election dates open a new browser tab to that province's voter registration website.
  
  
 ## Screenshots
 
<img width="40%" alt="Opacity Landing Page" src="https://user-images.githubusercontent.com/104284100/190707167-45e57119-c2d7-4960-9552-0387f3d35d6a.png">
<img width="40%" alt="Opacity Federal Reps" src="https://user-images.githubusercontent.com/104284100/190707441-1371ae49-b0c8-4fbe-82d0-fb8cc3bedf54.png">
<img width="40%" alt="Opacity Federal Reps" src="https://user-images.githubusercontent.com/104284100/190705673-c9e5cb9c-43b8-4bd7-9062-cc77353b1743.png">


