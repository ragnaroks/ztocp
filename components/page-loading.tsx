import {ReactElement} from 'react';
import MaterialDesignIcon from './material-design-icon';
import {mdiLoading} from '@mdi/js';

export default function PageLoading() : ReactElement {
  return <div className="absolute top-0 left-0 bg-white/70 w-screen h-screen flex justify-center items-center">
    <MaterialDesignIcon path={mdiLoading} className="w-24 h-24 animate-spin text-site-zerotier/100" />
  </div>;
};
