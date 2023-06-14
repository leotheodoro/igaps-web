import { TableContainer } from './styles'

import { ReactNode } from 'react'

interface TableProps {
  children: ReactNode
}

export function Table({ children }: TableProps) {
  return <TableContainer>{children}</TableContainer>
}
