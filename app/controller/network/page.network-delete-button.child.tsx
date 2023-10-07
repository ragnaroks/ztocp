'use client';

import {Fragment, ReactElement} from 'react';
import {experimental_useFormStatus as useFormStatus} from 'react-dom';
import MaterialDesignIcon from '../../../components/material-design-icon';
import {mdiDelete} from '@mdi/js';

export default function PageNetworkDeleteButtonChild(props:{networkId:string}) : ReactElement {
  const {pending} = useFormStatus();

  return <Fragment>
    <input type="hidden" name="network-id" value={props.networkId} readOnly />
    <button type="submit" disabled={pending} className="w-full flex justify-center items-center py-2 text-red-500/100 disabled:animate-pulse disabled:bg-stone-300/100 disabled:text-stone-500/100">
      <MaterialDesignIcon path={mdiDelete} className="w-5" />
      <span>删除网络</span>
    </button>
  </Fragment>;
};
