'use client';

import {Fragment, ReactElement} from 'react';
import {experimental_useFormStatus as useFormStatus} from 'react-dom';
import MaterialDesignIcon from '../../../components/material-design-icon';
import {mdiAlertCircleOutline, mdiCheck} from '@mdi/js';

export default function PageNetworkEnableBroadcastUpdateChild(props:{networkEnableBroadcast:boolean}) : ReactElement {
  const {pending} = useFormStatus();
  
  if(pending){return <button disabled className="flex-shrink-0 px-4 py-0.5 text-sm bg-stone-300/100 text-stone-500/100 animate-pulse">切换中</button>;}
  return <Fragment>
    <button type="submit" data-checked={props.networkEnableBroadcast||undefined} className="flex-shrink-0 text-sm flex items-center gap-x-2 px-2 py-0.5 border border-stone-300/100 text-stone-500/100 data-[checked]:border-blue-500/100 data-[checked]:text-blue-500/100">
      <span>{props.networkEnableBroadcast?'允许':'阻止'}广播</span>
      <MaterialDesignIcon path={props.networkEnableBroadcast?mdiCheck:mdiAlertCircleOutline} className="w-4" />
    </button>
  </Fragment>;
};
