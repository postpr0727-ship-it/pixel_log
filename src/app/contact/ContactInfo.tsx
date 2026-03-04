'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Clock, MessageCircle } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: '이메일',
    description: '24시간 내 답변 드립니다',
    value: 'postpr0727@gmail.com',
    href: 'mailto:postpr0727@gmail.com',
  },
  {
    icon: Phone,
    title: '전화',
    description: '평일 10:00 - 18:00',
    value: '010-0000-0000',
    href: 'tel:010-0000-0000',
  },
  {
    icon: MessageCircle,
    title: '카카오톡',
    description: '실시간 상담 가능',
    value: '@pixellog',
    href: 'https://pf.kakao.com/_pixellog',
  },
  {
    icon: Clock,
    title: '응답 시간',
    description: '평균 응답 시간',
    value: '24시간 이내',
    href: null,
  },
];

export function ContactInfo() {
  return (
    <section className="py-12 lg:py-16 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-navy/5 flex items-center justify-center mb-4 group-hover:bg-navy/10 transition-colors">
                <method.icon className="h-7 w-7 text-navy" />
              </div>
              <h3 className="text-base font-black text-navy mb-1 uppercase tracking-tighter">
                {method.title}
              </h3>
              <p className="text-xs text-navy/40 mb-3 font-bold italic">
                {method.description}
              </p>
              {method.href ? (
                <a
                  href={method.href}
                  className="text-sm font-black text-navy hover:underline underline-offset-4 transition-all"
                >
                  {method.value}
                </a>
              ) : (
                <span className="text-sm font-black text-navy/80 italic">
                  {method.value}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
