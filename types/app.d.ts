declare type DefaultComponentProps = {className?:string,style?:import('react').CSSProperties};

declare type DefaultContainerProps = {children?:import('react').ReactNode};

declare type DefaultPageProps = {
  params:{slug:string},
  searchParams:{[key:string]:string|undefined}
};

declare type ZerotierOneStatus = {
  address:string,
  clock:number,
  config:{
    settings:{
      allowTcpFallbackRelay:boolean,
      forceTcpRelay:boolean,
      listeningOn:Array<string>,
      portMappingEnabled:boolean,
      primaryPort:number,
      secondaryPort:number,
      softwareUpdate:string,
      softwareUpdateChannel:string,
      surfaceAddresses:Array<string>,
      tertiaryPort:number
    }
  },
  online:boolean,
  planetWorldId:number,
  planetWorldTimestamp:number,
  publicIdentity:string,
  tcpFallbackActive:boolean,
  version:string,
  versionBuild:number,
  versionMajor:number,
  versionMinor:number,
  versionRev:number
};

declare type ZerotierOneNetwork = {
  authTokens:null|Array<unknown>,
  authorizationEndpoint:string,
  capabilities:Array<object>,
  clientId:string,
  creationTime:number,
  dns:{domain:string,servers:Array<string>},
  enableBroadcast:boolean,
  id:string,
  ipAssignmentPools:Array<{ipRangeStart:string,ipRangeEnd:string}>,
  mtu:number,
  multicastLimit:number,
  name:string,
  nwid:string,
  objtype:string,
  private:boolean,
  remoteTraceLevel:number
  remoteTraceTarget:null|string,
  revision:number,
  routes:Array<{target:string,via:null|string}>,
  rules:Array<{type:string,etherType?:number,not?:boolean,or?:boolean}>,
  rulesSource:string,
  ssoEnabled:boolean,
  tags:Array<unknown>,
  v4AssignMode:{zt:boolean},
  v6AssignMode:{'6plane':boolean,rfc4193:boolean,zt:boolean}
};

declare type ZerotierOneNetworkPatch = {
  authTokens?:null|Array<unknown>,
  authorizationEndpoint?:string,
  capabilities?:Array<object>,
  clientId?:string,
  creationTime?:number,
  dns?:{domain:string,servers:Array<string>},
  enableBroadcast?:boolean,
  id?:string,
  ipAssignmentPools?:Array<{ipRangeStart:string,ipRangeEnd:string}>,
  mtu?:number,
  multicastLimit?:number,
  name?:string,
  nwid?:string,
  objtype?:string,
  private?:boolean,
  remoteTraceLevel?:number
  remoteTraceTarget?:null|string,
  revision?:number,
  routes?:Array<{target:string,via:null|string}>,
  rules?:Array<{type:string,etherType?:number,not?:boolean,or?:boolean}>,
  rulesSource?:string,
  ssoEnabled?:boolean,
  tags?:Array<unknown>,
  v4AssignMode?:{zt?:boolean},
  v6AssignMode?:{'6plane'?:boolean,rfc4193?:boolean,zt?:boolean}
};

declare type ZerotierOneMember = {
  activeBridge:boolean,
  address:string,
  authenticationExpiryTime:number,
  authorized:boolean,
  capabilities:Array<unknown>,
  creationTime:number,
  id:string,
  identity:string,
  ipAssignments:Array<string>,
  lastAuthorizedCredential:null|unknown,
  lastAuthorizedCredentialType:null|unknown,
  lastAuthorizedTime:number,
  lastDeauthorizedTime:number,
  noAutoAssignIps:boolean,
  nwid:string,
  objtype:string,
  remoteTraceLevel:number,
  remoteTraceTarget:null|unknown,
  revision:number,
  ssoExempt:boolean,
  tags:Array<unknown>,
  vMajor:number,
  vMinor:number,
  vProto:number,
  vRev:number
};

declare type ZerotierOneMemberPatch = {
  activeBridge?:boolean,
  address?:string,
  authenticationExpiryTime?:number,
  authorized?:boolean,
  capabilities?:Array<unknown>,
  creationTime?:number,
  id?:string,
  identity?:string,
  ipAssignments?:Array<string>,
  lastAuthorizedCredential?:null|unknown,
  lastAuthorizedCredentialType?:null|unknown,
  lastAuthorizedTime?:number,
  lastDeauthorizedTime?:number,
  noAutoAssignIps?:boolean,
  nwid?:string,
  objtype?:string,
  remoteTraceLevel?:number,
  remoteTraceTarget?:null|unknown,
  revision?:number,
  ssoExempt?:boolean,
  tags?:Array<unknown>,
  vMajor?:number,
  vMinor?:number,
  vProto?:number,
  vRev?:number
};
