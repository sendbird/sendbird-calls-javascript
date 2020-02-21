# Change Log

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
