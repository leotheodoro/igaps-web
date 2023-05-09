import { styled } from '@/styles'
import { ComponentProps } from 'react'

export const Box = styled('div', {
  padding: '$6',
  borderRadius: '$md',
  backgroundColor: '$white',
  border: '1px solid $gray100',
})

export interface BoxProps extends ComponentProps<typeof Box> {}
