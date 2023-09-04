'use client';

import {useRouter} from 'next/navigation';
import {ReactElement,useEffect} from 'react';
import {pictureMeltingLoader} from '../assets/picture';

export default function Page() : ReactElement {
  const {replace} = useRouter();

  useEffect(function(){
    replace('/controller/');
  },[replace]);

  return <main className="flex-1 flex justify-center items-center select-none pointer-events-none" style={{backgroundColor:'#0e111f'}}>
    <img src={pictureMeltingLoader} alt="loading" data-source="https://dribbble.com/shots/4155980-Melting-loader" data-copyright="© Vitaly Silkin" />
  </main>;
};
