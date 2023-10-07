'use client';

import {Fragment, ReactElement} from 'react';
import {experimental_useFormStatus as useFormStatus} from 'react-dom';
import MaterialDesignIcon from '../../../components/material-design-icon';
import {mdiDelete, mdiLoading} from '@mdi/js';

export default function PageMemberIpAddressDeleteButtonChild(props:{
  networkId:string,
  memberAddress:string,
  existIpAssignments:Array<string>,
  ipAddress:string
}) : ReactElement {
  const {networkId,memberAddress,existIpAssignments,ipAddress} = props;

  const {pending} = useFormStatus();

  if(pending){return <Fragment>
    <span className="border border-stone-300/100 px-1">{ipAddress}</span>
    <button disabled className="border border-stone-300/100 border-l-0"><MaterialDesignIcon path={mdiLoading} className="w-5 animate-spin" /></button>
  </Fragment>;}
  return <Fragment>
    <input type="hidden" name="network-id" value={networkId} readOnly />
    <input type="hidden" name="member-address" value={memberAddress} readOnly />
    <input type="hidden" name="exist-ip-address" value={existIpAssignments.join(';')} readOnly />
    <input type="hidden" name="ip-address" value={ipAddress} readOnly />
    <span className="border border-stone-300/100 px-1">{ipAddress}</span>
    <button type="submit" className="border border-stone-300/100 border-l-0 p-0.5"><MaterialDesignIcon path={mdiDelete} className="w-4" /></button>
  </Fragment>;
};
