import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { apiClient } from "@utils/apiClient.js";
import { fallbackBlogs, mapBlogsResponse, normalizeBlog } from "@utils/blogMappers.js";
import { fallbackProducts, normalizeProduct } from "@utils/productMappers.js";

export const BlogDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [product, setProduct] = useState(null);
  const [others, setOthers] = useState(fallbackBlogs.filter((blog) => blog.slug !== slug).slice(0, 4));
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    const fetchArticle = async () => {
      try {
        const response = await apiClient.get(`/blogs/${slug}`);
        if (!ignore) {
          setArticle(normalizeBlog(response.data));
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          const fallback = fallbackBlogs.find((blog) => blog.slug === slug);
          setArticle(fallback ?? null);
          setError(fallback ? "" : "Unable to load this article.");
        }
      }
    };

    fetchArticle();
    return () => {
      ignore = true;
    };
  }, [slug]);

  useEffect(() => {
    let ignore = false;
    if (!article?.productId) {
      setProduct(null);
      return undefined;
    }
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${article.productId}`);
        if (!ignore) setProduct(normalizeProduct(response.data));
      } catch {
        if (!ignore) {
          const fallback = fallbackProducts.find((kit) => kit.id === article.productId);
          setProduct(fallback ?? null);
        }
      }
    };
    fetchProduct();
    return () => {
      ignore = true;
    };
  }, [article]);

  useEffect(() => {
    let ignore = false;
    const fetchOthers = async () => {
      try {
        const response = await apiClient.get("/blogs", { params: { limit: 6 } });
        const normalized = mapBlogsResponse(response.data).filter((blog) => blog.slug !== slug);
        if (!ignore && normalized.length) setOthers(normalized.slice(0, 4));
      } catch {
        // keep fallback
      }
    };

    fetchOthers();
    return () => {
      ignore = true;
    };
  }, [slug]);

  const formattedDate = useMemo(() => {
    if (!article) return "";
    return new Date(article.publishedAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  }, [article]);

  if (!article) {
    return <p className="py-20 text-center text-sm text-black/70">{error || "Loading article…"}</p>;
  }

  return (
    <article className="space-y-12 py-12">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/60">Pages / Blog</p>
        <h1 className="mt-4 text-4xl font-serif text-black">{article.title}</h1>
        <p className="mt-2 text-sm text-black/60">
          {formattedDate} • {article.readMinutes} min read
        </p>
      </header>

      {article.heroImage && (
        <img alt={article.title} className="w-full rounded-[32px] border border-black/5 object-cover shadow" src={article.heroImage} />
      )}

      {product && (
        <section className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <img alt={product.name} className="h-64 w-full rounded-3xl object-cover" src={product.image} />
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/50">Cook This Kit</p>
              <h2 className="text-2xl font-semibold text-black">{product.name}</h2>
              <p className="text-sm text-black/70">{product.description}</p>
              <div className="grid gap-3 md:grid-cols-2">
                {(product.ingredients ?? []).slice(0, 6).map((ingredient) => (
                  <div key={ingredient} className="flex items-center gap-2 text-sm text-black/80">
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                    {ingredient}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 text-sm font-semibold text-black">
                <span className="rounded-full border border-black/10 px-3 py-1">{product.prepTime ?? "20 min"} prep</span>
                <span className="rounded-full border border-black/10 px-3 py-1">{product.nutrition?.calories ?? 420} cal</span>
              </div>
              {product.slug ? (
                <Link className="inline-flex items-center rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-black hover:bg-orange-400" to={`${ROUTE_PATHS.product}/${product.slug}`}>
                  Order This Kit →
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      )}

      <div className="space-y-10">
        {article.sections.map((section, index) => (
          <section key={`${section.heading}-${index}`} className="space-y-4">
            {section.heading && <h2 className="text-2xl font-semibold text-black">{section.heading}</h2>}
            {section.body &&
              section.body
                .split(/\n{2,}/)
                .filter(Boolean)
                .map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="text-base leading-7 text-black/80">
                    {paragraph}
                  </p>
                ))}
            {section.image && <img alt={section.heading ?? "Article visual"} className="w-full rounded-[28px] border border-black/5 object-cover" src={section.image} />}
          </section>
        ))}
      </div>

      <section className="space-y-4">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/60">Read More Articles</p>
          <h2 className="text-3xl font-serif text-black">Kitchen inspiration for every day</h2>
          <p className="text-sm text-black/60">We consider all the drivers of change to create a truly effortless experience.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {others.map((blog) => (
            <article key={blog.id} className="flex flex-col rounded-[28px] border border-black/5 bg-white p-4 shadow-sm">
              {blog.heroImage && <img alt={blog.title} className="h-32 w-full rounded-2xl object-cover" src={blog.heroImage} />}
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-black/60">
                {new Date(blog.publishedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </p>
              <h3 className="text-base font-semibold text-black">{blog.title}</h3>
              <Link className="mt-2 text-sm font-semibold text-orange-600 hover:underline" to={ROUTE_PATHS.blogDetail.replace(":slug", blog.slug)}>
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
};
