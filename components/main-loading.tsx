import {ReactElement} from 'react';
import MaterialDesignIcon from './material-design-icon';
import {mdiLoading} from '@mdi/js';

export default function MainLoading() : ReactElement {
  return <div className="flex-1 bg-white/100 pointer-events-none flex items-center justify-center">
    <MaterialDesignIcon path={mdiLoading} className="w-32 h-32 animate-spin text-site-zerotier/100" />
  </div>;
};
