import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Headers from '@/components/header'

export const metadata = {
  title: '我的SPA首页',
  description: '一个使用Next.js和React-Bootstrap的简单项目',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Headers />
        <main>{children}</main>
      </body>
    </html>
  )
}
