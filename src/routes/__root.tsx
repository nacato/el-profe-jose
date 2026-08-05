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
      {
        title: 'El Profe José | Soluciones Digitales y Académicas',
      },
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