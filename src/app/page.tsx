export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <section className="max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          Huddling Club
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          프로젝트 준비 완료
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Next.js, TypeScript 5, Tailwind CSS v4로 시작합니다.
        </p>
      </section>
    </main>
  );
}
