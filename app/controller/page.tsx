'use client';

import {Fragment,ReactElement, useCallback} from 'react';
import PageStatusBarChild from './page.status-bar.child';
import PageNetworkListChild from './page.network-list.child';
import useGetZerotierStatus from '../../swr/use-get-zerotier-status';
import useGetZerotierControllerNetworkList from '../../swr/use-get-zerotier-controller-network-list';
import usePostZerotierControllerNetworkCreate from '../../swr/use-post-zerotier-controller-network-create';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';

export default function Page() : ReactElement {
  const {push} = useRouter();
  const {isLoading:statusLoading,error:statusError,data:statusData} = useGetZerotierStatus();
  const {isLoading:networkListLoading,error:networkListError,data:networkListData,mutate:networkListMutate} = useGetZerotierControllerNetworkList();
  const {trigger:generateTrigger,isMutating:generateMutating} = usePostZerotierControllerNetworkCreate(statusData?.address);

  const handleAddNetwork = useCallback(function(){
    generateTrigger().then(function(){
      networkListMutate();
    }).catch(function(exception){
      toast.error('创建网络失败，'+exception);
    });
  },[generateTrigger,networkListMutate]);

  const handleSelectNetwork = useCallback(function(networkId:string){
    if(!networkListData || networkListData.length<1 || !networkListData.some(item=>item===networkId)){return;}
    push('/controller/network/?id='+networkId);
  },[networkListData,push]);

  const handleDeleteNetwork = useCallback(function(networkId:string){
    if(!networkListData || networkListData.length<1){return;}
    networkListMutate(networkListData.filter(item=>item!==networkId),{revalidate:false});
  },[networkListMutate,networkListData]);
  
  return <Fragment>
    <div className="w-site mx-auto h-3" />
    <div className="w-site mx-auto px-4">控制器状态</div>
    <div className="w-site mx-auto h-3" />
    <PageStatusBarChild loading={statusLoading} error={statusError} data={statusData} className="w-site mx-auto bg-white/100 p-2 text-sm" />
    <div className="w-site mx-auto h-12" />
    <div className="w-site mx-auto px-4 flex justify-between">
      <span>网络列表</span>
      <button disabled={generateMutating} className="bg-site-zerotier/100 px-2 flex items-center text-sm disabled:animate-pulse disabled:bg-stone-300/100 disabled:text-stone-500/100" onClick={handleAddNetwork}>创建网络</button>
    </div>
    <div className="w-site mx-auto h-3" />
    <PageNetworkListChild loading={networkListLoading} error={networkListError} data={networkListData} className="w-site mx-auto bg-white/100 text-sm" onSelect={handleSelectNetwork} onDelete={handleDeleteNetwork} />
  </Fragment>;
};
