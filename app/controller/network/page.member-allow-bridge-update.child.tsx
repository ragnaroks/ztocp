'use client';

import {Fragment, ReactElement} from 'react';
import {experimental_useFormStatus as useFormStatus} from 'react-dom';
import MaterialDesignIcon from '../../../components/material-design-icon';
import {mdiCheck, mdiClose, mdiLoading} from '@mdi/js';

export default function PageMemberAllowBridgeUpdateChild(props:{
  networkId:string,
  memberAddress:string,
  memberActiveBridge:boolean
}) : ReactElement {
  const {networkId,memberAddress,memberActiveBridge} = props;

  const {pending} = useFormStatus();

  if(pending){return <button disabled><MaterialDesignIcon path={mdiLoading} className="w-4 animate-spin" /></button>;}
  return <Fragment>
    <input type="hidden" name="network-id" value={networkId} readOnly />
    <input type="hidden" name="member-address" value={memberAddress} readOnly />
    <input type="hidden" name="active-bridge" value={memberActiveBridge?'false':'true'} readOnly />
    <button type="submit" data-authorized={memberActiveBridge||undefined} className="bg-stone-300/100 data-[authorized]:bg-blue-500/100 data-[authorized]:text-white/100"><MaterialDesignIcon path={memberActiveBridge?mdiCheck:mdiClose} className="w-4" /></button>
  </Fragment>;
};
