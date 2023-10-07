'use client';

import {ChangeEvent, Fragment, ReactElement, useCallback, useState} from 'react';
import {experimental_useFormStatus as useFormStatus} from 'react-dom';

export default function PageNetworkMulticastLimitUpdateChild(props:{networkMulticastLimit:number}) : ReactElement {
  const {pending} = useFormStatus();
  const [value,valueSetter] = useState<number>(props.networkMulticastLimit);
  
  const handleChange = useCallback(function(event:ChangeEvent<HTMLInputElement>){
    const v1:number = event.currentTarget.valueAsNumber;
    if(isNaN(v1) || v1<0 || v1>255){return;}
    valueSetter(v1);
  },[valueSetter]);

  if(pending){return <Fragment>
    <input type="number" value={value} disabled readOnly className="flex-shrink-0 w-24 border border-stone-300/100 px-1" />
    <span className="flex-shrink-0 w-4" />
    <button disabled className="flex-shrink-0 px-4 py-0.5 text-sm bg-stone-300/100 text-stone-500/100 animate-pulse">更新中</button>
  </Fragment>;}
  return <Fragment>
    <input type="number" name="network-multicast-limit" required value={value} className="flex-shrink-0 w-24 border border-stone-300/100 px-1" onChange={handleChange} />
    <span className="flex-shrink-0 w-4" />
    <button className="flex-shrink-0 px-4 py-0.5 text-sm bg-site-zerotier/100 hover:bg-yellow-400/100">提交</button>
  </Fragment>;
};
