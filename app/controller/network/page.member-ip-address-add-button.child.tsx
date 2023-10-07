'use client';

import {Fragment, ReactElement, useCallback, useState} from 'react';
import {experimental_useFormStatus as useFormStatus} from 'react-dom';
import MaterialDesignIcon from '../../../components/material-design-icon';
import {mdiLoading, mdiPlus} from '@mdi/js';

export default function PageMemberIpAddressAddButtonChild(props:{
  networkId:string,
  memberAddress:string,
  existIpAssignments:Array<string>
}) : ReactElement {
  const {networkId,memberAddress,existIpAssignments} = props;

  const {pending} = useFormStatus();
  const [value,valueSetter] = useState<string>('');

  const handleClick = useCallback(function(){
    setTimeout(function(){
      valueSetter('');
    },100);
  },[valueSetter]);

  if(pending){return <Fragment>
    <input disabled type="text" name="ip-address" value={value} readOnly className="w-full border border-stone-300/100 px-1" />
    <button disabled className="border border-stone-300/100 border-l-0"><MaterialDesignIcon path={mdiLoading} className="w-5 animate-spin" /></button>
  </Fragment>;}
  return <Fragment>
    <input type="hidden" name="network-id" value={networkId} readOnly />
    <input type="hidden" name="member-address" value={memberAddress} readOnly />
    <input type="hidden" name="exist-ip-address" value={existIpAssignments.join(';')} readOnly />
    <input type="text" name="ip-address" value={value} placeholder="192.168.144.123" className="w-full border border-stone-300/100 px-1" onChange={event=>valueSetter(event.currentTarget.value)} />
    <button type="submit" className="border border-stone-300/100 border-l-0" onClick={handleClick}><MaterialDesignIcon path={mdiPlus} className="w-5" /></button>
  </Fragment>;
};
