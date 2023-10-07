import {ReactElement} from 'react';
import {generateZerotier6PLANE, generateZerotierRFC4193, validateAddress64} from '../../../libraries/helper/function';
import {DeleteZerotierOneNetworkMember, GetZerotierOneNetworkMember, PostZerotierOneNetworkMemberUpdate} from '../../../libraries/request/zerotier-one';
import {revalidatePath} from 'next/cache';
import PageMemberAuthorizedUpdateChild from './page.member-authorized-update.child';
import PageMemberAllowBridgeUpdateChild from './page.member-allow-bridge-update.child';
import PageMemberNoAutoAssignIpsUpdateChild from './page.member-no-auto-assign-ips-update.child';
import PageMemberDeleteButtonChild from './page.member-delete-button.child';
import PageMemberIpAddressDeleteButtonChild from './page.member-ip-address-delete-button.child';
import PageMemberIpAddressAddButtonChild from './page.member-ip-address-add-button.child';
import {Address4, Address6} from 'ip-address';

async function updateMemberAuthorizedServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const memberAddress:null|FormDataEntryValue = formData.get('member-address');
  if(memberAddress===null || typeof memberAddress!=='string'){return;}
  const authorized:null|FormDataEntryValue = formData.get('authorized');
  if(authorized===null || typeof authorized!=='string'){return;}
  await PostZerotierOneNetworkMemberUpdate(networkId,memberAddress,{authorized:authorized==='true'});
  revalidatePath('/controller/network/','page');
};

async function updateMemberActiveBridgeServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const memberAddress:null|FormDataEntryValue = formData.get('member-address');
  if(memberAddress===null || typeof memberAddress!=='string'){return;}
  const activeBridge:null|FormDataEntryValue = formData.get('active-bridge');
  if(activeBridge===null || typeof activeBridge!=='string'){return;}
  await PostZerotierOneNetworkMemberUpdate(networkId,memberAddress,{activeBridge:activeBridge==='true'});
  revalidatePath('/controller/network/','page');
};

async function updateMemberNoAutoAssignIpsServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const memberAddress:null|FormDataEntryValue = formData.get('member-address');
  if(memberAddress===null || typeof memberAddress!=='string'){return;}
  const noAutoAssignIps:null|FormDataEntryValue = formData.get('no-auto-assign-ips');
  if(noAutoAssignIps===null || typeof noAutoAssignIps!=='string'){return;}
  await PostZerotierOneNetworkMemberUpdate(networkId,memberAddress,{noAutoAssignIps:noAutoAssignIps==='true'});
  revalidatePath('/controller/network/','page');
};

async function deleteMemberServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const memberAddress:null|FormDataEntryValue = formData.get('member-address');
  if(memberAddress===null || typeof memberAddress!=='string'){return;}
  await DeleteZerotierOneNetworkMember(networkId,memberAddress);
  revalidatePath('/controller/network/','page');
};

async function addMemberIpAddressServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const memberAddress:null|FormDataEntryValue = formData.get('member-address');
  if(memberAddress===null || typeof memberAddress!=='string'){return;}
  const existIpAddress:null|FormDataEntryValue = formData.get('exist-ip-address');
  if(existIpAddress===null || typeof existIpAddress!=='string'){return;}
  const ipAddress:null|FormDataEntryValue = formData.get('ip-address');
  if(ipAddress===null || typeof ipAddress!=='string'){return;}
  if(!Address6.isValid(ipAddress) && !Address4.isValid(ipAddress)){return;}
  const ipAssignments:Array<string> = existIpAddress.split(';');
  if(ipAssignments.includes(ipAddress)){return;}
  ipAssignments.push(ipAddress);
  await PostZerotierOneNetworkMemberUpdate(networkId,memberAddress,{ipAssignments:ipAssignments});
  revalidatePath('/controller/network/','page');
};

