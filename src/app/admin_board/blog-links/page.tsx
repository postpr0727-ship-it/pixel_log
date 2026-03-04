'use client';

import { useEffect, useState, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Plus, Search, Edit, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import type { BlogLink } from '@/types';

export default function BlogLinksPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">로딩 중...</div>}>
      <BlogLinksContent />
    </Suspense>
  );
}

function BlogLinksContent() {
  const searchParams = useSearchParams();
  const [blogLinks, setBlogLinks] = useState<BlogLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<BlogLink | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    thumbnail_url: '',
    description: '',
    is_published: false,
    display_order: 0,
  });

  useEffect(() => {
    fetchBlogLinks();
  }, []);

  const fetchBlogLinks = async () => {
    try {
      const res = await fetch('/api/blog-links');
      if (res.ok) {
        const data = await res.json();
        setBlogLinks(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch blog links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'new' && !isLoading) {
      openForm();
    }
  }, [searchParams, isLoading]);

  const filteredLinks = blogLinks.filter((link) =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchOgMetadata = useCallback(async (url: string) => {
    if (!url.startsWith('http')) return;
    setIsFetchingMeta(true);
    try {
      const res = await fetch('/api/og-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (res.ok) {
        const { data } = await res.json();
        setFormData((prev) => ({
          ...prev,
          title: data.title || prev.title,
          description: data.description || prev.description,
          thumbnail_url: data.thumbnail_url || prev.thumbnail_url,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch OG metadata:', error);
    } finally {
      setIsFetchingMeta(false);
    }
  }, []);

  const openForm = (link?: BlogLink) => {
    setError('');
    if (link) {
      setEditingLink(link);
      setFormData({
        title: link.title,
        url: link.url,
        thumbnail_url: link.thumbnail_url || '',
        description: link.description || '',
        is_published: link.is_published,
        display_order: link.display_order,
      });
    } else {
      setEditingLink(null);
      setFormData({
        title: '',
        url: '',
        thumbnail_url: '',
        description: '',
        is_published: false,
        display_order: blogLinks.length,
      });
    }
    setIsFormOpen(true);
  };

  const handleUrlBlur = () => {
    if (formData.url && !editingLink) {
      fetchOgMetadata(formData.url);
    }
  };

  const handleSubmit = async () => {
    setError('');

    if (!formData.url) {
      setError('URL을 입력해주세요.');
      return;
    }
    if (!formData.title) {
      setError('제목을 입력해주세요. URL을 먼저 입력하면 자동으로 가져옵니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      const apiUrl = editingLink
        ? `/api/blog-links/${editingLink.id}`
        : '/api/blog-links';
      const method = editingLink ? 'PATCH' : 'POST';

      const res = await fetch(apiUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchBlogLinks();
        setIsFormOpen(false);
      } else {
        const result = await res.json();
        setError(result.error || '저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to save blog link:', error);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/blog-links/${deleteId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchBlogLinks();
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Failed to delete blog link:', error);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">블로그 링크 관리</h1>
          <p className="text-muted-foreground mt-1">
            About 페이지에 표시될 블로그 링크를 관리합니다.
          </p>
        </div>
        <Button onClick={() => openForm()} className="bg-gold hover:bg-gold-dark text-navy">
          <Plus className="h-4 w-4 mr-2" />
          새 링크 추가
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="제목으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Links List */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
      ) : filteredLinks.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {searchTerm
              ? '검색 결과가 없습니다.'
              : '아직 블로그 링크가 없습니다. 새 링크를 추가해보세요.'}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {link.thumbnail_url && (
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={link.thumbnail_url}
                          alt={link.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-navy truncate">{link.title}</h3>
                        <Badge
                          variant={link.is_published ? 'default' : 'secondary'}
                          className={link.is_published ? 'bg-green-500' : ''}
                        >
                          {link.is_published ? '공개' : '비공개'}
                        </Badge>
                      </div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-gold flex items-center gap-1"
                      >
                        {link.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => openForm(link)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(link.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{editingLink ? '블로그 링크 수정' : '새 블로그 링크'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>블로그 URL *</Label>
              <Input
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                onBlur={handleUrlBlur}
                placeholder="https://blog.naver.com/..."
              />
              {!editingLink && (
                <p className="text-xs text-muted-foreground mt-1">
                  URL 입력 후 포커스를 벗어나면 제목과 썸네일을 자동으로 가져옵니다.
                </p>
              )}
            </div>

            {isFetchingMeta && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                메타 정보를 가져오는 중...
              </div>
            )}

            <div>
              <Label>제목</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="자동으로 가져옵니다"
              />
            </div>
            <div>
              <Label>썸네일 URL</Label>
              <Input
                value={formData.thumbnail_url}
                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                placeholder="자동으로 가져옵니다"
              />
              {formData.thumbnail_url && (
                <div className="relative w-full h-32 mt-2 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={formData.thumbnail_url}
                    alt="썸네일 미리보기"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
            </div>
            <div>
              <Label>설명</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="자동으로 가져옵니다"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>정렬 순서</Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label>공개</Label>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || isFetchingMeta}
              className="bg-gold hover:bg-gold-dark text-navy"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                editingLink ? '수정' : '추가'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent aria-describedby={undefined}>
          <AlertDialogHeader>
            <AlertDialogTitle>블로그 링크 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 블로그 링크를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
