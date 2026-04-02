import { notFound } from "next/navigation";
import { CustomMdx } from "@/components/mdx";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { getArticles } from "@/lib/mdx";

export default async function Article(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const posts = getArticles();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative overflow-hidden py-12 lg:py-24">
      <TracingBeam>
        <div className="container mx-auto max-w-7xl px-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="title font-semibold text-5xl tracking-tighter mt-2 mb-8">
              {post.metadata.title}
            </h1>
            <article className="prose">
              <CustomMdx source={post.content} />
            </article>
          </div>
        </div>
      </TracingBeam>
    </div>
  );
}
