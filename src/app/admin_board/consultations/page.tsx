'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Mail,
  Phone,
  Clock,
  Building2,
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
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Consultation } from '@/types';
import {
  consultationStatusLabels,
  serviceTypeLabels,
  budgetOptions,
} from '@/lib/validations';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-700',
};

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  useEffect(() => {
    fetchConsultations();
  }, []);

  useEffect(() => {
    let filtered = [...consultations];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.phone.includes(term) ||
          c.company?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    setFilteredConsultations(filtered);
  }, [consultations, searchTerm, statusFilter]);

  const fetchConsultations = async () => {
    try {
      const res = await fetch('/api/consultations');
      if (res.ok) {
        const data = await res.json();
        setConsultations(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch consultations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string, adminNotes?: string) => {
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, admin_notes: adminNotes }),
      });

      if (res.ok) {
        fetchConsultations();
        setSelectedConsultation(null);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getBudgetLabel = (value?: string) => {
    if (!value) return '-';
    const option = budgetOptions.find((o) => o.value === value);
    return option?.label || value;
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">상담 요청 관리</h1>
        <p className="text-muted-foreground mt-1">
          고객 상담 요청을 확인하고 관리합니다.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="이름, 이메일, 연락처로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                {Object.entries(consultationStatusLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Consultations List */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
      ) : filteredConsultations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {searchTerm || statusFilter !== 'all'
              ? '검색 결과가 없습니다.'
              : '아직 상담 요청이 없습니다.'}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredConsultations.map((consultation, index) => (
            <motion.div
              key={consultation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="cursor-pointer hover:border-gold/50 transition-colors"
                onClick={() => setSelectedConsultation(consultation)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-navy text-lg">
                          {consultation.name}
                        </span>
                        <Badge className={statusColors[consultation.status]}>
                          {consultationStatusLabels[consultation.status]}
                        </Badge>
                        <Badge variant="outline">
                          {serviceTypeLabels[consultation.service_type]}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {consultation.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {consultation.phone}
                        </span>
                        {consultation.company && (
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {consultation.company}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {new Date(consultation.created_at).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Dialog
        open={!!selectedConsultation}
        onOpenChange={() => setSelectedConsultation(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>상담 요청 상세</DialogTitle>
          </DialogHeader>
          {selectedConsultation && (
            <div className="space-y-6 pt-4">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">이름</Label>
                  <p className="font-medium">{selectedConsultation.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">회사명</Label>
                  <p className="font-medium">{selectedConsultation.company || '-'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">이메일</Label>
                  <a
                    href={`mailto:${selectedConsultation.email}`}
                    className="font-medium text-gold hover:underline"
                  >
                    {selectedConsultation.email}
                  </a>
                </div>
                <div>
                  <Label className="text-muted-foreground">연락처</Label>
                  <a
                    href={`tel:${selectedConsultation.phone}`}
                    className="font-medium text-gold hover:underline"
                  >
                    {selectedConsultation.phone}
                  </a>
                </div>
                <div>
                  <Label className="text-muted-foreground">서비스</Label>
                  <p className="font-medium">
                    {serviceTypeLabels[selectedConsultation.service_type]}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">예산</Label>
                  <p className="font-medium">
                    {getBudgetLabel(selectedConsultation.budget)}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div>
                <Label className="text-muted-foreground">문의 내용</Label>
                <div className="mt-2 p-4 bg-muted/30 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedConsultation.message}</p>
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <Label className="text-muted-foreground">관리자 메모</Label>
                <Textarea
                  placeholder="관리자 메모를 입력하세요..."
                  defaultValue={selectedConsultation.admin_notes || ''}
                  className="mt-2"
                  id="admin-notes"
                />
              </div>

              {/* Status Update */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    const notes = (document.getElementById('admin-notes') as HTMLTextAreaElement)?.value;
                    updateStatus(selectedConsultation.id, 'pending', notes);
                  }}
                  className={selectedConsultation.status === 'pending' ? 'border-amber-500' : ''}
                >
                  대기중
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const notes = (document.getElementById('admin-notes') as HTMLTextAreaElement)?.value;
                    updateStatus(selectedConsultation.id, 'in_progress', notes);
                  }}
                  className={selectedConsultation.status === 'in_progress' ? 'border-blue-500' : ''}
                >
                  진행중
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const notes = (document.getElementById('admin-notes') as HTMLTextAreaElement)?.value;
                    updateStatus(selectedConsultation.id, 'completed', notes);
                  }}
                  className={selectedConsultation.status === 'completed' ? 'border-green-500' : ''}
                >
                  완료
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const notes = (document.getElementById('admin-notes') as HTMLTextAreaElement)?.value;
                    updateStatus(selectedConsultation.id, 'cancelled', notes);
                  }}
                  className={selectedConsultation.status === 'cancelled' ? 'border-gray-500' : ''}
                >
                  취소
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
