/** 0.6.10 */

export as namespace SendBirdCall;

export function init(appId): void;
export function authenticate(authOption: AuthOption, handler?: AuthHandler): Promise<User>;
export function deauthenticate(): void;
export function connectWebSocket(): Promise<void>;
export function addListener(id: string, listener: SendBirdCallListener): void;
export function removeListener(id: string): void;
export function removeAllListeners(): void;
export function dial(userId: string, isVideoCall: false, callOption: DirectCallOption, callback?: DialHandler): DirectCall;
export function createDirectCallLogListQuery(params?: DirectCallLogListQueryParams): DirectCallLogListQuery;
export function setLoggerLevel(level: LoggerLevel);
export function getCall(callId: string): DirectCall;
export const sdkVersion: string;
export const appId: string;
export const currentUser: User;

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
  FAILED_TO_DIAL = 'failed_to_dial',
  FAILED_TO_ACCEPT = 'failed_to_accept',
  UNKNOWN = 'unknown'
}

export interface SendBirdCallListener {
  onRinging: ((directCall: DirectCall) => void) | null;
}

export interface DirectCall {
  onEstablished: ((call: DirectCall) => void) | null;
  onConnected: ((call: DirectCall) => void) | null;

  //deprecated
  onRemoteAudioEnabled: ((call: DirectCall) => void) | null;
  onRemoteAudioSettingsChanged: ((call: DirectCall) => void) | null;
  onEnded: ((call: DirectCall) => void) | null;

  readonly caller: DirectCallUser;
  readonly callee: DirectCallUser;
  readonly isVideoCall: boolean;
  readonly localUser: DirectCallUser;
  readonly remoteUser: DirectCallUser;
  readonly isLocalAudioEnabled: boolean;
  readonly isRemoteAudioEnabled: boolean;
  readonly myRole: DirectCallUserRole;
  readonly endedBy: DirectCallUser;
  readonly endResult: DirectCallEndResult;

  getDuration(): number;
  accept(callOptions: DirectCallOption): void;
  end(): void;

  //deprecated
  mute(): void;

  //deprecated
  unmute(): void;

  muteMicrophone(): void;
  unmuteMicrophone(): void;
}

export interface DirectCallOption {
  localMediaView?: HTMLAudioElement | HTMLVideoElement;
  remoteMediaView?: HTMLAudioElement | HTMLVideoElement;
  localVideoView?: HTMLAudioElement | HTMLVideoElement;
  remoteVideoView?: HTMLAudioElement | HTMLVideoElement;
  audioEnabled?: boolean;
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