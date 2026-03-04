'use client';

import { useEffect, useState, Suspense } from 'react';
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
    is_published: false,
    display_order: 0,
  });

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
        is_published: false,
        display_order: portfolios.length,
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = async () => {
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
      }
    } catch (error) {
      console.error('Failed to save portfolio:', error);
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
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>제목 *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="포트폴리오 제목"
                />
              </div>
              <div>
                <Label>카테고리 *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value as PortfolioCategory })
                  }
                >
                  <SelectTrigger>
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
                />
              </div>
              <div className="col-span-2">
                <Label>썸네일 URL *</Label>
                <Input
                  value={formData.thumbnail_url}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail_url: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="col-span-2">
                <Label>설명</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="포트폴리오 설명"
                  rows={4}
                />
              </div>
              <div>
                <Label>프로젝트 날짜</Label>
                <Input
                  type="month"
                  value={formData.project_date}
                  onChange={(e) =>
                    setFormData({ ...formData, project_date: e.target.value })
                  }
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
                />
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Switch
                  checked={formData.is_published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_published: checked })
                  }
                />
                <Label>공개 여부</Label>
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
