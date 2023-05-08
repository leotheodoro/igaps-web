import { Box } from '@/components/Box'
import { styled } from '@/styles'
import { Text } from '@/components/Text'

export const DashboardContainer = styled(Box, {
  marginTop: '$10',
  width: '80%',
  margin: '0 auto',
  marginBottom: '$10',
})

export const SelectProjectForm = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

export const InputGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '0 $6',
  minWidth: 230,
  gap: '$2',
  minHeight: 120,
})

export const ButtonToBottom = styled('div', {
  marginTop: -8,
  flexGrow: '1',

  button: {
    width: '100%',
  },
})

export const FormError = styled(Text, {
  color: '#F75A68',
})

export const InfoStatusContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: 800,
  margin: '0 auto',
})
