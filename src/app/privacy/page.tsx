export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-8">개인정보처리방침</h1>
                <div className="prose prose-invert max-w-none text-muted-foreground/80 space-y-6">
                    <p>
                        PIXEL-LOG(이하 "회사"라 합니다)는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와
                        관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
                    </p>

                    <h2 className="text-xl font-bold text-foreground mt-8 mb-4">제1조(개인정보의 처리 목적)</h2>
                    <p>
                        회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                        이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한
                        조치를 이행할 예정입니다.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>홈페이지 방문 및 상담 문의 접수</li>
                        <li>서비스 제공에 관한 계약 이행 및 요금정산</li>
                        <li>마케팅 및 광고에의 활용</li>
                    </ul>

                    <h2 className="text-xl font-bold text-foreground mt-8 mb-4">제2조(처리하는 개인정보의 항목)</h2>
                    <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>필수항목: 이름, 이메일 주소, 연락처</li>
                        <li>선택항목: 회사명, 직책</li>
                        <li>자동수집항목: IP 주소, 쿠키, 서비스 이용 기록, 방문 기록</li>
                    </ul>

                    <h2 className="text-xl font-bold text-foreground mt-8 mb-4">제3조(개인정보의 처리 및 보유 기간)</h2>
                    <p>
                        ① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
                        보유·이용기간 내에서 개인정보를 처리·보유합니다.
                        <br />
                        ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>고객 문의 처리: 문의 처리 완료 후 3년</li>
                        <li>서비스 제공 및 계약 이행: 서비스 종료 및 요금 정산 완료 후 5년</li>
                    </ul>

                    <div className="mt-12 pt-8 border-t border-border">
                        <p className="text-sm">부칙: 이 개인정보처리방침은 2024년 1월 1일부터 적용됩니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
