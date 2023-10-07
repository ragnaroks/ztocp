import {Fragment, ReactElement} from 'react';
import PageNetworkItemChild from './page.network-item.child';

export default function PageNetworkListChild(props:{
  error:string,
  data:null|Array<string>
}) : ReactElement {
  const {error,data} = props;

  if(error || !data){return <p className="p-2 border-b border-stone-200/100 text-center">获取数据失败，{error||'接口无响应'}</p>;}
  if(data.length<1){return <p className="p-2 border-b border-stone-200/100 text-center">暂无任何网络</p>;}
  return <Fragment>{data.map(item=><PageNetworkItemChild key={item} networkId={item}/>)}</Fragment>;
};
