'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  X,
  ImagePlus,
  Upload,
} from 'lucide-react';
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
import type { Portfolio, PortfolioCategory } from '@/types';
import { portfolioCategoryLabels } from '@/lib/validations';

const categories = Object.entries(portfolioCategoryLabels);

export default function PortfoliosPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">로딩 중...</div>}>
      <PortfoliosContent />
    </Suspense>
  );
}

function PortfoliosContent() {
  const searchParams = useSearchParams();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '' as PortfolioCategory,
    thumbnail_url: '',
    images: [] as string[],
    description: '',
    client_name: '',
    project_date: '',
    affiliation: '',
    link_url: '',
    is_published: false,
    display_order: 0,
  });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<'thumbnail' | 'image' | null>(null);
  const thumbnailFileRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

  // YouTube link → auto thumbnail
  useEffect(() => {
    if (!formData.link_url) return;
    const ytMatch = formData.link_url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/
    );
    if (ytMatch) {
      const videoId = ytMatch[1];
      const autoThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      if (!formData.thumbnail_url) {
        setFormData((prev) => ({ ...prev, thumbnail_url: autoThumb }));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.link_url]);

  const uploadFile = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || '업로드 실패');
    }
    const { url } = await res.json();
    return url;
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading('thumbnail');
    try {
      const url = await uploadFile(file);
      setFormData((prev) => ({ ...prev, thumbnail_url: url }));
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading('image');
    try {
      const url = await uploadFile(file);
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  useEffect(() => {
    let filtered = [...portfolios];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.client_name?.toLowerCase().includes(term)
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    setFilteredPortfolios(filtered);
  }, [portfolios, searchTerm, categoryFilter]);

  const fetchPortfolios = async () => {
    try {
      const res = await fetch('/api/portfolios?admin=true');
      if (res.ok) {
        const data = await res.json();
        setPortfolios(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch portfolios:', error);
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

  const openForm = (portfolio?: Portfolio) => {
    if (portfolio) {
      setEditingPortfolio(portfolio);
      setFormData({
        title: portfolio.title,
        category: portfolio.category,
        thumbnail_url: portfolio.thumbnail_url,
        images: portfolio.images || [],
        description: portfolio.description || '',
        client_name: portfolio.client_name || '',
        project_date: portfolio.project_date || '',
        affiliation: portfolio.affiliation || '',
        link_url: portfolio.link_url || '',
        is_published: portfolio.is_published,
        display_order: portfolio.display_order,
      });
    } else {
      setEditingPortfolio(null);
      setFormData({
        title: '',
        category: '' as PortfolioCategory,
        thumbnail_url: '',
        images: [],
        description: '',
        client_name: '',
        project_date: '',
        affiliation: '',
        link_url: '',
        is_published: false,
        display_order: portfolios.length,
      });
    }
    setNewImageUrl('');
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleSubmit = async () => {
    setFormError(null);
    try {
      const url = editingPortfolio
        ? `/api/portfolios/${editingPortfolio.id}`
        : '/api/portfolios';
      const method = editingPortfolio ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchPortfolios();
        setIsFormOpen(false);
      } else {
        const errData = await res.json().catch(() => ({}));
        const firstIssue = errData?.details?.[0];
        const message = firstIssue
          ? `${firstIssue.path?.join('.') || '필드'}: ${firstIssue.message}`
          : errData?.error || '저장에 실패했습니다.';
        setFormError(message);
      }
    } catch (error) {
      console.error('Failed to save portfolio:', error);
      setFormError('네트워크 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/portfolios/${deleteId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchPortfolios();
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Failed to delete portfolio:', error);
    }
  };

  const togglePublish = async (portfolio: Portfolio) => {
    try {
      await fetch(`/api/portfolios/${portfolio.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: !portfolio.is_published }),
      });
      fetchPortfolios();
    } catch (error) {
      console.error('Failed to toggle publish:', error);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">포트폴리오 관리</h1>
          <p className="text-muted-foreground mt-1">
            포트폴리오를 추가하고 관리합니다.
          </p>
        </div>
        <Button onClick={() => openForm()} className="bg-gold hover:bg-gold-dark text-navy">
          <Plus className="h-4 w-4 mr-2" />
          새 포트폴리오
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="제목, 클라이언트로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="카테고리 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 카테고리</SelectItem>
                {categories.map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio List */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
      ) : filteredPortfolios.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {searchTerm || categoryFilter !== 'all'
              ? '검색 결과가 없습니다.'
              : '아직 포트폴리오가 없습니다. 새 포트폴리오를 추가해보세요.'}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((portfolio, index) => (
            <motion.div
              key={portfolio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={portfolio.thumbnail_url || '/images/placeholder.png'}
                    alt={portfolio.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Badge
                      variant={portfolio.is_published ? 'default' : 'secondary'}
                      className={portfolio.is_published ? 'bg-green-500' : ''}
                    >
                      {portfolio.is_published ? '공개' : '비공개'}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-navy line-clamp-1">
                        {portfolio.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {portfolioCategoryLabels[portfolio.category]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublish(portfolio)}
                    >
                      {portfolio.is_published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openForm(portfolio)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteId(portfolio.id)}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>
              {editingPortfolio ? '포트폴리오 수정' : '새 포트폴리오'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-4">

            {/* 에러 메시지 */}
            {formError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError}
              </div>
            )}

            {/* 제목 */}
            <div>
              <Label>제목 *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="포트폴리오 제목"
                className="mt-1"
              />
            </div>

            {/* 카테고리 + 클라이언트 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>카테고리 *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value as PortfolioCategory })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>클라이언트</Label>
                <Input
                  value={formData.client_name}
                  onChange={(e) =>
                    setFormData({ ...formData, client_name: e.target.value })
                  }
                  placeholder="클라이언트명"
                  className="mt-1"
                />
              </div>
            </div>

            {/* 소속 */}
            <div>
              <Label>소속 / 작업 당시 직장</Label>
              <Input
                value={formData.affiliation}
                onChange={(e) =>
                  setFormData({ ...formData, affiliation: e.target.value })
                }
                placeholder="예: PIXEL-LOG  또는  이전 직장명"
                className="mt-1"
              />
              <div className="mt-2 rounded-lg border border-navy/10 bg-navy/[0.03] px-3 py-2 text-xs text-muted-foreground space-y-1">
                <p className="font-semibold text-navy/70">소속 입력 규칙</p>
                <p>• <span className="font-mono font-bold text-navy">PIXEL-LOG</span> 입력 시 → &quot;PIXEL-LOG 작업&quot; 섹션으로 분류</p>
                <p>• 이전 직장명 입력 시 → &quot;이전 직장 작업&quot; 섹션으로 분류 (회사명별로 그룹화)</p>
                <p>• 비워두면 → 구분 없이 표시</p>
              </div>
            </div>

            {/* 썸네일 URL + 파일 업로드 */}
            <div>
              <Label>썸네일 *</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value={formData.thumbnail_url}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail_url: e.target.value })
                  }
                  placeholder="https://... 또는 오른쪽 버튼으로 파일 업로드"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                  disabled={uploading === 'thumbnail'}
                  onClick={() => thumbnailFileRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  {uploading === 'thumbnail' ? '업로드 중...' : '파일'}
                </Button>
                <input
                  ref={thumbnailFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailUpload}
                />
              </div>
              {formData.thumbnail_url && (
                <div className="mt-2 relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border bg-slate-100">
                  <Image
                    src={formData.thumbnail_url}
                    alt="썸네일 미리보기"
                    fill
                    className="object-cover"
                    sizes="672px"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <span className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">
                    썸네일 미리보기
                  </span>
                </div>
              )}
            </div>

            {/* 외부 링크 (바로가기) */}
            <div>
              <Label>외부 링크 (바로가기)</Label>
              <Input
                value={formData.link_url}
                onChange={(e) =>
                  setFormData({ ...formData, link_url: e.target.value })
                }
                placeholder="https://youtube.com/...  또는  https://behance.net/..."
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                입력 시 카드에 &quot;바로가기&quot; 버튼이 표시됩니다. 유튜브, Behance, 외부 사이트 등 연결 가능.
              </p>
              <p className="text-xs text-blue-500 mt-0.5">
                💡 YouTube URL 입력 시 썸네일이 자동으로 설정됩니다.
              </p>
            </div>

            {/* 상세 이미지 목록 */}
            <div>
              <Label>상세 이미지 URL 목록</Label>
              <p className="text-xs text-muted-foreground mt-0.5 mb-2">
                포트폴리오 상세 보기 시 보여줄 이미지들을 추가하세요.
              </p>
              {/* 추가된 이미지 목록 */}
              {formData.images.length > 0 && (
                <div className="space-y-2 mb-3">
                  {formData.images.map((url, idx) => (
                    <div key={idx} className="flex items-center gap-2 group">
                      <div className="relative w-14 h-10 rounded overflow-hidden border border-border bg-slate-100 flex-shrink-0">
                        <Image src={url} alt={`image-${idx}`} fill className="object-cover" sizes="56px" />
                      </div>
                      <span className="flex-1 text-xs text-muted-foreground truncate font-mono">
                        {url}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            images: formData.images.filter((_, i) => i !== idx),
                          })
                        }
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              {/* 새 이미지 URL 추가 입력 */}
              <div className="flex gap-2">
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="이미지 URL 입력..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const trimmed = newImageUrl.trim();
                      if (trimmed && !formData.images.includes(trimmed)) {
                        setFormData({ ...formData, images: [...formData.images, trimmed] });
                        setNewImageUrl('');
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => {
                    const trimmed = newImageUrl.trim();
                    if (trimmed && !formData.images.includes(trimmed)) {
                      setFormData({ ...formData, images: [...formData.images, trimmed] });
                      setNewImageUrl('');
                    }
                  }}
                >
                  <ImagePlus className="h-4 w-4 mr-1" />
                  URL 추가
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                  disabled={uploading === 'image'}
                  onClick={() => imageFileRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  {uploading === 'image' ? '업로드 중...' : '파일'}
                </Button>
                <input
                  ref={imageFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageFileUpload}
                />
              </div>
            </div>

            {/* 설명 */}
            <div>
              <Label>설명</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="포트폴리오 설명"
                rows={4}
                className="mt-1"
              />
            </div>

            {/* 날짜 + 정렬 순서 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>프로젝트 날짜</Label>
                <Input
                  type="month"
                  value={formData.project_date}
                  onChange={(e) =>
                    setFormData({ ...formData, project_date: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>정렬 순서</Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      display_order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="mt-1"
                />
              </div>
            </div>

            {/* 공개 여부 */}
            <div className="flex items-center gap-3 pt-1">
              <Switch
                checked={formData.is_published}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_published: checked })
                }
              />
              <div>
                <Label className="cursor-pointer">공개 여부</Label>
                <p className="text-xs text-muted-foreground">
                  {formData.is_published ? '홈페이지에 공개됩니다.' : '비공개 상태입니다.'}
                </p>
              </div>
            </div>

          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-gold hover:bg-gold-dark text-navy"
            >
              {editingPortfolio ? '수정' : '추가'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent aria-describedby={undefined}>
          <AlertDialogHeader>
            <AlertDialogTitle>포트폴리오 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 포트폴리오를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
