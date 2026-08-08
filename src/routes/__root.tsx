import { Outlet, createRootRoute, Scripts } from '@tanstack/react-router'
import '../index.css'

export const Route = createRootRoute({
  component: () => (
    <html lang="es" className="dark">
      {/* @ts-ignore */}
      <head>
        <title>El Profe José | Soluciones Académicas y Tecnológicas</title>
        <meta name="description" content="Plataforma de exámenes de práctica (Senescyt, EPN, ESPE, UCE) y servicios tecnológicos. Ing. José Ñacato." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://el-profe-jose.vercel.app/" />
        <meta property="og:title" content="El Profe José | Soluciones Académicas, Tecnológicas y Digitales" />
        <meta property="og:description" content="Plataforma de exámenes de práctica y servicios tecnológicos. Ing. José Ñacato." />
        <meta property="og:image" content="https://el-profe-jose.vercel.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="El Profe José | Soluciones Académicas y Tecnológicas" />
        <meta name="twitter:description" content="Plataforma de exámenes de práctica y servicios tecnológicos." />
        <meta name="twitter:image" content="https://el-profe-jose.vercel.app/og-image.jpg" />
      </head>
      <body className="bg-zinc-950 text-white min-h-screen">
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
})