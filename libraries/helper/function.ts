import {Address4,Address6} from "ip-address";

/**
 * 延迟指定时间
 * @param millisecond 毫秒
 * @returns void
 */
export const delay = function(millisecond:number) : Promise<void> {
  return new Promise(resolve=>setTimeout(resolve,millisecond));
};

/**
 * 验证路由 target 是否有效
 * @param subnet cidr
 * @returns boolean
 */
export const validateRouteTarget = function(subnet:string) : boolean {
  if(Address6.isValid(subnet)){return new Address6(subnet).subnetMask <= 128;}
  if(Address4.isValid(subnet)){return new Address4(subnet).subnetMask <= 32;}
  return false;
};

/**
 * 验证路由 via 是否有效
 * @param address 单一地址
 * @returns boolean
 */
export const validateRouteVia = function(address:null|string) : boolean {
  if(address===null){return true;}
  if(Address6.isValid(address)){return new Address6(address).subnetMask == 128;}
  if(Address4.isValid(address)){return new Address4(address).subnetMask == 32;}
  return false;
};

/**
 * 验证 IP 地址类型
 * @param address 地址
 * @returns 地址类型
 */
export const validateAddress64 = function(address:string) : 0|4|6 {
  if(Address6.isValid(address)){return 6;}
  if(Address4.isValid(address)){return 4;}
  return 0;
};

/**
 * 从路由产生对应的地址池
 * @param subnet cidr
 * @returns 地址池
 */
export const generateAssignmentPool = function(subnet:string) : null|{ipRangeStart:string,ipRangeEnd:string} {
  if(!validateRouteTarget(subnet)){return null;}
  const assignmentPool:{ipRangeStart:string,ipRangeEnd:string} = {ipRangeStart:'',ipRangeEnd:''};
  let family:number = 0;
  family = Address6.isValid(subnet) ? 6 : family;
  family = Address4.isValid(subnet) ? 4 : family;
  switch(family){
    case 6:
      const address6 = new Address6(subnet);
      assignmentPool.ipRangeStart = address6.startAddressExclusive().address;
      assignmentPool.ipRangeEnd = address6.endAddressExclusive().address;
    break;
    case 4:
      const address4 = new Address4(subnet);
      assignmentPool.ipRangeStart = address4.startAddressExclusive().address;
      assignmentPool.ipRangeEnd = address4.endAddressExclusive().address;
    break;
    default:return null;
  }
  return assignmentPool;
};

/**
 * 从路由数组产生对应的地址池数组
 * @param routeArray 路由数组
 * @returns 地址池数组
 */
export const generateAssignmentPoolArray = function(routeArray:Array<{target:string,via:null|string}>) : Array<{ipRangeStart:string,ipRangeEnd:string}> {
  if(routeArray.length<1){return [];}
  const assignmentPoolArray:Array<{ipRangeStart:string,ipRangeEnd:string}> = [];
  for (const iterator of routeArray) {
    const pool:null|{ipRangeStart:string,ipRangeEnd:string} = generateAssignmentPool(iterator.target);
    if(pool===null){continue;}
    assignmentPoolArray.push(pool);
  }
  return assignmentPoolArray;
};

/**
 * 生成 zerotier RFC4193 地址
 * @param networkId 网络 id
 * @param address 客户端 zerotier 地址（zerotier-cli info）
 * @returns IPv6 地址
 */
export const generateZerotierRFC4193 = function(networkId:string,clientAddress:string='__________') : string {
  const format:string = `fd${networkId}9993${clientAddress}`.replace(/(.{4})/gi,'$1:');
  return format.length===39 ? format : format.slice(0,-1);
};

/**
 * 生成 zerotier 6PLANE 地址
 * @param networkId 网络 id
 * @param address 客户端 zerotier 地址（zerotier-cli info）
 * @returns IPv6 地址
 * @link https://zerotier.atlassian.net/wiki/spaces/SD/pages/7274520/Using+NDP+Emulated+6PLANE+Addressing+With+Docker
 */
export const generateZerotier6PLANE = function(networkId:string,clientAddress:string='__________') : string {
  const networkIdByteArray:Array<string> = networkId.match(/.{2}/g) || [];
  if(networkIdByteArray.length!==8){return '';}
  const networkIdNumberArray:Array<number> = networkIdByteArray.map(item=>parseInt(item,16));
  const hexNumberArray:Array<number> = [
    networkIdNumberArray[0] ^ networkIdNumberArray[4],
    networkIdNumberArray[1] ^ networkIdNumberArray[5],
    networkIdNumberArray[2] ^ networkIdNumberArray[6],
    networkIdNumberArray[3] ^ networkIdNumberArray[7]
  ];
  const hex:string = hexNumberArray.map(item=>item.toString(16).padStart(2,'0')).join('');
  const format:string = `fc${hex}${clientAddress}000000000001`.replace(/(.{4})/gi,'$1:');
  return format.length===39 ? format : format.slice(0,-1);
};
