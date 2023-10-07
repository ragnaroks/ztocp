import useSWR from 'swr';
import {SWRResponse} from 'swr';

async function fetchAsync(key:{url:string}) : Promise<Array<string>> {
  let response:Response|null = null;
  try{
    response = await fetch(key.url,{method:'GET',mode:'same-origin'});
  }catch(exception:unknown){
    console.warn(exception);
    throw '网络请求错误';
  }
  if(!response.ok){throw '网络请求错误（'+response.status+'）';}
  let data:Array<string>|null = null;
  try{
    data = await response.json() as unknown as Array<string>;
  }catch(exception:unknown){
    console.warn(exception);
    throw '数据解析错误';
  }
  return data;
};

function useGetZerotierControllerNetworkList() : SWRResponse<Array<string>,string> {
  return useSWR<Array<string>,string,{url:string}>(
    {url:'/zerotier/controller/network'},
    fetchAsync,
    {revalidateIfStale:true,revalidateOnFocus:true,revalidateOnReconnect:true,revalidateOnMount:true,dedupingInterval:10000,errorRetryInterval:30000}
  );
};

export default useGetZerotierControllerNetworkList;
