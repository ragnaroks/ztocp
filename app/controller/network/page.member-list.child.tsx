'use client';

import {ReactElement, useCallback} from 'react';
import PageMemberItemChild from './page.member-item.child';
import useGetZerotierControllerNetworkMemberList from '../../../swr/use-get-zerotier-controller-network-member-list';
import useGetZerotierControllerNetwork from '../../../swr/use-get-zerotier-controller-network';

export default function PageMemberListChild(props:DefaultComponentProps & {networkId:string}) : ReactElement {
  const {className,networkId} = props;

  const {isLoading,error,data,mutate} = useGetZerotierControllerNetworkMemberList(networkId);
  const {isLoading:networkLoading,data:networkData} = useGetZerotierControllerNetwork(networkId);

  const handleDelete = useCallback(function(address:string){
    if(!data || data.length<1){return;}
    mutate(data.filter(item=>item.memberAddress!==address),{revalidate:false});
  },[data,mutate]);

  if(isLoading || networkLoading){return <div className={className+' animate-pulse'}>正在获取 {networkId} 的成员列表</div>;}
  if(error || !data || !networkData){return <div className={className}>获取 {networkId} 的成员列表失败，{error||'接口无响应'}</div>;}
  if(data.length<1){return <div className={className}>暂无任何成员</div>;}
  return <ul className={className}>{data.map(item=><PageMemberItemChild key={item.memberAddress} privateNetwork={networkData.private} networkId={networkData.id} address={item.memberAddress} counter={item.memberRevisionCounter} rfc4193={networkData.v6AssignMode.rfc4193} sixplane={networkData.v6AssignMode['6plane']} onDelete={handleDelete} />)}</ul>;
};
