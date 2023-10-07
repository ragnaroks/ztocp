const defaultNetwork:ZerotierOneNetworkPatch = {
  name:'network',
  private:true,
  rules:[
    {"etherType": 2048,"not": true,"or": false,"type": "MATCH_ETHERTYPE"},
    {"etherType": 2054,"not": true,"or": false,"type": "MATCH_ETHERTYPE"},
    {"etherType": 34525,"not": true,"or": false,"type": "MATCH_ETHERTYPE"},
    {"type": "ACTION_DROP"},
    {"type": "ACTION_ACCEPT"}
  ],
  dns:{domain:'',servers:[]},
  mtu:2800,
  multicastLimit:32,
  enableBroadcast:true,
  routes:[
    {target:"192.168.144.0/24",via:null},
    {target:"fdff::ffff:7e00:9000/120",via:null}
  ],
  ipAssignmentPools:[
    {ipRangeStart:"192.168.144.1",ipRangeEnd:"192.168.144.254"},
    {ipRangeStart:"fdff::ffff:7e00:9001",ipRangeEnd:"fdff::ffff:7e00:90fe"},
  ],
  v4AssignMode:{zt:false},
  v6AssignMode:{zt:false,rfc4193:false,'6plane':false}
};

export async function GetZerotierOneStatus() : Promise<{data:null|ZerotierOneStatus,error:string}> {
  let response:Response|null = null;
  try{
    response = await fetch(`${process.env.ZEROTIER_ONE_ENDPOINT}/status`,{method:'GET',mode:'same-origin',cache:'no-cache',headers:{'X-ZT1-AUTH':process.env.ZEROTIER_ONE_AUTHTOKEN||''}});
  }catch(exception:unknown){
    return {data:null,error:'网络请求错误'};
  }
  if(!response.ok){return {data:null,error:'网络请求错误（'+response.status+'）'};}
  let data:ZerotierOneStatus|null = null;
  try{
    data = await response.json() as unknown as ZerotierOneStatus;
  }catch(exception:unknown){
    return {data:null,error:'数据解析错误'};
  }
  return {data:data,error:''};
};

export async function GetZerotierOneNetworkList() : Promise<{data:Array<string>,error:string}> {
  let response:Response|null = null;
  try{
    response = await fetch(`${process.env.ZEROTIER_ONE_ENDPOINT}/controller/network`,{method:'GET',mode:'same-origin',cache:'no-cache',headers:{'X-ZT1-AUTH':process.env.ZEROTIER_ONE_AUTHTOKEN||''}});
  }catch(exception:unknown){
    return {data:[],error:'网络请求错误'};
  }
  if(!response.ok){return {data:[],error:'网络请求错误（'+response.status+'）'};}
  let data:Array<string>|null = null;
  try{
    data = await response.json() as unknown as Array<string>;
  }catch(exception:unknown){
    return {data:[],error:'数据解析错误'};
  }
  return {data:data,error:''};
};

export async function PostZerotierOneNetworkCreate(address:string,name:string) : Promise<{data:null|ZerotierOneNetwork,error:string}> {
  const body:string = JSON.stringify({...defaultNetwork,name:name});
  let response:Response|null = null;
  try{
    response = await fetch(`${process.env.ZEROTIER_ONE_ENDPOINT}/controller/network/${address}______`,{method:'POST',mode:'same-origin',cache:'no-cache',headers:{'X-ZT1-AUTH':process.env.ZEROTIER_ONE_AUTHTOKEN||''},body:body});
  }catch(exception:unknown){
    return {data:null,error:'网络请求错误'};
  }
  if(!response.ok){return {data:null,error:'网络请求错误（'+response.status+'）'};}
  let data:ZerotierOneNetwork|null = null;
  try{
    data = await response.json() as unknown as ZerotierOneNetwork;
  }catch(exception:unknown){
    return {data:null,error:'数据解析错误'};
  }
  return {data:data,error:''};
};

export async function GetZerotierOneNetwork(networkId:string) : Promise<{data:null|ZerotierOneNetwork,error:string}> {
  let response:Response|null = null;
  try{
    response = await fetch(`${process.env.ZEROTIER_ONE_ENDPOINT}/controller/network/${networkId}`,{method:'GET',mode:'same-origin',cache:'no-cache',headers:{'X-ZT1-AUTH':process.env.ZEROTIER_ONE_AUTHTOKEN||''}});
  }catch(exception:unknown){
    return {data:null,error:'网络请求错误'};
  }
  if(!response.ok){return {data:null,error:'网络请求错误（'+response.status+'）'};}
  let data:ZerotierOneNetwork|null = null;
  try{
    data = await response.json() as unknown as ZerotierOneNetwork;
  }catch(exception:unknown){
    return {data:null,error:'数据解析错误'};
  }
  return {data:data,error:''};
};

export async function DeleteZerotierOneNetwork(networkId:string) : Promise<{data:null|ZerotierOneNetwork,error:string}> {
  let response:Response|null = null;
  try{
    response = await fetch(`${process.env.ZEROTIER_ONE_ENDPOINT}/controller/network/${networkId}`,{method:'DELETE',mode:'same-origin',cache:'no-cache',headers:{'X-ZT1-AUTH':process.env.ZEROTIER_ONE_AUTHTOKEN||''}});
  }catch(exception:unknown){
    return {data:null,error:'网络请求错误'};
  }
  if(!response.ok){return {data:null,error:'网络请求错误（'+response.status+'）'};}
  let data:ZerotierOneNetwork|null = null;
  try{
    data = await response.json() as unknown as ZerotierOneNetwork;
  }catch(exception:unknown){
    return {data:null,error:'数据解析错误'};
  }
  return {data:data,error:''};
};

