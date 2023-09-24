import useSWR from 'swr';
import {SWRResponse} from 'swr';
import {delay} from '../libraries/helper/function';

const fetchAsync = async function(key:{url:string}) : Promise<Array<{memberAddress:string,memberRevisionCounter:number}>> {
  await delay(500);
  let response:Response|null = null;
  try{
    response = await fetch(key.url,{method:'GET',mode:'same-origin'});
  }catch(exception:unknown){
    console.warn(exception);
    throw '网络请求错误';
  }
  if(!response.ok){throw '网络请求错误（'+response.status+'）';}
  let data:null|{[key:string]:number} = null;
  try{
    data = await response.json() as unknown as {[key:string]:number};
  }catch(exception:unknown){
    console.warn(exception);
    throw '数据解析错误';
  }
  const array:Array<{memberAddress:string,memberRevisionCounter:number}> = [];
  const keys:Array<string> = Object.keys(data);
  for (const key of keys) {
    if(!key){continue;}
    array.push({memberAddress:key,memberRevisionCounter:data[key]});
  }
  return array;
};

const useGetZerotierControllerNetworkMemberList = function(networkId:null|string) : SWRResponse<Array<{memberAddress:string,memberRevisionCounter:number}>,string> {
  return useSWR<Array<{memberAddress:string,memberRevisionCounter:number}>,string,undefined|{url:string}>(
    networkId ? {url:'/zerotier/controller/network/'+networkId+'/member'} : undefined,
    fetchAsync,
    {revalidateIfStale:true,revalidateOnFocus:true,revalidateOnReconnect:true,revalidateOnMount:true,dedupingInterval:10000,errorRetryInterval:5000}
  );
};

export default useGetZerotierControllerNetworkMemberList;
