import useSWR from 'swr/mutation';
import {SWRMutationResponse} from 'swr/mutation';
import {delay} from '../libraries/helper/function';

async function fetchAsync(key:{url:string}) : Promise<ZerotierOneMember> {
  await delay(500);
  let response:Response|null = null;
  try{
    response = await fetch(key.url,{method:'DELETE',mode:'same-origin'});
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

function useDeleteZerotierControllerNetworkMember(networkId:null|string,memberAddress:null|string) : SWRMutationResponse<ZerotierOneMember,string> {
  return useSWR<ZerotierOneMember,string,undefined|{url:string}>(
    (networkId && memberAddress) ? {url:'/zerotier/controller/network/'+networkId+'/member/'+memberAddress} : undefined,
    fetchAsync
  );
};

export default useDeleteZerotierControllerNetworkMember;
