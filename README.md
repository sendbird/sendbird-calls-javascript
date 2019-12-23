# SendBird Calls for JavaScript

## Introduction
SendBird Calls is a new product enabling real-time calls between users registered within a SendBird application. SDKs are provided for JavaScript, Android, and iOS. Using any one of these, developers can quickly integrate calling functions into their own applications that will allow users to make and receive internet based real-time voice calls on the SendBird platform.

## Functional Overview
When implemented, the SendBird Calls SDK provides the framework to both make and receive one-to-one calls, referred to in the SDK as “direct calls” (analogous to “direct messages” / “DMs” in a messaging context).  Direct calls are made when a caller identifies a user on the SendBird application and initializes a call request (referred to as dialing). The callee, with the SDK’s event handlers implemented, is notified on all authenticated devices, and can choose to accept the call.  If accepted, a network route is established between the caller and callee, and the direct call between the caller and callee begins.  Application administrators can then review call logs in the “Calls” section of the SendBird dashboard.

## SDK Prerequisites
* Modern browsers implementing WebRTC APIs are supported; IE isn't supported.

```javascript
// browser console
(window.RTCPeerConnection) ? console.log('supported') : console.log('not supported')
```

## Install and configure the SDK
Download and install the SDK using npm or yarn.
```shell script
# npm
npm install sendbird-calls 

# yarn
yarn add sendbird-calls 
```

## Audio Permissions
If user dial or accept for the first time in the given domain, browser prompts for permission to use microphone.

## Initialize the SendBirdCall instance in a client app
As shown below, the `SendBirdCall` instance must be initiated when a client app is launched. If another initialization with another APP_ID takes place, all existing data will be deleted and the `SendBirdCall` instance will be initialized with the new APP_ID.
```javascript
SendBirdCall.init(APP_ID);
```

## Authenticate a user and connect websocket to server
In order to make and receive calls, authenticate the user with SendBird server with the the `SendBirdCall.authenticate()` method. To dial or receive calls, `SendBirdCall` should be connected to websocket server. The socket can be connected by using `SendBirdCall.connectWebSocket()` method.
```javascript
// Authentication
SendBirdCall.authenticate({ USER_ID, ACCESS_TOKEN }, (res, error) => {
  if (error) {
    // auth failed
  } else {
    // auth succeeded
  }
});

// Websocket Connection
SendBirdCall.connectWebSocket()
  .then(/* connect succeeded */);
  .catch(/* connect failed */);
```

## Register event handlers

### SendBirdCallListener
Register a device-specific event handler using the `SendBirdCall.addListener()` method. Before adding the  `onRinging()`, a user can't receive an onRinging event. Therefore, it is recommended to add this handler at the beginning of the app. Responding to device-wide events (e.g. incoming calls) is then managed as shown below:

```javascript
SendBirdCall.addListener(UNIQUE_HANDLER_ID, {
  onRinging: (call) => {
    ...
  }
});
```
<br/>

| Method        | Description                                                      |
|---------------|------------------------------------------------------------------|
|onRinging()    | Invoked when incoming calls are received in the callee’s device. |

### DirectCallListener
Register a call-specific event handler by attaching handler function to the properties of call object directly. Responding to call-specific events (e.g. call connected) is then managed as shown below:

```javascript
// call is 'DirectCall' object
call.onEstablished = (call) => {
  ...
};

call.onConnected = (call) => {
  ...
};

call.onEnded = (call) => {
  ...
};

call.onRemoteAudioEnabled = (call) => {
  ...
};
```
<br/>

| Method                        | Description                                                                                                       |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------|
|onEstablished()                | Invoked on the caller’s device and the callee’s device, when the callee has accepted the call by running the method call.accept(), but they are not yet connected to media devices. |
|onConnected()                  | Invoked when media devices (e.g microphone, speakers) between the caller and callee are connected and can start the call using media devices. |
|onEnded()                      | Invoked  when the call has ended on the caller’s device or the callee’s device. This is triggered automatically when either party runs the method call.end()  This event listener is also invoked if there are other reasons for ending the call. A table of which can be seen at the bottom. |
|onRemoteAudioEnabled()         | Invoked on the caller’s devices when the callee changes their audio settings. |

## Make a call
Initiate a call by providing the callee’s user id into the `SendBirdCall.dial()` method.  Use the `callOption` object to choose initial call configuration (e.g. muted/unmuted) 

```javascript
/*
interface DirectCallOption {
  audioEnabled: boolean
}
*/
const callOption = {
  audioEnabled: true
};
const call = SendBirdCall.dial(CALLEE_ID, false, callOption, (call, error) => {
    if (error) {
      // dial failed
    }
    // dial succeeded
});

call.onEstablished = (call) => {
  ...
};

call.onConnected = (call) => {
  ...
};

call.onEnded = (call) => {
  ...
};

call.onRemoteAudioEnabled = (call) => {
  ...
};
```

