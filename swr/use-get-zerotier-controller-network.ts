import useSWR from 'swr';
import {SWRResponse} from 'swr';
import {delay} from '../libraries/helper/function';

const fetchAsync = async function(key:{url:string}) : Promise<ZerotierOneNetwork> {
  await delay(500);
  let response:Response|null = null;
  try{
    response = await fetch(key.url,{method:'GET',mode:'same-origin'});
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

const useGetZerotierControllerNetwork = function(networkId:null|string) : SWRResponse<ZerotierOneNetwork,string> {
  return useSWR<ZerotierOneNetwork,string,undefined|{url:string}>(
    networkId ? {url:'/zerotier/controller/network/'+networkId} : undefined,
    fetchAsync,
    {revalidateIfStale:true,revalidateOnFocus:true,revalidateOnReconnect:true,revalidateOnMount:true,dedupingInterval:10000,errorRetryInterval:30000}
  );
};

export default useGetZerotierControllerNetwork;
