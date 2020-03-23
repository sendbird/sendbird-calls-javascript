# SendBird Calls for JavaScript

## Introduction
`SendBird Calls` is the newest addition to our product portfolio. It enables real-time calls between users within your SendBird application. SDKs are provided for iOS, Android, and JavaScript. Using any one of these, developers can quickly integrate voice and video call functions into their own client apps allowing users to make and receive web-based real-time voice and video calls on the SendBird platform.

## Functional Overview
The SendBird Calls JavaScript SDK provides a framework to make and receive voice and video calls. "Direct calls" in the SDK refers to one-to-one calls, similar to that of the "direct messages" (DMs) in messaging services. To make a direct voice or video call, the caller specifies the user ID of the intended callee, and dials. Upon dialing, all of the callee’s authenticated devices will receive incoming call notifications. The callee then can choose to accept the call from any one of the devices. When the call is accepted, a connection is established between the caller and the callee. This marks the start of the direct call. Call participants may mute themselves, as well as select the audio and video hardware used in the call. Calls may be ended by either party. The SendBird Dashboard provides all call logs in the Calls menu for admins to review.

## SDK Prerequisites
* Modern browsers implementing WebRTC APIs are supported; IE isn't supported.
* Edge is not supported, though it might be supported later.

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


## Acquiring Media Device Permissions
If user dials or accepts for the first time in the given website, the browser may prompts for permission to use microphone and camera. It also might happens when user calls `SendBirdCall.useMedia()`. Without appropriate permissions allowed, user might not be able to access media devices, which includes retrieving list of available media devices or retrieving media stream from those devices.

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

call.onReconnecting = (call) => {
  ...
};

call.onReconnected = (call) => {
  ...
};

call.onRemoteAudioSettingsChanged = (call) => {
  ...
};

call.onRemoteVideoSettingsChanged = (call) => {
  ...
};

call.onCustomItemsUpdated = (call, updatedKeys) => {
  ...
};

call.onCustomItemsDeleted = (call, deletedKeys) => {
  ...
};
```
<br/>

| EventListener | Description | 
|---------------|-------------|
|onEstablished | On the caller’s device and the callee’s device, the callee has accepted the call by running the method call.accept(), but they are not yet connected to media devices. |
|onConnected | Media devices (for example, microphone and speakers) between the caller and callee are connected and can start the call using media devices. |
|onEnded | The call has ended on the caller’s device or the callee’s device. This is triggered automatically when either party runs the method call.end(). This event listener is also invoked if there are other reasons for ending the call. A table of which can be seen at the bottom. |
|onReconnecting | DirectCall started attempting to reconnect to the other party after a media connection disruption. |
|onReconnected | The disrupted media connection reconnected. |
|onRemoteAudioSettingsChanged	| The other party changed their audio settings. |
|onRemoteVideoSettingsChanged	| The other party changed their video settings. |
|onCustomItemsUpdated |	One or more of DirectCall’s custom items (metadata) have been updated. |
|onCustomItemsDeleted	| One or more of DirectCall’s custom items (metadata) have been deleted. |

## Make a call
Initiate a call by first preparing the `DialParams` call parameter object. This contains the intended callee’s user id, weather or not it is a video call, as well as a `DirectCallOption` object. `DirectCallOption` is used to set the call’s initial configuration (e.g. muted/unmuted). Once prepared, the `DialParams` object is then passed into the `SendBirdCall.dial()` method to starting making a call.
```javascript
const dialParams = {
  userId: CALLEE_ID,
  isVideoCall: true,
  callOption: {
    localMediaView: document.getElementById('local_video_element_id'),
    remoteMediaView: document.getElementById('remote_video_element_id')
  }
}

const call = SendBirdCall.dial(dialParams, (call, error) => {
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

Media view can also be set by `call.setLocalMediaView(element)` or `call.setRemoteMediaView(element)`. Be sure that you need `remoteMediaView` set for the remote media stream to be played. setting `autoplay` property in those media elements are also recommended.

```html
<video id="remote_video_element_id" autoplay>
```

```javascript
//to set media view lazily
call.setLocalMediaView(document.getElementById('local_video_element_id'));
call.setRemoteMediaView(document.getElementById('remote_video_element_id'));
```

## Receive a call
Receive incoming calls by first registering `SendBirdCallListener`. Accept or decline incoming calls using the `directCall.accept()` or the `directCall.end()` methods. If the call is accepted, a media session will automatically be established by the SDK.

The event listeners such as `onEstablished`, `onConnected` in the `DirectCall` instance must be attached before accepting a call. Once attached, the listeners enable reacting to mid-call events via attached callbacks methods.

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

    const acceptParams = {
      callOption: {
        remoteMediaView: document.getElementById('remote_video_element_id')
      }
    };

    call.accept(acceptParams);
  }
});
```
> If you have set media view via `call.setLocalMediaView()` and `call.setRemoteMediaView()`, be sure to pass the same media views to the `DirectCallOption` in `AcceptParams`, or it will be overriden after `call.accept()`


Incoming calls are received via the application's persistent internal server connection, which is established by `SendBirdCall.connectWebSocket()`.
In any case it is accidentally disconnected, it will try to reconnect every 2 seconds.

## Handle a current call
During an ongoing call, mute or unmute the caller’s microphone using the `directCall.muteMicrophone()` or `directCall.unmuteMicrophone()` methods. If the callee changes their audio settings, the caller is notified via the `directCall.onRemoteAudioSettingsChanged` listener. The caller may start or stop video using the `directCall.startVideo()` or `directCall.stopVideo()` methods. If the callee changes their video settings, the caller is notified via the `directCall.onRemoteVideoSettingsChanged` listener. 

```javascript
// mute my microphone
call.muteMicrophone();

