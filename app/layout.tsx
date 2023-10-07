import {ReactElement,version} from 'react';
import {Metadata} from 'next';
import WebsiteMeta from '../libraries/next/meta-data';
//import {Toaster} from 'react-hot-toast';
import 'tailwindcss/tailwind.css';

export const metadata:Metadata = WebsiteMeta;

export default function Layout(props:DefaultContainerProps) : ReactElement {
  return <html lang="zh-cn">
    <body data-next-app data-react-version={version} className="min-h-screen min-w-full bg-stone-200/100 text-base inline-flex flex-col">
      {props.children}
      {/* <Toaster position="top-center" reverseOrder={false} gutter={16} containerClassName="mt-8" toastOptions={{duration:3000}} /> */}
    </body>
  </html>;
};

/* min-w-full 和 inline-flex 用于解决内容比 body 宽导致的截断问题 */
