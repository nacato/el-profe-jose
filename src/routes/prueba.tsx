import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/prueba')({
  component: () => {
    const [texto, setTexto] = useState('')
    return (
      <div style={{ padding: '40px', backgroundColor: 'white', height: '100vh' }}>
        <h1 style={{ color: 'black' }}>Prueba de Texto</h1>
        <input 
          style={{ color: 'black', border: '1px solid black', padding: '10px' }}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <p style={{ color: 'black' }}>Escribiste: {texto}</p>
      </div>
    )
  }
})