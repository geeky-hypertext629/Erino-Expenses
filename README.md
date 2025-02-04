# Expense Management


Expense Management is an assignment that is made for Erino SDE intern. In this Web Application I have used Vite+React in the client and Node+Express in the backend. The Web application is simple and has the following features

* **JWTToken** is used for user authentication : **How it works** - Basically when the user puts his/her credentials in the login/register page. The user details are sent to the backend api. Now using this user details we create a **JWTToken** using the **pre** function in the **mongoose** ORM. Now this token is stored in the cookie with a default expiry of 5 days. This token is available in the cookie of the browser and when the user visits the website the cookie is checked from the backend and the user is directed to the Dashboard page if the token is found and verified using the verify token function. This helps to cache the user's data preventing him/her to sign in everytime he/she visits the website.

* Seamless **Expense Creation** and **Expense Updation** for authorized users.
 
* **Dashboard** for proper Expense management which includes editing and deleting the expenses. **Recharts npm package** used for bar and pie chart visualization of the categorical expenses.

* Used **MongoDB** as the database for storing the user details and the **expense details**.
  
* Used **react-router-dom** efficient communication between the routes in the frontend.


## How the spending insights work ?

1. I have created a backend url /insights for fetching the expense insights if the user is verified through the middleware attached to the route. 
2. This backend url calculates the total spending and alson an array that contains the percentage of spending in each category correct to 2 decimal places.
3. Now the expenses for each category is calculated by the aggregate function in the model.
4. These two data return by the api is supplied as data to the pie chart and bar chart in the recharts react component.
5. On changing any particular data, the entire data for the pie chart and bar chart is refreshed as state management is done for the data using useState.

### Technologies used
 - React
 - MongoDB
 - Material UI
 - Node.js
 - Javascript
 - Express
 - Vite

