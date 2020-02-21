# Change Log

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
