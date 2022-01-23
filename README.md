## Blog app frontend
To run Frontend on you local machine follow the below steps :
- First Setup the Backend from https://github.com/srrathi/blog-backend
- Fork this repo and then `git clone` that fork on your local machine
- After it go in the project root directory by writing `cd blog-frontend`
- After it install all the node modules by running command `npm install`
- After installing all the node modules go into `utils` folder and then open `constants.js` file
- Uncomment this `export const API_BASE_URL = "http://localhost:9002/api";` line 
- Comment this `export const API_BASE_URL = "https://srrathi-blog-backend.herokuapp.com/api";` this line
- Now open terminal in the root directory of the project and run command `npm start`
- If everything is fine you will see the frontend of Blog app up and running.
