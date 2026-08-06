import { Outlet, createRootRoute, Scripts } from '@tanstack/react-router'
import '../index.css'

export const Route = createRootRoute({
  component: () => (
    <html lang="es" className="dark">
      <head>
        <title>El Profe José</title>
      </head>
      <body className="bg-zinc-950 text-white min-h-screen">
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
})