'use client';

import {ReactElement} from 'react';
import {experimental_useFormStatus as useFormStatus} from 'react-dom';

export default function PageNetworkDnsServerDeleteChild() : ReactElement {
  const {pending} = useFormStatus();
  
  if(pending){return <button disabled className="flex-shrink-0 px-4 py-0.5 text-sm bg-stone-300/100 text-stone-500/100 animate-pulse">更新中</button>;}
  return <button type="submit" className="flex-shrink-0 px-4 py-0.5 text-sm bg-site-zerotier/100 hover:bg-yellow-400/100">删除</button>;
};
