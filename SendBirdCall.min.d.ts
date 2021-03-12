/** 1.5.4 */

// eslint-disable-next-line no-undef
export as namespace SendBirdCall;

export function init(appId: string): void;
export function authenticate(authOption: AuthOption, handler?: AuthHandler): Promise<User>;
export function deauthenticate(): void;
export function connectWebSocket(): Promise<void>;
export function addListener(id: string, listener: SendBirdCallListener): void;
export function removeListener(id: string): void;
export function removeAllListeners(): void;
export function addRecordingListener(id: string, listener: SendBirdCallRecordingListener): void;
export function removeRecordingListener(id: string): void;
export function removeAllRecordingListeners(): void;
export function dial(params: DialParams, callback?: DialHandler): DirectCall;
export function createDirectCallLogListQuery(params?: DirectCallLogListQueryParams): DirectCallLogListQuery;
export function getCurrentAudioInputDevice(): InputDeviceInfo;
export function getAvailableAudioInputDevices(): InputDeviceInfo[];
export function selectAudioInputDevice(mediaDeviceInfo: InputDeviceInfo): void;
export function getCurrentAudioOutputDevice(): MediaDeviceInfo;
export function getAvailableAudioOutputDevices(): MediaDeviceInfo[];
export function selectAudioOutputDevice(mediaDeviceInfo: MediaDeviceInfo): void;
export function getCurrentVideoInputDevice(): InputDeviceInfo;
export function getAvailableVideoInputDevices(): InputDeviceInfo[];
export function selectVideoInputDevice(mediaDeviceInfo: InputDeviceInfo): void;
export function updateMediaDevices(constraints: { audio: boolean; video: boolean }): void;
export function useMedia(constraints: { audio: boolean; video: boolean }): MediaAccess | undefined;
export function updateCustomItems(callId: string, customItems: CustomItems, callback?: CustomItemsHandler): Promise<CustomItemsResult>;
export function deleteCustomItems(callId: string, customItemKeys: string[], callback?: CustomItemsHandler): Promise<CustomItemsResult>;
export function deleteAllCustomItems(callId: string, callback?: CustomItemsHandler): Promise<CustomItemsResult>;
export function setLoggerLevel(level: LoggerLevel): LoggerLevel;
export function getOngoingCallCount(): number;
export function setRingingTimeout(timeout: number): void;
export function setCallConnectionTimeout(timeout: number): void;
export function handleWebhookData(data: WebhookData): void;
export function addDirectCallSound(type: SoundType, url: string): Promise<boolean>;
export function removeDirectCallSound(type: SoundType): boolean;
export function getCall(callId: string): DirectCall;
export const sdkVersion: string;
export const appId: string;
export const currentUser: User;

export interface DialParams {
  userId: string;
  isVideoCall: boolean;
  callOption: DirectCallOption;
  customItems?: CustomItems;
  sendBirdChatOptions?: SendBirdChatOptions;
}

export interface AcceptParams {
  callOption: DirectCallOption;
}

export enum LoggerLevel {
  NONE = 'NONE',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO'
}

export enum SoundType {
  DIALING = 'DIALING',
  RINGING = 'RINGING',
  RECONNECTING = 'RECONNECTING',
  RECONNECTED = 'RECONNECTED',
}

export enum DirectCallUserRole {
  CALLER = 'dc_caller',
  CALLEE = 'dc_callee'
}

export enum DirectCallEndResult {
  NO_ANSWER = 'no_answer',
  CANCELED = 'canceled',
  DECLINED = 'declined',
  OTHER_DEVICE_ACCEPTED = 'other_device_accepted',
  COMPLETED = 'completed',
  CONNECTION_LOST = 'connection_lost',
  TIMED_OUT = 'timed_out',
  DIAL_FAILED = 'dial_failed',
  ACCEPT_FAILED = 'accept_failed',
  UNKNOWN = 'unknown'
}

export enum ErrorCode {
  // Call
  DIAL_CANCELED= 1800100,
  MY_USER_ID_NOT_ALLOWED= 1800101,

  // Client
  ERR_REQUEST_FAILED= 1800200,
  WS_NOT_CONNECTED= 1800201,
  WS_CONNECTION_FAILED= 1800202,
  ERR_NO_RESPONSE_DUE_TO_TIMEOUT= 1800203,
  ERR_REQUEST_FAILED_DUE_TO_WEBSOCKET_CONNECTION_LOST= 1800204,
  ERR_WRONG_RESPONSE= 1800205,
  ERR_QUERY_IN_PROGRESS= 1800206,
  INTERNAL_SERVER_ERROR= 1800207,
  ERR_MALFORMED_DATA= 1800208,

