import useSWR from 'swr';
import {SWRResponse} from 'swr';

async function fetchAsync(key:{url:string}) : Promise<ZerotierOneMember> {
  let response:Response|null = null;
  try{
    response = await fetch(key.url,{method:'GET',mode:'same-origin'});
  }catch(exception:unknown){
    console.warn(exception);
    throw '网络请求错误';
  }
  if(!response.ok){throw '网络请求错误（'+response.status+'）';}
  let data:ZerotierOneMember|null = null;
  try{
    data = await response.json() as unknown as ZerotierOneMember;
  }catch(exception:unknown){
    console.warn(exception);
    throw '数据解析错误';
  }
  return data;
};

function useGetZerotierControllerNetworkMember(networkId:null|string,memberAddress:null|string) : SWRResponse<ZerotierOneMember,string> {
  return useSWR<ZerotierOneMember,string,undefined|{url:string}>(
    (networkId && memberAddress) ? {url:'/zerotier/controller/network/'+networkId+'/member/'+memberAddress} : undefined,
    fetchAsync,
    {revalidateIfStale:true,revalidateOnFocus:true,revalidateOnReconnect:true,revalidateOnMount:true,dedupingInterval:10000,errorRetryInterval:5000}
  );
};

export default useGetZerotierControllerNetworkMember;
