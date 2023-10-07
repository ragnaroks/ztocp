import {Fragment,ReactElement} from 'react';
import PageConfigChild from './page.config.child';
import PageStatusChild from './page.status.child';
import PageMemberListChild from './page.member-list.child';
import MaterialDesignIcon from '../../../components/material-design-icon';
import {mdiInformation} from '@mdi/js';
import NextLink from 'next/link';
import {DeleteZerotierOneNetwork, GetZerotierOneNetwork, GetZerotierOneNetworkMemberList} from '../../../libraries/request/zerotier-one';
import {revalidatePath} from 'next/cache';
import {RedirectType, redirect} from 'next/navigation';
import PageNetworkDeleteButtonChild from './page.network-delete-button.child';

async function deleteNetworkServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  await DeleteZerotierOneNetwork(networkId);
  revalidatePath('/controller/','page');
  redirect('/controller/',RedirectType.replace);
};

export default async function Page(props:DefaultPageProps) : Promise<ReactElement> {
  const id:undefined|string = props.searchParams['id'];

  if(!id){return <Fragment>
    <div className="w-site mx-auto h-3" />
    <div className="w-site mx-auto h-3" />
    <div className="w-site mx-auto py-32 flex justify-center items-center">
      <div className="text-center">
        <MaterialDesignIcon path={mdiInformation} className="w-16 text-yellow-500/100 inline" />
        <p className="mt-4">
          <span>id 参数错误，</span>
          <NextLink className="underline hover:no-underline text-blue-500/100" href="/controller/">返回列表</NextLink>
        </p>
      </div>
    </div>
  </Fragment>;}

  const action:undefined|string = props.searchParams['action'];

  if(action!=='config'&&action!=='member'){return <Fragment>
    <div className="w-site mx-auto h-3" />
    <div className="w-site mx-auto h-3" />
    <div className="w-site mx-auto py-32 flex justify-center items-center">
      <div className="text-center">
        <MaterialDesignIcon path={mdiInformation} className="w-16 text-yellow-500/100 inline" />
        <p className="mt-4">
          <span>action 参数错误，</span>
          <NextLink className="underline hover:no-underline text-blue-500/100" href="/controller/">返回列表</NextLink>
        </p>
      </div>
    </div>
  </Fragment>;}

  const {data:networkData,error:networkError} = await GetZerotierOneNetwork(id);
  const {data:networkMemberData,error:networkMemberError} = await GetZerotierOneNetworkMemberList(id);

  if(action==='config'){
    return <Fragment>
      <div className="w-site mx-auto h-3" />
      <div className="w-site mx-auto px-4">网络状态</div>
      <div className="w-site mx-auto h-3" />
      <div className="w-site mx-auto bg-white/100 text-sm"><PageStatusChild networkData={networkData} networkError={networkError} networkMemberData={networkMemberData} networkMemberError={networkMemberError} /></div>
      <div className="w-site mx-auto h-12" />
      <div className="w-site mx-auto flex">
        <NextLink className="px-6 py-2 bg-stone-300/100 hover:bg-stone-100/100 cursor-pointer" href="/controller/">返回列表</NextLink>
        <span className="px-6 py-2 bg-white/100 select-none">网络设置</span>
        <NextLink className="px-6 py-2 bg-stone-300/100 hover:bg-stone-100/100 cursor-pointer" href={`/controller/network/?id=${id}&action=member`}>成员管理</NextLink>
      </div>
      <div className="w-site mx-auto bg-white/100"><PageConfigChild networkData={networkData} networkError={networkError} /></div>
      <hr />
      <form className="w-site mx-auto bg-white/100" action={deleteNetworkServerAction}><PageNetworkDeleteButtonChild networkId={id} /></form>
      <div className="h-16" />
    </Fragment>;
  }else{
    return <Fragment>
      <div className="w-site mx-auto h-3" />
      <div className="w-site mx-auto px-4">网络状态</div>
      <div className="w-site mx-auto h-3" />
      <div className="w-site mx-auto bg-white/100 text-sm"><PageStatusChild networkData={networkData} networkError={networkError} networkMemberData={networkMemberData} networkMemberError={networkMemberError} /></div>
      <div className="w-site mx-auto h-12" />
      <div className="w-site mx-auto flex">
        <NextLink className="px-6 py-2 bg-stone-300/100 hover:bg-stone-100/100 cursor-pointer" href="/controller/">返回列表</NextLink>
        <NextLink className="px-6 py-2 bg-stone-300/100 hover:bg-stone-100/100 cursor-pointer" href={`/controller/network/?id=${id}&action=config`}>网络设置</NextLink>
        <span className="px-6 py-2 bg-white/100 select-none">成员管理</span>
      </div>
      <div className="w-site mx-auto bg-white/100"><PageMemberListChild networkData={networkData} networkError={networkError} networkMemberData={networkMemberData} networkMemberError={networkMemberError} /></div>
      <div className="h-16" />
    </Fragment>;
  }
};
