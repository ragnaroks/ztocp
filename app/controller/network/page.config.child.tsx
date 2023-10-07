import {ReactElement} from 'react';
import {generateAssignmentPoolArray,generateZerotier6PLANE,generateZerotierRFC4193,validateRouteTarget, validateRouteVia} from '../../../libraries/helper/function';
import {PostZerotierOneNetworkUpdate} from '../../../libraries/request/zerotier-one';
import {revalidatePath} from 'next/cache';
import PageNetworkNameUpdateChild from './page.network-name-update.child';
import PageNetworkPrivateUpdateChild from './page.network-private-update.child';
import PageNetworkEnableBroadcastUpdateChild from './page.network-enable-broadcast-update.child';
import PageNetworkMulticastLimitUpdateChild from './page.network-multicast-limit-update.child';
import PageNetworkV4AssignModeZtUpdateChild from './page.network-v4-assign-mode-zt-update.child';
import PageNetworkV6AssignModeZtUpdateChild from './page.network-v6-assign-mode-zt-update.child';
import PageNetworkV6AssignModeRfc4193UpdateChild from './page.network-v6-assign-mode-rfc4193-update.child';
import PageNetworkV6AssignModeSixplaneUpdateChild from './page.network-v6-assign-mode-sixplane-update.child';
import PageNetworkRouteAddChild from './page.network-route-add.child';
import PageNetworkRouteDeleteChild from './page.network-route-delete';
import PageNetworkDnsDomainUpdateChild from './page.network-dns-domain-update.child';
import PageNetworkDnsServerAddChild from './page.network-dns-server-add.child';
import PageNetworkDnsServerDeleteChild from './page.network-dns-server-delete';

async function updateNetworkNameServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const networkName:null|FormDataEntryValue = formData.get('network-name');
  if(networkName===null || typeof networkName!=='string'){return;}
  await PostZerotierOneNetworkUpdate(networkId,{name:networkName});
  revalidatePath('/controller/network/','page');
};

async function updateNetworkPrivateServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const networkPrivate:null|FormDataEntryValue = formData.get('network-private');
  if(networkPrivate===null || typeof networkPrivate!=='string'){return;}
  await PostZerotierOneNetworkUpdate(networkId,{private:networkPrivate==='true'});
  revalidatePath('/controller/network/','page');
};

async function updateNetworkEnableBroadcastServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const networkEnableBroadcast:null|FormDataEntryValue = formData.get('network-enable-broadcast');
  if(networkEnableBroadcast===null || typeof networkEnableBroadcast!=='string'){return;}
  await PostZerotierOneNetworkUpdate(networkId,{enableBroadcast:networkEnableBroadcast==='true'});
  revalidatePath('/controller/network/','page');
};

async function updateNetworkMulticastLimitServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const networkMulticastLimit:null|FormDataEntryValue = formData.get('network-multicast-limit');
  if(networkMulticastLimit===null || typeof networkMulticastLimit!=='string'){return;}
  const value:number = parseInt(networkMulticastLimit) || 0;
  await PostZerotierOneNetworkUpdate(networkId,{multicastLimit:value});
  revalidatePath('/controller/network/','page');
};

async function updateNetworkV4AssignModeZtServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const v4AssignModeZt:null|FormDataEntryValue = formData.get('network-v4-assign-mode-zt');
  if(v4AssignModeZt===null || typeof v4AssignModeZt!=='string'){return;}
  await PostZerotierOneNetworkUpdate(networkId,{v4AssignMode:{zt:v4AssignModeZt==='true'}});
  revalidatePath('/controller/network/','page');
};

async function updateNetworkV6AssignModeZtServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const v6AssignModeZt:null|FormDataEntryValue = formData.get('network-v6-assign-mode-zt');
  if(v6AssignModeZt===null || typeof v6AssignModeZt!=='string'){return;}
  await PostZerotierOneNetworkUpdate(networkId,{v6AssignMode:{zt:v6AssignModeZt==='true'}});
  revalidatePath('/controller/network/','page');
};

