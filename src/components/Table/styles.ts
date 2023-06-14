import { styled } from '@/styles'

export const TableContainer = styled('table', {
  width: '100%',
  fontFamily: 'sans-serif',
  color: '$gray900',
  borderCollapse: 'collapse',

  'thead th': {
    padding: '0.75rem 1rem',
    textAlign: 'left',
  },

  'tbody td': {
    padding: '0.75rem 1rem',
    color: '$gray600',
  },

  'tbody td:first-child': {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },

  'tbody td:last-child': {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },

  'tbody tr:nth-child(even) td': {
    background: '$gray100',
  },
})
