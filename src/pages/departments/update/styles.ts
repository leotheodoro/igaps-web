import { Box } from '@/components/Box'
import { Text } from '@/components/Text'
import { styled } from '@/styles'

export const Container = styled(Box, {
  marginTop: '$10',
  width: '80%',
  margin: '0 auto',
  marginBottom: '$10',
})

export const ContainerHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '$4',
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
