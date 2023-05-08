import { Box } from '@/components/Box'
import { Heading } from '@/components/Heading'
import { styled } from '@/styles'
import { Text } from '@/components/Text'
import Link from 'next/link'

export const Container = styled('main', {
  maxWidth: 572,
  margin: '$20 auto $4',
  padding: '0 $4',
})

export const Header = styled('div', {
  padding: '0 $6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  [`> ${Heading}`]: {
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    color: '$gray200',
    marginBottom: '$6',
  },
})

export const Form = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormError = styled(Text, {
  color: '#F75A68',
})

export const BackToDashoard = styled(Link, {
  color: '$white',
  textDecoration: 'none',

  '&:hover': {
    color: '$gray100',
  },
})
