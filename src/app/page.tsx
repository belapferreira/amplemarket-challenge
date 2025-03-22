import { Input } from './components/Input';

import { Post } from './components/Post';

export default function Home() {
  return (
    <div className="flex w-full items-center justify-center p-5 md:py-10">
      <main className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center">
        <div className="mb-10 flex w-full max-w-md flex-col items-center justify-center gap-5 rounded border border-zinc-300 p-5">
          <Input label="Phone" placeholder="(999) 999-9999" />
        </div>

        <Post />
      </main>
    </div>
  );
}
