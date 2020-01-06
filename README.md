# SendBird Calls for JavaScript

## Introduction
`SendBird Calls` is the newest addition to our product portfolio. It enables real-time calls between users within your SendBird application. SDKs are provided for iOS, Android, and JavaScript. Using any one of these, developers can quickly integrate voice and video call functions into their own client apps allowing users to make and receive web-based real-time voice and video calls on the SendBird platform.

## Functional Overview
Our JavaScript SDK for Calls provides the framework to make and receive voice and video calls. Direct calls in the SDK refers to one-to-one calls similar to that of the direct messages (DMs) in messaging services. To make a direct call, the caller should first initialize the call request by dialing to the callee whose all authenticated devices will be notified. The callee then can choose to accept the call from one of the devices. When the call is accepted, a connection is established between the caller and callee, and marks the start of the direct call. SendBird dashboard provides all call logs in the Calls menu for admins to review.

## SDK Prerequisites
* Modern browsers implementing WebRTC APIs are supported; IE isn't supported.

```javascript
// browser console
(window.RTCPeerConnection) ? console.log('supported') : console.log('not supported')
```

## Install and configure the SDK
Download and install the SDK using `npm` or `yarn`.
```shell script
# npm
npm install sendbird-calls 

# yarn
yarn add sendbird-calls 
```

Import as es6 module
```javascript
import SendBirdCall from "sendbird-calls";

SendBirdCall.init(APP_ID)
```
or include in header as global variable
```html
<script type="text/javascript" src="SendBirdCall.min.js"></script>
<script type="text/javascript">
  SendBirdCall.init(APP_ID)
</script>
```


## Audio Permissions
If user dial or accept for the first time in the given domain, browser prompts for permission to use microphone.

## Initialize the SendBirdCall instance in a client app
As shown below, the `SendBirdCall` instance must be initiated when a client app is launched. If another initialization with another `APP_ID` takes place, all existing data will be deleted and the `SendBirdCall` instance will be initialized with the new `APP_ID`.
```javascript
SendBirdCall.init(APP_ID);
```

## Authenticate a user and connect websocket to server
In order to make and receive calls, authenticate the user with SendBird server with the the `SendBirdCall.authenticate()` method. To make or receive calls, `SendBirdCall` should be connected to websocket server. Connect socket after authentication has completed using `SendBirdCall.connectWebSocket()` method.
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
  .then(/* connect succeeded */)
  .catch(/* connect failed */);
```

## Register event handlers
The SDK provides two types of event handlers for various events on your client application: SendBirdCallListener and DirectCallListener.

### SendBirdCallListener
Register a device-specific event handler using the `SendBirdCall.addListener()` method. Before adding the  `onRinging()`, a user can't receive an `onRinging` event. Therefore, it is recommended to add this handler at the beginning of the app. Once the listener is added, responding to device-wide events (for example, incoming calls) is then managed as shown below:

```javascript
SendBirdCall.addListener(UNIQUE_HANDLER_ID, {
  onRinging: (call) => {
    ...
  }
});
```
`UNIQUE_HANDLER_ID` is any unique string value (for example, UUID).
<br/>

| Method        | Description                                                      |
|---------------|------------------------------------------------------------------|
|onRinging()    | Invoked when incoming calls are received in the callee’s device. |

### DirectCallListener
Register a call-specific event handler by attaching handler function to the properties of call object directly. Responding to call-specific events (for example, call connected) is then managed as shown below:

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
|onEstablished()                | On the caller’s device and the callee’s device, the callee has accepted the call by running the method call.accept(), but they are not yet connected to media devices. |
|onConnected()                  | Media devices (for example, microphone and speakers) between the caller and callee are connected and can start the call using media devices. |
|onEnded()                      | The call has ended on the caller’s device or the callee’s device. This is triggered automatically when either party runs the method call.end(). This event listener is also invoked if there are other reasons for ending the call. A table of which can be seen at the bottom. |
|onRemoteAudioEnabled()         | On the caller’s devices, the callee changes their audio settings. |

## Make a call
Initiate a call by providing the callee’s user id into the `SendBirdCall.dial()` method.  Use the `callOption` object to choose initial call configuration (for example, muted/unmuted) 

```javascript
/*
interface DirectCallOption {
  remoteVideoView: HTMLElement
  audioEnabled: boolean
}
*/
const callOption = {
  remoteVideoView: document.getElementById('AUDIO_TAG'),
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

`remoteVideoView` option is necessary to play media stream. You have to append `<audio>` HTML tag to your page, and pass it to `callOption` to preform a audio call properly.

In `HTML`,
```html
<audio id="remote_audio_tag" autoplay>
```
In `JavaScript`,
```javascript
const callOption = {
  remoteVideoView: document.getElementById('remote_audio_tag'),
  audioEnabled: true
};
```

## Receive a call
Receive incoming calls by registering the event handler. Accept or decline incoming calls using the `directCall.accept()` or the `directCall.end()` methods.

If the call is accepted, a media session will automatically be established by the SDK. 

The event handler muse be registered before accepting a call. Once registered, the listeners enable reacting to mid-call events via callbacks methods.

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
      remoteVideoView: HTMLElement
      audioEnabled: boolean
    }
    */
    const callOption = {
      remoteVideoView: document.getElementById('AUDIO_TAG'),
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
  if (call.isRemoteAudioEnabled) {
    // The peer has been muted.
    // Consider displaying an unmuted icon.
  } else {
    // The peer has been muted.
    // Consider displaying and toggling a muted icon.
  }
}
```

## End a call
A caller can end a call using the `directCall.end()` method. The event can be processed via the `directCall.onEnded()` listener. The listener is also called/fired when the callee ends the call.

```javascript
// End a call
call.end();

// receives the event
call.onEnded = (call) => {
  // Consider releasing or destroying call-related view from here.
};
```

## Retrieve a call information
The local or remote user’s information is available via the `directCall.localUser` and `directCall.remoteUser` properties.

## Retrieve call history
SendBird servers automatically store details of calls, which can be used later to display a call history for users. A user’s call history is available via a `DirectCallLogListQuery` instance. 

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
  if (query.hasNext && !query.isLoading) {
    // query.next() can be called once more
    // if a user wants to fetch more call logs.
  }
});
```

| Method & Prop    | Description                                                                                                                                                                                                                                                                                                       |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|next()            | Used to query call history from `SendBirdCall` server.                                                                                                                                                                                                                                                              |
|hasNext           | If true, there is more call history to be retrieved.                                                                                                                                                                                                                                                              |
|isLoading         | If true, call history is being retrieved from SendBirdCall server.                                                                                                                                                                                                                                                |
|params.limit      | Specifies the number of call logs to return at once.                                                                                                                                                                                                                                                              |
|params.myRole     | Returns call logs of the specified role. For example, if myRole is `'dc_callee'`, query will return only the callee’s call logs.                                                                                                                                                                                                  |
|params.endResults | Returns the call logs for specified results. If you specify more than one result, they are processed as `OR` condition and all call logs corresponding with the specified end results will be returned. For example, if endResults is `['NO_ANSWER', 'CANCELED']`, only the `NO_ANSWER` and `CANCELED` call logs will be returned.|

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