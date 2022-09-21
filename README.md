# Opacity

(React / Node.js / Express.js / MongoDB / [Represent API](https://represent.opennorth.ca/) / Google Maps API / Styled Components / Framer Motion)

Opacity is a web application that makes government less opaque by showing users who their elected representatives are based on the user's location. The user inputs a postal code from any Canadian Province, and the site generates a page with interactive profiles of each of their representatives categorized by the branch of government to which they were elected.





![Opacity Home Page Vancouver](https://user-images.githubusercontent.com/104284100/191619581-7f11832a-0d8c-41e3-b2fb-2ade9ec401ee.png)





## How it works:

All API requests are handled via a server written on Node.js using the Express.js framework.

When the user submits a postal code, it is converted to lat & lng coordinates, and the province in which it is located using Google's Geocoding API

![Opacity Postal Code Page](https://user-images.githubusercontent.com/104284100/191619678-f6819f8b-0380-4106-959d-7bf7657747fa.png)

These coordinates are then used to fetch personal information about any elected representative associated with those coordinates using the Represent API. 

Some information, including provincial and federal election dates, election websites, and provincial map polygons, are retrieved from a MongoDB database created specifically for this project. When the representative is clicked on, this polygon is sent to an embedded Google map component in the frontend and displayed at the top of the page.





<div>
<img height="50%" alt="Opacity Federal Reps" src="https://user-images.githubusercontent.com/104284100/191620908-6765b135-26b4-4ea5-855f-71738726dad9.png">
<img height="50%" alt="Opacity Federal Reps" src="https://user-images.githubusercontent.com/104284100/191620926-9ab57132-6e81-4d45-8992-2904106e6e29.png">
</div>





This information is used on the frontend using React, Styled Components, and Framer Motion so it can be presented to the user in an organized and easy to understand manner. The webiste is responsive and each representative's information is interactive:
  - Phone numbers prompt the user to use their devices phone client
  - Email addresses open a user's email client with a new email addressed to the representative
  - Addresses open a browser tab with a google map search of the address
  
  
  
  
  
  ![Opacity Municipal Representatives](https://user-images.githubusercontent.com/104284100/191621490-8326d365-d63b-434f-a879-c2afb8f87262.png)

  
  
  
  
  Federal and Provincial election dates and voter registration information for each province are retrieved from MongoDb based on the user's postal code,  and are displayed beneath the provincial and federal representatives. The user can click on "REGISTER TO VOTE HERE" to be taken to the appropriate voter registration website.
  
  
  
  
  
  <div>
  <img height="100%" alt="Opacity Provincial Reps" src="https://user-images.githubusercontent.com/104284100/190708120-d768a428-16e1-49ee-a53c-94d6e3d2a650.png">
<img height="100%" alt="Opacity Federal Reps" src="https://user-images.githubusercontent.com/104284100/190705673-c9e5cb9c-43b8-4bd7-9062-cc77353b1743.png">
  </div>
  
  
  
#### Responsive

Opacity was built with mobile in mind. User's can access information about their representatives from where ever they need to.




<div>
<img width="33%" alt="Opacity Federal Reps" src="https://user-images.githubusercontent.com/104284100/191623375-b27720da-a3a0-48cb-9dcb-1bc8e5bcb636.png">
<img width="33%" alt="Opacity Federal Reps" src="https://user-images.githubusercontent.com/104284100/191623380-95f3ae08-a182-4c8f-94e3-6cf0c4534cc8.png">
<img width="33%" alt="Opacity Federal Reps" src="https://user-images.githubusercontent.com/104284100/191623386-a27868bc-afa8-4704-ae50-a8f39fe10b4a.png">
</div>


