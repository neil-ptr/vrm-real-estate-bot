import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto ">
      <div className="flex justify-center w-full gap-4">
        <Link
          href="/chat?model=1903884660012638236"
          className="w-1/3 bg-zinc-500 h-[400px] rounded-xl"
        >
          Bot 1
        </Link>
        <Link
          href="/chat?model=4490707391186690073"
          className="w-1/3 bg-zinc-500 h-[400px] rounded-xl"
        >
          Bot 1
        </Link>
        <Link
          href="/chat?model=8988580958909680445"
          className="w-1/3 bg-zinc-500 h-[400px] rounded-xl"
        >
          Bot 1
        </Link>
      </div>
    </main>
  );
}
