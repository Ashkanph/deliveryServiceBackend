
A nodeJS backend application to serve a REST delivery service. The frontend of this application can be found at [this address](https://github.com/Ashkanph/deliveryServiceFrontend).

## Usage

* First install the needed packages:

    ```bash
        npm install
    ```

* Now you can run the application (Will listen to this `http://localhost:8000/`):

    ```bash
        node bin/www
    ```

    * If you want to develop the code, you can install nodemon and run it with nodemon to be able to watch the changes:
        
        ```bash
            npm install nodemon
            nodemon bin/www
        ```

## To do
  * Why not using websocket instead? It is easier and more suitable for this purpose.
    * Or at least use `long polling` to get the live data
  * Create a real authentication (Create login tokens with `nonce` and `iv` and save the ip of the user)
  * Check the access of user in `guaed` (Do not let a user with the role of `biker` see others' parcels)
  * Use a database instead of mockup data (SQLite3 is a good choice for the start)