import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';
import Counter from '@/islands/Counter.tsx';
import User from '@/models/User.ts';

export const handler: Handlers<User[]> = {
  async GET(_, ctx) {
    const users = await User.all();
    return ctx.render(users);
  },
};

export default function Home({ data }: PageProps<User[]>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        There are {data.length} users!
        <Counter start={5} />
      </div>
    </>
  );
}
