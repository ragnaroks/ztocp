'use client';

import {Fragment,ReactElement,useState} from 'react';
import PageConfigChild from './page.config.child';
import PageStatusChild from './page.status.child';
import {useSearchParams} from 'next/navigation';
import PageMemberListChild from './page.member-list.child';

export default function Page() : ReactElement {
  const {get} = useSearchParams();
  const networkId:null|string = get('id');
  const [index,indexSetter] = useState<'config'|'member'>('config');
  
  if(!networkId){return <Fragment />;}
  return <Fragment>
    <div className="w-site mx-auto h-3" />
    <div className="w-site mx-auto px-4">网络状态</div>
    <div className="w-site mx-auto h-3" />
    <PageStatusChild networkId={networkId} className="w-site mx-auto bg-white/100 p-2 text-sm" />
    <div className="w-site mx-auto h-12" />
    <div className="w-site mx-auto flex">
      <fieldset className={`px-6 py-2 bg-stone-300/100 ${index==='config'&&'bg-white/100'} hover:bg-stone-100/100 cursor-pointer`} onClick={()=>indexSetter('config')}>设置</fieldset>
      <fieldset className={`px-6 py-2 bg-stone-300/100 ${index==='member'&&'bg-white/100'} hover:bg-stone-100/100 cursor-pointer`} onClick={()=>indexSetter('member')}>成员</fieldset>
    </div>
    <PageConfigChild networkId={networkId} className={`w-site mx-auto px-4 py-2 bg-white/100 ${index!=='config'&&'hidden'}`} />
    <PageMemberListChild networkId={networkId} className={`w-site mx-auto px-4 py-2 bg-white/100 ${index!=='member'&&'hidden'}`} />
  </Fragment>;
};
