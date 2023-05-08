import { styled } from '@/styles'
import { ComponentProps } from 'react'

export const Box = styled('div', {
  padding: '$6',
  borderRadius: '$md',
  backgroundColor: '$gray200',
  border: '1px solid $gray100',
})

export interface BoxProps extends ComponentProps<typeof Box> {}
