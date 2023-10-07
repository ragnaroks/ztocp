import {Fragment,ReactElement} from 'react';
import PageStatusBarChild from './page.status-bar.child';
import PageNetworkListChild from './page.network-list.child';
import {GetZerotierOneNetworkList, GetZerotierOneStatus, PostZerotierOneNetworkCreate} from '../../libraries/request/zerotier-one';
import {revalidatePath} from 'next/cache';
import PageNetworkAddButtonChild from './page.network-add-button.child';

async function createNetworkServerAction(formData:FormData) : Promise<void> {
  'use server';
  const address:null|FormDataEntryValue = formData.get('address');
  if(address===null || typeof address!=='string'){return;}
  await PostZerotierOneNetworkCreate(address,`network-${new Date().valueOf()}`);
  revalidatePath('/controller/');
};

export default async function Page() : Promise<ReactElement> {
  const {data:statusData,error:statusError} = await GetZerotierOneStatus();
  const {data:networkListData,error:networkListError} = await GetZerotierOneNetworkList();
  
  return <Fragment>
    <div className="w-site mx-auto h-3" />
    <div className="w-site mx-auto px-4">控制器状态</div>
    <div className="w-site mx-auto h-3" />
    <div className="w-site mx-auto bg-white/100 text-sm"><PageStatusBarChild error={statusError} data={statusData} /></div>
    <div className="w-site mx-auto h-12" />
    <div className="w-site mx-auto px-4">网络列表</div>
    <div className="w-site mx-auto h-3" />
    <div className="w-site mx-auto bg-white/100 text-sm"><PageNetworkListChild error={networkListError} data={networkListData} /></div>
    <form className="w-site mx-auto bg-white/100 text-sm" action={createNetworkServerAction}><PageNetworkAddButtonChild address={statusData?.address||''} /></form>
  </Fragment>;
};
