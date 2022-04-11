# Change Log

### 1.9.3 (April 11, 2022 UTC)
* Bug fix
    * Fixed the unexpected error when joining the room that the user exited before.

### 1.9.2 (April 8, 2022 UTC)
* Bug fix
    * Fixed the bug that group call breaks in chrome v100.

### 1.9.1 (February 17, 2022 UTC)
* Bug fix
    * Fixed the bug that `selectAudioOutputDevice(mediaDeviceInfo: MediaDeviceInfo): void` doens't work in group call.

### 1.9.0 (December 9, 2021 UTC)
For 1.9.0, a feature to delete a room in Group call is released.
* Added `deleted` in `RoomEventMap` which is invoked when the room has been deleted by the Platform API.

### 1.8.2 (November 19, 2021 UTC)
* Bug fix
    * Fixed the unexpected error when joining room in which there are more than two participants.

### 1.8.1 (November 1, 2021 UTC)
* Bug fix
    * Fixed the bug that the permission dosen't be revoked after `Room.exit()`.
* Added missing type declarations.

### 1.8.0 (October 27, 2021 UTC)
For 1.8.0, a new feature is released for both Group call and Direct call features respectively.

For the Group call feature, you can now add and manage custom items to store additional information for a room.
* Added custom items feature in Group Call
    * Added `customItems` in `Room`.
    * Added `customItems` in `RoomParams`.
    * Added `updateCustomItems(customItems: CustomItems): Promise<CustomItemsResult>` and `deleteCustomItems(customItemKeys: string[]): Promise<CustomItemsResult>` in `Room`.
    * Added `customItemsUpdated` and `customItemsDeleted` in `RoomEventMap`.

For the Direct call feature, you can now hold and resume calls which allows you to accept an incoming call or switch between calls.
* Added hold and resume feature in Direct Call
    * Added `hold(): Promise<void>` and `unhold(force: boolean): Promise<void>` in `DirectCall`.
    * Added `isOnHold` in `DirectCall`.
    * Added `holdActiveCall` in `DialParams` and `AcceptParams`.
    * Added `onUserHoldStatusChanged` in `DirectCall`.
* Added `getOngoingCalls()` in `SendBirdCall` to retrieve a list of ongoing Direct Calls in the Calls SDK.
* Added missing return type of push token registration APIs.
* Improved stability.

### 1.7.2 (October 8, 2021 UTC)
* Added push token registration APIs
    * Below methods are added in `SendBirdCall`
        * `registerPushToken(pushToken: string, tokenType: TokenType): Promise<void>`
        * `unregisterPushToken(pushToken: string, tokenType: TokenType): Promise<void>`
        * `unregisterAllPushTokens(tokenType: TokenType): Promise<void>`
    * Below enum is added in `SendBirdCall`
        * `TokenType`

### 1.7.1 (July 21, 2021 UTC)
* Bug fix
    * Fixed the bug that `audioEnabled` and `videoEnabled` in `DirectCallOption` doesn't work.

### 1.7.0 (June 4, 2021 UTC)
* Added capability to query rooms.
    * Below interfaces are added in `SendBirdCall`
        * `RoomListQuery`
        * `RoomListQueryParams`
    * Below methods are added in `SendBirdCall`
        * `createRoomListQuery(params: RoomListQueryParams): RoomListQuery`
* Added support for customized host URL
    * Now, you can customize API/WebSocket host URL when `init()`.
    * Below method is changed in `SendBirdCall`
        * `init(appId: string, apiHost?: string, websocketHost?: string): void`
* Improved security.
* Improved stability.

### 1.6.1 (May 21, 2021 UTC)
* Bug fix
    * Fixed the error and undefined behavior in recording feature.
        * Now, `DirectCall.startRecording()` produces `.webm` file in Chrome and Firefox, `.mp4` file in Safari.
    * Fixed the noise when calling `addDirectCallSound()`.
    * Fixed the bug that sometimes the error message of `authenticate()` is blank.

