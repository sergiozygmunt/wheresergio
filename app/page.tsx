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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-full max-w-2xl px-4 py-8 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            {isSameCOLO ? "Sam is nearby" : `Sam is not nearby ${visitorLocation}`}
          </h1>
        </div>
        <footer className="absolute bottom-4 text-sm">
            <a href={'https://quacksire.dev'} target={'_blank'}>
                Made with ♥️ by 🦆🐱
            </a>
        </footer>
      </div>
  )
}
