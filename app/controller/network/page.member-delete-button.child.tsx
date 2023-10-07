'use client';

import {Fragment, ReactElement} from 'react';
import {experimental_useFormStatus as useFormStatus} from 'react-dom';
import MaterialDesignIcon from '../../../components/material-design-icon';
import {mdiLoading} from '@mdi/js';

export default function PageMemberDeleteButtonChild(props:{
  networkId:string,
  memberAddress:string,
  authorized:boolean,
  publicNetwork:boolean
}) : ReactElement {
  const {networkId,memberAddress,authorized,publicNetwork} = props;

  const {pending} = useFormStatus();

  if(publicNetwork || authorized){return <button disabled className="bg-stone-300/100 text-stone-500/100 px-1">删除成员</button>;}
  if(pending){return <button disabled><MaterialDesignIcon path={mdiLoading} className="w-4 animate-spin" /></button>;}
  return <Fragment>
    <input type="hidden" name="network-id" value={networkId} readOnly />
    <input type="hidden" name="member-address" value={memberAddress} readOnly />
    <button type="submit" className="bg-red-500/100 text-white/100 px-1">删除成员</button>
  </Fragment>;
};