### 1.6.0 (April 22, 2021 UTC)
* Added support for group call.
    * Below class is added in `SendBirdCall`
        * `Room`
    * Below methods are added in `SendBirdCall`
        * `createRoom(params: RoomParams): Promise<Room>`
        * `getCachedRoomById(roomId: string): Room`
        * `fetchRoomById(roomId: string): Promise<Room>`
    * Below interfaces are added in `SendBirdCall`
        * `RoomParams`
        * `EnterParams`
        * `Participant`
        * `LocalParticipant`
        * `RemoteParticipant`
    * Below enums are added in `SendBirdCall`
        * `RoomType`
        * `ParticipantState`
* Bug fix
    * Fixed an unexpected exception.
* Improved stability.

### 1.5.4 (Mar 12, 2021 UTC)
* Added suuport for screen share in `DirectCall`.
    * Below methods are added in `DirectCall`:
        * `startScreenShare(): Promise<void>`
        * `stopScreenShare(): void`
    * Below property is added in `DirectCall`:
        * `readonly isLocalScreenShareEnabled: boolean`

### 1.6.0-beta (Feb 17, 2021 UTC)
Sendbird Calls SDK version 1.6.0 supports the early access program for group calling. New concepts introduced in this version center around *rooms* and *participants*.
* Added group call feature.
    * Below methods are added in `SendBirdCall`
        * `createRoom(): Promise<Room>`
        * `getCachedRoomById(roomId: string): Room`
        * `fetchRoomById(roomId: string): Promise<Room>`
    * Below class is added in `SendBirdCall`
        * `Room`
    * Below interfaces are added in `SendBirdCall`
        * `EnterParams`
        * `Participant`
        * `LocalParticipant`
        * `RemoteParticipant`
    * Below enum is added in `SendBirdCall`
        * `ParticipantState`

### 1.5.3 (Jan 26, 2021 UTC)
* Bug fix
    * Fixed doubling bug in recording.

### 1.5.2 (Jan 14, 2021 UTC)
* Bug fix
    * Fixed an unexpected exception.

### 1.5.1 (Dec 28, 2020 UTC)
* Bug fix
    * Fixed an unexpected exception.

### 1.5.0 (Dec 24, 2020 UTC)
* Added support for integration with Sendbird Chat
    * Added `sendBirdChatOptions` to `DialParams`
* Added support for `Call summary` on the dashboard.
* Improved backend scalability
* Enhanced security for compliance

### 1.4.1 (Nov 3, 2020 UTC)
* Improved stability

### 1.4.0 (Nov 3, 2020 UTC)
* Added remote recording progress event.
    * Below properties are added in `DirectCall`:
        * `onRemoteRecordingStatusChanged: ((call: DirectCall) => void) | null`
        * `localRecordingStatus: RecordingStatus`
        * `remoteRecordingStatus: RecordingStatus`
    * Below enum is added in `SendBirdCall`:
        * `RecordingStatus`
* Improved stability

### 1.3.0 (September 23, 2020)
* Added snapshot feature
    * Below methods are added in `DirectCall`
        * `captureLocalVideoView(callback?: CaptureVideoViewHandler): Promise<CaptureVideoViewResult>`
        * `captureRemoteVideoView(callback?: CaptureVideoViewHandler): Promise<CaptureVideoViewResult>`
* Added recording feature
    * Below methods are added in `SendBirdCall`
        * `addRecordingListener(id: string, listener: SendBirdCallRecordingListener): void`
        * `removeRecordingListener(id: string): void`
        * `removeAllRecordingListeners(): void`
    * Below methods are added in `DirectCall`
        * `startRecording(options: DirectCallRecordOption): string`
        * `stopRecording(recordingId: string): boolean`
    * Below constructor is added in `SendBirdCall`
        * `DirectCallRecordOption`
* Added sound effect feature
    * Below property is added in `SendBirdCall`
        * `SoundType`
    * Below methods are added in `SendBirdCall`
        * `addDirectCallSound(type: SoundType, url: string): Promise<boolean>`
        * `removeDirectCallSound(type: SoundType): boolean`
* Improved validation of `customItems` interfaces. Only string keys/values are available for `customItems` or `customItemsKeys` arguments of,
    * `updateCustomItems(callId: string, customItems: CustomItems, callback?: CustomItemsHandler): Promise<CustomItemsResult>` in `SendBirdCall`
    * `deleteCustomItems(callId: string, customItemKeys: string[], callback?: CustomItemsHandler): Promise<CustomItemsResult>` in `SendBirdCall`
    * `updateCustomItems(customItems: CustomItems, callback?: CustomItemsHandler): Promise<CustomItemsResult>` in `DirectCall`
    * `deleteCustomItems(customItemsKeys: string[], callback?: CustomItemsHandler): Promise<CustomItemsResult>` in `DirectCall`

