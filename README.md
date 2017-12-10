# spring-websocket-angular-4-demo

Demo of connecting angular 4 application to spring web application via websocket

# Usage

### WebSocket Spring Boot Server

git clone this project, run the "./make.ps1" powershell script in the project root directory to build spring-boot-application.jar
into the "bin" folder.

Run the following command to start the spring-boot-application at http://localhost:8080

```bash
java -jar bin/spring-boot-application.jar
```

The spring-boot-application defines an end point at http://localhost:8080/my-ws and sends a ping message to any connected client that subscribe to its topic "/topics/event" every 10 seconds. the angularjs demo can be viewed by navigating to http://localhost:8080 on your web browser.

### Angular 4 Application

To run the angular application that communicate with the spring-boot-application:


```bash 
cd spring-websocket-angular-4-demo
npm install
ng serve
```

This will start the angular application at http://localhost:4200 

The websocket implementation that subscribe to "/topics/event" websocket topic of the spring-boot-application can be found in the app.service.ts and app.component.ts



