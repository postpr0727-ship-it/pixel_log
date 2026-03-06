'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { BlogLink } from '@/types';

export function BlogCardSection() {
  const [blogs, setBlogs] = useState<BlogLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blog-links');
        if (res.ok) {
          const data = await res.json();
          setBlogs(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch blog links:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (isLoading || blogs.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-navy/60 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
            BLOG
          </span>
          <h2 className="section-title text-navy mt-2 mb-6 font-black italic tracking-tighter uppercase">
            PIXEL-LOG 블로그
          </h2>
          <p className="text-navy/70 max-w-2xl mx-auto font-bold italic">
            디자인, 개발, 마케팅에 관한 유용한 정보를 공유합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {blogs.map((blog, index) => (
            <motion.a
              key={blog.id}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full border-navy/10 hover:border-navy hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white rounded-[2.5rem] pt-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={blog.thumbnail_url || '/images/placeholder-blog.png'}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-500" />
                  <div className="absolute top-6 right-6 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-2xl">
                      <ExternalLink className="h-5 w-5 text-navy" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="font-black italic text-navy text-2xl mb-4 group-hover:underline underline-offset-8 transition-all line-clamp-2 uppercase tracking-tight">
                    {blog.title}
                  </h3>
                  {blog.description && (
                    <p className="text-navy/60 text-sm font-bold italic line-clamp-2 leading-relaxed">
                      {blog.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
