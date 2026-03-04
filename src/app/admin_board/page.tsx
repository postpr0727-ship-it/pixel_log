'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FolderOpen,
  FileText,
  MessageSquare,
  Plus,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { DashboardStats, Consultation } from '@/types';
import { consultationStatusLabels, serviceTypeLabels } from '@/lib/validations';

const statCards = [
  {
    title: '포트폴리오',
    key: 'totalPortfolios',
    icon: FolderOpen,
    href: '/admin_board/portfolios',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: '블로그 링크',
    key: 'totalBlogLinks',
    icon: FileText,
    href: '/admin_board/blog-links',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    title: '대기 중 상담',
    key: 'pendingConsultations',
    icon: MessageSquare,
    href: '/admin_board/consultations',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
];

const quickActions = [
  { title: '포트폴리오 추가', href: '/admin_board/portfolios?action=new', icon: FolderOpen },
  { title: '블로그 링크 추가', href: '/admin_board/blog-links?action=new', icon: FileText },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPortfolios: 0,
    totalConsultations: 0,
    pendingConsultations: 0,
    totalBlogLinks: 0,
  });
  const [recentConsultations, setRecentConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats and recent consultations
      const [statsRes, consultationsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/consultations'),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.data);
      }

      if (consultationsRes.ok) {
        const consultationsData = await consultationsRes.json();
        setRecentConsultations(consultationsData.data?.slice(0, 5) || []);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">대시보드</h1>
        <p className="text-muted-foreground mt-1">PIXEL-LOG 관리자 대시보드</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <Card className="hover:border-gold/50 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <span className="text-3xl font-bold text-navy">
                      {isLoading ? '-' : stats[stat.key as keyof DashboardStats]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{stat.title}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">빠른 작업</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 hover:border-gold hover:text-gold"
                  >
                    <Plus className="h-4 w-4 mr-3" />
                    {action.title}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Consultations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">최근 상담 요청</CardTitle>
              <Link href="/admin_board/consultations">
                <Button variant="ghost" size="sm" className="text-gold">
                  전체 보기
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  로딩 중...
                </div>
              ) : recentConsultations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  아직 상담 요청이 없습니다.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentConsultations.map((consultation) => (
                    <div
                      key={consultation.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-navy truncate">
                            {consultation.name}
                          </span>
                          <Badge
                            variant={consultation.status === 'pending' ? 'default' : 'secondary'}
                            className={
                              consultation.status === 'pending'
                                ? 'bg-amber-100 text-amber-700'
                                : consultation.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : ''
                            }
                          >
                            {consultationStatusLabels[consultation.status]}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {serviceTypeLabels[consultation.service_type]}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground ml-4">
                        <Clock className="h-3 w-3" />
                        {new Date(consultation.created_at).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
