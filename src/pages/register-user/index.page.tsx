import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowArcLeft, UserPlus } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { BackToDashoard, Container, Form, FormError, Header } from './styles'
import { Heading } from '@/components/Heading'
import { TextInput } from '@/components/TextInput'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth].api'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'
import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useMemo, useState } from 'react'
import { SelectInput, SelectOption } from '@/components/Select'
import { NextSeo } from 'next-seo'

const signupUserFormSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .email({ message: 'Insira um endereço de e-mail válido' })
    .transform((value) => value.toLowerCase()),
  password: z.string(),
  clientId: z.string({ required_error: 'Cliente é obrigatório' }),
})

type SignupFormData = z.infer<typeof signupUserFormSchema>

interface Client {
  id: string
  name: string
}

export default function Signup() {
  const [clients, setClients] = useState<Client[]>([])
  const router = useRouter()

  const hasCredentialsInvalidError = !!router.query.error

  useEffect(() => {
    api.get('/clients').then((response) => {
      setClients(response.data)
    })
  }, [])

  const clientsOptions: SelectOption[] = useMemo(() => {
    return clients.map((client) => {
      return {
        key: client.id,
        label: client.name,
      }
    })
  }, [clients])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupUserFormSchema),
  })

  async function handleSignup(data: SignupFormData) {
    const { name, email, password, clientId } = data

    try {
      const response = await api.post<{ status: number }>('/users/register', {
        name,
        email,
        password,
        clientId,
      })
      if (response.status === 201) {
        toast.success('Usuário criado com sucesso')
      }
    } catch (error) {
      return toast.error('Internal server error')
    }
  }

  return (
    <>
      <NextSeo title="Registrar usuário | 2RFP Technology" />
      <Container>
        <Header>
          <Heading as="strong">Registrar um novo usuário</Heading>
          <BackToDashoard href="/">
            <ArrowArcLeft /> Voltar para dashboard
          </BackToDashoard>
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleSignup)}>
          <label>
            <Text size="sm">Nome</Text>
            <TextInput placeholder="Usuário" {...register('name')} />

            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">E-mail</Text>
            <TextInput
              placeholder="usuario@example.com"
              {...register('email')}
            />

            {errors.email && (
              <FormError size="sm">{errors.email.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Senha</Text>
            <TextInput
              placeholder="••••••••••"
              type="password"
              {...register('password')}
            />

            {errors.password && (
              <FormError size="sm">{errors.password.message}</FormError>
            )}

            {hasCredentialsInvalidError && (
              <FormError size="sm">Credenciais inválidas</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Cliente relacionado</Text>
            <Controller
              name="clientId"
              control={control}
              render={({ field }) => {
                return (
                  <SelectInput
                    placeholder="Selecione um cliente"
                    options={clientsOptions}
                    disabled={clientsOptions.length === 0}
                    onChange={(value: string) => {
                      field.onChange(value)
                    }}
                  />
                )
              }}
            />

            {errors.clientId && (
              <FormError size="sm">{errors.clientId.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Registrar usuário <UserPlus />
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