  // Error for take snapshot
  ERR_CAPTURE_NOT_ALLOWED_ON_AUDIO_CALL = 1800600,
  ERR_VIDEO_VIEW_NOT_READY = 1800601,
  ERR_VIDEO_CALL_NOT_CONNECTED_YET = 1800602,
  ERR_FAILED_TO_GET_IMAGE_FROM_VIDEO_STREAM = 1800603,

  // General
  INVALID_PARAMETER_VALUE= 1800300,
  INVALID_PARAMETER_TYPE= 1800301,
  INSTANCE_NOT_INITIALIZED= 1800302,
  USER_NOT_AUTHENTICATED= 1800303,

  // Server
  ERR_SERVER_INTERNAL_ERROR= 1400999,
  ERR_INVALID_CALL_STATUS= 1400101,
  ERR_CALL_DOES_NOT_EXIST= 1400102,
  ERR_CALLEE_DOES_NOT_EXIST= 1400103,
  ERR_DIAL_MYSELF= 1400104,
  ERR_NO_PERMISSION= 1400105,
  ERR_CALLEE_NEVER_AUTHENTICATE= 1400106,

  // Recording
  ERR_CALL_NOT_CONNECTED_YET = 1800610,
  ERR_WRONG_RECORDING_TYPE_FOR_AUDIO_CALL = 1800611,
  ERR_RECORDING_ALREADY_IN_PROGRESS = 1800612,
  ERR_FAILED_TO_OPEN_FILE = 1800613,
  ERR_FAILED_TO_START_RECORDING = 1800614,
  ERR_FAILED_TO_STOP_RECORDING = 1800615,
  ERR_NOT_SUPPORTED_BROWSER_FOR_RECORDING = 1800616,
  ERR_INVALID_RECORDING_TYPE = 1800617,
  ERR_NOT_SUPPORTED_OS_VERSION_FOR_RECORDING = 1800618,
}

export interface SendBirdCallListener {
  onRinging: ((directCall: DirectCall) => void) | null;
  onAudioInputDeviceChanged: ((currentAudioInputDevice: InputDeviceInfo, availableAudioInputDevices: InputDeviceInfo[]) => void) | null;
  onAudioOutputDeviceChanged: ((currentAudioOutputDevice: MediaDeviceInfo, availableAudioOutputDevices: MediaDeviceInfo[]) => void) | null;
  onVideoInputDeviceChanged: ((currentVideoInputDevice: InputDeviceInfo, availableVideoInputDevices: InputDeviceInfo[]) => void) | null;
}

export interface SendBirdCallRecordingListener {
  onRecordingSucceeded: ((callId: string, recordingId: string, options: DirectCallRecordOption, fileName?: string) => void) | null;
  onRecordingFailed: ((callId: string, recordingId: string, error) => void) | null;
}

export interface DirectCall {
  onEstablished: ((call: DirectCall) => void) | null;
  onConnected: ((call: DirectCall) => void) | null;
  onReconnected: ((call: DirectCall) => void) | null;
  onReconnecting: ((call: DirectCall) => void) | null;

  onRemoteAudioSettingsChanged: ((call: DirectCall) => void) | null;
  onRemoteVideoSettingsChanged: ((call: DirectCall) => void) | null;
  onCustomItemsUpdated: ((call: DirectCall, updatedKeys: string[]) => void) | null;
  onCustomItemsDeleted: ((call: DirectCall, deletedKeys: string[]) => void) | null;
  onRemoteRecordingStatusChanged: ((call: DirectCall) => void) | null;
  onEnded: ((call: DirectCall) => void) | null;

  onScreenShareStopped: (() => void) | null;

  readonly callId: string;
  readonly caller: DirectCallUser;
  readonly callee: DirectCallUser;
  readonly isVideoCall: boolean;
  readonly localUser: DirectCallUser;
  readonly remoteUser: DirectCallUser;
  readonly isLocalAudioEnabled: boolean;
  readonly isRemoteAudioEnabled: boolean;
  readonly isLocalVideoEnabled: boolean;
  readonly isRemoteVideoEnabled: boolean;
  readonly myRole: DirectCallUserRole;
  readonly isOngoing: boolean;
  readonly endedBy: DirectCallUser;
  readonly isEnded: boolean;
  readonly endResult: DirectCallEndResult;
  readonly callLog: DirectCallLog;
  readonly customItems: CustomItems;
  readonly localRecordingStatus: RecordingStatus;
  readonly remoteRecordingStatus: RecordingStatus;
  readonly localMediaView: HTMLMediaElement;
  readonly remoteMediaView: HTMLMediaElement;
  readonly isLocalScreenShareEnabled: boolean;

  setLocalMediaView(mediaView: HTMLMediaElement): Promise<void>;
  setRemoteMediaView(mediaView: HTMLMediaElement): Promise<void>;

