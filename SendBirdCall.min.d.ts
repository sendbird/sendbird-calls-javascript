/** 1.0.1 */

export as namespace SendBirdCall;

export function init(appId): void;
export function authenticate(authOption: AuthOption, handler?: AuthHandler): Promise<User>;
export function deauthenticate(): void;
export function connectWebSocket(): Promise<void>;
export function addListener(id: string, listener: SendBirdCallListener): void;
export function removeListener(id: string): void;
export function removeAllListeners(): void;
export function dial(params: DialParams, callback?: DialHandler): DirectCall;
export function createDirectCallLogListQuery(params?: DirectCallLogListQueryParams): DirectCallLogListQuery;
export function getCurrentAudioInputDevice(): MediaDeviceInfo;
export function getAvailableAudioInputDevices(): MediaDeviceInfo[];
export function selectAudioInputDevice(mediaDeviceInfo: MediaDeviceInfo): void;
export function getCurrentAudioOutputDevice(): MediaDeviceInfo;
export function getAvailableAudioOutputDevices(): MediaDeviceInfo[];
export function selectAudioOutputDevice(mediaDeviceInfo: MediaDeviceInfo): void;
export function getCurrentVideoInputDevice(): MediaDeviceInfo;
export function getAvailableVideoInputDevices(): MediaDeviceInfo[];
export function selectVideoInputDevice(mediaDeviceInfo: MediaDeviceInfo): void;
export function updateMediaDevices(constraints: { audio: boolean; video: boolean }): void;
export function useMedia(constraints: { audio: boolean; video: boolean }): MediaAccess;
export function updateCustomItems(callId: string, customItems: CustomItems, callback?: CustomItemsHandler): Promise<CustomItemsResult>;
export function deleteCustomItems(callId: string, customItemKeys: string[], callback?: CustomItemsHandler): Promise<CustomItemsResult>;
export function deleteAllCustomItems(callId: string, callback?: CustomItemsHandler): Promise<CustomItemsResult>;
export function setLoggerLevel(level: LoggerLevel);
export function getCall(callId: string): DirectCall;
export const sdkVersion: string;
export const appId: string;
export const currentUser: User;

export interface DialParams {
  userId: string;
  isVideoCall: boolean;
  callOption: DirectCallOption;
  customItems?: CustomItems;
}

export interface AcceptParams {
  callOption: DirectCallOption;
}

export enum LoggerLevel {
  NONE = 'NONE',
  ERROR = 'ERROR'
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

export interface SendBirdCallListener {
  onRinging: ((directCall: DirectCall) => void) | null;
  onAudioInputDeviceChanged: ((currentAudioInputDevice: MediaDeviceInfo, availableAudioInputDevices: MediaDeviceInfo[]) => void) | null;
  onAudioOutputDeviceChanged: ((currentAudioOutputDevice: MediaDeviceInfo, availableAudioOutputDevices: MediaDeviceInfo[]) => void) | null;
  onVideoInputDeviceChanged: ((currentVideoInputDevice: MediaDeviceInfo, availableVideoInputDevices: MediaDeviceInfo[]) => void) | null;
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
  onEnded: ((call: DirectCall) => void) | null;

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
  readonly endedBy: DirectCallUser;
  readonly isEnded: boolean;
  readonly endResult: DirectCallEndResult;
  readonly customItems: CustomItems;
  readonly localMediaView: HTMLMediaElement;
  readonly remoteMediaView: HTMLMediaElement;

  setLocalMediaView(): Promise<void>;
  setRemoteMediaView(): Promise<void>;

  stopVideo(): void;
  startVideo(): void;

  getDuration(): number;
  accept(params: AcceptParams): void;
  end(): void;

  muteMicrophone(): void;
  unmuteMicrophone(): void;

  updateCustomItems(customItems: CustomItems, callback?: CustomItemsHandler): Promise<CustomItemsResult>;
  deleteCustomItems(customItemsKeys: string[], callback?: CustomItemsHandler): Promise<CustomItemsResult>;
  deleteAllCustomItems(callback?: CustomItemsHandler): Promise<CustomItemsResult>;
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

export interface MediaAccess {
  dispose(): void;
}