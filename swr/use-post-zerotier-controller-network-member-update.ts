import useSWR from 'swr/mutation';
import {SWRMutationResponse} from 'swr/mutation';
import {delay} from '../libraries/helper/function';

const fetchAsync = async function(key:{url:string},extra:{arg:ZerotierOneMemberPatch}) : Promise<ZerotierOneMember> {
  await delay(500);
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

const usePostZerotierControllerNetworkMemberUpdate = function(networkId:null|string,memberAddress:null|string) : SWRMutationResponse<ZerotierOneMember,string,ZerotierOneMemberPatch> {
  return useSWR<ZerotierOneMember,string,undefined|{url:string},ZerotierOneMemberPatch>(
    (networkId && memberAddress) ? {url:'/zerotier/controller/network/'+networkId+'/member/'+memberAddress} : undefined,
    fetchAsync
  );
};

export default usePostZerotierControllerNetworkMemberUpdate;
