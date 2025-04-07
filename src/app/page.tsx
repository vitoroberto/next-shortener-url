import Form from "@/components/form";

export default function Home() {
  return (
    <main className="mx-auto max-w-xl space-y-6 px-4 py-12 md:py-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Encurtador de URL</h1>
      </div>
      <Form />
    </main>
  );
}
