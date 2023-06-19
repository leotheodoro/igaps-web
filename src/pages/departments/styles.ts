import { Box } from '@/components/Box'
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

export const ButtonGroup = styled('div', {
  display: 'flex',
  gap: '$2',
  justifyContent: 'end',
})
