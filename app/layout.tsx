import './globals.css'
import Nav from './components/Nav'
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'Next.js',
  description: 'Starter NextJS application that integrates with AWS S3 and DynamoDB.',
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