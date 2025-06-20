import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Headers from '@/components/header';
import ApolloProviderWrapper from '@/components/apollo-providerWrapper';

export const metadata = {
  title: 'Buch SPA',
  description: 'Frontend für Buch Backend mit Next.js und React-Bootstrap',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProviderWrapper>
          <Headers />
          <main>{children}</main>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
