'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  contactFormSchema,
  type ContactFormSchema,
  serviceTypeLabels,
  budgetOptions,
} from '@/lib/validations';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service_type: undefined,
      budget: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormSchema) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-4">
              문의가 접수되었습니다!
            </h2>
            <p className="text-muted-foreground mb-8">
              입력하신 이메일로 확인 메일이 발송되었습니다.
              <br />
              24시간 이내에 담당자가 연락드리겠습니다.
            </p>
            <Button onClick={() => setIsSuccess(false)} variant="outline">
              새 문의하기
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-navy/60 text-sm font-black tracking-widest uppercase mb-4 block">
            CONTACT FORM
          </span>
          <h2 className="section-title text-navy mt-2 mb-6 font-black italic">상담 신청</h2>
          <p className="text-navy/70 font-black italic">
            아래 양식을 작성해 주시면 빠른 시일 내에 연락드리겠습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl border border-navy/10"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름 *</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>회사명</FormLabel>
                      <FormControl>
                        <Input placeholder="(선택사항)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일 *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처 *</FormLabel>
                      <FormControl>
                        <Input placeholder="010-1234-5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>서비스 종류 *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="서비스를 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(serviceTypeLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>예산</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="(선택사항)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {budgetOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>문의 내용 *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="프로젝트에 대해 자세히 알려주세요. 목적, 타겟, 예상 일정 등을 포함해주시면 더 정확한 상담이 가능합니다."
                        className="min-h-[150px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-navy hover:bg-navy-dark text-gold font-black italic text-lg h-14 rounded-2xl transition-all shadow-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    제출 중...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    상담 신청하기
                  </>
                )}
              </Button>

              <div className="mt-8 p-6 bg-navy/5 rounded-2xl border border-navy/10 text-center space-y-2">
                <p className="text-sm font-black text-navy uppercase tracking-tight">
                  📌 PIXEL-LOG는 준앤준솔루션의 전문 디자인/개발 브랜드입니다.
                </p>
                <p className="text-sm text-navy/60 font-medium italic">
                  계약 및 세금계산서 발행은 <span className="font-black text-navy">준앤준솔루션</span> 명의로 진행됩니다.
                </p>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
