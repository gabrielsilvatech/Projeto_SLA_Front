"use client"

import { Toaster } from "@/components/ui/sonner"

export function ToastProvider() {
  return <Toaster
  position="top-right" 
  duration={4000} 
  closeButton
  richColors 
  theme="light"
  toastOptions={{
    className: 'my-toast-class',
    style: {
      background: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      border: '1px solid hsl(var(--border))',
    },
  }}
/>
}

