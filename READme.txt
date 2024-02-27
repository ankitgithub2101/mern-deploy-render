------------front end setup---------------
1st npx create-react-app client.in the client folder npm i axios redux react-redux @reduxjs/toolkit react-router-dom
2ns install tailwind css for styling.
3rd for building UI components use antd.npm install antd@4.24.5.@import
after installing antd, @import '~antd/dist/antd.css' paste it in App.css
------------front end setup---------------

------------backend setup---------------
1st in the root folder npm init -y.
2nd npm i express mongoose npm i jsonwebtoken bcryptjs nodemailer
3rd create server.js in root folder
4th  npm i --save-dev @types/express to avoid ...express error
5t  h create .env and install npm i dotenv nodemon

------bcknd folder structure----
routes,models db connection or 3rd party coonection use config folder, utils folder for helpers & middlewares for middlewares
------bcknd folder structure----

--node mongo connection

------------backend setup ends---------------
for authorization we need to create public route & protected route in component folder.
only login & regstrn are public routes bcoz any1 can access that while others protected routes 
bcoz only login user can access that

 