  stopVideo(): void;
  startVideo(): void;

  getDuration(): number;
  accept(params: AcceptParams): void;
  end(): void;

  muteMicrophone(): void;
  unmuteMicrophone(): void;

  captureLocalVideoView(callback?: CaptureVideoViewHandler): Promise<CaptureVideoViewResult>;
  captureRemoteVideoView(callback?: CaptureVideoViewHandler): Promise<CaptureVideoViewResult>;

  updateCustomItems(customItems: CustomItems, callback?: CustomItemsHandler): Promise<CustomItemsResult>;
  deleteCustomItems(customItemsKeys: string[], callback?: CustomItemsHandler): Promise<CustomItemsResult>;
  deleteAllCustomItems(callback?: CustomItemsHandler): Promise<CustomItemsResult>;

  startRecording(options: DirectCallRecordOption): string;
  stopRecording(recordId: string): boolean;

  startScreenShare(): Promise<void>;
  stopScreenShare(): void;
}

export interface DirectCallOption {
  localMediaView?: HTMLMediaElement;
  remoteMediaView?: HTMLMediaElement;
  audioEnabled?: boolean;
  videoEnabled?: boolean;
}

declare const DirectCallOption: {
  new(option: DirectCallOption): DirectCallOption;
};

export interface DirectCallLogListQuery {
  next(callback?: DirectCallLogListQueryResultHandler): Promise<DirectCallLog[]>;
  readonly isLoading: boolean;
  readonly hasNext: boolean;
}

export type DirectCallLogListQueryResultHandler = (callLogs?: DirectCallLog[], error?: Error) => void;

export interface DirectCallLog {
  readonly callId: string;
  readonly userRole: DirectCallUserRole;
  readonly startedAt: Date;
  readonly endedAt: Date;
  readonly endedBy: DirectCallUser;
  readonly duration: number;
  readonly endResult: DirectCallEndResult;
  readonly isVideoCall: boolean;
  readonly customItems: CustomItems;
  readonly isFromServer: boolean;
}

export interface DirectCallUser {
  readonly userId: string;
  readonly nickname: string;
  readonly profileUrl: string;
  readonly metaData: object;
  readonly isActive: boolean;
  readonly role: DirectCallUserRole;
}

export interface AuthOption {
  userId: string;
  accessToken?: string;
}

export type AuthHandler = (user?: User, error?: Error) => void;
export type DialHandler = (call?: DirectCall, error?: Error) => void;
export type CompletionHandler = (error?: Error) => void;
export type CustomItemsHandler = (result?: CustomItemsResult, error?: Error) => void;
export interface CustomItemsResult {
  readonly customItems: CustomItems;
  readonly affectedKeys: string[];
}

export type CaptureVideoViewHandler = (result?: CaptureVideoViewResult, error?: Error) => void;
export interface CaptureVideoViewResult {
  readonly width: number;
  readonly height: number;
  readonly data: string;
}

export interface User {
  readonly userId: string;
  readonly nickname: string;
  readonly profileUrl: string;
  readonly metaData: string;
  readonly isActive: string;
}

export interface DirectCallLogListQueryParams {
  myRole?: DirectCallUserRole;
  endResults?: DirectCallEndResult[];
  limit?: number;
}

export interface CustomItems {
  [key: string]: string;
}

export interface SendBirdChatOptions {
  channelUrl: string;
}

export interface MediaAccess {
  dispose(): void;
}

export interface RecordOption {
  callId: string;
  recordingType: RecordingType;
  fileName?: string;
}

declare const RecordOption: {
  new(option: RecordOption): RecordOption;
};


export interface DirectCallRecordOption extends RecordOption {}

declare const DirectCallRecordOption: {
  new(option: DirectCallRecordOption): DirectCallRecordOption;
};

export enum RecordingType {
  REMOTE_AUDIO_AND_VIDEO = 'remote_audio_and_video',
  REMOTE_AUDIO_ONLY = 'remote_audio_only',
  LOCAL_REMOTE_AUDIOS = 'local_remote_audios',
  LOCAL_AUDIO_REMOTE_AUDIO_AND_VIDEO = 'local_audio_remote_audio_and_video',
  LOCAL_AUDIO_AND_VIDEO_REMOTE_AUDIO = 'local_audio_and_video_remote_audio',
}

export enum RecordingStatus {
  NONE = 'none',
  RECORDING = 'recording',
}

/* eslint-disable babel/camelcase */
export interface WebhookData {
  category: string;
  occured_at: number;
  application_id: string;
  sendbird_call?: {
    version: number;
    message_id: string;
    cmd: string;
    type: string;
    payload: any;
  };
  [key: string]: any;
}
/* eslint-enable babel/camelcase */
