import * as Select from '@radix-ui/react-select'
import { styled } from '@stitches/react'

export const SelectContainer = styled(Select.Root, {})

export const SelectTrigger = styled(Select.SelectTrigger, {
  width: '100%',
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$sm',
  fontFamily: '$default',
  fontWeight: '$regular',
  backgroundColor: '$gray100',
  color: '$gray800',
  '&:not(:disabled):hover': { color: '$gray900' },
  '&[data-placeholder]': { color: '$gray800' },

  '&:disabled': {
    opacity: 0.8,
    cursor: 'not-allowed',
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

export const SelectIcon = styled(Select.SelectIcon, {
  color: '$gray800',
  display: 'flex',
  marginLeft: '$2',
})

export const SelectContent = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: '$gray100',
  borderRadius: 6,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
})

export const SelectViewport = styled(Select.Viewport, {
  padding: 5,
})

export const StyledItem = styled(Select.Item, {
  fontSize: '$sm',
  color: '$gray800',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 40,
  padding: '0 $20 0 $6',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$gray800',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: '$gray200',
    color: '$gray800',
  },
})

export const SelectLabel = styled(Select.Label, {
  padding: '0 25px',
  fontSize: '$sm',
  color: '$gray800',
})

export const SelectSeparator = styled(Select.Separator, {
  height: 1,
  backgroundColor: '$gray100',
  margin: 5,
})

export const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: '$gray100',
  color: '$gray800',
  cursor: 'default',
}

export const SelectScrollUpButton = styled(
  Select.ScrollUpButton,
  scrollButtonStyles,
)

export const SelectScrollDownButton = styled(
  Select.ScrollDownButton,
  scrollButtonStyles,
)
