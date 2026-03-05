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

// 링크만 입력하면 되는 카테고리 (블로그마케팅, 영상제작)
const LINK_ONLY_CATEGORIES = ['blog_marketing', 'video'];

type FormData = {
  title: string;
  category: PortfolioCategory;
  thumbnail_url: string;
  images: string[];
  description: string;
  client_name: string;
  project_date: string;
  affiliation: string;
  link_url: string;
  is_published: boolean;
};

interface CategoryFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isFetchingMeta: boolean;
  metaFetchStatus: 'idle' | 'success' | 'error';
  setMetaFetchStatus: React.Dispatch<React.SetStateAction<'idle' | 'success' | 'error'>>;
  newImageUrl: string;
  setNewImageUrl: React.Dispatch<React.SetStateAction<string>>;
  uploading: 'thumbnail' | 'image' | null;
  thumbnailFileRef: React.RefObject<HTMLInputElement | null>;
  imageFileRef: React.RefObject<HTMLInputElement | null>;
  handleFetchMeta: () => void;
  handleThumbnailUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// ===== 링크 전용 폼 (블로그 마케팅, 영상 제작) =====
// 모듈 레벨에 정의 → React가 동일 컴포넌트로 인식, IME 재마운트 없음
function LinkOnlyFormContent({
  formData,
  setFormData,
  isFetchingMeta,
  metaFetchStatus,
  setMetaFetchStatus,
  handleFetchMeta,
}: CategoryFormProps) {
  return (
    <>
      {/* 카테고리 + 클라이언트 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>카테고리 *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => {
              setFormData({ ...formData, category: value as PortfolioCategory });
              setMetaFetchStatus('idle');
            }}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>클라이언트</Label>
          <Input
            value={formData.client_name}
            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
            placeholder="클라이언트명"
            className="mt-1"
          />
        </div>
      </div>

      {/* 링크 URL */}
      <div>
        <Label>링크 URL <span className="text-red-500">*</span></Label>
        <div className="flex gap-2 mt-1">
          <Input
            value={formData.link_url}
            onChange={(e) => {
              setFormData({ ...formData, link_url: e.target.value });
              setMetaFetchStatus('idle');
            }}
            placeholder="https://blog.naver.com/... 또는 https://youtu.be/..."
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-shrink-0 whitespace-nowrap"
            disabled={isFetchingMeta || !formData.link_url.trim()}
            onClick={handleFetchMeta}
          >
            {isFetchingMeta ? '가져오는 중...' : '정보 가져오기'}
          </Button>
        </div>
        {metaFetchStatus === 'success' && (
          <p className="text-xs text-green-600 mt-1">✓ 제목과 썸네일이 자동으로 설정되었습니다.</p>
        )}
        {metaFetchStatus === 'error' && (
          <p className="text-xs text-orange-500 mt-1">⚠ 자동 정보를 가져오지 못했습니다. 제목을 직접 입력해주세요.</p>
        )}
      </div>

      {/* 썸네일 미리보기 */}
      {formData.thumbnail_url && (
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border bg-slate-100">
          <Image
            src={formData.thumbnail_url}
            alt="썸네일 미리보기"
            fill
            className="object-cover"
            sizes="672px"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">
            썸네일 미리보기
          </span>
        </div>
      )}

      {/* 제목 */}
      <div>
        <Label>제목 *</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="링크에서 자동으로 가져오거나 직접 입력하세요"
          className="mt-1"
        />
      </div>

      {/* 소속 */}
      <div>
        <Label>소속</Label>
        <div className="flex gap-2 mt-1">
          {[
            { value: 'PIXEL-LOG', label: 'PIXEL-LOG' },
            { value: '이전 소속 직장', label: '이전 소속 직장' },
            { value: '', label: '구분 없음' },
          ].map(({ value, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => setFormData({ ...formData, affiliation: value })}
              className={`px-3 py-1.5 text-sm font-bold rounded-lg border transition-colors ${
                formData.affiliation === value
                  ? 'bg-navy text-white border-navy'
                  : 'border-border text-navy/60 hover:border-navy/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 프로젝트 날짜 */}
      <div>
        <Label>프로젝트 날짜</Label>
        <Input
          type="month"
          value={formData.project_date}
          onChange={(e) => setFormData({ ...formData, project_date: e.target.value })}
          className="mt-1"
        />
      </div>

      {/* 공개 여부 */}
      <div className="flex items-center gap-3 pt-1">
        <Switch
          checked={formData.is_published}
          onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
        />
        <div>
          <Label className="cursor-pointer">공개 여부</Label>
          <p className="text-xs text-muted-foreground">
            {formData.is_published ? '홈페이지에 공개됩니다.' : '비공개 상태입니다.'}
          </p>
        </div>
      </div>
    </>
  );
}

// ===== 일반 폼 (디자인, 온라인 광고, 개발) =====
// 모듈 레벨에 정의 → React가 동일 컴포넌트로 인식, IME 재마운트 없음
function FullFormContent({
  formData,
  setFormData,
  newImageUrl,
  setNewImageUrl,
  uploading,
  thumbnailFileRef,
  imageFileRef,
  handleThumbnailUpload,
  handleImageFileUpload,
}: CategoryFormProps) {
  return (
    <>
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
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>클라이언트</Label>
          <Input
            value={formData.client_name}
            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
            placeholder="클라이언트명"
            className="mt-1"
          />
        </div>
      </div>

      {/* 소속 */}
      <div>
        <Label>소속</Label>
        <div className="flex gap-2 mt-1">
          {[
            { value: 'PIXEL-LOG', label: 'PIXEL-LOG' },
            { value: '이전 소속 직장', label: '이전 소속 직장' },
            { value: '', label: '구분 없음' },
          ].map(({ value, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => setFormData({ ...formData, affiliation: value })}
              className={`px-3 py-1.5 text-sm font-bold rounded-lg border transition-colors ${
                formData.affiliation === value
                  ? 'bg-navy text-white border-navy'
                  : 'border-border text-navy/60 hover:border-navy/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 썸네일 */}
      <div>
        <Label>썸네일</Label>
        <div className="flex gap-2 mt-1">
          <Input
            value={formData.thumbnail_url}
            onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
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
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">
              썸네일 미리보기
            </span>
          </div>
        )}
      </div>

      {/* 외부 링크 */}
      <div>
        <Label>외부 링크 (바로가기)</Label>
        <Input
          value={formData.link_url}
          onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
          placeholder="https://youtube.com/...  또는  https://behance.net/..."
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">
          입력 시 카드에 &quot;바로가기&quot; 버튼이 표시됩니다. 유튜브, Behance, 외부 사이트 등 연결 가능.
        </p>
      </div>

      {/* 상세 이미지 목록 */}
      <div>
        <Label>상세 이미지 URL 목록</Label>
        <p className="text-xs text-muted-foreground mt-0.5 mb-2">
          포트폴리오 상세 보기 시 보여줄 이미지들을 추가하세요.
        </p>
        {formData.images.length > 0 && (
          <div className="space-y-2 mb-3">
            {formData.images.map((url, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="relative w-14 h-10 rounded overflow-hidden border border-border bg-slate-100 flex-shrink-0">
                  <Image src={url} alt={`image-${idx}`} fill className="object-cover" sizes="56px" />
                </div>
                <span className="flex-1 text-xs text-muted-foreground truncate font-mono">{url}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                  onClick={() =>
                    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })
                  }
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
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
        <div className="flex items-center justify-between">
          <Label>설명</Label>
          <span className="text-xs text-muted-foreground">{formData.description.length} / 500</span>
        </div>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="포트폴리오 설명"
          rows={4}
          maxLength={500}
          className="mt-1"
        />
      </div>

      {/* 프로젝트 날짜 */}
      <div>
        <Label>프로젝트 날짜</Label>
        <Input
          type="month"
          value={formData.project_date}
          onChange={(e) => setFormData({ ...formData, project_date: e.target.value })}
          className="mt-1"
        />
      </div>

      {/* 공개 여부 */}
      <div className="flex items-center gap-3 pt-1">
        <Switch
          checked={formData.is_published}
          onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
        />
        <div>
          <Label className="cursor-pointer">공개 여부</Label>
          <p className="text-xs text-muted-foreground">
            {formData.is_published ? '홈페이지에 공개됩니다.' : '비공개 상태입니다.'}
          </p>
        </div>
      </div>
    </>
  );
}

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
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState<FormData>({
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
  });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<'thumbnail' | 'image' | null>(null);
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [metaFetchStatus, setMetaFetchStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const thumbnailFileRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

  const isLinkOnlyCategory = LINK_ONLY_CATEGORIES.includes(formData.category);

  const handleFetchMeta = async () => {
    const url = formData.link_url.trim();
    if (!url) {
      setFormError('링크 URL을 먼저 입력해주세요.');
      return;
    }
    setIsFetchingMeta(true);
    setMetaFetchStatus('idle');
    try {
      const res = await fetch('/api/og-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error();
      const { data } = await res.json();
      setFormData((prev) => ({
        ...prev,
        title: data.title || prev.title,
        thumbnail_url: data.thumbnail_url || prev.thumbnail_url,
      }));
      setMetaFetchStatus('success');
    } catch {
      setMetaFetchStatus('error');
    } finally {
      setIsFetchingMeta(false);
    }
  };

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
      setFetchError(null);
      const res = await fetch('/api/portfolios?admin=true');
      if (res.ok) {
        const data = await res.json();
        setPortfolios(data.data || []);
      } else {
        setFetchError('포트폴리오를 불러오지 못했습니다. 페이지를 새로고침해 주세요.');
      }
    } catch (error) {
      console.error('Failed to fetch portfolios:', error);
      setFetchError('네트워크 오류로 포트폴리오를 불러오지 못했습니다.');
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

  const openForm = (portfolio?: Portfolio, defaultCategory?: PortfolioCategory) => {
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
      });
    } else {
      setEditingPortfolio(null);
      setFormData({
        title: '',
        category: defaultCategory ?? ('' as PortfolioCategory),
        thumbnail_url: '',
        images: [],
        description: '',
        client_name: '',
        project_date: '',
        affiliation: '',
        link_url: '',
        is_published: false,
      });
    }
    setNewImageUrl('');
    setFormError(null);
    setMetaFetchStatus('idle');
    setIsFormOpen(true);
  };

  const handleSubmit = async () => {
    setFormError(null);
    if (isLinkOnlyCategory && !formData.link_url.trim()) {
      setFormError('링크 URL을 입력해주세요.');
      return;
    }
    if (!formData.title.trim()) {
      setFormError('제목을 입력해주세요. (링크 입력 후 "정보 가져오기" 버튼을 누르거나 직접 입력)');
      return;
    }
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
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
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
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/portfolios/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPortfolios();
        setDeleteTarget(null);
      } else {
        alert('삭제에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('Failed to delete portfolio:', error);
      alert('네트워크 오류로 삭제에 실패했습니다.');
    }
  };

  const togglePublish = async (portfolio: Portfolio) => {
    try {
      const res = await fetch(`/api/portfolios/${portfolio.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: !portfolio.is_published }),
      });
      if (res.ok) {
        fetchPortfolios();
      } else {
        alert('공개 설정 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to toggle publish:', error);
      alert('네트워크 오류로 공개 설정 변경에 실패했습니다.');
    }
  };

  // CategoryFormProps를 하나의 객체로 묶어 두 폼 컴포넌트에 spread
  const formProps: CategoryFormProps = {
    formData,
    setFormData,
    isFetchingMeta,
    metaFetchStatus,
    setMetaFetchStatus,
    newImageUrl,
    setNewImageUrl,
    uploading,
    thumbnailFileRef,
    imageFileRef,
    handleFetchMeta,
    handleThumbnailUpload,
    handleImageFileUpload,
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">포트폴리오 관리</h1>
          <p className="text-muted-foreground mt-1">포트폴리오를 추가하고 관리합니다.</p>
        </div>
        {/* 분야별 추가 버튼 */}
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {categories.map(([value, label]) => (
            <Button
              key={value}
              size="sm"
              onClick={() => openForm(undefined, value as PortfolioCategory)}
              className="bg-gold hover:bg-gold-dark text-navy"
            >
              <Plus className="h-3 w-3 mr-1.5" />
              {label}
            </Button>
          ))}
        </div>
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
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 저장 성공 배너 */}
      {saveSuccess && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          ✓ 포트폴리오가 저장되었습니다.
        </div>
      )}

      {/* Portfolio List */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
      ) : fetchError ? (
        <div className="text-center py-12 text-red-500">{fetchError}</div>
      ) : filteredPortfolios.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {searchTerm || categoryFilter !== 'all'
              ? '검색 결과가 없습니다.'
              : '아직 포트폴리오가 없습니다. 위 버튼으로 분야별 포트폴리오를 추가해보세요.'}
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
                  <div className="mb-2">
                    <h3 className="font-bold text-navy line-clamp-1">{portfolio.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {portfolioCategoryLabels[portfolio.category]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => togglePublish(portfolio)}>
                      {portfolio.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openForm(portfolio)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteTarget({ id: portfolio.id, title: portfolio.title })}
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

            {isLinkOnlyCategory
              ? <LinkOnlyFormContent {...formProps} />
              : <FullFormContent {...formProps} />
            }
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>취소</Button>
            <Button onClick={handleSubmit} className="bg-gold hover:bg-gold-dark text-navy">
              {editingPortfolio ? '수정' : '추가'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent aria-describedby={undefined}>
          <AlertDialogHeader>
            <AlertDialogTitle>포트폴리오 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-semibold text-foreground">&ldquo;{deleteTarget?.title}&rdquo;</span>을(를) 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
