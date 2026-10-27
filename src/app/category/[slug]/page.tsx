type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold capitalize">Category: {slug}</h1>
    </main>
  );
}