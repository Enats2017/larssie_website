
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const playlistScript = localFont({
  src: '../assets/font_family/PlaylistFF/Playlist Script.otf',
  variable: '--font-playlist-script',
})

const playlistCaps = localFont({
  src: '../assets/font_family/PlaylistFF/Playlist Caps.otf',
  variable: '--font-playlist-caps',
})

export const metadata: Metadata = {
  title: 'My App',
  description: 'Next.js + Prisma + Tailwind',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playlistScript.variable} ${playlistCaps.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>

      <body className="font-poppins bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}



