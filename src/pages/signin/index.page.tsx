import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Form, FormError, Header } from './styles'
import { TextInput } from '@/components/TextInput'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth].api'
import { useRouter } from 'next/router'

import igapsLogo from '@/assets/igaps-logo.svg'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

const signinFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Insira um endereço de e-mail válido' })
    .transform((value) => value.toLowerCase()),
  password: z.string(),
})

type SigninFormData = z.infer<typeof signinFormSchema>

export default function Signin() {
  const router = useRouter()

  const hasCredentialsInvalidError = !!router.query.error

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinFormSchema),
  })

  async function handleSignin(data: SigninFormData) {
    const { email, password } = data

    signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    })
  }

  return (
    <>
      <NextSeo title="Login | iGAPS" />
      <Container>
        <Header>
          <Image src={igapsLogo} alt="2RFP" />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleSignin)}>
          <label>
            <Text size="sm">E-mail</Text>
            <TextInput placeholder="user@example.com" {...register('email')} />

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

          <Button type="submit" disabled={isSubmitting}>
            Entrar <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
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
