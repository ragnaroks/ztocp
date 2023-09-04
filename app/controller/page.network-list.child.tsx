'use client';

import {ReactElement} from 'react';
import PageNetworkItemChild from './page.network-item.child';

export default function PageNetworkListChild(props:DefaultComponentProps & {
  loading:boolean,
  error?:string,
  data?:Array<string>,
  onSelect:(networkId:string)=>void,
  onDelete:(networkId:string)=>void
}) : ReactElement {
  const {className,loading,error,data,onSelect,onDelete} = props;

  if(loading){return <div className={className+' p-2 animate-pulse'}>数据加载中</div>;}
  if(error || !data){return <div className={className+' p-2'}>获取数据失败，{error||'接口无响应'}</div>;}
  if(data.length<1){return <div className={className+' p-2'}>未创建任何网络</div>;}
  return <ul className={className}>{data.map(item=><PageNetworkItemChild key={item} networkId={item} className="p-2 border-b border-stone-200/100 last:border-none" onSelect={onSelect} onDelete={onDelete} />)}</ul>;
};
