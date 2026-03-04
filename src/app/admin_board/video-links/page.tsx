'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Plus, Search, Edit, Trash2, Play, ExternalLink } from 'lucide-react';
import { getVideoThumbnail } from '@/lib/youtube';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import type { VideoLink } from '@/types';

const videoTypes = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'vimeo', label: 'Vimeo' },
  { value: 'other', label: '기타' },
];

export default function VideoLinksPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">로딩 중...</div>}>
      <VideoLinksContent />
    </Suspense>
  );
}

function VideoLinksContent() {
  const searchParams = useSearchParams();
  const [videoLinks, setVideoLinks] = useState<VideoLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<VideoLink | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    thumbnail_url: '',
    description: '',
    video_type: 'youtube' as 'youtube' | 'vimeo' | 'other',
    published_at: '',
    is_published: false,
    display_order: 0,
  });

  useEffect(() => {
    fetchVideoLinks();
  }, []);

  const fetchVideoLinks = async () => {
    try {
      const res = await fetch('/api/video-links');
      if (res.ok) {
        const data = await res.json();
        setVideoLinks(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch video links:', error);
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

  const filteredLinks = videoLinks.filter((link) =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openForm = (link?: VideoLink) => {
    if (link) {
      setEditingLink(link);
      setFormData({
        title: link.title,
        url: link.url,
        thumbnail_url: link.thumbnail_url || '',
        description: link.description || '',
        video_type: link.video_type,
        published_at: link.published_at || '',
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
        video_type: 'youtube',
        published_at: '',
        is_published: false,
        display_order: videoLinks.length,
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Auto-generate thumbnail if empty (for preview purposes)
    let finalThumbnailUrl = formData.thumbnail_url;
    if (!finalThumbnailUrl && formData.url) {
      const autoThumb = getVideoThumbnail(formData.url);
      if (autoThumb) finalThumbnailUrl = autoThumb;
    }

    const payload = { ...formData, thumbnail_url: finalThumbnailUrl };

    try {
      const url = editingLink ? `/api/video-links/${editingLink.id}` : '/api/video-links';
      const method = editingLink ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchVideoLinks();
        setIsFormOpen(false);
      } else {
        const errorData = await res.json();
        alert(`저장 실패: ${errorData.error}\n${JSON.stringify(errorData.details || errorData.message)}`);
      }
    } catch (error: any) {
      console.error('Failed to save video link:', error);
      alert(`오류 발생: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/video-links/${deleteId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchVideoLinks();
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Failed to delete video link:', error);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">영상 링크 관리</h1>
          <p className="text-muted-foreground mt-1">
            영상 제작 페이지에 표시될 영상 링크를 관리합니다.
          </p>
        </div>
        <Button onClick={() => openForm()} className="bg-gold hover:bg-gold-dark text-navy">
          <Plus className="h-4 w-4 mr-2" />
          새 영상 추가
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
              : '아직 영상 링크가 없습니다. 새 영상을 추가해보세요.'}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-navy-dark">
                  {link.thumbnail_url ? (
                    <Image
                      src={link.thumbnail_url}
                      alt={link.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white/50" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-black/50 text-white uppercase">
                      {link.video_type}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={link.is_published ? 'default' : 'secondary'}
                      className={link.is_published ? 'bg-green-500' : ''}
                    >
                      {link.is_published ? '공개' : '비공개'}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-navy line-clamp-1">{link.title}</h3>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-gold"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  {link.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {link.description}
                    </p>
                  )}
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
            <DialogTitle>{editingLink ? '영상 링크 수정' : '새 영상 링크'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>제목 *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="영상 제목"
              />
            </div>
            <div>
              <Label>URL *</Label>
              <Input
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://youtube.com/..."
              />
            </div>
            <div>
              <Label>영상 유형</Label>
              <Select
                value={formData.video_type}
                onValueChange={(value) =>
                  setFormData({ ...formData, video_type: value as typeof formData.video_type })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {videoTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>썸네일 URL <span className="text-muted-foreground text-sm">(선택사항)</span></Label>
              <Input
                value={formData.thumbnail_url}
                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                placeholder="비워두면 유튜브 URL에서 자동 추출됩니다"
              />
              <p className="text-xs text-muted-foreground mt-1">
                ✨ 유튜브 링크는 자동으로 섬네일이 생성됩니다
              </p>
            </div>
            <div>
              <Label>설명</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="영상 설명"
                rows={3}
              />
            </div>
            <div>
              <Label>유튜브 업로드 날짜 <span className="text-muted-foreground text-sm">(정렬 기준)</span></Label>
              <Input
                type="datetime-local"
                value={formData.published_at}
                onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                💡 이 날짜를 기준으로 최신순 정렬됩니다
              </p>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSubmit} className="bg-gold hover:bg-gold-dark text-navy">
              {editingLink ? '수정' : '추가'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent aria-describedby={undefined}>
          <AlertDialogHeader>
            <AlertDialogTitle>영상 링크 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 영상 링크를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
