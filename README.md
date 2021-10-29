# [Sendbird](https://sendbird.com) Calls SDK for JavaScript

[![minified size](https://img.shields.io/bundlephobia/min/sendbird-calls)](https://img.shields.io/bundlephobia/min/sendbird-calls)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/sendbird-calls)](https://img.shields.io/bundlephobia/minzip/sendbird-calls)
[![npm version](https://badge.fury.io/js/sendbird-calls.svg)](https://badge.fury.io/js/sendbird-calls)
[![Commercial License](https://img.shields.io/badge/license-Commercial-brightgreen.svg)](https://github.com/sendbird/sendbird-calls-javascript/blob/master/LICENSE.md)

## Table of contents

  1. [Introduction](#introduction)
  1. [Before getting started](#before-getting-started)
  1. [Getting started](#getting-started)
  1. [Making your first call](#making-your-first-call)
  1. [Implementation guide](#implementation-guide)  
  1. [Appendix](#appendix)

<br />

## Introduction

**Sendbird Calls** is the latest addition to our product portfolio. It enables real-time calls between users within a Sendbird application. SDKs are provided for iOS, Android, and JavaScript. Using any one of these, developers can quickly integrate voice and video call functions into their own client apps, allowing users to make and receive web-based real-time voice and video calls on the Sendbird platform.

> If you need any help in resolving any issues or have questions, please visit [our community](https://community.sendbird.com).

### How it works

Sendbird Calls SDK for JavaScript provides a framework to make and receive voice and video calls. **Direct calls** in the SDK refers to one-to-one calls. To make a direct voice or video call, the caller specifies the user ID of the intended callee, and dials. Upon dialing, all of the callee’s authenticated devices will receive notifications for an incoming call. The callee then can choose to accept the call from any one of the devices. When the call is accepted, a connection is established between the devices of the caller and the callee. This marks the start of a direct call. Call participants can mute themselves, or call with either or both of the audio and video by using output devices such as speaker and microphone for audio, and front, rear camera for video. A call may be ended by either party. The [Sendbird Dashboard](https://dashboard.sendbird.com/auth/signin) displays call logs in the Calls menu for dashboard owners and admins to review.

### More about Sendbird Calls SDK for JavaScript

Find out more about Sendbird Calls for JavaScript on [Calls SDK for JavaScript doc](https://sendbird.com/docs/calls/v1/javascript/getting-started/about-calls-sdk).

<br />

## Before getting started

This section shows the prerequisites you need to check to use Sendbird Calls SDK for JavaScript.

### Requirements

The minimum requirements for Calls SDK for JavaScript are:

- [Modern browsers implementing WebRTC APIs](https://caniuse.com/#feat=rtcpeerconnection) are supported; IE is excluded.
- Edge < 44 is not supported as of now.

```javascript
// browser console
(window.RTCPeerConnection) ? console.log('supported') : console.log('not supported')
```

<br />

## Getting started

This section gives you information you need to get started with Sendbird Calls SDK for JavaScript.

### Install and configure the SDK

1. Download and install the SDK using `npm` or `yarn`.
```bash
# npm
npm install sendbird-calls 

# yarn
yarn add sendbird-calls 
```

2. Import `SendBirdCall` as an es6 module
```javascript
import SendBirdCall from "sendbird-calls";

SendBirdCall.init(APP_ID)
```
> **Note**: If you are using `TypeScript`, you have to set ['--esModuleInterop' setting to `true` for 'default import'](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#support-for-import-d-from-cjs-from-commonjs-modules-with---esmoduleinterop), or use `import * as SendBirdCall from "sendbird-calls"` instead.

Or use the minified file to initialize `SendBirdCall` as global variable in the header 
```html
<script type="text/javascript" src="SendBirdCall.min.js"></script>
<script type="text/javascript">
    SendBirdCall.init(APP_ID)
</script>
```

### Grant media device permissions

When a user makes or receives a call for the first time on a given website, the browser will prompt the user to grant microphone and camera access permissions. This might also occur when the `SendBirdCall.useMedia()` function is first called. Without these permissions, users will be unable to retrieve a list of available media devices or to retrieve any actual media streams.

<br />

## Making your first call

Follow the step-by-step instructions below to authenticate and make your first call. 

### Step 1: Initialize the SendBirdCall instance in a client app

As shown below, the `SendBirdCall` instance must be initiated when a client app is launched. Initialize the `SendBirdCall` instance with the `APP_ID` of the Sendbird application you would like to use to make a call.

```javascript
SendBirdCall.init(APP_ID);
```

### Step 2: Authenticate a user and connect websocket to server

In order to make and receive calls, users must first be authenticated on the SendBird server using the `SendBirdCall.authenticate()` function. The `SendBirdCall` object must then be connected to the websocket server using the `SendBirdCall.connectWebSocket()` method.

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

### Step 3: Add an event handler

There are two types of event handlers the SDK provides for a client app to respond to various events: a device-specific listener and a call-specific listener.

#### - Device-specific listener

Register a device-specific event handler using the `SendBirdCall.addListener()` method. It is recommended to add the event handler during initialization because it is a prerequisite for detecting an `onRinging()` event. The code below shows the way device-wide events such as incoming calls are handled once device-specific event is added. 

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

`UNIQUE_HANDLER_ID` is any unique string value such as UUID.

| Event listener | Invocation criteria|
|---|---|
|onRinging| Incoming calls are received on the callee’s device. |
|onAudioInputDeviceChanged | Audio input devices have changed. |
|onAudioOutputDeviceChanged | Audio output devices have changed. |
|onVideoInputDeviceChanged | Video input devices have changed. |

#### - Call-specific listener

Register a call-specific event handler by attaching an event handler function directly to the properties of the call object. Responding to call-specific events such as establishing a successful call connection is then handled as shown below.

```javascript
// call is 'DirectCall' object
call.onEstablished = (call) => {
    ..,
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

call.onRemoteRecordingStatusChanged = (call) => {
    ...
};
```

|Event listener|Invocation criteria |
|---|---|
|onEstablished|The callee accepted the call using the method `call.accept()`. However, neither the caller or callee’s devices are connected to media devices yet.|
|onConnected|A connection is established between the caller and callee’s media devices such as microphones and speakers. The voice or video call can begin.|
|onEnded | The call has ended on either the caller or the callee’s devices. When the `call.end()` method is used from either party, a call ends. The `call.end()` event listener is also invoked if the call is ended for other reasons. Refer to [Call results](#call-results) in [Appendix](#appendix) for all possible reasons for call termination. |
|onRemoteAudioSettingsChanged| The other party changed their audio settings. |
|onRemoteVideoSettingsChanged| The other party changed their video settings. |
|onCustomItemsUpdated| One or more of `call`’s custom items that are used to store additional information have been updated.|
|onCustomItemsDeleted| One or more of `call`’s custom items that are used to store additional information have been deleted.|
|onReconnecting| `call` started attempting to reconnect to the other party after a media connection disruption. |
|onReconnected| The disrupted media connection reconnected. |
|onRemoteRecordingStatusChanged | The other user’s recording status has been changed. |

### Step 4: Make a call

First, prepare the `dialParams` call parameter object to initiate a call. This contains the intended callee’s user id and a `callOption` object. The `callOption` is used to set the call’s initial configuration, such as mute or unmute. Once prepared, the `dialParams` object is then passed into the `SendBirdCall.dial()` method to start making a call.

```javascript
const dialParams = {
    userId: CALLEE_ID,
    isVideoCall: true,
    callOption: {
        localMediaView: document.getElementById('local_video_element_id'),
        remoteMediaView: document.getElementById('remote_video_element_id'),
        audioEnabled: true,
        videoEnabled: true
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

call.onRemoteAudioSettingsChanged = (call) => {
    ...
};

call.onRemoteVideoSettingsChanged = (call) => {
    ...
};
```

A media viewer is a [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) such as `<audio>` and `<video>` tags to display media stream. The remoteMediaView is required for the remote media stream to be displayed. It is recommended to set `autoplay` property of the media viewer to **true**.

> The media viewers can also be set using the `call.setLocalMediaView(element)` or `call.setRemoteMediaView(element)`.  

```html
<video id="remote_video_element_id" autoplay>
```

```javascript
// Set media viewer lazily
call.setLocalMediaView(document.getElementById('local_video_element_id'));
call.setRemoteMediaView(document.getElementById('remote_video_element_id'));
```

### Step 5: Receive a call

Register a listener first to receive incoming calls. Accept or decline incoming calls by using the `call.accept()` or the `call.end()` methods. If the call is accepted, a media session will automatically be established.

Before accepting any calls, event listeners such as `onEstablished`, onConnected must be registered. Once registered, these listeners enable reacting to in-call events through callbacks methods.

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
        
        call.onRemoteAudioSettingsChanged = (call) => {
            ...
        };
        
        call.onRemoteVideoSettingsChanged = (call) => {
            ...
        };
        
        const acceptParams = {
            callOption: {
                localMediaView: document.getElementById('local_video_element_id'),
                remoteMediaView: document.getElementById('remote_video_element_id'),
                audioEnabled: true,
                videoEnabled: true
            }
        };
        
        call.accept(acceptParams);
    }
});
```

> **Note**: If the media viewer elements have been set through the `call.setLocalMediaView()` and `call.setRemoteMediaView()`, ensure that the same media viewers are set in `acceptParams`’s `callOption`. Otherwise, these will be overridden during the `call.accept()`.

Incoming calls are received through the application's persistent internal server connection, which is established by `SendBirdCall.connectWebSocket()`. In the event of accidental disconnection, the application will attempt to reconnect every 2 seconds.

<br />

## Implementation guide


### Register event handlers

There are two types of event handlers the SDK provides for a client app to respond to various events: a device-specific listener and a call-specific listener.

#### - Device-specific listener

Register a device-specific event handler using the `SendBirdCall.addListener()` method. It is recommended to add the event handler during initialization because it is a prerequisite for detecting an `onRinging()` event. The code below shows the way device-wide events such as incoming calls are handled once device-specific event is added. 

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

`UNIQUE_HANDLER_ID` is any unique string value such as UUID.

| Event listener | Invocation criteria|
|---|---|
|onRinging| Incoming calls are received on the callee’s device. |
|onAudioInputDeviceChanged | Audio input devices have changed. |
|onAudioOutputDeviceChanged | Audio output devices have changed. |
|onVideoInputDeviceChanged | Video input devices have changed. |

#### - Call-specific listener

Register a call-specific event handler by attaching an event handler function directly to the properties of the call object. Responding to call-specific events such as establishing a successful call connection is then handled as shown below.

```javascript
// call is 'DirectCall' object
call.onEstablished = (call) => {
    ..,
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

call.onRemoteRecordingStatusChanged = (call) => {
    ...
};
```

|Event listener|Invocation criteria |
|---|---|
|onEstablished|The callee accepted the call using the method `call.accept()`. However, neither the caller or callee’s devices are connected to media devices yet.|
|onConnected|A connection is established between the caller and callee’s media devices such as microphones and speakers. The voice or video call can begin.|
|onEnded | The call has ended on either the caller or the callee’s devices. When the `call.end()` method is used from either party, a call ends. The `call.end()` event listener is also invoked if the call is ended for other reasons. Refer to [Calls result] in Appendix for all possible reasons for call termination. |
|onRemoteAudioSettingsChanged| The other party changed their audio settings. |
|onRemoteVideoSettingsChanged| The other party changed their video settings. |
|onCustomItemsUpdated| One or more of `call`’s custom items that are used to store additional information have been updated.|
|onCustomItemsDeleted| One or more of `call`’s custom items that are used to store additional information have been deleted.|
|onReconnecting| `call` started attempting to reconnect to the other party after a media connection disruption. |
|onReconnected| The disrupted media connection reconnected. |
|onRemoteRecordingStatusChanged | The other user’s recording status has been changed. |

### Make a call

First, prepare the `dialParams` call parameter object to initiate a call. This contains the intended callee’s user id and a `callOption` object. The `callOption` is used to set the call’s initial configuration, such as mute or unmute. Once prepared, the `dialParams` object is then passed into the `SendBirdCall.dial()` method to start making a call.

```javascript
const dialParams = {
    userId: CALLEE_ID,
    isVideoCall: true,
    callOption: {
        localMediaView: document.getElementById('local_video_element_id'),
        remoteMediaView: document.getElementById('remote_video_element_id'),
        audioEnabled: true,
        videoEnabled: true
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

call.onRemoteAudioSettingsChanged = (call) => {
    ...
};

call.onRemoteVideoSettingsChanged = (call) => {
    ...
};
```

A media viewer is a [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) such as `<audio>` and `<video>` tags to display media stream. The remoteMediaView is required for the remote media stream to be displayed. It is recommended to set `autoplay` property of the media viewer to **true**.

> The media viewers can also be set using the `call.setLocalMediaView(element)` or `call.setRemoteMediaView(element)`.  

```html
<video id="remote_video_element_id" autoplay>
```

```javascript
// Set media viewer lazily
call.setLocalMediaView(document.getElementById('local_video_element_id'));
call.setRemoteMediaView(document.getElementById('remote_video_element_id'));
```

### Receive a call

Register a listener first to receive incoming calls. Accept or decline incoming calls by using the `call.accept()` or the `call.end()` methods. If the call is accepted, a media session will automatically be established.

Before accepting any calls, event listeners such as `onEstablished`, `onConnected` must be registered. Once registered, these listeners enable reacting to in-call events through callbacks methods.

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
        
        call.onRemoteAudioSettingsChanged = (call) => {
            ...
        };
        
        call.onRemoteVideoSettingsChanged = (call) => {
            ...
        };
        
        const acceptParams = {
            callOption: {
                localMediaView: document.getElementById('local_video_element_id'),
                remoteMediaView: document.getElementById('remote_video_element_id'),
                audioEnabled: true,
                videoEnabled: true
            }
        };
        
        call.accept(acceptParams);
    }
});
```

> **Note**: If the media viewer elements have been set through the `call.setLocalMediaView()` and `call.setRemoteMediaView()`, ensure that the same media viewers are set in `acceptParams`’s `callOption`. Otherwise, these will be overridden during the `call.accept()`.

Incoming calls are received through the application's persistent internal server connection, which is established by `SendBirdCall.connectWebSocket()`. In the event of accidental disconnection, the application will attempt to reconnect every 2 seconds.

### Handle a current call

During an ongoing call, a caller may mute or unmute their microphone using the `call.muteMicrophone()` or `call.unmuteMicrophone()` methods. If the callee changes their audio setting, the caller is notified through the `call.onRemoteAudioSettingsChanged()` listener. The caller may start or stop video using the `call.startVideo()` or `call.stopVideo()` methods. If the callee changes their video setting, the caller is notified through the `call.onRemoteVideoSettingsChanged()` listener.

```javascript
// Mute my microphone
call.muteMicrophone();

// Unmute my microphone
call.unmuteMicrophone();

// Start to show video
call.startVideo();

// Stops showing video
call.stopVideo();

// Receives the audio event
call.onRemoteAudioSettingsChanged = (call) => {
    if (call.isRemoteAudioEnabled) {
        // The peer has been unmuted.
        // Consider displaying a muted icon.
    } else {
        // The peer has been muted.
        // Consider displaying an unmuted icon.
    }
};

// Receives the video event
call.onRemoteVideoSettingsChanged = (call) => {
    if (call.isRemoteVideoEnabled) {
        // The peer has started the video.
    } else {
        // The peer has stopped the video.
    }
};
```

### End a call

A caller may end a call using the `call.end(`) method. This event can be processed through the `call.onEnded` listener. This listener is also triggered when the callee ends the call.


```javascript
// End a call
call.end();

// Receives the event
call.onEnded = (call) => {
    // Consider releasing or destroying call-related view from here.
};
```

## Mirror a MediaView

You can set the current user’s local video view as mirrored or reversed when the camera is facing the user. This can be easily done by adding the `transform` CSS property to your `localMediaView` element.

```css
#local-media-view
{
    transform: rotateY(180deg); /* add this property */
}
```

## Configuring media devices

The `SendBirdCall` object contains a collection of methods used to configure media devices. Each media type has corresponding methods to **a**. retrieve a list of devices, **b**. retrieve the current device, **c**. select a device, and **d**. update devices. If media device configuration changes, any ongoing calls are affected immediately.

|Method | Description |
|---|---|
|useMedia(constraints) | Attempts to grant permission to access media devices |
|getCurrentAudioInputDevice() | Get the current audio input device |
|getAvailableAudioInputDevices() | Get a list of available audio input devices | 
|selectAudioInputDevice(mediaDeviceInfo) | Select the audio input device to use |
|getCurrentAudioOutputDevice() | Get the current audio output device  |
|getAvailableAudioOutputDevices() | Get a list of available audio output devices|
|selectAudioOutputDevice(mediaDeviceInfo) | Select the audio output device to use|
|getCurrentVideoInputDevice() | Get the current video input device |
|getAvailableVideoInputDevices() | Get a list of available video input devices|
|selectVideoInputDevice(mediaDeviceInfo) | Select the video input device to use |
|updateMediaDevices(constraints) | Manually update media devices |

The device specific-event handler also contains a collection of event listeners used to handle changes in media devices.

|Event listener | Invocation criteria |
|---|---|
|onAudioInputDeviceChanged | Audio input devices have changed |
|onAudioOutputDeviceChanged | Audio output devices have changed |
|onVideoInputDeviceChanged | Video input devices have changed |

Before using the methods and event listeners listed above, ensure that `SendBirdCall.useMedia(constraints)` has been executed. Failing to do this will result in these methods causing unexpected behaviors or failed outcomes.

```javascript
// on settings view opened
const mediaAccess = SendBirdCall.useMedia({audio: true, video: true});

// This code demonstrates for audio input devices. The same can also be done for audio output and video input devices.
const availableDevices = SendBirdCall.getAvilableAudioInputDevices();
const currentDevice = SendBirdCall.getCurrentAudioInputDevice();
// Populate option elements in select element
populateSelectOption(availableDevices);
// Select option which matches current device
selectOption(currentDevice);

SendBirdCall.addListener('my-listener', {
    onAudioInputDeviceChanged: (currentDevice, availableDevices) => {
        // Populate option elements in select element
        populateSelectOption(availableDevices);
        // Select option which matches current device
        selectOption(currentDevice);
    }
});

...

SendBirdCall.removeListener('my-listener');

//on settings view closed
mediaAccess.dispose();
```

Always be sure to `dispose()` of the `mediaAccess` retrieved from `SendBirdCall.useMedia`. Failure to do so will result in vulnerable media access permissions that could grant unintended use of the user’s camera microphone or camera.

> In `Chrome`/`Firefox`, `SendBirdCall.updateMediaDevices` does not need to be called if the media device event listener is used to update the view or device list. However, in `Safari`, those event listeners might not be called after a media device change.  In such cases, manually calling the `SendBirdCall.updateMediaDevices` may be required.

### Deauthenticate a user

When users log out of their call client apps, they must be deauthenticated with `SendBirdCall.deauthenticate()` method. This will discard all current instances of `directCall`, all session keys, and all user information. However, the device-specific event handler will remain.

```javascript
// Deauthenticate
SendBirdCall.deauthenticate();
```

### Retrieve a call information

The local or remote user’s information is available through the `directCall.localUser` and `directCall.remoteUser` properties.

### Retrieve call history

Sendbird Calls server automatically stores details of calls, which can be used later to display a call history for users. A user’s call history is available through a `DirectCallLogListQuery` instance. 

```javascript
/*
interface DirectCallLogListQueryParams {
    myRole: string,
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
        // The query.next() can be called once more.
        // If a user wants to fetch more call logs.
  }
});
```

| Method & Property| Description |
|---|---|
|next()| Used to query call history from `SendBirdCall` server.|
|hasNext| If **true**, there is more call history to be retrieved.|
|isLoading| If **true**, call history is being retrieved from Sendbird Calls server. |
|params.limit| Specifies the number of call logs to return at once. |
|params.myRole| Returns call logs of the specified role. For example, if `myRole` is **dc_callee**, the query will return only the callee’s call logs.|
|params.endResults| Returns the call logs for specified results. If more than one result is specified, they are processed as `OR` condition and all call logs corresponding with the specified end results will be returned. For example, if the `endResults` is set as **NO_ANSWER** or **CANCELED**, only the **NO_ANSWER** and **CANCELED** call logs will be returned.|

### Sound effect

#### - Sound types

| Type | Description|
|---|---|
| DIALING | Refers to a sound that is played on a caller’s side when the caller makes a call to a callee.|
| RINGING | Refers to a sound that is played on a callee’s side when receiving a call.|
| RECONNECTING | Refers to a sound that is played when a connection is lost, but immediately tries to reconnect. Users are also allowed to customize the ringtone. |
| RECONNECTED  | Refers to a sound that is played when a connection is re-established.|

#### - Add sound

|Method|Description|
|---|---|
|addDirectCallSound() | Adds a specific sound such as a ringtone and an alert tone with URL to a direct call. |

|Parameter|Type|Description|
|---|---|---|
|type |SoundType| Specifies the sound type to be used according to the event.|
|url| string| Specifies the URL of the sound file. You can use the URI of the asset on the server or **ObjectURL** created by `URL.createObjectURL()`. |

>**Note**: In modern web browsers, they have their own autoplay policies and can block the `addDirectCallSound()` method from being directly executed. To solve this problem for `Chrome` and `Firefox`, the `addDirectCallSound()` method should be called after a user’s event such as clicking a button. For `Safari`, you have to call the `addDirectCallSound()` method in the event listener of a user’s event such as `onclick()`. 

```javascript
document.querySelector('#yourButton').addEventListener('click', function() {
    SendBirdCall.addDirectCallSound(SendBirdCall.SoundType.DIALING, RESOURCE_URL);
});
``` 

#### - Remove sound

| Method | Description|
|---|---|
| removeDirectCallSound(type: SoundType) | Removes a specific sound from a direct call. |

| Parameter |Type|Description|
|---|---|---|
| type| SoundType| Specifies the type of sound to be used according to the event. |

<br />

## Appendix

### Call relay protocol
Sendbird Calls is based on WebRTC to enable real-time calls between users with P2P connections, but sometimes connectivity issues may occur for users due to network policies that won’t allow WebRTC communications through Firewalls and NATs (Network Address Translators). For this, Sendbird Calls uses two different types of protocols, **Session Traversal Utilities for NAT (STUN)** and **Traversal Using Relays around NAT (TURN)**. **STUN** and **TURN** are protocols that support establishing a connection between users.
> __Note__: See our [GitHub page](https://github.com/sendbird/guidelines-calls/tree/master/Recommendation%20on%20firewall%20configuration) to learn about the requirements and how to use the Calls SDKs behind a firewall.
---
#### How STUN and TURN works
Session Traversal Utilities for NAT (STUN) is a protocol that helps hosts to discover the presence of a NAT and the IP address, which eventually makes the connection between two endpoints. Traversal Using Relays around NAT (TURN) is a protocol that serves as a relay extension for data between two parties.

Sendbird Calls first try to make a P2P connection directly using the Calls SDK. If a user is behind a NAT/Firewall, Calls will discover the host's public IP address as a location to establish connection using STUN. In most cases, STUN server is only used during the connection setup and once the session has been established, media will flow directly between two users. If the NAT/Firewall still won't allow the two users to connect directly, TURN server will be used to make a connection to relay the media data between two users. Most of the WebRTC traffic is connected with STUN.

### Call results

Information relating the end result of a call can be obtained at any time through the `directCall.endResult` property, best accessed within the `onEnded()` callback.

| EndResult | Description  |
|---|---|
|NO_ANSWER|The callee failed to either accept or decline the call within a specific amount of time.|
|CANCELED|The caller canceled the call before the callee could accept or decline.|
|DECLINED|The callee declined the call.|
|COMPLETED|The call ended after either party ended it|
|TIMED_OUT|Sendbird Calls server failed to establish a media session between the caller and callee within a specific amount of time.|
|CONNECTION_LOST|The data stream from either the caller or the callee has stopped due to a `WebRTC` connection issue.|
|DIAL_FAILED|The `dial()` method call has failed.|
|ACCEPT_FAILED|The `accept()` method call has failed.|
|OTHER_DEVICE_ACCEPTED|The incoming call was accepted on a different device. This device received an incoming call notification, but the call ended when a different device accepted it.|

### Encoding configurations

|Category|Value| Note|
|---|---|---|
|Frames per Second | 24 fps ||
|Maximum Resolution| 720p| 1280x720 px; standard HD |
|Audio Codec| OPUS| |
|Video Codec | VP8||
