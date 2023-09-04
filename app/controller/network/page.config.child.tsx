'use client';

import {ReactElement, useCallback, useState, SyntheticEvent, MouseEvent} from 'react';
import {toast} from 'react-hot-toast';
import {generateAssignmentPoolArray,generateZerotier6PLANE,generateZerotierRFC4193,validateRouteTarget, validateRouteVia} from '../../../libraries/helper/function';
import useGetZerotierControllerNetwork from '../../../swr/use-get-zerotier-controller-network';
import usePostZerotierControllerNetworkUpdate from '../../../swr/use-post-zerotier-controller-network-update';

export default function PageConfigChild(props:DefaultComponentProps & {networkId:string}) : ReactElement {
  const {className,networkId} = props;

  const {isLoading,error,data,mutate} = useGetZerotierControllerNetwork(networkId);
  const [temporaryRouteDestination,temporaryRouteDestinationSetter] = useState<string>('');
  const [temporaryRouteVia,temporaryRouteViaSetter] = useState<string>('');
  const [temporaryDnsServerAddress,temporaryDnsServerAddressSetter] = useState<string>('');
  const {trigger:updateTrigger,isMutating:updateMutating} = usePostZerotierControllerNetworkUpdate(networkId);

  const patch = useCallback(function(patch:ZerotierOneNetworkPatch){
    if(!data){return;}
    updateTrigger(patch).then(function(stream){
      if(!stream){return;}
      mutate(stream,{revalidate:false});
    }).catch(function(exception){
      toast.error('更新网络配置失败，'+exception);
    });
  },[data,updateTrigger,mutate]);

  const handleBlurName = useCallback(function(event:SyntheticEvent<HTMLInputElement>){
    if(!data || !event.currentTarget.value || data.name===event.currentTarget.value){return;}
    patch({name:event.currentTarget.value});
  },[data,patch]);

  const changePrivate = useCallback(function(value:boolean){
    if(!data || data.private===value){return;}
    patch({private:value});
  },[data,patch]);

  const changeEnableBroadcast = useCallback(function(value:boolean){
    if(!data || data.enableBroadcast===value){return;}
    patch({enableBroadcast:value});
  },[data,patch]);

  const handleBlurMulticastLimit = useCallback(function(event:SyntheticEvent<HTMLInputElement>){
    if(!globalThis || !globalThis.self || !globalThis.self.confirm){return;}
    if(!data || !event.currentTarget.value || event.currentTarget.type!=='number' || event.currentTarget.valueAsNumber<0 || data.multicastLimit===event.currentTarget.valueAsNumber){return;}
    if(event.currentTarget.valueAsNumber<1 && !globalThis.self.confirm('多播上限小于 1 时将导致 IPv4 网络停摆，确认操作？')){return;}
    patch({multicastLimit:event.currentTarget.valueAsNumber});
  },[data,patch]);

  const handleClickV4AssignMode = useCallback(function(event:MouseEvent<HTMLInputElement>){
    if(!data){return;}
    const v4AssignMode:{zt:boolean} = {...data.v4AssignMode};
    switch(event.currentTarget.value){
      case 'zt':
        v4AssignMode.zt = !v4AssignMode.zt;
      break;
      default:return;
    }
    patch({v4AssignMode:v4AssignMode});
  },[data,patch]);

  const handleClickV6AssignMode = useCallback(function(event:MouseEvent<HTMLInputElement>){
    if(!data){return;}
    const v6AssignMode:{zt:boolean,rfc4193:boolean,'6plane':boolean} = {...data.v6AssignMode};
    switch(event.currentTarget.value){
      case 'zt':
        v6AssignMode.zt = !v6AssignMode.zt;
      break;
      case 'rfc4193':
        v6AssignMode.rfc4193 = !v6AssignMode.rfc4193;
      break;
      case '6plane':
        v6AssignMode['6plane'] = !v6AssignMode['6plane'];
      break;
      default:return;
    }
    patch({v6AssignMode:v6AssignMode});
  },[data,patch]);

  const handleClickAddRoute = useCallback(function(){
    /* 路由功能参考 https://jose.scjtqs.com/zhaji/2022-06-17-1845/zerotier-%e7%bb%84%e7%bd%91%e7%ae%80%e8%a6%81%e4%bd%bf%e7%94%a8%e8%af%b4%e6%98%8e.html */
    if(!data || !temporaryRouteDestination){return;}
    const route:{target:string,via:null|string} = {target:temporaryRouteDestination,via:temporaryRouteVia||null};
    if(data.routes.some(item=>item.target===route.target)){
      toast('路由 target 已存在');
      return;
    }
    if(!validateRouteVia(route.via)){
      toast.error('路由 via 格式错误');
      return;
    }
    if(!validateRouteTarget(route.target)){
      toast.error('路由 target 格式错误');
      return;
    }
    const routes = [...data.routes,route];
    const ipAssignmentPools = generateAssignmentPoolArray(routes);
    patch({routes:routes,ipAssignmentPools:ipAssignmentPools});
    temporaryRouteDestinationSetter('');
    temporaryRouteViaSetter('');
  },[data,temporaryRouteDestination,temporaryRouteVia,patch,temporaryRouteDestinationSetter,temporaryRouteViaSetter]);

  const deleteRoute = useCallback(function(route:{target:string,via:null|string}){
    if(!globalThis || !globalThis.self || !globalThis.self.confirm){return;}
    if(!globalThis.self.confirm('确认删除路由 '+route.target+'？')){return;}
    if(!data || !data.routes.some(item=>item.target===route.target)){return;}
    const routes = data.routes.filter(item=>item.target!==route.target);
    const ipAssignmentPools = generateAssignmentPoolArray(routes);
    patch({routes:routes,ipAssignmentPools:ipAssignmentPools});
  },[data,patch]);

  const handleBlurDnsSearchDomain = useCallback(function(event:SyntheticEvent<HTMLInputElement>){
    if(!globalThis || !globalThis.self || !globalThis.self.confirm){return;}
    if(!data || data.dns.domain===event.currentTarget.value){return;}
    const dns:{domain:string,servers:Array<string>} = {...data.dns};
    dns.domain = event.currentTarget.value;
    patch({dns:dns});
  },[data,patch]);

  const handleClickAddDnsServer = useCallback(function(){
    if(!data || !temporaryDnsServerAddress){return;}
    if(data.dns.servers.some(item=>item===temporaryDnsServerAddress)){
      toast('DNS 服务器已存在');
      return;
    }
    if(!validateRouteVia(temporaryDnsServerAddress)){
      toast.error('DNS 服务器格式错误');
      return;
    }
    const dns:{domain:string,servers:Array<string>} = {...data.dns};
    dns.servers.push(temporaryDnsServerAddress);
    patch({dns:dns});
    temporaryDnsServerAddressSetter('');
  },[data,temporaryDnsServerAddress,patch,temporaryDnsServerAddressSetter]);

  const deleteDnsServer = useCallback(function(server:string){
    if(!globalThis || !globalThis.self || !globalThis.self.confirm){return;}
    if(!globalThis.self.confirm('确认删除 DNS 服务器 '+server+'？')){return;}
    if(!data || !data.dns.servers.some(item=>item===server)){return;}
    const dns:{domain:string,servers:Array<string>} = {...data.dns};
    dns.servers = dns.servers.filter(item=>item!==server);
    patch({dns:dns});
  },[data,patch]);

  if(isLoading){return <div className={className+' animate-pulse'}>正在获取 {networkId} 的数据</div>;}
  if(error || !data){return <div className={className}>获取 {networkId} 的数据失败，{error||'接口无响应'}</div>;}
  return <div className={className}>
    <fieldset className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">名称：</span>
      <input disabled={updateMutating} defaultValue={data.name} maxLength={63} className="flex-shrink-0 w-1/2 border border-stone-300/100 px-1" onBlur={handleBlurName} />
      <span className="flex-1" />
      <span className="flex-shrink-0 pl-4 text-sm text-stone-500/100">失去焦点时自动提交</span>
    </fieldset>
    <hr />
    <fieldset className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">访问控制：</span>
      <label className="flex-shrink-0 text-sm flex items-center">
        <input disabled={updateMutating} type="radio" value="false" readOnly checked={!data.private} onClick={()=>changePrivate(false)} />
        <span>&nbsp;公开</span>
      </label>
      <span className="flex-shrink-0 w-24" />
      <label className="flex-shrink-0 text-sm flex items-center">
        <input disabled={updateMutating} type="radio" value="true" readOnly checked={data.private} onClick={()=>changePrivate(true)} />
        <span>&nbsp;私有</span>
      </label>
      <span className="flex-1" />
      <span className="flex-shrink-0 pl-4 text-sm text-stone-500/100"><strong>“公开”</strong>网络任何节点都可以免授权加入且无法移除</span>
    </fieldset>
    <hr />
    <fieldset className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">广播控制：</span>
      <label className="flex-shrink-0 text-sm flex items-center">
        <input disabled={updateMutating} type="radio" value="false" readOnly checked={data.enableBroadcast} onClick={()=>changeEnableBroadcast(true)} />
        <span>&nbsp;允许</span>
      </label>
      <span className="flex-shrink-0 w-24" />
      <label className="flex-shrink-0 text-sm flex items-center">
        <input disabled={updateMutating} type="radio" value="true" readOnly checked={!data.enableBroadcast} onClick={()=>changeEnableBroadcast(false)} />
        <span>&nbsp;禁止</span>
      </label>
      <span className="flex-1" />
      <span className="flex-shrink-0 pl-4 text-sm text-stone-500/100">如果不知道作用保持<strong>“允许”</strong>即可</span>
    </fieldset>
    <hr />
    <fieldset className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">多播上限：</span>
      <input disabled={updateMutating} type="number" min={0} max={32768} defaultValue={data.multicastLimit} className="flex-shrink-0 w-24 border border-stone-300/100 px-1" onBlur={handleBlurMulticastLimit} />
      <span className="flex-1" />
      <span className="flex-shrink-0 pl-4 text-sm text-stone-500/100">如果不知道作用保持<strong>“32”</strong>即可</span>
    </fieldset>
    <hr />
    <fieldset className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">IPv4：</span>
      <label className="flex-shrink-0 text-sm flex items-center">
        <input disabled={updateMutating} type="checkbox" readOnly value="zt" checked={data.v4AssignMode.zt} onClick={handleClickV4AssignMode} />
        <span>&nbsp;从地址池中自动分配</span>
      </label>
    </fieldset>
    <hr />
    <fieldset className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">IPv6：</span>
      <label className="flex-shrink-0 text-sm flex items-center">
        <input disabled={updateMutating} type="checkbox" readOnly value="zt" checked={data.v6AssignMode.zt} onClick={handleClickV6AssignMode} />
        <span>&nbsp;从地址池中自动分配</span>
      </label>
      <span className="flex-shrink-0 w-24" />
      <label className="flex-shrink-0 text-sm flex items-center">
        <input disabled={updateMutating} type="checkbox" readOnly value="rfc4193" checked={data.v6AssignMode.rfc4193} onClick={handleClickV6AssignMode} />
        <span>&nbsp;ZeroTier RFC4193（{generateZerotierRFC4193(networkId)}）</span>
      </label>
      <span className="flex-shrink-0 w-24" />
      <label className="flex-shrink-0 text-sm flex items-center">
        <input disabled={updateMutating} type="checkbox" readOnly value="6plane" checked={data.v6AssignMode['6plane']} onClick={handleClickV6AssignMode} />
        <span>&nbsp;ZeroTier 6PLANE（{generateZerotier6PLANE(networkId)}）</span>
      </label>
    </fieldset>
    <hr />
    <fieldset className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">托管路由：</span>
      <div className="w-7/12 flex items-center">
        <input disabled={updateMutating} placeholder="192.168.144.0/24" value={temporaryRouteDestination} maxLength={42} className="flex-1 border border-stone-300/100 px-1" onChange={event=>temporaryRouteDestinationSetter(event.currentTarget.value.trim())} />
        <span className="flex-shrink-0 px-4 text-sm">via</span>
        <input disabled={updateMutating} placeholder="留空为默认路由" value={temporaryRouteVia} maxLength={38} className="flex-1 border border-stone-300/100 px-1" onChange={event=>temporaryRouteViaSetter(event.currentTarget.value.trim())} />
      </div>
      <span className="flex-1" />
      <button disabled={updateMutating} className="flex-shrink-0 w-16 h-6 text-sm bg-site-zerotier/100 disabled:bg-stone-300/100 disabled:text-stone-500/100 disabled:animate-pulse" onClick={handleClickAddRoute}>增加</button>
    </fieldset>
    <ul className="my-3">{data.routes.map(function(item){
      return <li key={item.target} className="my-3 flex text-sm">
        <span className="flex-shrink-0 w-24" />
        <div className="w-7/12 flex">
          <span className="flex-1 px-1">{item.target}</span>
          <span className="flex-shrink-0 px-4">via</span>
          <span className="flex-1 px-1">{item.via||'默认路由'}</span>
        </div>
        <span className="flex-1" />
        <button disabled={updateMutating} className="flex-shrink-0 w-16 h-6 text-sm border border-site-zerotier/100 text-orange-500/100 disabled:bg-stone-300/100 disabled:text-stone-500/100 disabled:border-none disabled:animate-pulse" onClick={()=>deleteRoute(item)}>删除</button>
      </li>;
    })}</ul>
    <hr />
    <fieldset className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">托管地址池：</span>
      <span className="flex-shrink-0 text-sm">强制与托管路由同步（可以被 zerotier 处理的地址必定是托管路由中定义的子网）</span>
      <span className="flex-1" />
    </fieldset>
    <ul className="my-3">{data.ipAssignmentPools.map(function(item){
      return <li key={`${item.ipRangeStart}-to-${item.ipRangeEnd}`} className="my-3 text-sm pl-24">{item.ipRangeStart}&nbsp;-&nbsp;{item.ipRangeEnd}</li>;
    })}</ul>
    <hr />
    <fieldset className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">DNS 搜索域：</span>
      <input disabled={updateMutating} placeholder="home.arpa" maxLength={255} defaultValue={data.dns.domain} className="flex-shrink-0 w-1/2 border border-stone-300/100 px-1" onBlur={handleBlurDnsSearchDomain} />
      <span className="flex-1" />
      <span className="flex-shrink-0 pl-4 text-sm text-stone-500/100">如果不知道作用保持<strong>“空值”</strong>即可</span>
    </fieldset>
    <hr />
    <fieldset className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">DNS 服务器：</span>
      <input disabled={updateMutating} placeholder="10.0.0.53" value={temporaryDnsServerAddress} maxLength={39} className="flex-shrink-0 w-96 border border-stone-300/100 px-1" onChange={event=>temporaryDnsServerAddressSetter(event.currentTarget.value.trim())} />
      <span className="flex-1" />
      <button disabled={updateMutating} className="flex-shrink-0 w-16 h-6 text-sm bg-site-zerotier/100 disabled:bg-stone-300/100 disabled:text-stone-500/100 disabled:animate-pulse" onClick={handleClickAddDnsServer}>增加</button>
    </fieldset>
    <ul className="my-3">{data.dns.servers.map(function(item){
      return <li key={item} className="my-3 flex text-sm">
        <span className="flex-shrink-0 w-24" />
        <span className="flex-shrink-0 px-1">{item}</span>
        <span className="flex-1" />
        <button disabled={updateMutating} className="flex-shrink-0 w-16 h-6 text-sm border border-site-zerotier/100 text-orange-500/100 disabled:bg-stone-300/100 disabled:text-stone-500/100 disabled:border-none disabled:animate-pulse" onClick={()=>deleteDnsServer(item)}>删除</button>
      </li>;
    })}</ul>
    <hr />
    <fieldset className="flex items-center my-3">
      <span className="flex-shrink-0 w-24 text-sm">规则：</span>
      <span className="flex-shrink-0 text-sm">暂不支持通过此界面修改（主要是不会）</span>
      <span className="flex-1" />
    </fieldset>
    <ul className="my-3">{data.rules.map(function(item){
      return <li key={`${item.type}-${item.etherType}-${item.not}-${item.or}`} className="my-3 text-sm pl-24">
        <span className="inline-block w-1/4">type：{item.type}</span>
        <span className="inline-block w-1/4">etherType：{item.etherType||'未定义'}</span>
        <span className="inline-block w-1/4">not：{item.not?.toString()}</span>
        <span className="inline-block w-1/4">or：{item.or?.toString()}</span>
      </li>;
    })}</ul>
  </div>;
};
