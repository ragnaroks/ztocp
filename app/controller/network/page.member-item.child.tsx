'use client';

import {ReactElement, useCallback, useState} from 'react';
import useGetZerotierControllerNetworkMember from '../../../swr/use-get-zerotier-controller-network-member';
import {generateZerotier6PLANE, generateZerotierRFC4193, validateAddress64} from '../../../libraries/helper/function';
import {toast} from 'react-hot-toast';
import usePostZerotierControllerNetworkMemberUpdate from '../../../swr/use-post-zerotier-controller-network-member-update';
import MaterialDesignIcon from '../../../components/material-design-icon';
import {mdiDelete, mdiPlus} from '@mdi/js';
import useDeleteZerotierControllerNetworkMember from '../../../swr/use-delete-zerotier-controller-network-member';

export default function PageMemberItemChild(props:DefaultComponentProps & {
  networkId:string,
  address:string,
  counter:number,
  privateNetwork:boolean,
  rfc4193:boolean,
  sixplane:boolean,
  onDelete:(address:string)=>void
}) : ReactElement {
  const {className,networkId,address,privateNetwork,rfc4193,sixplane,onDelete} = props;

  const {trigger:deleteTrigger,isMutating:deleteMutating} = useDeleteZerotierControllerNetworkMember(networkId,address);
  const {isLoading,error,data,mutate} =  useGetZerotierControllerNetworkMember(deleteMutating?null:networkId,deleteMutating?null:address);
  const {trigger:updateTrigger,isMutating:updateMutating} = usePostZerotierControllerNetworkMemberUpdate(deleteMutating?null:networkId,deleteMutating?null:address);
  const [temporaryAddress,temporaryAddressSetter] = useState<string>('');

  const handleClickDeleteMember = useCallback(function(){
    if(!data || !globalThis || !globalThis.self || !globalThis.self.confirm){return;}
    if(data.authorized){
      toast.error('取消成员授权后才能删除成员');
      return;
    }
    if(!globalThis.self.confirm('确认删除成员 '+address+'？\n\n如果成员依然尝试加入，此处仍会再次显示。\n正确的做法是先在客户端 leave，再在此处取消授权，最后删除该成员。')){return;}
    deleteTrigger().then(function(stream){
      if(!stream){return;}
      onDelete(stream.address)
    }).catch(function(exception){
      toast.error('删除成员配置失败，'+exception);
    });
  },[data,deleteTrigger]);

  const patch = useCallback(function(patch:ZerotierOneMemberPatch){
    if(!data){return;}
    updateTrigger(patch).then(function(stream){
      if(!stream){return;}
      mutate(stream,{revalidate:false});
    }).catch(function(exception){
      toast.error('更新成员配置失败，'+exception);
    });
  },[data,updateTrigger,mutate]);

  const handleClickAuthorized = useCallback(function(){
    if(!data){return;}
    if(!privateNetwork){
      toast('公开网络无法取消授权也无法删除成员');
      return;
    }
    patch({authorized:!data.authorized});
  },[data,privateNetwork,patch]);

  const handleClickActiveBridge = useCallback(function(){
    if(!data){return;}
    patch({activeBridge:!data.activeBridge});
  },[data,patch]);

  const handleClickNoAutoAssignIps = useCallback(function(){
    if(!data){return;}
    patch({noAutoAssignIps:!data.noAutoAssignIps});
  },[data,patch]);

  const deleteAddress = useCallback(function(address:string){
    if(!data || !data.ipAssignments.some(item=>item===address)){return;}
    patch({ipAssignments:data.ipAssignments.filter(item=>item!==address)});
  },[data,patch]);

  const handleClickAddAddress = useCallback(function(){
    if(!data || data.ipAssignments.some(item=>item===temporaryAddress)){return;}
    const ipAssignments:Array<string> = [...data.ipAssignments,temporaryAddress];
    temporaryAddressSetter('');
    patch({ipAssignments:ipAssignments});
  },[data,temporaryAddress,temporaryAddressSetter,patch]);

  if(deleteMutating){return <div className={className+' animate-pulse'}>正在删除 {address}</div>;}
  if(isLoading){return <div className={className+' animate-pulse'}>正在获取 {address} 的信息</div>;}
  if(error || !data){return <div className={className}>获取 {address} 的信息失败，{error||'接口无响应'}</div>;}
  return <li className="border-b last:border-none border-stone-200/100 py-3">
    <div className="text-sm flex">
      <span className="flex-shrink-0 w-2/12">成员地址：{data.address}</span>
      <span className="flex-shrink-0 w-2/12">客户端版本：{data.vMajor}.{data.vMinor}.{data.vRev}</span>
      <span className="flex-shrink-0 w-4/12">rfc4193 地址：{rfc4193 ? generateZerotierRFC4193(networkId,data.address) : '未启用'}</span>
      <span className="flex-shrink-0 w-4/12">6plane 地址：{sixplane ? generateZerotier6PLANE(networkId,data.address) : '未启用'}</span>
    </div>
    <div className="text-sm flex mt-3">
      <span className="flex-shrink-0 w-2/12 flex items-center">授权访问：<input disabled={updateMutating} type="checkbox" checked={data.authorized} onClick={handleClickAuthorized} /></span>
      <span className="flex-shrink-0 w-2/12 flex items-center">允许桥接：<input disabled={updateMutating} type="checkbox" checked={data.activeBridge} onClick={handleClickActiveBridge} /></span>
      <span className="flex-shrink-0 w-2/12 flex items-center">不自动分配托管地址：<input disabled={updateMutating} type="checkbox" checked={data.noAutoAssignIps} onClick={handleClickNoAutoAssignIps} /></span>
      <span className="flex-shrink-0 w-2/12" />
      <span className="flex-shrink-0 w-2/12 flex items-center"><button disabled={updateMutating} className="px-1 border border-site-zerotier/100 text-orange-500/100 disabled:border-stone-300/100 disabled:text-stone-500/100" onClick={handleClickDeleteMember}>删除成员</button></span>
    </div>
    <div className="text-sm flex mt-3">
      <span className="flex-shrink-0 text-sm">托管地址：</span>
      <ul className="flex-1 flex flex-wrap">
        {data.ipAssignments.map(function(item){
        return <li key={item} data-v6={validateAddress64(item)===6||undefined} data-v4={validateAddress64(item)===4||undefined} className="flex-shrink-0 data-[v6]:w-1/3 data-[v4]:w-1/6 flex items-center mb-2">
          <span>{item}</span>
          <button disabled={updateMutating} className="ml-3 disabled:animate-pulse" onClick={()=>deleteAddress(item)}><MaterialDesignIcon path={mdiDelete} className="w-4" /></button>
        </li>;
        })}
        <li className="flex-shrink-0 flex items-center mb-2 w-80">
          <input disabled={updateMutating} placeholder="192.168.144.123" value={temporaryAddress} maxLength={39} className="w-full border border-stone-300/100 px-1" onChange={event=>temporaryAddressSetter(event.currentTarget.value.trim())} />
          <button disabled={updateMutating} className="ml-1 disabled:animate-pulse" onClick={handleClickAddAddress}><MaterialDesignIcon path={mdiPlus} className="w-5" /></button>
        </li>
      </ul>
    </div>
  </li>;
};
