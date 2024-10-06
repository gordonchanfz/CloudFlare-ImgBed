import { errorHandling, telemetryData } from "./utils/middleware";
function UnauthorizedException(reason) {
    return new Response(reason, {
        status: 401,
        statusText: "Unauthorized",
        headers: {
            "Content-Type": "text/plain;charset=UTF-8",
            // Disables caching by default.
            "Cache-Control": "no-store",
            // Returns the "Content-Length" header for HTTP HEAD requests.
            "Content-Length": reason.length,
        },
    });
}

function isValidAuthCode(envAuthCode, authCode) {
    return authCode === envAuthCode;
}

function isAuthCodeDefined(authCode) {
    return authCode !== undefined && authCode !== null && authCode.trim() !== '';
}


function getCookieValue(cookies, name) {
    const match = cookies.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}


export async function onRequestPost(context) {  // Contents of context object
    const { request, env, params, waitUntil, next, data } = context;

    const url = new URL(request.url);
    const clonedRequest = await request.clone();

    await errorHandling(context);
    telemetryData(context);
	
   // 从 request.body 直接读取文件数据
    const file = await clonedRequest.blob();  // 使用 blob 读取文件内容
    const fileName = request.headers.get('File-Name');  // 假设前端会设置这个头部
    
    // 优先从请求 URL 获取 authCode
    let authCode = url.searchParams.get('authCode');
   // 如果 URL 中没有 authCode，从 Referer 中获取
    if (!authCode) {
        const referer = request.headers.get('Referer');
        if (referer) {
            try {
                const refererUrl = new URL(referer);
                authCode = new URLSearchParams(refererUrl.search).get('authCode');
            } catch (e) {
                console.error('Invalid referer URL:', e);
            }
        }
    }
    // 如果 Referer 中没有 authCode，从请求头中获取
    if (!authCode) {
        authCode = request.headers.get('authCode');
    }
    // 如果请求头中没有 authCode，从 Cookie 中获取
    if (!authCode) {
        const cookies = request.headers.get('Cookie');
        if (cookies) {
            authCode = getCookieValue(cookies, 'authCode');
        }
    }
    if (isAuthCodeDefined(env.AUTH_CODE) && !isValidAuthCode(env.AUTH_CODE, authCode)) {
        return new UnauthorizedException("error");
    }

    const response = await fetch('https://video-oss.vercel.app/link', {
            method: 'GET'
        });
    const targetUrl = await response.text();  
  
    let res = new Response(fileName+'upload error1, check your environment params!'+targetUrl, { status: 400 });
    try {
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
            	'Content-Type': 'image/jpeg',
	    },
            body: file
        });

        // 若上传成功，将响应返回给客户端
        if (response.ok) {
            res = new Response(
                JSON.stringify([{ 'mhyUrl': targetUrl }]), 
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }else{
	   res=new Response('状态码', { status: response.status });
	}	
     } catch (error) {
         console.error('Error:', error);
     } finally {
        return res;
    }
}
