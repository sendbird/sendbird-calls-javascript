/** 1.9.3 */
// eslint-disable-next-line no-undef,max-classes-per-file
export as namespace SendBirdCall;

export function init(appId: string, apiHost?: string, websocketHost?: string): void;
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
export function getOngoingCalls(): DirectCall[];
export function getOngoingCallCount(): number;
export function setRingingTimeout(timeout: number): void;
export function setCallConnectionTimeout(timeout: number): void;
export function handleWebhookData(data: WebhookData): void;
export function addDirectCallSound(type: SoundType, url: string): Promise<boolean>;
export function removeDirectCallSound(type: SoundType): boolean;
export function getCall(callId: string): DirectCall;
export function createRoom(params: RoomParams): Promise<Room>;
export function getCachedRoomById(roomId: string): Room;
export function fetchRoomById(roomId: string): Promise<Room>;
export function createRoomListQuery(params: RoomListQueryParams): RoomListQuery;
export function registerPushToken(pushToken: string, tokenType: TokenType): Promise<void>;
export function unregisterPushToken(pushToken: string, tokenType: TokenType): Promise<void>;
export function unregisterAllPushTokens(tokenType: TokenType): Promise<void>;
export const sdkVersion: string;
export const appId: string;
export const currentUser: User;

export interface DialParams {
  userId: string;
  isVideoCall: boolean;
  callOption: DirectCallOption;
  customItems?: CustomItems;
  sendBirdChatOptions?: SendBirdChatOptions;
  holdActiveCall?: boolean;
}

export interface AcceptParams {
  callOption: DirectCallOption;
  holdActiveCall?: boolean;
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

export enum TokenType {
  APNS = 'apns_voip',
  FCM = 'fcm_voip',
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

  // Room
  ERR_PARTICIPANT_ALREADY_IN_ROOM = 1800700,
  ERR_ENTERING_ROOM_STILL_IN_PROGRESS = 1800701,
  ERR_PARTICIPANT_NOT_IN_ROOM = 1800702,
  ERR_EXITING_ROOM_STILL_IN_PROGRESS = 1800703,
  ERR_FAILED_TO_ESTABLISH_CONNECTION_TO_SEND_STREAM = 1800704,
  ERR_FAILED_TO_ESTABLISH_CONNECTION_TO_RECEIVE_STREAM = 1800705,
  ERR_LOCAL_PARTICIPANT_LOST_CONNECTION = 1800706,

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

  // screen share
  ERR_SCREEN_SHARE_RESTRICTED_FROM_AUDIO_CALL = 1800620,
  ERR_SCREEN_SHARE_REQUEST_BEFORE_CALL_IS_CONNECTED = 1800621,
  ERR_SCREEN_SHARE_ALREADY_IN_PROGRESS = 1800622,
  ERR_NO_SCREEN_SHARE_EXISTS = 1800623,
  ERR_NOT_SUPPORTED_BROWSER_FOR_SCREEN_SHARE = 1800625,
  ERR_SCREEN_SHARE_FAILED_DUE_TO_UNKNOWN_REASON = 1800626,
  ERR_NOT_SUPPORTED_APP_STATE_FOR_SCREEN_SHARE = 1800627,
  ERR_PERMISSION_DENIED_FOR_SCREEN_SHARE = 1800628,
  ERR_SELECTED_CONTENT_NOT_EXIST = 1800629,
  ERR_SELECTED_CONTENT_INACCESSIBLE = 1800630,

}

export interface SendBirdCallListener {
  onRinging?: ((directCall: DirectCall) => void) | null;
  onAudioInputDeviceChanged?: ((currentAudioInputDevice: InputDeviceInfo, availableAudioInputDevices: InputDeviceInfo[]) => void) | null;
  onAudioOutputDeviceChanged?: ((currentAudioOutputDevice: MediaDeviceInfo, availableAudioOutputDevices: MediaDeviceInfo[]) => void) | null;
  onVideoInputDeviceChanged?: ((currentVideoInputDevice: InputDeviceInfo, availableVideoInputDevices: InputDeviceInfo[]) => void) | null;
}

export interface SendBirdCallRecordingListener {
  onRecordingSucceeded: ((callId: string, recordingId: string, options: DirectCallRecordOption, fileName?: string) => void) | null;
  onRecordingFailed: ((callId: string, recordingId: string, error) => void) | null;
}

/**
 * Event Target
 */

interface Event {
  readonly args?: any[];
}

declare type nullish = null | undefined;

declare type ArgsType<T extends Event> = T['args'] extends nullish ? [] : T['args'];

interface EventListener<T extends Event> {
  (...args: ArgsType<T>): void;
}

declare type EventMap = Record<string, Event>;

declare type EventKey<T extends EventMap> = keyof T;

declare class EventTarget<T extends EventMap> {

