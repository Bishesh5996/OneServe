import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { apiClient } from "@utils/apiClient.js";
import { fallbackBlogs, mapBlogsResponse } from "@utils/blogMappers.js";

export const BlogPage = () => {
  const [articles, setArticles] = useState(fallbackBlogs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/blogs", { params: { limit: 12 } });
        const normalized = mapBlogsResponse(response.data);
        if (!ignore && normalized.length) {
          setArticles(normalized);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError("Unable to load the latest articles. Showing featured dishes instead.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      ignore = true;
    };
  }, []);

  const heroSubtitle = useMemo(
    () => "We consider every driver of fresh, effortless cooking so you can focus on the moments that truly matter.",
    []
  );

  return (
    <section className="space-y-10 py-12">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-black/60">Stories</p>
        <h1 className="mt-3 text-4xl font-serif text-black">Our Blog & Articles</h1>
        <p className="mt-2 text-base text-black/70">{heroSubtitle}</p>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <article key={article.id} className="flex flex-col rounded-[32px] border border-black/5 bg-white shadow-sm">
            {article.heroImage && <img alt={article.title} className="h-48 w-full rounded-t-[32px] object-cover" src={article.heroImage} />}
            <div className="flex flex-1 flex-col gap-3 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/60">
                {new Date(article.publishedAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <h2 className="text-xl font-semibold text-black">{article.title}</h2>
              <p className="flex-1 text-sm text-black/70">{article.excerpt}</p>
              <div className="flex items-center justify-between pt-2 text-sm font-semibold text-orange-600">
                <Link className="hover:underline" to={ROUTE_PATHS.blogDetail.replace(":slug", article.slug)}>
                  Read Article →
                </Link>
                <span className="text-xs uppercase tracking-[0.3em]">{loading ? "Refreshing…" : `${article.readMinutes} min read`}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