async function updateNetworkV6AssignModeRfc4193ServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const v6AssignModeRfc4193:null|FormDataEntryValue = formData.get('network-v6-assign-mode-rfc4193');
  if(v6AssignModeRfc4193===null || typeof v6AssignModeRfc4193!=='string'){return;}
  await PostZerotierOneNetworkUpdate(networkId,{v6AssignMode:{rfc4193:v6AssignModeRfc4193==='true'}});
  revalidatePath('/controller/network/','page');
};

async function updateNetworkV6AssignModeSixplaneServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const v6AssignMode6plane:null|FormDataEntryValue = formData.get('network-v6-assign-mode-6plane');
  if(v6AssignMode6plane===null || typeof v6AssignMode6plane!=='string'){return;}
  await PostZerotierOneNetworkUpdate(networkId,{v6AssignMode:{'6plane':v6AssignMode6plane==='true'}});
  revalidatePath('/controller/network/','page');
};

async function addNetworkRouteServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const networkRoutes:null|FormDataEntryValue = formData.get('network-routes');
  if(networkRoutes===null || typeof networkRoutes!=='string'){return;}
  const routeTarget:null|FormDataEntryValue = formData.get('route-target');
  if(routeTarget===null || typeof routeTarget!=='string'){return;}
  const routeVia:null|FormDataEntryValue = formData.get('route-via');
  if(routeVia!==null && typeof routeVia!=='string'){return;}
  let routes:undefined|ZerotierOneNetworkPatch['routes'];
  try{
    routes = JSON.parse(networkRoutes) as ZerotierOneNetwork['routes'];
  }catch{
    return;
  }
  const route:{target:string,via:string|null} = {target:routeTarget,via:routeVia||null};
  if(routes.some(x=>x.target===routeTarget) || !validateRouteVia(route.via) || !validateRouteTarget(route.target)){return;}
  routes.push(route);
  const ipAssignmentPools:ZerotierOneNetworkPatch['ipAssignmentPools'] = generateAssignmentPoolArray(routes);
  await PostZerotierOneNetworkUpdate(networkId,{routes:routes,ipAssignmentPools:ipAssignmentPools});
  revalidatePath('/controller/network/','page');
};

/* 路由功能参考 https://jose.scjtqs.com/zhaji/2022-06-17-1845/zerotier-%e7%bb%84%e7%bd%91%e7%ae%80%e8%a6%81%e4%bd%bf%e7%94%a8%e8%af%b4%e6%98%8e.html */
async function deleteNetworkRouteServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const networkRoutes:null|FormDataEntryValue = formData.get('network-routes');
  if(networkRoutes===null || typeof networkRoutes!=='string'){return;}
  const routeTarget:null|FormDataEntryValue = formData.get('route-target');
  if(routeTarget===null || typeof routeTarget!=='string'){return;}
  const routeVia:null|FormDataEntryValue = formData.get('route-via');
  if(routeVia!==null && typeof routeVia!=='string'){return;}
  let routes:undefined|ZerotierOneNetworkPatch['routes'];
  try{
    routes = JSON.parse(networkRoutes) as ZerotierOneNetwork['routes'];
  }catch{
    return;
  }
  const index:number = routes.findIndex(x=>x.target===routeTarget);
  if(index<0){return;}
  routes.splice(index,1);
  const ipAssignmentPools:ZerotierOneNetworkPatch['ipAssignmentPools'] = generateAssignmentPoolArray(routes);
  await PostZerotierOneNetworkUpdate(networkId,{routes:routes,ipAssignmentPools:ipAssignmentPools});
  revalidatePath('/controller/network/','page');
};

async function updateNetworkDnsDomainServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const networkDns:null|FormDataEntryValue = formData.get('network-dns');
  if(networkDns===null || typeof networkDns!=='string'){return;}
  const networkDnsDomain:null|FormDataEntryValue = formData.get('network-dns-domain');
  if(networkDnsDomain===null || typeof networkDnsDomain!=='string'){return;}
  let dns:undefined|ZerotierOneNetworkPatch['dns'];
  try{
    dns = JSON.parse(networkDns) as ZerotierOneNetwork['dns'];
  }catch{
    return;
  }
  dns.domain = networkDnsDomain;
  await PostZerotierOneNetworkUpdate(networkId,{dns:dns});
  revalidatePath('/controller/network/','page');
};

async function addNetworkDnsServerServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const networkDns:null|FormDataEntryValue = formData.get('network-dns');
  if(networkDns===null || typeof networkDns!=='string'){return;}
  const networkDnsServer:null|FormDataEntryValue = formData.get('network-dns-server');
  if(networkDnsServer===null || typeof networkDnsServer!=='string'){return;}
  let dns:undefined|ZerotierOneNetworkPatch['dns'];
  try{
    dns = JSON.parse(networkDns) as ZerotierOneNetwork['dns'];
  }catch{
    return;
  }
  if(!validateRouteVia(networkDnsServer) || dns.servers.includes(networkDnsServer)){return;}
  dns.servers.push(networkDnsServer);
  await PostZerotierOneNetworkUpdate(networkId,{dns:dns});
  revalidatePath('/controller/network/','page');
};

async function deleteNetworkDnsServerServerAction(formData:FormData) : Promise<void> {
  'use server';
  const networkId:null|FormDataEntryValue = formData.get('network-id');
  if(networkId===null || typeof networkId!=='string'){return;}
  const networkDns:null|FormDataEntryValue = formData.get('network-dns');
  if(networkDns===null || typeof networkDns!=='string'){return;}
  const networkDnsServer:null|FormDataEntryValue = formData.get('network-dns-server');
  if(networkDnsServer===null || typeof networkDnsServer!=='string'){return;}
  let dns:undefined|ZerotierOneNetworkPatch['dns'];
  try{
    dns = JSON.parse(networkDns) as ZerotierOneNetwork['dns'];
  }catch{
    return;
  }
  const index:number = dns.servers.indexOf(networkDnsServer);
  if(index<0){return;}
  dns.servers.splice(index,1);
  await PostZerotierOneNetworkUpdate(networkId,{dns:dns});
  revalidatePath('/controller/network/','page');
};

