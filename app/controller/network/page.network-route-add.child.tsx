'use client';

import {ChangeEvent, Fragment, ReactElement, useCallback, useEffect, useState} from 'react';
import {experimental_useFormStatus as useFormStatus} from 'react-dom';

export default function PageNetworkRouteAddChild() : ReactElement {
  const {pending} = useFormStatus();
  const [value1,value1Setter] = useState<string>('');
  const [value2,value2Setter] = useState<string>('');
  
  const handleChangeValue1 = useCallback(function(event:ChangeEvent<HTMLInputElement>){
    if(event.currentTarget.value.length>43){return;}
    value1Setter(event.currentTarget.value);
  },[value1Setter]);

  const handleChangeValue2 = useCallback(function(event:ChangeEvent<HTMLInputElement>){
    if(event.currentTarget.value.length>39){return;}
    value2Setter(event.currentTarget.value);
  },[value2Setter]);

  useEffect(function(){
    if(!pending){return;}
    value1Setter('');
    value2Setter('');
  },[pending,value1Setter,value2Setter]);

  if(pending){return <Fragment>
    <input disabled value={value1} readOnly placeholder="192.168.144.0/24" className="flex-shrink-0 w-80 border border-stone-300/100 px-1" />
    <span className="flex-shrink-0 px-4 text-sm">via</span>
    <input disabled value={value2} readOnly placeholder="留空为默认路由" className="flex-shrink-0 w-80 border border-stone-300/100 px-1" />
    <span className="flex-shrink-0 w-4" />
    <button disabled className="flex-shrink-0 px-4 py-0.5 text-sm bg-stone-300/100 text-stone-500/100 animate-pulse">更新中</button>
  </Fragment>;}
  return <Fragment>
    <input type="text" name="route-target" required value={value1} placeholder="192.168.144.0/24" className="flex-shrink-0 w-80 border border-stone-300/100 px-1" onChange={handleChangeValue1} />
    <span className="flex-shrink-0 px-4 text-sm">via</span>
    <input type="text" name="route-via" value={value2} placeholder="留空为默认路由" className="flex-shrink-0 w-80 border border-stone-300/100 px-1" onChange={handleChangeValue2} />
    <span className="flex-shrink-0 w-4" />
    <button type="submit" className="flex-shrink-0 px-4 py-0.5 text-sm bg-site-zerotier/100 hover:bg-yellow-400/100">添加</button>
  </Fragment>;
};
