import {NextRequest,NextResponse} from 'next/server';

export const config = {
  matcher: ['/:path*']
};

export function middleware(request:NextRequest) : NextResponse<unknown> {
  return authorize(request) ? NextResponse.next() : new NextResponse('用户名或密码错误', {status:401,headers:{'WWW-Authenticate':'Basic'}});
};

function authorize(request:NextRequest) {
  if(!process.env.ZTOCP_USERNAME || !process.env.ZTOCP_PASSWORD){return true;}
  const header:string = request.headers.get('authorization')?.substring(6) || '';
  //console.log('header => %s',header);
  if(!header){return false;}
  const authorization:Array<string> = Buffer.from(header,'base64').toString().split(':');
  //console.log('authorization => %s | %s',authorization[0],authorization[1]);
  //console.log(authorization.length===2,authorization[0]===process.env.ZTOCP_USERNAME,authorization[1]===process.env.ZTOCP_PASSWORD);
  return authorization.length===2 && authorization[0]===process.env.ZTOCP_USERNAME && authorization[1]===process.env.ZTOCP_PASSWORD;
};