### 1.2.5 (September 2, 2020)
* Enhanced prerequisite check in `init()`.
* Improved stability.
### 1.2.4 (August 19, 2020)
* Bug fix
    * Fixed the connection problem with Android SDK.
### 1.2.3 (August 13, 2020)
* Bug fix
    * Fixed the unexpected exceptions.
* Improved stability
### 1.2.2 (July 28, 2020)
* Replaced MediaDeviceInfo with InputDeviceInfo in following `SendBirdCall` methods
    * `getCurrentAudioInputDevice(): InputDeviceInfo`
    * `getAvailableAudioInputDevices(): InputDeviceInfo[]`
    * `selectAudioInputDevice(mediaDeviceInfo: InputDeviceInfo): void`
    * `getCurrentVideoInputDevice(): InputDeviceInfo`
    * `getAvailableVideoInputDevices(): InputDeviceInfo[]`
    * `selectVideoInputDevice(mediaDeviceInfo: InputDeviceInfo): void`
* Added missing type information
    * `SendbirdCall`'s `useMedia()` method can return `undefined`
    * `DirectCall`'s `setLocalMediaView(mediaView: HTMLMediaElement)`
    * `DirectCall`'s `setRemoteMediaView(mediaView: HTMLMediaElement)`
* Added webhook support
    * Add `handleWebhookData(data: WebhookData): void` to SendBirdCall
    * Add `WebhookData` interface

### 1.2.1 (July 21, 2020)
* Buf fix
    * Fixed the unexpected exceptions in safari.
### 1.2.0 (July 20, 2020)
* Added support for Peer-to-peer call.
    * The Peer-to-peer option can be configured on the dashboard.
* Added getting ongoing call count and ongoing status of `DirectCall`.
    * Added `getOngoingCallCount(): number` to `SendBirdCall`.
    * Added `readonly isOngoing: boolean` to `DirectCall`.
* Added `setCallConnectionTimeout(timeout: number): void` to `SendBirdCall`.
    * The call connection timer starts when the callee accepts the call. The timer will end the call after the specified timeout interval.
* Improved stability.
### 1.1.4 (July 14, 2020)
* Bug fix
    * Fixed typo in `d.ts`.
    * Fixed import error in Node environment.
### 1.1.3 (June 18, 2020)
* Improved stability.
### 1.1.2 (June 16, 2020)
* Improved stability.
### 1.1.1 (May 25, 2020)
* Bug fix
    * Fixed the bug that some console logging ignored `LoggerLevel`.
### 1.1.0 (May 22, 2020)
* Below property is added in `SendBirdCall`
    * `ErrorCode`
* Below keys are added in `SendBirdCall.LoggerLevel`
    * `WARNING`
    * `INFO`
* Below property is added in `DirectCall`
    * `readonly callLog`
* Below property is added in `DirectCallLog`
    * `readonly isFromServer`
### 1.0.2 (May 1, 2020)
* Below methods are added in `SendBirdCall`
    * `setRingingTimeout(timeout: int): void`
* Optimized video call frame rate.
* Improved stability.
### 1.0.1 (Mar 25, 2020)
* Bug fix
    * Fixed the bug that `onRemoteVideoSettingsChanged` doesn't fire.
