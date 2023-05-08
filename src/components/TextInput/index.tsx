import { ComponentProps, ElementRef, forwardRef } from 'react'
import { Input, TextInputContainer } from './styles'

export interface TextInputProps extends ComponentProps<typeof Input> {}

export const TextInput = forwardRef<ElementRef<typeof Input>, TextInputProps>(
  (props: TextInputProps, ref) => {
    return (
      <TextInputContainer>
        <Input ref={ref} {...props} />
      </TextInputContainer>
    )
  },
)

TextInput.displayName = 'TextInput'
