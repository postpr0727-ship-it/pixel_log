export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-8">이용약관</h1>
                <div className="prose prose-invert max-w-none text-muted-foreground/80 space-y-6">
                    <p>
                        본 약관은 PIXEL-LOG(이하 "회사"라 합니다)가 제공하는 서비스의 이용조건 및 절차, 회사와 회원 간의 권리,
                        의무 및 책임사항 등을 규정함을 목적으로 합니다.
                    </p>

                    <h2 className="text-xl font-bold text-foreground mt-8 mb-4">제1조 (목적)</h2>
                    <p>
                        본 약관은 회사가 운영하는 웹사이트에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어
                        회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
                    </p>

                    <h2 className="text-xl font-bold text-foreground mt-8 mb-4">제2조 (정의)</h2>
                    <p>
                        1. "서비스"란 구현되는 단말기(PC, TV, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 회원이
                        이용할 수 있는 회사의 제반 서비스를 의미합니다.
                        <br />
                        2. "이용자"란 회사의 웹사이트에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및
                        비회원을 말합니다.
                    </p>

                    <h2 className="text-xl font-bold text-foreground mt-8 mb-4">제3조 (약관의 명시와 개정)</h2>
                    <p>
                        1. 회사는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의
                        주소를 포함), 전화번호, 모사전송번호, 전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자
                        등을 이용자가 쉽게 알 수 있도록 초기 서비스화면(전면)에 게시합니다.
                    </p>

                    <div className="mt-12 pt-8 border-t border-border">
                        <p className="text-sm">부칙: 이 약관은 2024년 1월 1일부터 적용됩니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