* The default value of `callOption.videoEnabled` is changed to `ture`.
### 1.0.0 (Mar 24, 2020)
* README has been updated. Refer to readme to learn how to configure media devices. 
* Interfaces for media devices are added / changed.
    * Below methods are added in `SendBirdCall`
        * `getCurrentVideoInputDevice(): MediaDeviceInfo`
        * `getAvailableVideoInputDevices(): MediaDeviceInfo[]`
        * `selectVideoInputDevice(mediaDeviceInfo: MediaDeviceInfo): void`
        * `updateMediaDevices(constraints: { audio: boolean; video: boolean }): void`
        * `useMedia(constraints: { audio: boolean; video: boolean }): MediaAccess`
    * Below event listener is added in `SendBirdCallListener`
        * `onVideoInputDeviceChanged: ((currentVideoInputDevice: MediaDeviceInfo, availableVideoInputDevices: MediaDeviceInfo[]) => void) | null`
    * Below methods are changed in `SendBirdCall`
        * `getCurrentVideoInputDevice(): MediaDeviceInfo`
        * `getAvailableAudioInputDevices()` is now synchronous
        * `selectAudioInputDevice(mediaDeviceInfo: MediaDeviceInfo)` is now synchronous
        * `getAvailableAudioOutputDevices()` is now synchronous
        * `selectAudioOutputDevice(mediaDeviceInfo: MediaDeviceInfo)` is now synchronous

* Deprecated methods are removed
    * In `SendBirdCall`,
        * `dial(userId: string, isVideoCall: boolean, callOption: DirectCallOption, callback?: DialHandler): DirectCall` is removed. Use `dial(params: DialParams, callback?: DialHandler): DirectCall` instead.
    * In `DirectCall`,
        * `onRemoteAudioEnabled` event listener is removed. Use `onRemoteAudioSettingsChanged` instead.
        * `accept(callOption: DirectCallOption)` is removed. Use `accept(params: AcceptParams): void` instead.
        * `mute()` is removed. Use `muteMicrophone()` instead.
        * `unmute()` is removed. Use `unmuteMicrophone()` instead.
    * In `DirectCallOption`
        * `localVideoView` is removed. Use `localMediaView` instead.
        * `remoteVideoView` is removed. Use `remoteMediaView` instead.

### 0.9.0 (Mar 18, 2020)
* Internal improvement
### 0.8.1 (Mar 13, 2020)
* Bug fix
    * Fixed error when user accepted call without specifying localMediaView
* Below properties are added in `DirectCall`
    * `readonly callId: string`
    * `readonly isEnded: boolean`

### 0.8.0 (Mar 9, 2020)
* Interface for video call has been implemented
    * Below properties are added in `DirectCall`
        * `readonly isLocalVideoEnabled: boolean`
        * `readonly isRemoteVideoEnabled: boolean`
        * `readonly localMediaView: HTMLMediaElement`
        * `readonly remoteMediaView: HTMLMediaElement`

    * Below methods are added in `DirectCall`
        * `setLocalMediaView(): Promise<void>`
        * `setRemoteMediaView(): Promise<void>`
        * `stopVideo(): void`
        * `startVideo(): void`

    * Below implementable event listeners are added in `DirectCall`
        * `onRemoteVideoSettingsChanged: ((call: DirectCall) => void) | null`

    * Below property is added in `DirectCallOption`
        * `videoEnabled?: boolean`

* Wrong type definitions have been fixed
    * Type definitions for below methods in class `SendBirdCall` has been fixed.
        * `getAvailableAudioInputDevices(): MediaDeviceInfo[]` -> `getAvailableAudioInputDevices(): Promise<MediaDeviceInfo[]>`
        * `selectAudioInputDevice(mediaDeviceInfo: MediaDeviceInfo): void` -> `selectAudioInputDevice(mediaDeviceInfo: MediaDeviceInfo): Promise<void>`
        * `getAvailableAudioOutputDevices(): MediaDeviceInfo[]` -> `getAvailableAudioOutputDevices(): Promise<MediaDeviceInfo[]>`
        * `selectAudioOutputDevice(mediaDeviceInfo: MediaDeviceInfo): void` -> `selectAudioOutputDevice(mediaDeviceInfo: MediaDeviceInfo): Promise<void>`

### 0.7.0 (Feb 21, 2020)
* Selecting an audio input / output device is implemented.
    * Below methods are added in `SendBirdCall`
        * `getCurrentAudioInputDevice(): MediaDeviceInfo`
        * `getAvailableAudioInputDevices(): MediaDeviceInfo[]`
        * `selectAudioInputDevice(mediaDeviceInfo: MediaDeviceInfo): void`
        * `getCurrentAudioOutputDevice(): MediaDeviceInfo`
        * `getAvailableAudioOutputDevices(): MediaDeviceInfo[]`
        * `selectAudioOutputDevice(mediaDeviceInfo: MediaDeviceInfo): void`
    * Below implementable event listeners are added in `SendBirdCallListener`
        * `onAudioInputDeviceChanged: ((currentAudioInputDevice: MediaDeviceInfo, availableAudioInputDevices: MediaDeviceInfo[]) => void)  | null`
        * `onAudioOutputDeviceChanged: ((currentAudioOutputDevice: MediaDeviceInfo, availableAudioOutputDevices: MediaDeviceInfo[]) => void)  | null`


