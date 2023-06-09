import { ComponentProps, ElementType } from 'react'
import { styled } from '@/styles'

export const Button = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  boxSizing: 'border-box',
  minWidth: 120,
  padding: '0 $4',
  borderRadius: '$sm',

  fontWeight: '$medium',
  fontFamily: '$default',
  textAlign: 'center',
  cursor: 'pointer',
  transition: '150ms',

  svg: {
    width: '$4',
    height: '$4',
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$ignite500',
        color: '$white',

        '&:not(:disabled):hover': {
          backgroundColor: '$ignite300',
        },

        '&:disabled': {
          background: '$gray200',
          cursor: 'not-allowed',
        },
      },

      secondary: {
        color: '$ignite300',
        border: '2px solid $ignite500',

        '&:not(:disabled):hover': {
          backgroundColor: '$ignite500',
          color: '$white',
        },

        '&:disabled': {
          borderColor: '$gray200',
          color: '$gray200',
          cursor: 'not-allowed',
        },
      },

      tertiary: {
        color: '$gray600',

        '&:not(:disabled):hover': {
          color: '$gray900',
        },

        '&:disabled': {
          cursor: 'not-allowed',
        },
      },

      'danger-secondary': {
        color: '$danger300',
        border: '2px solid $danger300',

        '&:not(:disabled):hover': {
          backgroundColor: '$danger300',
          color: '$white',
        },

        '&:disabled': {
          borderColor: '$gray200',
          color: '$gray200',
          cursor: 'not-allowed',
        },
      },
    },

    size: {
      sm: {
        height: 38,
      },

      md: {
        height: 46,
      },
    },

    fontSize: {
      sm: {
        fontSize: '$sm',
      },
      md: {
        fontSize: '$md',
      },
      lg: {
        fontSize: '$lg',
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fontSize: 'sm',
  },
})

export interface ButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType
}

Button.displayName = 'Button'
