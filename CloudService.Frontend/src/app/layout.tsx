import './globals.css';

export const metadata = {
  title: 'NovaCloud - Dịch vụ Đám mây',
  description: 'Hạ tầng Đám mây Doanh nghiệp',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
