import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowArcLeft, Buildings } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { BackToDashoard, Container, Form, FormError, Header } from './styles'
import { Heading } from '@/components/Heading'
import { TextInput } from '@/components/TextInput'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth].api'
import { api } from '@/lib/axios'
import { ToastContainer, toast } from 'react-toastify'
import { NextSeo } from 'next-seo'

const signupClientFormSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .email({ message: 'Insira um endereço de e-mail válido' })
    .transform((value) => value.toLowerCase()),
  cnpj: z.string(),
})

type SignupClientFormData = z.infer<typeof signupClientFormSchema>

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupClientFormData>({
    resolver: zodResolver(signupClientFormSchema),
  })

  async function handleSignup(data: SignupClientFormData) {
    const { name, email, cnpj } = data

    try {
      const response = await api.post<{ status: number }>('/clients/register', {
        name,
        email,
        cnpj,
      })
      if (response.status === 201) {
        toast.success('Cliente criado com sucesso')
      }
    } catch (error) {
      return toast.error('Internal server error')
    }
  }

  return (
    <>
      <NextSeo title="Registrar cliente | 2RFP Technology" />
      <Container>
        <Header>
          <Heading as="strong">Registrar um novo cliente</Heading>
          <BackToDashoard href="/">
            <ArrowArcLeft /> Voltar para dashboard
          </BackToDashoard>
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleSignup)}>
          <label>
            <Text size="sm">Nome</Text>
            <TextInput placeholder="Cliente" {...register('name')} />

            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">E-mail</Text>
            <TextInput
              placeholder="cliente@example.com"
              {...register('email')}
            />

            {errors.email && (
              <FormError size="sm">{errors.email.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">CNPJ</Text>
            <TextInput placeholder="00.000.000/0000-00" {...register('cnpj')} />

            {errors.cnpj && (
              <FormError size="sm">{errors.cnpj.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Registrar cliente <Buildings />
          </Button>
        </Form>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        closeOnClick
        pauseOnHover={false}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session || session.user.access_level !== 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