// unmute my microphone
call.unmuteMicrophone();

// start to show video
call.startVideo();

// stops showing video
call.stopVideo();

// receives the event
call.onRemoteAudioSettingsChanged = (call) => {
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
A caller can end a call using the `directCall.end()` method. This event can be processed via the `directCall.onEnded` listener. This listener is also triggered when the callee ends the call.

```javascript
// End a call
call.end();

// receives the event
call.onEnded = (call) => {
  // Consider releasing or destroying call-related view from here.
};
```

## Configuring media devices
There is a collection of methods in `SendBirdCall` to configure media devices. For each media type, it has methods to retrieve list of devices, retrieve current device, select device, update devices. If media device configuration changes, every on-going calls are affected immediately.

|Method | Description |
|-------|-------------|
|useMedia(constraints) | Tries to grant permission to access media devices |
|getCurrentAudioInputDevice() | Get current audio input device |
|getAvailableAudioInputDevices() | Get list of available audio input devices | 
|selectAudioInputDevice(mediaDeviceInfo) | Select audio input device to use |
|getCurrentAudioOutputDevice() | Get current audio output device  |
|getAvailableAudioOutputDevices() | Get list of available audio output devices   |
|selectAudioOutputDevice(mediaDeviceInfo) | Select audio output device to use |
|getCurrentVideoInputDevice() | Get current video input device |
|getAvailableVideoInputDevices() | Get list of available video input devices  |
|selectVideoInputDevice(mediaDeviceInfo) | Get current video input device |
|updateMediaDevices(constraints) | Manually update media devices |

There is also a collection of event listeners in `SendBirdCallListener` to handle changes in media devices.
|Event Listener | Description |
|---------------|-------------|
|onAudioInputDeviceChanged | called when there's a change in audio input devices |
|onAudioOutputDeviceChanged | called when there's a change in audio output devices |
|onVideoInputDeviceChanged | called when there's a change in video input devices |

Before using methods and event listeners listed above, be sure to call `SendBirdCall.useMedia(constraints)` to be granted permission to access media devices. Without call to `SendBirdCall.useMedia`, above methods might return wrong or unexpected results.

```javascript
//on settings view opened
const mediaAccess = SendBirdCall.useMedia({audio: true, video: true});

//This code demonstrates for audio input devices. You can do the same for the audio output, video input devices too.
const availableDevices = SendBirdCall.getAvilableAudioInputDevices();
const currentDevice = SendBirdCall.getCurrentAudioInputDevice();
//populate option elements in select element
populateSelectOption(availableDevices);
//select option which matches current device
selectOption(currentDevice);

SendBirdCall.addListener('my-listener', {
  onAudioInputDeviceChanged: (currentDevice, availableDevices) => {
    //populate option elements in select element
    populateSelectOption(availableDevices);
    //select option which matches current device
    selectOption(currentDevice);
  }
});

...

SendBirdCall.removeListener('my-listener');

//on settings view closed
mediaAccess.dispose();

```
> Never forget to dispose mediaAccess you retrived by calling `SendBirdCall.useMedia`. If you do not call `mediaAccess.dispose`, the permission granted by `SendBirdCall.useMedia` won't be revoked and it might result in unexpected use of media devices such as microphone or camera.

> In `Chrome` / `Firefox`, you don't need to call `SendBirdCall.updateMediaDevices` if you utilize media device event listener to update your view or device list. But in `Safari`, those event listeners might not be called when even there's a change in your media devices, so you might need to update your devices manually by calling `SendBirdCall.updateMediaDevices`


## Deauthenticate a user
You can deauthenticate the user with `SendBirdCall.deauthenticate()` method. it will discard all current directCalls, session keys, and user information; except for [SendBirdCallListener](#SendBirdCallListener). `SendBirdCall.deauthenticate()` can be used as 'logout' method for current user.

```javascript
// Deauthenticate
SendBirdCall.deauthenticate();
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
|NO_ANSWER |	The callee failed to either accept or decline the call within a specific amount of time.|
|CANCELED | The caller canceled the call before the callee could accept or decline.|
|DECLINED |	The callee declined the call.|
|COMPLETED |	The call ended after either party ended it|
|TIMED_OUT | The SendBird server failed to establish a media session between the caller and callee within a specific amount of time.|
|CONNECTION_LOST | The data stream from either the caller or the callee has stopped due to a WebRTC connection issue.|
|DIAL_FAILED | The dial() method call has failed. |
|ACCEPT_FAILED | The accept() method call has failed.|
|OTHER_DEVICE_ACCEPTED | The incoming call was accepted on a different device. This device received an incoming call notification, but the call ended when a different device accepted it.|