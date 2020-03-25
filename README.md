# SendBird Calls for JavaScript


[![minified size](https://img.shields.io/bundlephobia/min/sendbird-calls)](https://img.shields.io/bundlephobia/min/sendbird-calls)
[![npm version](https://badge.fury.io/js/sendbird-calls.svg)](https://badge.fury.io/js/sendbird-calls)
[![Commercial License](https://img.shields.io/badge/license-Commercial-brightgreen.svg)](https://github.com/sendbird/sendbird-calls-javascript/blob/master/LICENSE.md)

## Introduction
`SendBird Calls` is the latest addition to our product portfolio. It enables real-time calls between users within a SendBird application. SDKs are provided for iOS, Android, and JavaScript. Using any one of these, developers can quickly integrate voice and video call functions into their own client apps, allowing users to make and receive web-based real-time voice and video calls on the SendBird platform.

## Functional Overview
The SendBird Calls JavaScript SDK provides a framework to make and receive voice and video calls. “Direct calls” in the SDK refers to one-to-one calls, comparable to “direct messages” (DMs) in messaging services. To make a direct voice or video call, the caller specifies the user ID of the intended callee, and dials. Upon dialing, all of the callee’s authenticated devices will receive incoming call notifications. The callee then can choose to accept the call from any one of the devices. When the call is accepted, a connection is established between the caller and the callee. This marks the start of the direct call. Call participants may mute themselves, as well as select the audio and video hardware used in the call. Calls may be ended by either party. The SendBird Dashboard displays call logs in the Calls menu for application owners and admins to review.

## SDK Prerequisites
* Modern browsers implementing WebRTC APIs are supported; IE is not.
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

Import `SendBirdCall` as an es6 module
```javascript
import SendBirdCall from "sendbird-calls";

SendBirdCall.init(APP_ID)
```
Or use the minified file to initialize `SendBirdCall` as global variable in the header 
```html
<script type="text/javascript" src="SendBirdCall.min.js"></script>
<script type="text/javascript">
  SendBirdCall.init(APP_ID)
</script>
```

## Acquiring Media Device Permissions
When a user makes or receives a call for the first time on a given website, the browser will prompt the user to grant microphone and camera access permissions.  This might also occur when the `SendBirdCall.useMedia()` function is first called. Without these permissions, users will be unable to retrieve a list of available media devices or to retrieve any actual media streams.

## Initialize the SendBirdCall instance in a client application
As shown below, the `SendBirdCall` instance must be initiated when a client app is launched. If another initialization with another `APP_ID` takes place, all existing data will be deleted and the `SendBirdCall` instance will be initialized with the new `APP_ID`.
```javascript
SendBirdCall.init(APP_ID);
```

## Authenticate a user and connect websocket to server
In order to make and receive calls, users must first be authenticated on the SendBird server using the  `SendBirdCall.authenticate()` function. The `SendBirdCall` object must then be connected to the websocket server using `SendBirdCall.connectWebSocket()` method.
```javascript
// Authentication
const authOption = { userId: USER_ID, accessToken: ACCESS_TOKEN };

SendBirdCall.authenticate(authOption, (res, error) => {
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
Two types of event handlers must be registered for various events that client apps may respond to: a device-specific listener and a call-specific listener.

### Device-specific Listener
Register a device-specific event handler using the `SendBirdCall.addListener()` method. Prior to registering this, the `onRinging()` event cannot be detected. It is therefore recommended that this event handler be added during initialization.  After this device-specific event is added, responding to device-wide events (e.g. incoming calls) is handled as shown below:
```javascript
SendBirdCall.addListener(UNIQUE_HANDLER_ID, {
  onRinging: (call) => {
    ...
  },
  onAudioInputDeviceChanged: (currentDevice, availableDevices) => {
    ...
  },
  onAudioOutputDeviceChanged: (currentDevice, availableDevices) => {
    ...
  },
  onVideoInputDeviceChanged: (currentDevice, availableDevices) => {
    ...
  }
});
```
`UNIQUE_HANDLER_ID` is any unique string value (e.g. UUID).
<br/>

| Event Listener | Invocation Criteria                                         |
|---------------|------------------------------------------------------------------|
|onRinging    | Incoming calls are received on the callee’s device. |
|onAudioInputDeviceChanged | Audio input devices have changed. |
|onAudioOutputDeviceChanged | Audio output devices have changed. |
|onVideoInputDeviceChanged | Video input devices have changed. |

### Call-specific Listener
Register a call-specific event handler by attaching an event handler function directly to the properties of the call object. Responding to call-specific events (e.g. sucessfull call connection) is then handled as shown below:

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

| Event Listener                         | Invocation Criteria |
|--------------------------------|--------------|
| onEstablished                | The callee accepted the call using the method `call.accept()`, but neither the caller or callee’s devices are as of yet connected to media devices. |
| onConnected                  | Media devices (e.g. microphone and speakers) between the caller and callee are connected and the voice or video call can begin. |
| onEnded                      | The call has ended on either the caller or the callee’s devices. This is triggered automatically when either party runs the method `call.end()`. This event listener is also invoked if the call is ended for other reasons. See the bottom of this readme for a list of all possible reasons for call termination.  |
| onRemoteAudioSettingsChanged | The other party changed their audio settings. |
| onRemoteVideoSettingsChanged | The other party changed their video settings. |
| onCustomItemsUpdated         | One or more of `call`’s custom items (metadata) have been updated. |
| onCustomItemsDeleted         | One or more of `call`’s custom items (metadata) have been deleted. |
| onReconnecting               | `call` started attempting to reconnect to the other party after a media connection disruption. |
| onReconnected                | The disrupted media connection reconnected. |


## Make a call
Initiate a call by first preparing the `dialParams` call parameter object. This contains the intended callee’s user id, whether or not it is a video call, as well as a `callOption` object. `callOption` is used to set the call’s initial configuration (e.g. muted/unmuted). Once prepared, the `dialParams` object is then passed into the `SendBirdCall.dial()` method to starting making a call.
```javascript
const dialParams = {
  userId: CALLEE_ID,
  isVideoCall: true,
  callOption: {
    localMediaView: document.getElementById('local_video_element_id'),
    remoteMediaView: document.getElementById('remote_video_element_id')
  }
};

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

> A media viewer is a [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) (e.g. &lt;audio&gt;, &lt;video&gt;) to display media stream. The `remoteMediaView` is required for the remote media stream to be displayed. Setting `autoplay` property of media viewer to `true` is also recommended. 

> The media viewers can also be set using `call.setLocalMediaView(element)` or `call.setRemoteMediaView(element)`.  

```html
<video id="remote_video_element_id" autoplay>
```

```javascript
//to set media viewer lazily
call.setLocalMediaView(document.getElementById('local_video_element_id'));
call.setRemoteMediaView(document.getElementById('remote_video_element_id'));
```

## Receive a call
Receive incoming calls by first registering a listener. Accept or decline incoming calls using the `call.accept()` or the `call.end()` methods. If the call is accepted, a media session will automatically be established.

Before accepting any calls, event listeners (e.g. `onEstablished`, `onConnected`) must be registered upfront. Once registered, these listeners enable reacting to in-call events via callbacks methods.

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
>**Note**: If the media viewer elements have been set via `call.setLocalMediaView()` and `call.setRemoteMediaView()`, ensure that the same media viewers are set in `acceptParams`’s `callOption` . Otherwise, these will be overriden during `call.accept()`

Incoming calls are received via the application's persistent internal server connection, which is established by `SendBirdCall.connectWebSocket()`.
In the event of accidental disconnection, the application will attempt to reconnect every 2 seconds.

## Handle a current call
During an ongoing call, mute or unmute the caller’s microphone using the `call.muteMicrophone()` or `call.unmuteMicrophone()` methods. If the callee changes their audio settings, the caller is notified via the `call.onRemoteAudioSettingsChanged()` listener. The caller may start or stop video using the `call.startVideo()` or `call.stopVideo()` methods. If the callee changes their video settings, the caller is notified via the `call.onRemoteVideoSettingsChanged()` listener.

```javascript
// mute my microphone
call.muteMicrophone();

// unmute my microphone
call.unmuteMicrophone();

// start to show video
call.startVideo();

// stops showing video
call.stopVideo();

// receives the audio event
call.onRemoteAudioSettingsChanged = (call) => {
  if (call.isRemoteAudioEnabled) {
    // The peer has been muted.
    // Consider displaying an unmuted icon.
  } else {
    // The peer has been muted.
    // Consider displaying and toggling a muted icon.
  }
};

// receives the video event
call.onRemoteVideoSettingsChanged = (call) => {
  if (call.isRemoteVideoEnabled) {
    // The peer has stopped the video.
  } else {
    // The peer has started the video.
  }
};
```

## End a call
A caller can end a call using the `call.end()` method. This event can be processed via the `call.onEnded` listener. This listener is also triggered when the callee ends the call.

```javascript
// End a call
call.end();

// receives the event
call.onEnded = (call) => {
  // Consider releasing or destroying call-related view from here.
};
```

## Configuring media devices
The `SendBirdCall` object contains a collection of methods used to configure media devices. Each media type has corresponding methods to (1) retrieve a list of devices (2) retrieve the current device, (3) select a device, and (4) update devices. If media device configuration changes, any ongoing calls are affected immediately.

|Method | Description |
|-------|-------------|
|useMedia(constraints) | Attempts to grant permission to access media devices |
|getCurrentAudioInputDevice() | Get the current audio input device |
|getAvailableAudioInputDevices() | Get a list of available audio input devices | 
|selectAudioInputDevice(mediaDeviceInfo) | Select the audio input device to use |
|getCurrentAudioOutputDevice() | Get the current audio output device  |
|getAvailableAudioOutputDevices() | Get a list of available audio output devices   |
|selectAudioOutputDevice(mediaDeviceInfo) | Select the audio output device to use |
|getCurrentVideoInputDevice() | Get the current video input device |
|getAvailableVideoInputDevices() | Get a list of available video input devices  |
|selectVideoInputDevice(mediaDeviceInfo) | Get the current video input device |
|updateMediaDevices(constraints) | Manually update media devices |

The device specific-event handler also contains a collection of event listeners used to handle changes in media devices.
|Event Listener | Invocation criteria |
|---------------|-------------|
|onAudioInputDeviceChanged | audio input devices have changed |
|onAudioOutputDeviceChanged | audio output devices have changed |
|onVideoInputDeviceChanged | video input devices have changed |

Before using the methods and event listeners listed above, ensure that `SendBirdCall.useMedia(constraints)` has been executed. Failing to do this will result in these methods causing unexpected behaviors or failed outcomes.

```javascript
//on settings view opened
const mediaAccess = SendBirdCall.useMedia({audio: true, video: true});

//This code demonstrates for audio input devices. The same can also be done for audio output and video input devices.
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
> Always be sure to `dispose()` of the `mediaAccess`  retrieved from  `SendBirdCall.useMedia`. Failure to do so will result in vulnerable media access permissions that could grant unintended use of the user’s camera microphone or camera.

> In `Chrome` / `Firefox`, `SendBirdCall.updateMediaDevices` does not need to be called if the media device event listener is used to update the view or device list. However, in `Safari`, those event listeners might not be called after a media device change.  In such cases, manually calling `SendBirdCall.updateMediaDevices` may be required.


## Deauthenticate a user
Users are deauthenticated (i.e. “logged out”) using with `SendBirdCall.deauthenticate()` method. This will discard all current instances of `directCall`,  all session keys, and all user information. However, the device-specific event handler will remain. 
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
|params.myRole     | Returns call logs of the specified role. (e.g. if myRole is `'dc_callee'`, query will return only the callee’s call logs.)                                                                                                                                                                                               |
|params.endResults | Returns the call logs for specified results. If more than one result is specified, they are processed as `OR` condition and all call logs corresponding with the specified end results will be returned. For example, if endResults is `['NO_ANSWER'`, `'CANCELED']`, only the `NO_ANSWER` and `CANCELED` call logs will be returned.|

## Additional information: call results
Information relating the end result of a call can be obtained at any time via the  `directCall.endResult`  property, best accessed within the `onEnded()` callback.  


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