## Receive a call
Receive incoming calls by registering handler object. Accept or decline incoming calls using the `directCall.accept()` or the `directCall.end()` methods.

If the call is accepted, a media session will be established by the SDK.

Event handlers muse be registered before accepting a call. Once registered, this listeners enable reacting to mid-call events via callbacks methods.

```javascript
SendBirdCall.addListener(UNIQUE_HANDLER_ID, {
  onRinging: (call) => {
    call.onEstablished = (call) => {
      ...
    };

    call.onConnected = (call) => {
      ...
    };

    call.onEnded = (call) => {
      ...
    };

    call.onRemoteAudioEnabled = (call) => {
      ...
    };

    /*
    interface DirectCallOption {
      audioEnabled: boolean
    }
    */
    const callOption = {
      audioEnabled: true
    };
    call.accept(callOption);
  }
});
```

Incoming calls are received via the application's persistent internal server connection, which is established in `SendBirdCall.connectWebSocket()`.

## Handle a current call

While a call is in progress, mute or unmute the caller’s audio using the `directCall.mute()` or `directCall.unmute()` method(s). If the callee changes their audio settings, the caller is notified via the `directCall.onRemoteAudioEnabled` listener.

```javascript
// mute my microphone
call.mute();

// unmute my microphone
call.unmute();

// receives the event
call.onRemoteAudioEnabled = (call) => {
  ...
}
```

## End a call
A caller ends using the `directCall.end()` method. The event can be processed via the `directCall.onEnded()` listener. This listener is also called/fired when the callee ends call.

```javascript
// End a call
call.end();

// receives the event
call.onEnded = (call) => {
  ...
};
```

## Retrieve a call information
The local or remote user’s information is available via the `directCall.localUser` and `directCall.remoteUser` properties.

## Retrieve call history
SendBird’s servers automatically store details of calls. These details can be used later to display a call history for users. A user’s call history is available via a `DirectCallLogListQuery` instance. 

```javascript
/*
interface DirectCallLogListQueryParams {
  myRole: string
  endResults: string[],
  limit: number
}
*/
const params = {
  myRole: 'dc_caller',
  endResults: ['DECLINED', 'COMPLETED'],
  limit: 100
};
const query = SendBirdCall.createDirectCallLogListQuery(params);

query.next((directCallLog) => {
  ...
});
```

| Method & Prop    | Description                                                                                                                                                                                                                                                                                                       |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|next()            | Used to query call history from SendBirdCall server.                                                                                                                                                                                                                                                              |
|hasNext           | If true, there is more call history to be retrieved.                                                                                                                                                                                                                                                              |
|isLoading         | If true, call history is being retrieved from SendBirdCall server.                                                                                                                                                                                                                                                |
|params.limit      | Specifies the number of call logs to return at once.                                                                                                                                                                                                                                                              |
|params.myRole     | Returns call logs of the specified role. For example, if myRole is 'dc_callee', query will return only the callee’s call logs.                                                                                                                                                                                                  |
|params.endResults | Returns the call logs for specified results. If you specify more than one result, they are processed as OR condition and all call logs corresponding with the specified end results will be returned. For example, if endResults is ['NO_ANSWER', 'CANCELED'], only the NO_ANSWER and CANCELED call logs will be returned.|

## Additional information: call results
To access the additional information relating to why a call ended, consider that you can get `directCall.endResult` property whenever needed. However, it would be most relevant perhaps, to call it within the  `onEnded()` callback.  

| EndResult        | Description                                                                                                            |
|------------------|------------------------------------------------------------------------------------------------------------------------|
| NO_ANSWER            | The callee hasn’t either accepted or declined the call for a specific period of time.                              |
| CANCELED             | The caller has canceled the call before the callee accepts or declines.                                            |
| DECLINED             | The callee has declined the call.                                                                                  |
| COMPLETED            | The call has ended by either the caller or callee after completion.                                                |
| TIMED_OUT            | SendBird server failed to establish a media session between the caller and callee within a specific period of time.|
| CONNECTION_LOST      | Data streaming from either the caller or the callee has stopped due to a WebRTC connection issue while calling.    |
| DIAL_FAILED          | The dial() method call has failed.                                                                                 |
| ACCEPT_FAILED        | The accept() method call has failed.                                                                               |
| OTHER_DEVICE_ACCEPTED| When the call is accepted on one of the callee’s devices, all the other devices will receive this call result.     |