export async function onRequest(context) {
    const { request, env, params, waitUntil, next, data } = context;

    try {
        // 使用 fetch 发起请求到指定 URL
        const response = await fetch('https://video-oss.vercel.app/link', {
            method: 'GET'
        });

        // 获取纯文本内容
        const responseData = await response.text();  
        // 返回获取到的数据
        return new Response(responseData, {
            status: 200,
        });

    } catch (error) {
        // 捕获并处理错误
        console.error('Error fetching the URL:', error.message);

        return new Response(JSON.stringify({ error: 'Error fetching the URL' }), {
            status: 500,
        });
    }
}
