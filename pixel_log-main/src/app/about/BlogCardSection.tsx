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
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm font-medium tracking-wider uppercase">
            BLOG
          </span>
          <h2 className="section-title text-navy mt-2 mb-4">
            PIXEL-LOG 블로그
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            디자인, 개발, 마케팅에 관한 유용한 정보를 공유합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
              <Card className="group h-full border-border/50 hover:border-gold/50 card-hover overflow-hidden bg-white">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={blog.thumbnail_url || '/images/placeholder-blog.png'}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-all duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <ExternalLink className="h-5 w-5 text-navy" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-navy text-lg mb-2 group-hover:text-gold transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  {blog.description && (
                    <p className="text-muted-foreground text-sm line-clamp-2">
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
