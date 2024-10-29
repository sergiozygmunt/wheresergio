import { getRequestContext } from '@cloudflare/next-on-pages';
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
export const runtime = 'edge'
// Handle GET requests to /api/set
export async function GET(request: Request): Promise<Response> {
    const { env, cf } = getRequestContext();

    // get kv
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const kv = env.whereis as KVNamespace;


    const token = new URL(request.url).searchParams.get('token');
    console.log(token)
    if (token === process.env.WHEREISKEY) {
        const colo = cf?.colo || 'SFO'
        await kv.put('colo', colo);
        return new Response(`colo set to ${colo}`);
    } else {
        return new Response('unauthorized', { status: 401 });
    }

}
