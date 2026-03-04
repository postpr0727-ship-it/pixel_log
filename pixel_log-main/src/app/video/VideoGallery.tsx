'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { VideoLink } from '@/types';
import { videoLinkService } from '@/lib/supabase';

export function VideoGallery() {
  const [videos, setVideos] = useState<VideoLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        const data = await videoLinkService.getAll();
        setVideos(data);
      } catch (error) {
        console.error('Failed to load video links:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadVideos();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="h-8 w-8 text-gold animate-spin" />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              PORTFOLIO
            </span>
            <h2 className="section-title text-navy mt-2">영상 포트폴리오</h2>
          </motion.div>
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              아직 등록된 영상이 없습니다.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm font-medium tracking-wider uppercase">
            PORTFOLIO
          </span>
          <h2 className="section-title text-navy mt-2">영상 포트폴리오</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {videos.map((video, index) => (
            <motion.a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-border/50 hover:border-gold/50 card-hover">
                <div className="relative aspect-video bg-navy-dark">
                  {video.thumbnail_url ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${video.thumbnail_url})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white/50" />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center">
                        <Play className="h-8 w-8 text-navy ml-1" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Video Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full uppercase">
                      {video.video_type}
                    </span>
                  </div>

                  {/* External Link Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <ExternalLink className="h-4 w-4 text-navy" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-navy text-lg group-hover:text-gold transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
