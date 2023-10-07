import useSWRMutation from 'swr/mutation';
import type {SWRMutationResponse} from 'swr/mutation';

async function fetchAsync(key:{url:string},extra:{arg:ZerotierOneMemberPatch}) : Promise<ZerotierOneMember> {
  let response:Response|null = null;
  try{
    response = await fetch(key.url,{method:'POST',mode:'same-origin',body:JSON.stringify(extra.arg)});
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

function usePostZerotierControllerNetworkMemberUpdate(networkId:null|string,memberAddress:null|string) : SWRMutationResponse<ZerotierOneMember,string,undefined|{url:string},ZerotierOneMemberPatch> {
  return useSWRMutation<ZerotierOneMember,string,undefined|{url:string},ZerotierOneMemberPatch>(
    (networkId && memberAddress) ? {url:'/zerotier/controller/network/'+networkId+'/member/'+memberAddress} : undefined,
    fetchAsync
  );
};

export default usePostZerotierControllerNetworkMemberUpdate;
