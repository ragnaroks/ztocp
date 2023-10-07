import {ReactElement} from 'react';
import dayjs from 'dayjs';

export default function PageStatusChild(props:{
  networkData:null|ZerotierOneNetwork,
  networkError:string,
  networkMemberData:null|Array<{memberAddress:string,memberRevisionCounter:number}>,
  networkMemberError:string
}) : ReactElement {
  const {networkData,networkError,networkMemberData,networkMemberError} = props;

  if(networkError || !networkData){return <p className="px-4 py-2">获取数据失败，{networkError||'接口无响应'}</p>;}
  return <ul className="px-4 py-2 flex">
    <li className="flex-shrink-0 mr-8">网络：{networkData.id}</li>
    <li className="flex-shrink-0 mr-8">名称：{networkData.name||'未设置'}</li>
    <li className="flex-shrink-0 mr-8">类型：{networkData.private?'私有':'公开'}</li>
    <li className="flex-shrink-0 mr-8">成员数量：{networkMemberError || networkMemberData?.length}</li>
    <li className="flex-1" />
    <li className="flex-shrink-0">创建日期：{dayjs(networkData.creationTime).format('YYYY-MM-DD')}</li>
  </ul>;
};
