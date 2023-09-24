'use client';

import {ReactElement, useCallback} from 'react';
import useGetZerotierControllerNetwork from '../../swr/use-get-zerotier-controller-network';
import dayjs from 'dayjs';
import useDeleteZerotierControllerNetwork from '../../swr/use-delete-zerotier-controller-network';
import toast from 'react-hot-toast';
import useGetZerotierControllerNetworkMemberList from '../../swr/use-get-zerotier-controller-network-member-list';

export default function PageNetworkItemChild(props:DefaultComponentProps & {
  networkId:string,
  onDelete:(networkId:string)=>void,
  onSelect:(networkId:string)=>void
}) : ReactElement {
  const {className,networkId,onDelete,onSelect} = props;

  const {trigger:deleteTrigger,isMutating:deleteMutating} = useDeleteZerotierControllerNetwork(networkId);
  const {isLoading,error,data} = useGetZerotierControllerNetwork(deleteMutating ? null : networkId);
  const {data:memberListData} = useGetZerotierControllerNetworkMemberList(networkId);

  const handleDeleteNetwork = useCallback(function(){
    if(!globalThis || !globalThis.self || !globalThis.self.confirm){return;}
    if(!globalThis.self.confirm('确认删除网络 '+networkId+'？')){return;}
    deleteTrigger().then(function(stream){
      if(!stream){return;}
      onDelete(stream.id);
    }).catch(function(exception){
      toast.error('删除网络失败，'+exception);
    });
  },[networkId,deleteTrigger,onDelete]);

  const handleSelectNetwork = useCallback(function(){
    onSelect(networkId);
  },[onSelect,networkId]);

  if(deleteMutating){return <li className={className+' animate-pulse'}>正在删除 {networkId}</li>;}
  if(isLoading){return <li className={className+' animate-pulse'}>正在获取 {networkId} 的数据</li>;}
  if(error || !data){return <li className={className}>获取 {networkId} 的数据失败，{error||'接口无响应'}</li>;}
  return <li className={className+' flex'}>
    <fieldset className="flex-shrink-0 w-2/12">网络：{props.networkId}</fieldset>
    <fieldset className="flex-1">名称：{data.name||'未设置'}</fieldset>
    <fieldset className="flex-shrink-0 w-1/12">类型：{data.private?'私有':'公开'}</fieldset>
    <fieldset className="flex-shrink-0 w-1/12">成员：{memberListData?.length}</fieldset>
    <fieldset className="flex-shrink-0 w-2/12">创建日期：{dayjs(data.creationTime).format('YYYY-MM-DD')}</fieldset>
    <fieldset className="flex-shrink-0 w-1/12 flex text-xs gap-x-2">
      <button disabled={deleteMutating} className="flex-1 border border-site-zerotier/100 text-orange-500/100" onClick={handleDeleteNetwork}>删除</button>
      <button disabled={deleteMutating} className="flex-1 bg-site-zerotier/100" onClick={handleSelectNetwork}>设置</button>
    </fieldset>
  </li>;
};
