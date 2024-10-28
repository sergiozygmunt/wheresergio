import { getRequestContext } from '@cloudflare/next-on-pages';
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
export const runtime = 'edge'
// Handle GET requests to /api/set
export async function GET(): Promise<Response> {
    const { env } = getRequestContext();

    // get kv
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const kv = env.whereis as KVNamespace;

    const colo = await kv.get('colo');

    return new Response(colo || 'SFO');

}
