import './globals.css'
import Nav from './components/Nav'
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'Built-It',
  description: 'Starter NextJS application that integrates with AWS S3 and DynamoDB.',
  icons: {
    icon: '/logo.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <Nav /> */}
        {children}
        <Analytics />
      </body>
    </html>
  )
}