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

    // 从 request.body 直接读取文件数据
    console.log('开始读取文件')
    //表单形式读取数据
    const formdata = await clonedRequest.formData();
    const file=formdata.get('file')
    if (!file) {
        return new Response('No file uploaded', { status: 400 });
    }
    const fileType = formdata.get('file').type;
    const fileName = formdata.get('file').name;
    console.log('文件类型: '+fileType)
    console.log('文件名: '+fileName)

    console.log('读取文件结束')

    const response = await fetch('https://b.baipiao.wiki/link', {
        method: 'GET'
    });
    const targetUrl = await response.text();

    console.log('mhy: '+targetUrl)

    let res = new Response('upload error, check your environment params!', { status: 400 });
    try {
        const response = await fetch(targetUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'image/jpeg',
            },
            body: file.stream(),  // 使用文件流发送请求
        });

        // 若上传成功，将响应返回给客户端
        if (response.ok) {
            res = new Response(
                JSON.stringify({ 'mhyURL': targetUrl }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }else{
            console.log('response.ok is false')
            console.log(res)
            res=new Response('response.status!', { status: 597 });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        return res;
    }
}
