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
import { prisma } from '@/lib/prisma'

interface UpdateDepartmentProps {
  department: {
    id: string
    name: string
  }
}

const updateDepartmentFormSchema = z.object({
  name: z.string().min(1, { message: 'Nome do setor é obrigatório' }),
})

type UpdateDepartmentFormData = z.infer<typeof updateDepartmentFormSchema>

export default function UpdateDepartment({
  department,
}: UpdateDepartmentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateDepartmentFormData>({
    resolver: zodResolver(updateDepartmentFormSchema),
  })

  async function handleSignup(data: UpdateDepartmentFormData) {
    const { name } = data

    try {
      const response = await api.put<{ status: number }>(
        `/departments/update/${department.id}`,
        {
          name,
        },
      )
      if (response.status === 200) {
        toast.success('Departamento editada com sucesso')
      }
    } catch (error) {
      return toast.error('Internal server error')
    }
  }

  return (
    <>
      <NextSeo title="Editar unidade de negócio | iGAPS Technology" />
      <Header />
      <Container>
        <ContainerHeader>
          <Heading>Editar {department.name}</Heading>
          <Link href="/departments" style={{ textDecoration: 'none' }}>
            <Button variant="tertiary">Voltar</Button>
          </Link>
        </ContainerHeader>

        <Form as="form" onSubmit={handleSubmit(handleSignup)}>
          <label>
            <Text size="sm">Nome</Text>
            <TextInput
              placeholder="Nome da unidade de negócio"
              {...register('name')}
              defaultValue={department.name}
            />

            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Editar
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

export const getServerSideProps: GetServerSideProps<
  any,
  { id: string }
> = async ({ req, res, params }) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session || session.user.access_level !== 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const departmentId = params?.id

  const department = await prisma.department.findUnique({
    where: { id: departmentId },
  })

  return {
    props: {
      department,
    },
  }
}
