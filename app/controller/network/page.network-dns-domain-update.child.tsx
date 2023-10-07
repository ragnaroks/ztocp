'use client';

import {ChangeEvent, Fragment, ReactElement, useCallback, useState} from 'react';
import {experimental_useFormStatus as useFormStatus} from 'react-dom';

export default function PageNetworkDnsDomainUpdateChild(props:{networkDnsDomain:string}) : ReactElement {
  const {pending} = useFormStatus();
  const [value,valueSetter] = useState<string>(props.networkDnsDomain);
  
  const handleChange = useCallback(function(event:ChangeEvent<HTMLInputElement>){
    if(event.currentTarget.value.length>127){return;}
    valueSetter(event.currentTarget.value);
  },[valueSetter]);

  if(pending){return <Fragment>
    <input type="text" value={value} disabled readOnly className="flex-shrink-0 w-80 border border-stone-300/100 px-1" />
    <span className="flex-shrink-0 w-4" />
    <button disabled className="flex-shrink-0 px-4 py-0.5 text-sm bg-stone-300/100 text-stone-500/100 animate-pulse">更新中</button>
  </Fragment>;}
  return <Fragment>
    <input type="text" name="network-dns-domain" value={value} placeholder="home.arpa" className="flex-shrink-0 w-80 border border-stone-300/100 px-1" onChange={handleChange} />
    <span className="flex-shrink-0 w-4" />
    <button className="flex-shrink-0 px-4 py-0.5 text-sm bg-site-zerotier/100 hover:bg-yellow-400/100">提交</button>
  </Fragment>;
};
