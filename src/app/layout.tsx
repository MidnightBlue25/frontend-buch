import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Headers from '@/components/header'

export const metadata = {
  title: 'Buch SPA',
  description: 'Frontend für Buch Backend mit Next.js und React-Bootstrap',
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
