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
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth].api'

const registerDepartmentFormSchema = z.object({
  name: z.string(),
})

type RegisterDepartmentFormData = z.infer<typeof registerDepartmentFormSchema>

export default function RegisterDepartment() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterDepartmentFormData>({
    resolver: zodResolver(registerDepartmentFormSchema),
  })

  async function handleSignup(data: RegisterDepartmentFormData) {
    const { name } = data

    try {
      const response = await api.post<{ status: number }>(
        '/departments/register',
        {
          name,
        },
      )
      if (response.status === 201) {
        toast.success('Departmento criado com sucesso')
      }
    } catch (error) {
      return toast.error('Internal server error')
    }
  }

  return (
    <>
      <NextSeo title="Cadastrar Departmento | iGAPS Technology" />
      <Header />
      <Container>
        <ContainerHeader>
          <Heading>Cadastrar Departmento</Heading>
          <Link href="/departments" style={{ textDecoration: 'none' }}>
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
            Cadastrar Departmento
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