export async function GetZerotierOneNetworkMemberList(networkId:string) : Promise<{data:null|Array<{memberAddress:string,memberRevisionCounter:number}>,error:string}> {
  let response:Response|null = null;
  try{
    response = await fetch(`${process.env.ZEROTIER_ONE_ENDPOINT}/controller/network/${networkId}/member`,{method:'GET',mode:'same-origin',cache:'no-cache',headers:{'X-ZT1-AUTH':process.env.ZEROTIER_ONE_AUTHTOKEN||''}});
  }catch(exception:unknown){
    return {data:null,error:'网络请求错误'};
  }
  if(!response.ok){return {data:null,error:'网络请求错误（'+response.status+'）'};}
  let data:null|{[key:string]:number} = null;
  try{
    data = await response.json() as unknown as {[key:string]:number};
  }catch(exception:unknown){
    return {data:null,error:'数据解析错误'};
  }
  const array:Array<{memberAddress:string,memberRevisionCounter:number}> = [];
  const keys:Array<string> = Object.keys(data);
  for (const key of keys) {
    if(!key){continue;}
    array.push({memberAddress:key,memberRevisionCounter:data[key]});
  }
  return {data:array,error:''};
};

export async function GetZerotierOneNetworkMember(networkId:string,memberAddress:string) : Promise<{data:null|ZerotierOneMember,error:string}> {
  let response:Response|null = null;
  try{
    response = await fetch(`${process.env.ZEROTIER_ONE_ENDPOINT}/controller/network/${networkId}/member/${memberAddress}`,{method:'GET',mode:'same-origin',cache:'no-cache',headers:{'X-ZT1-AUTH':process.env.ZEROTIER_ONE_AUTHTOKEN||''}});
  }catch(exception:unknown){
    return {data:null,error:'网络请求错误'};
  }
  if(!response.ok){return {data:null,error:'网络请求错误（'+response.status+'）'};}
  let data:null|ZerotierOneMember = null;
  try{
    data = await response.json() as unknown as ZerotierOneMember;
  }catch(exception:unknown){
    return {data:null,error:'数据解析错误'};
  }
  return {data:data,error:''};
};

export async function DeleteZerotierOneNetworkMember(networkId:string,memberAddress:string) : Promise<{data:null|ZerotierOneMember,error:string}> {
  let response:Response|null = null;
  try{
    response = await fetch(`${process.env.ZEROTIER_ONE_ENDPOINT}/controller/network/${networkId}/member/${memberAddress}`,{method:'DELETE',mode:'same-origin',cache:'no-cache',headers:{'X-ZT1-AUTH':process.env.ZEROTIER_ONE_AUTHTOKEN||''}});
  }catch(exception:unknown){
    return {data:null,error:'网络请求错误'};
  }
  if(!response.ok){return {data:null,error:'网络请求错误（'+response.status+'）'};}
  let data:ZerotierOneMember|null = null;
  try{
    data = await response.json() as unknown as ZerotierOneMember;
  }catch(exception:unknown){
    return {data:null,error:'数据解析错误'};
  }
  return {data:data,error:''};
};

export async function PostZerotierOneNetworkUpdate(networkId:string,patch:ZerotierOneNetworkPatch) : Promise<{data:null|ZerotierOneNetwork,error:string}> {
  let response:Response|null = null;
  try{
    response = await fetch(`${process.env.ZEROTIER_ONE_ENDPOINT}/controller/network/${networkId}`,{method:'POST',mode:'same-origin',cache:'no-cache',headers:{'X-ZT1-AUTH':process.env.ZEROTIER_ONE_AUTHTOKEN||''},body:JSON.stringify(patch)});
  }catch(exception:unknown){
    return {data:null,error:'网络请求错误'};
  }
  if(!response.ok){return {data:null,error:'网络请求错误（'+response.status+'）'};}
  let data:ZerotierOneNetwork|null = null;
  try{
    data = await response.json() as unknown as ZerotierOneNetwork;
  }catch(exception:unknown){
    return {data:null,error:'数据解析错误'};
  }
  return {data:data,error:''};
};

export async function PostZerotierOneNetworkMemberUpdate(networkId:string,memberAddress:string,patch:ZerotierOneMemberPatch) : Promise<{data:null|ZerotierOneMember,error:string}> {
  let response:Response|null = null;
  try{
    response = await fetch(`${process.env.ZEROTIER_ONE_ENDPOINT}/controller/network/${networkId}/member/${memberAddress}`,{method:'POST',mode:'same-origin',cache:'no-cache',headers:{'X-ZT1-AUTH':process.env.ZEROTIER_ONE_AUTHTOKEN||''},body:JSON.stringify(patch)});
  }catch(exception:unknown){
    return {data:null,error:'网络请求错误'};
  }
  if(!response.ok){return {data:null,error:'网络请求错误（'+response.status+'）'};}
  let data:ZerotierOneMember|null = null;
  try{
    data = await response.json() as unknown as ZerotierOneMember;
  }catch(exception:unknown){
    return {data:null,error:'数据解析错误'};
  }
  //console.log(patch,data);
  return {data:data,error:''};
};
