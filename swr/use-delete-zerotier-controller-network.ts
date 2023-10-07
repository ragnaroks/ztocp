import useSWRMutation from 'swr/mutation';
import type {SWRMutationResponse} from 'swr/mutation';

async function fetchAsync(key:{url:string}) : Promise<ZerotierOneNetwork> {
  let response:Response|null = null;
  try{
    response = await fetch(key.url,{method:'DELETE',mode:'same-origin'});
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

function useDeleteZerotierControllerNetwork(networkId?:string) : SWRMutationResponse<ZerotierOneNetwork,string,undefined|{url:string}> {
  return useSWRMutation<ZerotierOneNetwork,string,undefined|{url:string}>(
    networkId ? {url:'/zerotier/controller/network/'+networkId} : undefined,
    fetchAsync
  );
};

export default useDeleteZerotierControllerNetwork;
