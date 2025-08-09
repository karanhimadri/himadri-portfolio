"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Simplified provider: letting next-themes manage initial theme.
// Avoids inserting a transient wrapper element pre-mount that can
// trigger hydration boundary reparenting / mismatch warnings.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
