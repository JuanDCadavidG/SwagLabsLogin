# swaglabsLogin

Execute:

You must have git and nodejs installed

Clone the repo
```
    https://github.com/WilsonMedina/swaglabsLogin.git
 ````
 Install all dependencies
 ```
    npm i -f or npm ci
 ````
 Run app cypress
 ```
    npm run test
 ````
 Automated test was carried out with cypress focused on the functionality of the login page and access to the different urls of the sut, verifying that if the user is not logged in it does not allow access to the different endpoints. The code was made under the Fixture design pattern.
 
 TCs:
 
 TC1: Validate login successfully.
 
 TC2: Validate try login with bloked account.
 
 TC3: Validate try login with incorrect or non existent account.
 
 TC4: Validate try login with empty username field.
 
 TC5: Validate try login with empty password field.
 
 TC6: Validate try login with empty both fields.
 
 TC7: Validate try visit endpoint /inventory.html without login.
 
 TC8: Validate try visit endpoint /cart.html without login.
 
 TC9: Validate try visit endpoint /checkout-step-one.html without login.
 
 TC10: Validate try visit endpoint /checkout-step-two.html without login.
 
 TC11: Validate try visit endpoint /checkout-complete.html without login.