  /**
   * Adds a listener to receive events.
   */
  addEventListener<K extends EventKey<T>>(type: K, callback: EventListener<T[K]>): void;

  /**
   * Alias for addEventListener
   */
  on: <K extends keyof T>(type: K, callback: EventListener<T[K]>) => void;

  /**
   * Adds listener to receive events once.
   */
  once<K extends EventKey<T>>(type: K, givenCb: EventListener<T[K]>): void;

  /**
   * Removes an added listener.
   */
  removeEventListener<K extends EventKey<T>>(type: K, callback: EventListener<T[K]>): void;

  /**
   * Alias for removeEventListener
   */
  off: <K extends keyof T>(type: K, callback: EventListener<T[K]>) => void;

  /**
   * Removes all added listeners.
   */
  removeAllEventListeners(): void;

}

/**
 * DirectCall
 */

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
  onUserHoldStatusChanged: ((call: DirectCall, isLocalUser: boolean, isUserOnHold: boolean) => void) | null;
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
  readonly isOnHold: boolean;
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

  hold(): Promise<void>;
  unhold(force: boolean): Promise<void>;

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

export interface RoomListQuery {
  prev(): Promise<Room[]>;
  next(): Promise<Room[]>;
  readonly isLoading: boolean;
  readonly hasPrev: boolean;
  readonly hasNext: boolean;
}

export interface DirectCallLogListQueryParams {
  myRole?: DirectCallUserRole;
  endResults?: DirectCallEndResult[];
  limit?: number;
}

export interface RoomListQueryParams {
  type?: RoomType | 'all'
  limit?: number;
  state?: RoomState;
  currentParticipantCount?: [number | undefined, number | undefined];
  createdByUserIds?: string[]
  roomIds?: string[]
  createdAt?: [number | undefined, number | undefined];
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


/**
 * Room
 */

declare type RoomEventMap = {
  remoteParticipantEntered: { args: [RemoteParticipant]; };
  remoteParticipantExited: { args: [RemoteParticipant]; };
  remoteParticipantStreamStarted: { args: [RemoteParticipant]; };
  remoteAudioSettingsChanged: { args: [RemoteParticipant]; };
  remoteVideoSettingsChanged: { args: [RemoteParticipant]; };
  customItemsUpdated: { args: [CustomItems, string[]] };
  customItemsDeleted: { args: [CustomItems, string[]] };
  deleted: {};
  error: { args: [Error, Participant?] };
};

/**
 * Called when remote participant has been entered
 */
export type RemoteParticipantEnteredEventListener = (participant: RemoteParticipant) => void;
/**
 * Called when remote participant has been exited
 */
export type RemoteParticipantExitedEventListener = (participant: RemoteParticipant) => void;
/**
 * Called when it's able to receive media stream from remote participant.
 */
export type RemoteParticipantStreamStartedEventListener = (participant: RemoteParticipant) => void;
/**
 * Called when audio settings of remote participant has been changed
 */
export type RemoteAudioSettingsChangedEventListener = (participant: RemoteParticipant) => void;
/**
 * Called when video settings of remote participant has been changed.
 */
export type RemoteVideoSettingsChangedEventListener = (participant: RemoteParticipant) => void;

export enum RoomType {
  /**
   * Type of a room that supports audio and video, can have up to 6 participants.
   */
  LARGE_ROOM_FOR_AUDIO_ONLY = 'large_room_for_audio_only',
  /**
   * Type of a room that only supports audio and can have up to 20 participants.
   */
  SMALL_ROOM_FOR_VIDEO = 'small_room_for_video',
}

export enum RoomState {
  /**
   * Indicates a room is open and available for group calls.
   */
  OPEN = 'open',
  /**
   * Indicates a room is deleted.
   */
  DELETED = 'deleted',
}

export declare class Room extends EventTarget<RoomEventMap> {