* Setting / retrieving custom items is implemented.
    * Below methods are added in `SendBirdCall`
        * `updateCustomItems(callId: string, customItems: CustomItems, callback?: CustomItemsHandler): Promise<CustomItemsResult>`
        * `deleteCustomItems(callId: string, customItemKeys: string[], callback?: CustomItemsHandler): Promise<CustomItemsResult>`
        * `deleteAllCustomItems(callId: string, callback?: CustomItemsHandler): Promise<CustomItemsResult>`
    * Below property is added in `DirectCall`
        * `readonly customItems: CustomItems`
    * Below methods are added in `DirectCall`
        * `updateCustomItems(customItems: CustomItems, callback?: CustomItemsHandler): Promise<CustomItemsResult>`
        * `deleteCustomItems(customItemsKeys: string[], callback?: CustomItemsHandler): Promise<CustomItemsResult>`
        * `deleteAllCustomItems(callback?: CustomItemsHandler): Promise<CustomItemsResult>`
    * Below implementable event listeners are added in `DirectCall`
        * `onCustomItemsUpdated: ((call: DirectCall, updatedKeys: string[]) => void) | null`
        * `onCustomItemsDeleted: ((call: DirectCall, deletedKeys: string[]) => void) | null`
    * Below property is added in `DirectCallLog`
        * `readonly customItems: CustomItems`

* Reconnection is implemented in `DirectCall`
    * Below implementable event listeners are added in `DirectCall`
        * `onReconnected: ((call: DirectCall) => void) | null`
        * `onReconnecting: ((call: DirectCall) => void) | null`


* Signature of the `SendBirdCall.dial()` has been changed.
    * `dial(userId: string, isVideoCall: boolean, callOption: DirectCallOption, callback?: DialHandler): DirectCall` is now deprecated
    * `dial(params: DialParams, callback?: DialHandler): DirectCall` is now recommended.

* Signature of the `DirectCall.accept()` has been changed.
    * `accept(callOption: DirectCallOption): void` is now deprecated
    * `accept(params: AcceptParams): void` is now recommended.


### 0.6.10 (Jan 31, 2020)
* Added Typescript Definition.
* Polished error description.
* Properties / Method deprecated. Deprecated interfaces might be removed in future releases.
    * `DirectCall.onRemoteAudioEnabled` is deprecated. Use `onRemoteAudioSettingsChanged` Instead.
    * `DirectCall.mute` is deprecated. Use `muteMicrophone` Instead.
    * `DirectCall.unmute` is deprecated. Use `unmuteMicrophone` Instead.
* Min / max of the `limit` field for `SendBirdCall.createDirectCallLogListQuery` parameter has been adjusted to 10 / 100 each.
* `DirectCall.onRemoteAudioSettingsChanged / onRemoteAudioEnabled` is not fired anymore when actual setting is not changed.


### 0.6.6 (Jan 22, 2020)
* Call is automatically disconnected after certain time (currently 1 min) when one peer leaves call session without explicitly hanging up.
* Removed redundant deprecation warning in `callOption`.


### 0.6.5 (Jan 8, 2020)
* Changed some parameters names of `callOption`.
    * `callOption.localVideoView` and `callOption.remoteVideoView` is now deprecated.
    * `localVideoView` -> `localMediaView`
    * `remoteVideoView` -> `remoteMediaView`

### 0.6.4 (Jan 2, 2020)
* Fixed call.getDuration()

### 0.6.3 (Dec 26, 2019)
* Fixed connection for FireFox, exported LoggerLevel enum

### 0.6.2 (Dec 20, 2019)
* Fixed logger, polyfill

### 0.6.1 (Dec 20, 2019)
* Removed core-js dependency
