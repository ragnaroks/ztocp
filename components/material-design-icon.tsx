import {CSSProperties, ReactElement} from 'react';

type MaterialDesignIconProps = {path:string,fill?:string,viewBox?:string,className?:string,style?:CSSProperties};

export default function MaterialDesignIcon(props:MaterialDesignIconProps) : ReactElement {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox={props.viewBox||'0 0 24 24'} className={props.className} style={props.style}>
    <path fill={props.fill||'currentColor'} d={props.path} />
  </svg>;
};
