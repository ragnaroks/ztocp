import useSWRMutation from 'swr/mutation';
import type {SWRMutationResponse} from 'swr/mutation';

const defaultNetwork:ZerotierOneNetworkPatch = {
  name:'network-'+Date.now().toString(),
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

async function fetchAsync(key:{url:string}) : Promise<ZerotierOneNetwork> {
  let response:Response|null = null;
  try{
    response = await fetch(key.url,{method:'POST',mode:'same-origin',body:JSON.stringify(defaultNetwork)});
  }catch(exception:unknown){
    console.warn(exception);
    throw '网络请求错误';
  }
  if(!response.ok){throw '网络请求错误（'+response.status+'）';}
  let data:ZerotierOneNetwork|null = null;
  try{
    data = await response.json() as unknown as ZerotierOneNetwork;
  }catch(exception:unknown){
    console.warn(exception);
    throw '数据解析错误';
  }
  return data;
};

function usePostZerotierControllerNetworkCreate(address?:string) : SWRMutationResponse<ZerotierOneNetwork,string,undefined|{url:string}> {
  const key:undefined|{url:string} = address ? {url:'/zerotier/controller/network/'+address+'______'} : undefined;
  return useSWRMutation<ZerotierOneNetwork,string,undefined|{url:string}>(key,fetchAsync);
};

export default usePostZerotierControllerNetworkCreate;
