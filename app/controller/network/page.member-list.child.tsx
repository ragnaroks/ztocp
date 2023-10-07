import {Fragment, ReactElement} from 'react';
import PageMemberItemChild from './page.member-item.child';

export default function PageMemberListChild(props:{
  networkData:null|ZerotierOneNetwork,
  networkError:string,
  networkMemberData:null|Array<{memberAddress:string,memberRevisionCounter:number}>,
  networkMemberError:string
}) : ReactElement {
  const {networkData,networkError,networkMemberData,networkMemberError} = props;

  if(networkError || !networkData){return <p className="px-4 py-2">获取网络设置失败，{networkError||'接口无响应'}</p>;}
  if(networkMemberError || !networkMemberData){return <p className="px-4 py-2">获取成员列表失败，{networkMemberError||'接口无响应'}</p>;}
  if(networkMemberData.length<1){return <p className="px-4 py-2">暂无任何成员</p>;}
  return <Fragment>
    <ul className="m-2 p-2 bg-blue-200/100 text-stone-700/100 text-sm">
      <li>由于 zerotier 架构特性，先取消授权后才能删除成员，公开网络无法取消授权也无法删除成员。</li>
      <li>如果成员依然尝试 join，此处仍会再次显示，正确的做法是先在客户端 leave，再取消授权，最后删除该成员。</li>
    </ul>
    <ul className="px-4">{networkMemberData.map(item=><PageMemberItemChild key={item.memberAddress} networkData={networkData} address={item.memberAddress} counter={item.memberRevisionCounter} />)}</ul>
  </Fragment>;
};
