import {
  Outlet,
  createRootRoute,
  Scripts,
  HeadContent,
} from '@tanstack/react-router'
import '../index.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: 'El Profe José | Soluciones Digitales y Académicas' },
      { name: 'description', content: 'Desarrollo Web, Soporte Técnico, Diseño y Clases de Matemáticas. ¡Prueba nuestro Simulador de Universidades!' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://el-profe-jose.vercel.app/' },
      { property: 'og:title', content: 'El Profe José | Simulador de Universidades' },
      { property: 'og:description', content: 'Plataforma de exámenes de práctica (EPN, ESPE, UCE) y servicios tecnológicos.' },
      { property: 'og:image', content: 'https://el-profe-jose.vercel.app/profejose.jpg' },
    ],
  }),
  component: () => (
    <html lang="es" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-zinc-950 text-white min-h-screen">
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
})