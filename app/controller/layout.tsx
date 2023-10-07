import {Fragment, ReactElement} from 'react';

export default function Layout(props:DefaultContainerProps) : ReactElement {
  return <Fragment>
    <header className="flex-shrink-0 px-4 py-2 bg-site-zerotier/100 flex items-center justify-between select-none text-xl">zerotier 控制器</header>
    <main className="flex-1 flex flex-col">{props.children}</main>
    {/* <footer className="flex-shrink-0 px-4 py-2 select-none">&emsp;</footer> */}
  </Fragment>;
};
