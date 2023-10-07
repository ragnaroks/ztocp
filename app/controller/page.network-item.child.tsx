import {ReactElement} from 'react';
import dayjs from 'dayjs';
import {GetZerotierOneNetwork} from '../../libraries/request/zerotier-one';
import NextLink from 'next/link';

export default async function PageNetworkItemChild(props:{
  networkId:string
}) : Promise<ReactElement> {
  const {data,error} = await GetZerotierOneNetwork(props.networkId);

  if(error || !data){return <div className="p-2">获取 {props.networkId} 的数据失败，{error||'接口无响应'}</div>;}
  return <NextLink className="p-2 border-b border-stone-200/100 flex hover:bg-stone-100/100" href={`/controller/network/?id=${props.networkId}&action=config`}>
    <div className="flex-shrink-0 w-2/12">网络：{props.networkId}</div>
    <div className="flex-1">名称：{data.name||'未设置'}</div>
    <div className="flex-shrink-0 w-1/12">类型：{data.private?'私有':'公开'}</div>
    <div className="flex-shrink-0">创建日期：{dayjs(data.creationTime).format('YYYY-MM-DD')}</div>
  </NextLink>;
};
