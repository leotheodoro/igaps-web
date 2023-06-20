import React, { ComponentProps, ElementRef, forwardRef } from 'react'
import * as Select from '@radix-ui/react-select'
import {
  SelectContainer,
  SelectContent,
  SelectIcon,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectViewport,
  StyledItem,
  StyledItemIndicator,
} from './styles'
import { CaretDown, CaretUp, Check } from 'phosphor-react'

export interface SelectOption {
  key: string
  label: string
}

export interface SelectProps extends ComponentProps<typeof SelectContainer> {
  placeholder?: string
  options: SelectOption[]
  defaultValue?: string
  disabled?: boolean
  onChange?: (value: string) => void
}
export interface SelectItemProps extends ComponentProps<typeof StyledItem> {}

const SelectItem = React.forwardRef<
  ElementRef<typeof StyledItem>,
  SelectItemProps
>(({ children, ...props }, ref) => {
  return (
    <StyledItem {...props} ref={ref}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <Check />
      </StyledItemIndicator>
    </StyledItem>
  )
})

export const SelectInput = forwardRef<
  ElementRef<typeof SelectContainer>,
  SelectProps
>(
  (
    {
      placeholder,
      options,
      defaultValue,
      onChange,
      disabled = false,
    }: SelectProps,
    ref,
  ) => {
    return (
      <SelectContainer
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={onChange}
      >
        <SelectTrigger ref={ref}>
          <Select.Value placeholder={placeholder} />
          {!disabled && (
            <SelectIcon>
              <CaretDown />
            </SelectIcon>
          )}
        </SelectTrigger>
        <Select.Portal>
          <SelectContent position="popper">
            <SelectScrollUpButton>
              <CaretUp />
            </SelectScrollUpButton>
            <SelectViewport>
              {options.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectViewport>
            <SelectScrollDownButton>
              <CaretDown />
            </SelectScrollDownButton>
          </SelectContent>
        </Select.Portal>
      </SelectContainer>
    )
  },
)

SelectInput.displayName = 'Select'
SelectItem.displayName = 'ReactItem'
