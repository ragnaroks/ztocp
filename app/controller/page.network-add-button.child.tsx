'use client';

import {Fragment, ReactElement} from 'react';
import {experimental_useFormStatus as useFormStatus} from 'react-dom';
import MaterialDesignIcon from '../../components/material-design-icon';
import {mdiPlus} from '@mdi/js';

export default function PageNetworkAddButtonChild(props:{address:string}) : ReactElement {
  const {pending} = useFormStatus();

  return <Fragment>
    <input type="hidden" name="address" value={props.address} readOnly />
    <button className="w-full flex justify-center items-center py-2 disabled:animate-pulse disabled:bg-stone-300/100 disabled:text-stone-500/100" type="submit" disabled={pending}>
      <MaterialDesignIcon path={mdiPlus} className="w-5" />
      <span>创建网络</span>
    </button>
  </Fragment>;
};
