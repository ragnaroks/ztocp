'use client';

import {ReactElement} from 'react';
import dayjs from 'dayjs';
import useGetZerotierControllerNetwork from '../../../swr/use-get-zerotier-controller-network';
import useGetZerotierControllerNetworkMemberList from '../../../swr/use-get-zerotier-controller-network-member-list';

export default function PageStatusChild(props:DefaultComponentProps & {networkId:string}) : ReactElement {
  const {className,networkId} = props;

  const {isLoading,error,data} = useGetZerotierControllerNetwork(networkId);
  const {data:memberListData} = useGetZerotierControllerNetworkMemberList(networkId);
  
  if(isLoading){return <li className={className+' animate-pulse'}>正在获取 {networkId} 的数据</li>;}
  if(error || !data){return <li className={className}>获取 {networkId} 的数据失败，{error||'接口无响应'}</li>;}
  return <div className={className+' flex'}>
    <fieldset className="flex-shrink-0 mr-8">网络：{data.id}</fieldset>
    <fieldset className="flex-shrink-0 mr-8">名称：{data.name||'未设置'}</fieldset>
    <fieldset className="flex-shrink-0 mr-8">类型：{data.private?'私有':'公开'}</fieldset>
    <fieldset className="flex-shrink-0 mr-8">成员：{memberListData?.length}</fieldset>
    <fieldset className="flex-1" />
    <fieldset className="flex-shrink-0 mr-8">创建日期：{dayjs(data.creationTime).format('YYYY-MM-DD')}</fieldset>
  </div>;
};
