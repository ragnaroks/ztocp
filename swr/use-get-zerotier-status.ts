import useSWR from 'swr';
import {SWRResponse} from 'swr';
import {delay} from '../libraries/helper/function';

const fetchAsync = async function(key:{url:string}) : Promise<ZerotierOneStatus> {
  await delay(500);
  let response:Response|null = null;
  try{
    response = await fetch(key.url,{method:'GET',mode:'same-origin'});
  }catch(exception:unknown){
    console.warn(exception);
    throw '网络请求错误';
  }
  if(!response.ok){throw '网络请求错误（'+response.status+'）';}
  let data:ZerotierOneStatus|null = null;
  try{
    data = await response.json() as unknown as ZerotierOneStatus;
  }catch(exception:unknown){
    console.warn(exception);
    throw '数据解析错误';
  }
  return data;
};

const useGetZerotierStatus = function() : SWRResponse<ZerotierOneStatus,string> {
  return useSWR<ZerotierOneStatus,string,{url:string}>(
    {url:'/zerotier/status'},
    fetchAsync,
    {revalidateIfStale:true,revalidateOnFocus:true,revalidateOnReconnect:true,revalidateOnMount:true,dedupingInterval:10000,errorRetryInterval:30000}
  );
};

export default useGetZerotierStatus;
