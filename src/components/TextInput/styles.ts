import { styled } from '@/styles'

export const TextInputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  border: '2px solid $gray100',
  borderRadius: '$sm',
  backgroundColor: '$gray100',

  '&:focus-within': {
    borderColor: '$ignite700',
  },

  '&.disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  'input::-webkit-calendar-picker-indicator': {
    filter: 'invert(100%) brightness(30%)',
  },

  variants: {
    size: {
      sm: {
        padding: '$2 $3',
      },
      md: {
        padding: '$3 $4',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export const Input = styled('input', {
  width: '100%',
  border: 0,
  backgroundColor: 'transparent',
  fontFamily: '$default',
  fontWeight: '$regular',
  fontSize: '$sm',
  color: '$gray800',

  '&:focus': {
    outline: 0,
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    color: '$gray400',
  },
})
