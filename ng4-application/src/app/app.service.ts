import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';


@Injectable()
export class AppService {

  private ws: $WebSocket;
  private subscribers = [];

  constructor() {

  }

  closeWebsocket() {


    this.ws.close(false);    // close
    this.ws = null;

    //this.ws.close(true);    // close immediately
  }

  onMessage(handler) {
    this.subscribers.push(handler);
  }

  connectWebsocket() {
    // connect
    this.ws = new $WebSocket("ws://localhost:8080/my-ws/websocket");
    // you can send immediately after connect,
    // data will cached until connect open and immediately send or connect fail.

    // when connect fail, websocket will reconnect or not,
    // you can set {WebSocketConfig.reconnectIfNotNormalClose = true} to enable auto reconnect
    // all cached data will lost when connect close if not reconnect

    this.ws.onOpen((msg) => {

      this.ws.getDataStream().subscribe(
        res => {
          console.log(res);
        },
        function(e) { console.log('Error: ' + e.message); },
        function() { console.log('Completed'); }
      );

      this.ws.send("CONNECT\naccept-version:1.1\nheart-beat:10000,10000\n\n\0").subscribe(
        (msg)=> {
          console.log("next", msg.data);
        },
        (msg)=> {
          console.log("error", msg);
        },
        ()=> {
          console.log("complete");
        }
      );
      var topic = "/topics/event";
      this.ws.send("SUBSCRIBE\nid:sub-001\ndestination:" + topic + "\n\n\0").subscribe(
        (msg)=> {
          console.log("next", msg.data);
        },
        (msg)=> {
          console.log("error", msg);
        },
        ()=> {
          console.log("complete");
        }
      );

    });


    // set received message callback
    this.ws.onMessage(
      (msg: MessageEvent)=> {
        console.log("onMessage ", msg.data);
        for(var i=0; i < this.subscribers.length; ++i) {
          this.subscribers[i](msg);
        }
      },
      {autoApply: false}
    );





  }




}
