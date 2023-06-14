import { Header } from '@/components/Header'

import { ToastContainer, toast } from 'react-toastify'

import { NextSeo } from 'next-seo'
import { Container, ContainerHeader, Form, FormError } from './styles'
import { Heading } from '@/components/Heading'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import Link from 'next/link'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'

const registerBusinessUnitFormSchema = z.object({
  name: z.string(),
})

type RegisterBusinessUnitFormData = z.infer<
  typeof registerBusinessUnitFormSchema
>

export default function RegisterBusinessUnit() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterBusinessUnitFormData>({
    resolver: zodResolver(registerBusinessUnitFormSchema),
  })

  async function handleSignup(data: RegisterBusinessUnitFormData) {
    const { name } = data

    console.log(name)
    return

    try {
      const response = await api.post<{ status: number }>('/users/register', {
        name,
        email,
        password,
        phone,
      })
      if (response.status === 201) {
        toast.success('Unidade de negócio criada com sucesso')
      }
    } catch (error) {
      return toast.error('Internal server error')
    }
  }

  return (
    <>
      <NextSeo title="Cadastrar unidade de negócio | iGAPS Technology" />
      <Header />
      <Container>
        <ContainerHeader>
          <Heading>Cadastrar unidade de negócio</Heading>
          <Link href="/business-units" style={{ textDecoration: 'none' }}>
            <Button variant="tertiary">Voltar</Button>
          </Link>
        </ContainerHeader>

        <Form as="form" onSubmit={handleSubmit(handleSignup)}>
          <label>
            <Text size="sm">Nome</Text>
            <TextInput placeholder="Usuário" {...register('name')} />

            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Cadastrar unidade de negócio
          </Button>
        </Form>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
    </>
  )
}
