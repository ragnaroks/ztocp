import useSWR from 'swr/mutation';
import {SWRMutationResponse} from 'swr/mutation';
import {delay} from '../libraries/helper/function';

const fetchAsync = async function(key:{url:string},extra:{arg:ZerotierOneNetworkPatch}) : Promise<ZerotierOneNetwork> {
  await delay(500);
  let response:Response|null = null;
  try{
    response = await fetch(key.url,{method:'POST',mode:'same-origin',body:JSON.stringify(extra.arg)});
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

const usePostZerotierControllerNetworkUpdate = function(networkId:null|string) : SWRMutationResponse<ZerotierOneNetwork,string,ZerotierOneNetworkPatch> {
  return useSWR<ZerotierOneNetwork,string,undefined|{url:string},ZerotierOneNetworkPatch>(
    networkId ? {url:'/zerotier/controller/network/'+networkId} : undefined,
    fetchAsync
  );
};

export default usePostZerotierControllerNetworkUpdate;
