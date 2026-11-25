import type { Metadata } from 'next';
import { Inter, Noto_Sans_Myanmar, Source_Code_Pro } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  subsets: ['myanmar', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-myanmar',
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-source-code-pro',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UY Computer Studies Enrollment Guide | ရန်ကုန်တက္ကသိုလ် ကျောင်းအပ်လမ်းညွှန်',
  description:
    'Mobile-first step-by-step campus enrollment guide and live form pre-fill preview for the Department of Computer Studies, University of Yangon.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="my"
      className={`${inter.variable} ${notoSansMyanmar.variable} ${sourceCodePro.variable}`}
    >
      <body className="bg-light-background text-light-on-surface antialiased">
        <div className="min-h-screen max-w-md mx-auto bg-light-background flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
