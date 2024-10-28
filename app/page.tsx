import { getRequestContext } from '@cloudflare/next-on-pages';


export const runtime = 'edge';
export default async function Home() {
    const { env, cf } = getRequestContext();

    // get kv
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const kv = env.whereis as KVNamespace;

    // get the location code from kv
    const locationCode = await kv.get('colo');

    // get visitor's location
    const visitorLocation = cf.colo;

    // check if the visitor is in the same location
    const isSameCOLO = visitorLocation === locationCode;

    console.log({ locationCode, visitorLocation, isSameCOLO });




  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative w-full max-w-2xl px-4 py-8 mx-auto text-center">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            {isSameCOLO ? "Sam is nearby" : `Sam is nearby ${locationCode}`}
          </h1>
        </div>
        <footer className="absolute bottom-4 text-sm text-gray-600">
          Made with ♥️ by 🦆
        </footer>
      </div>
  )
}
