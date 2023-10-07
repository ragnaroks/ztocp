import {ReactElement} from 'react';
import dayjs from 'dayjs';

export default function PageStatusBarChild(props:DefaultComponentProps & {
  error:string,
  data:null|ZerotierOneStatus
}) : ReactElement {
  const {error,data} = props;

  if(error || !data){return <p className="p-2">获取数据失败，{error||'接口未响应'}</p>;}
  return <ul className="p-2 flex">
    <li className="flex-1 leading-6"><span>状态：</span><span>{data.online?'在线':'离线'}</span></li>
    <li className="flex-1 leading-6"><span>版本：</span><span>{data.version}</span></li>
    <li className="flex-1 leading-6"><span>地址：</span><span>{data.address}</span></li>
    <li className="flex-1 leading-6"><span>时间：</span><span>{dayjs(data.clock).format('YYYY-MM-DD HH:mm:ss')}</span></li>
    <li className="flex-1 leading-6"><span>介面：</span><span>{data.config.settings.surfaceAddresses.at(0)}</span></li>
  </ul>;
};