  /**
   * The ID of room
   */
  readonly roomId: string;

  /**
   * The state of room
   */
  readonly state: RoomState;

  /**
   * The customItems of room
   */
  customItems: CustomItems;

  /**
   * Room type
   */
  readonly roomType: RoomType;

  /**
   * Long value of the date when the room created at.
   */
  readonly createdAt: number;

  /**
   * The ID of user who created the room
   */
  readonly createdBy: string;

  /**
   * The list of all participants including local participant.
   */
  readonly participants: Participant[];

  /**
   * The local participant.
   */
  readonly localParticipant: LocalParticipant;

  /**
   * The list of remote participants.
   */
  readonly remoteParticipants: RemoteParticipant[];

  /**
   * Enters a room
   */
  enter(params: EnterParams): Promise<void>;

  /**
   * Exits a room
   */
  exit(): void;

  /**
   * Sets audio for a large room
   */
  setAudioForLargeRoom(mediaView: HTMLAudioElement): Promise<void>;

  /**
   * Fetch custom items
   */
  fetchCustomItems(): Promise<CustomItemsResult>;

  /**
   * Update custom items
   */
  updateCustomItems(customItems: CustomItems): Promise<CustomItemsResult>;

  /**
   * Delete custom items
   */
  deleteCustomItems(customItemKeys: string[]): Promise<CustomItemsResult>;

}

export type RoomParams = {
  /**
   * An enum that represents different types of a room.
   */
  roomType: RoomType;
  /**
   * The custom items of room
   */
  customItems?: CustomItems;
}

/**
 * A class that provides the methods to enable audio and video settings.
 */
export interface EnterParams {
  /**
   * Enables a participant's audio settings when entering a room.
   */
  audioEnabled: boolean;
  /**
   * Enables a participant's video settings when entering a room.
   */
  videoEnabled: boolean;
}

export enum ParticipantState {
  /**
   * The state when the participant has entered room
   */
  ENTERED = 'entered',
  /**
   * The state when the participant has been connected.
   */
  CONNECTED = 'connected',
  /**
   * The state when the participant has exit room
   */
  EXITED = 'exited',
}

export interface Participant {
  /**
   * A unique identifier for a participant in a room.
   */
  participantId: string;

  /**
   * The timestamp of when the participant enters the room, in Unix milliseconds.
   */
  enteredAt: number;

  /**
   * The timestamp of when the participant information was updated within the room, in Unix milliseconds.
   */
  updatedAt: number;

  /**
   * The timestamp of when the participant exited the room, in Unix milliseconds.
   */
  exitedAt?: number;

  /**
   * The period from the time when the participant entered the room to the time the participant left the room, measured in seconds.
   */
  duration?: number;

  /**
   * The state of the participant. Valid values are entered, exited, and connected.
   */
  state: ParticipantState;

  /**
   * Indicates a user in Calls who corresponds to the participant.
   */
  user: User;

  /**
   * Indicates whether the participant has enabled their audio.
   */
  isAudioEnabled: boolean;

  /**
   * Indicates whether the participant has enabled their video.
   */
  isVideoEnabled: boolean;

  setMediaView(mediaView: HTMLMediaElement): Promise<void>;
}

export interface LocalParticipant extends Participant {
  readonly isLocalParticipant: true;

  /**
   * Alias for setMediaView
   */
  setLocalMediaView(mediaView: HTMLMediaElement): Promise<void>;

  /**
   * Stop the local audio.
   */
  muteMicrophone(): void;
  /**
   * Start the local audio.
   */
  unmuteMicrophone(): void;

  /**
   * Start the local video.
   */
  stopVideo(): void;

  /**
   * Stop the local video.
   */
  startVideo(): void;

}

export interface RemoteParticipant extends Participant {
  readonly isLocalParticipant: false;
}