export default async function PageConfigChild(props:{
  networkData:null|ZerotierOneNetwork,
  networkError:string
}) : Promise<ReactElement> {
  const {networkData,networkError} = props;

  if(networkError || !networkData){return <p className="px-4 py-2">获取网络设置失败，{networkError||'接口无响应'}</p>;}
  return <div className="px-4">
    <form className="flex items-center my-3" action={updateNetworkNameServerAction}>
      <input type="hidden" name="network-id" value={networkData.id} readOnly />
      <span className="flex-shrink-0 w-24 text-sm">名称：</span>
      <PageNetworkNameUpdateChild networkName={networkData.name} />
    </form>
    <hr />
    <form className="flex items-center my-3" action={updateNetworkPrivateServerAction}>
      <input type="hidden" name="network-id" value={networkData.id} readOnly />
      <input type="hidden" name="network-private" value={networkData.private?'false':'true'} readOnly />
      <span className="flex-shrink-0 w-24 text-sm">访问控制：</span>
      <PageNetworkPrivateUpdateChild networkPrivate={networkData.private} />
      <span className="flex-1" />
      <span className="flex-shrink-0 text-sm text-stone-500/100">设置为<strong>“公开”</strong>则任何节点都可以免授权加入且无法移除</span>
    </form>
    <hr />
    <form className="flex items-center my-3" action={updateNetworkEnableBroadcastServerAction}>
      <input type="hidden" name="network-id" value={networkData.id} readOnly />
      <input type="hidden" name="network-enable-broadcast" value={networkData.enableBroadcast?'false':'true'} readOnly />
      <span className="flex-shrink-0 w-24 text-sm">广播控制：</span>
      <PageNetworkEnableBroadcastUpdateChild networkEnableBroadcast={networkData.enableBroadcast} />
      <span className="flex-1" />
      <span className="flex-shrink-0 pl-4 text-sm text-stone-500/100">如果不知道作用保持<strong>“允许”</strong>即可</span>
    </form>
    <hr />
    <form className="flex items-center my-3" action={updateNetworkMulticastLimitServerAction}>
      <input type="hidden" name="network-id" value={networkData.id} readOnly />
      <span className="flex-shrink-0 w-24 text-sm">多播上限：</span>
      <PageNetworkMulticastLimitUpdateChild networkMulticastLimit={networkData.multicastLimit} />
      <span className="flex-1" />
      <span className="flex-shrink-0 text-sm text-stone-500/100">多播上限小于 <strong>“1”</strong> 时将导致 IPv4 网络异常，如果不知道作用保持<strong>“32”</strong>即可</span>
    </form>
    <hr />
    <form className="flex items-center my-3" action={updateNetworkV4AssignModeZtServerAction}>
      <input type="hidden" name="network-id" value={networkData.id} readOnly />
      <input type="hidden" name="network-v4-assign-mode-zt" value={networkData.v4AssignMode.zt?'false':'true'} readOnly />
      <span className="flex-shrink-0 w-24 text-sm">IPv4：</span>
      <PageNetworkV4AssignModeZtUpdateChild zt={networkData.v4AssignMode.zt} />
    </form>
    <hr />
    <form className="flex items-center my-3" action={updateNetworkV6AssignModeZtServerAction}>
      <input type="hidden" name="network-id" value={networkData.id} readOnly />
      <input type="hidden" name="network-v6-assign-mode-zt" value={networkData.v6AssignMode.zt?'false':'true'} readOnly />
      <span className="flex-shrink-0 w-24 text-sm">IPv6：</span>
      <PageNetworkV6AssignModeZtUpdateChild zt={networkData.v6AssignMode.zt} />
    </form>
    <hr />
    <form className="flex items-center my-3" action={updateNetworkV6AssignModeRfc4193ServerAction}>
      <input type="hidden" name="network-id" value={networkData.id} readOnly />
      <input type="hidden" name="network-v6-assign-mode-rfc4193" value={networkData.v6AssignMode.rfc4193?'false':'true'} readOnly />
      <span className="flex-shrink-0 w-24 text-sm">IPv6：</span>
      <PageNetworkV6AssignModeRfc4193UpdateChild rfc4193={networkData.v6AssignMode.rfc4193} />
      <span className="flex-1" />
      <span className="flex-shrink-0 text-sm text-stone-500/100">{generateZerotierRFC4193(networkData.id)}</span>
    </form>
    <hr />
    <form className="flex items-center my-3" action={updateNetworkV6AssignModeSixplaneServerAction}>
      <input type="hidden" name="network-id" value={networkData.id} readOnly />
      <input type="hidden" name="network-v6-assign-mode-6plane" value={networkData.v6AssignMode['6plane']?'false':'true'} readOnly />
      <span className="flex-shrink-0 w-24 text-sm">IPv6：</span>
      <PageNetworkV6AssignModeSixplaneUpdateChild sixplane={networkData.v6AssignMode['6plane']} />
      <span className="flex-1" />
      <span className="flex-shrink-0 text-sm text-stone-500/100">{generateZerotier6PLANE(networkData.id)}</span>
    </form>
    <hr />
    <hr />
    <form className="flex items-center my-3" action={addNetworkRouteServerAction}>
      <input type="hidden" name="network-id" value={networkData.id} readOnly />
      <input type="hidden" name="network-routes" value={JSON.stringify(networkData.routes)} readOnly />
      <span className="flex-shrink-0 w-24 text-sm">托管路由：</span>
      <PageNetworkRouteAddChild />
    </form>
    <div className="my-3">{networkData.routes.map(function(item){
      return <form key={item.target} className="my-3 flex text-sm" action={deleteNetworkRouteServerAction}>
        <input type="hidden" name="network-id" value={networkData.id} readOnly />
        <input type="hidden" name="network-routes" value={JSON.stringify(networkData.routes)} readOnly />
        <input type="hidden" name="route-target" value={item.target} readOnly />
        <span className="flex-shrink-0 w-24" />
        <span className="flex-shrink-0 w-80 px-1">{item.target}</span>
        <span className="flex-shrink-0 px-4">via</span>
        <span className="flex-shrink-0 w-80 px-1">{item.via||'默认路由'}</span>
        <span className="flex-shrink-0 w-4" />
        <PageNetworkRouteDeleteChild />
      </form>;
    })}</div>
    <hr />
    <div className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">托管地址池：</span>
      <span className="flex-shrink-0 text-sm">强制与托管路由同步（可以被 zerotier 处理的地址必定是托管路由中定义的子网）</span>
      <span className="flex-1" />
    </div>
    <ul className="my-3">{networkData.ipAssignmentPools.map(function(item){
      return <li key={`${item.ipRangeStart}-to-${item.ipRangeEnd}`} className="my-3 text-sm pl-24">{item.ipRangeStart}&nbsp;-&nbsp;{item.ipRangeEnd}</li>;
    })}</ul>
    <hr />
    <form className="flex items-center my-3" action={updateNetworkDnsDomainServerAction}>
      <input type="hidden" name="network-id" value={networkData.id} readOnly />
      <input type="hidden" name="network-dns" value={JSON.stringify(networkData.dns)} readOnly />
      <span className="flex-shrink-0 w-24 text-sm">DNS 搜索域：</span>
      <PageNetworkDnsDomainUpdateChild networkDnsDomain={networkData.dns.domain} />
      <span className="flex-1" />
      <span className="flex-shrink-0 pl-4 text-sm text-stone-500/100">如果不知道作用保持<strong>“空值”</strong>即可</span>
    </form>
    <hr />
    <form className="flex items-center my-3" action={addNetworkDnsServerServerAction}>
      <input type="hidden" name="network-id" value={networkData.id} readOnly />
      <input type="hidden" name="network-dns" value={JSON.stringify(networkData.dns)} readOnly />
      <span className="flex-shrink-0 w-24 text-sm">DNS 服务器：</span>
      <PageNetworkDnsServerAddChild />
      <span className="flex-1" />
      <span className="flex-shrink-0 pl-4 text-sm text-stone-500/100">如果不知道作用保持<strong>“清空”</strong>即可</span>
    </form>
    <div className="my-3">{networkData.dns.servers.map(function(item){
      return <form key={item} className="my-3 flex text-sm" action={deleteNetworkDnsServerServerAction}>
        <input type="hidden" name="network-id" value={networkData.id} readOnly />
        <input type="hidden" name="network-dns" value={JSON.stringify(networkData.dns)} readOnly />
        <input type="hidden" name="network-dns-server" value={item} readOnly />
        <span className="flex-shrink-0 w-24" />
        <span className="flex-shrink-0 w-80 px-1">{item}</span>
        <span className="flex-shrink-0 w-4" />
        <PageNetworkDnsServerDeleteChild />
      </form>;
    })}</div>
    <hr />
    <fieldset className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">规则：</span>
      <span className="flex-shrink-0 text-sm">暂不支持通过此界面修改（主要是不会）</span>
      <span className="flex-1" />
    </fieldset>
    <ul className="my-3">{networkData.rules.map(function(item){
      return <li key={`${item.type}-${item.etherType}-${item.not}-${item.or}`} className="my-3 text-sm pl-24">
        <span className="inline-block w-1/4">type：{item.type}</span>
        <span className="inline-block w-1/4">etherType：{item.etherType||'未定义'}</span>
        <span className="inline-block w-1/4">not：{item.not?.toString()}</span>
        <span className="inline-block w-1/4">or：{item.or?.toString()}</span>
      </li>;
    })}</ul>
  </div>;
};
