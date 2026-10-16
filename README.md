1.npm init -y
2.npm i express mongoose 
3.npm i jsonwebtoken cookie-parcer bcrypt multer

5.git init
use the git ignore that it does not track the node modules --> for this write the file name in .gitingonore file that need to be ignore
git add .
git commit -m "initial setup"

intall gkeep extension and click command+shift+p then run command add git keep   uper me hi


config - me sara connection wala kaam hoga 
example- mongoDB agar ek jagah connect kar lete h to baar baar connect karne ki jarurat nahi parti h to mongoDB ko config me hi connect kyo na kar le--> usko app.js me require karo export karke config se taki config me rakh connection ke code ke liye
we use kabab case for config files 



routes names was follewed by camel Convension
for model names we follow kabab case

------------------L-26-----------------------             jcg
npm i debug  --> to use debugger
for printing something from debug set environmental var. as on run command --> set DEBUG=development:* (for window)


npm i config --> taki mongoDB ke conecction ko development.json file me rakha jaa sake
config.get evironment of process se value uthata h
 1.jaise set DEBUG=development:mongoose yha phase development tha so development file se value utha liye

set Environemnet var throughout whole process --> 2. set NODE_ENV=development
3.npm install dotenv

add this to .env
DEBUG=development:mongoose
MONGODB_URI=your_mongodb_connection_uri

run npm start


------------------------L-27------------------------------

npm install express-session connect-flash
then do EXPRESS_SESSION_SECRET=hfjkahsdjhfkjasdbnjhfjdkmfncjjru in .env file and  for change require we do      
npm start    
const session = require("express-session");
const flash = require("connect-flash");


npm install ejs




colour codes 

brown
text 774F3D
panel DEBEAE
bgcolor F4DDD2

lightblue
text 48606E
panel D3E4EE
bgcolor F3F8FB

khaakibrown
text 5F4A30
panel C5B095
bgcolor DED0BF

pink
text 816264
panel E3C4C6
bgcolor F4E0E1