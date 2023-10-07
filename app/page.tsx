'use client';

import {useRouter} from 'next/navigation';
import {ReactElement,useEffect} from 'react';
import {pictureWindows7Loading} from '../assets/picture';

export default function Page() : ReactElement {
  const {replace} = useRouter();

  useEffect(function(){
    replace('/controller/');
  },[replace]);

  return <main className="flex-1 flex justify-center items-center">
    {/* <MaterialDesignIcon path={mdiLoading} className="w-16 animate-spin" /> */}
    <img src={pictureWindows7Loading} alt="loading" />
  </main>;
};