async function deleteMemberIpAddressServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const memberAddress:null|FormDataEntryValue = formData.get('member-address');
  if(memberAddress===null || typeof memberAddress!=='string'){return;}
  const existIpAddress:null|FormDataEntryValue = formData.get('exist-ip-address');
  if(existIpAddress===null || typeof existIpAddress!=='string'){return;}
  const ipAddress:null|FormDataEntryValue = formData.get('ip-address');
  if(ipAddress===null || typeof ipAddress!=='string'){return;}
  if(!Address6.isValid(ipAddress) && !Address4.isValid(ipAddress)){return;}
  const ipAssignments:Array<string> = existIpAddress.split(';');
  const index:number = ipAssignments.indexOf(ipAddress);
  if(index<0){return;}
  ipAssignments.splice(index,1);
  await PostZerotierOneNetworkMemberUpdate(networkId,memberAddress,{ipAssignments:ipAssignments});
  revalidatePath('/controller/network/','page');
};

export default async function PageMemberItemChild(props:{
  networkData:ZerotierOneNetwork,
  address:string,
  counter:number
}) : Promise<ReactElement> {
  const {networkData,address} = props;

  const {data:memberData,error:memberError} = await GetZerotierOneNetworkMember(networkData.id,address);

  if(memberError || !memberData){return <p className="p-2">获取 {address} 成员节点信息失败，{memberError||'接口无响应'}</p>;}
  return <li className="border-b last:border-none border-stone-200/100 py-3 space-y-4">
    <div className="text-sm flex">
      <span className="flex-1">成员地址：{memberData.address}</span>
      <span className="flex-1">客户端版本：{memberData.vMajor}.{memberData.vMinor}.{memberData.vRev}</span>
      <form className="flex-1 flex items-center" action={deleteMemberServerAction}><PageMemberDeleteButtonChild networkId={networkData.id} memberAddress={memberData.address} publicNetwork={!networkData.private} authorized={memberData.authorized} /></form>
    </div>
    <div className="text-sm flex">
      <form className="flex-1 flex items-center" action={updateMemberAuthorizedServerAction}>授权访问：<PageMemberAuthorizedUpdateChild networkId={networkData.id} memberAddress={memberData.address} memberAuthorized={memberData.authorized} /></form>
      <form className="flex-1 flex items-center" action={updateMemberActiveBridgeServerAction}>允许桥接：<PageMemberAllowBridgeUpdateChild networkId={networkData.id} memberAddress={memberData.address} memberActiveBridge={memberData.activeBridge} /></form>
      <form className="flex-1 flex items-center" action={updateMemberNoAutoAssignIpsServerAction}>不自动分配托管地址：<PageMemberNoAutoAssignIpsUpdateChild networkId={networkData.id} memberAddress={memberData.address} noAutoAssignIps={memberData.noAutoAssignIps} /></form>
    </div>
    <div className="text-sm flex">
      <span className="flex-1">rfc4193 地址：{networkData.v6AssignMode.rfc4193 ? generateZerotierRFC4193(networkData.id,memberData.address) : '未启用'}</span>
      <span className="flex-1">6plane 地址：{networkData.v6AssignMode['6plane'] ? generateZerotier6PLANE(networkData.id,memberData.address) : '未启用'}</span>
      <span className="flex-1" />
    </div>
    <div className="text-sm flex">
      <span className="flex-shrink-0 text-sm">托管地址：</span>
      <div className="flex-1 flex flex-wrap">
        {memberData.ipAssignments.map(function(item){return <form key={item} action={deleteMemberIpAddressServerAction} data-v6={validateAddress64(item)===6||undefined} data-v4={validateAddress64(item)===4||undefined} className="flex-shrink-0 data-[v6]:w-1/3 data-[v4]:w-1/6 flex items-center mb-2">
          <PageMemberIpAddressDeleteButtonChild networkId={networkData.id} memberAddress={memberData.address} existIpAssignments={memberData.ipAssignments} ipAddress={item} />
        </form>;})}
        <form className="flex-shrink-0 flex items-center mb-2 w-80" action={addMemberIpAddressServerAction}>
          <PageMemberIpAddressAddButtonChild networkId={networkData.id} memberAddress={memberData.address} existIpAssignments={memberData.ipAssignments} />
        </form>
      </div>
    </div>
  </li>;
};
