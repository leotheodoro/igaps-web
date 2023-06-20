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

interface UpdateBusinessUnitProps {
  businessUnit: {
    id: string
    name: string
  }
}

const updateBusinessUnitFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Nome da unidade de negócio é obrigatória' }),
})

type UpdateBusinessUnitFormData = z.infer<typeof updateBusinessUnitFormSchema>

export default function UpdateBusinessUnit({
  businessUnit,
}: UpdateBusinessUnitProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateBusinessUnitFormData>({
    resolver: zodResolver(updateBusinessUnitFormSchema),
  })

  async function handleSignup(data: UpdateBusinessUnitFormData) {
    const { name } = data

    try {
      const response = await api.put<{ status: number }>(
        `/business-units/update/${businessUnit.id}`,
        {
          name,
        },
      )
      if (response.status === 200) {
        toast.success('Unidade de negócio editada com sucesso')
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
          <Heading>Editar {businessUnit.name}</Heading>
          <Link href="/business-units" style={{ textDecoration: 'none' }}>
            <Button variant="tertiary">Voltar</Button>
          </Link>
        </ContainerHeader>

        <Form as="form" onSubmit={handleSubmit(handleSignup)}>
          <label>
            <Text size="sm">Nome</Text>
            <TextInput
              placeholder="Nome da unidade de negócio"
              {...register('name')}
              defaultValue={businessUnit.name}
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

  const businessUnitId = params?.id

  const businessUnit = await prisma.businessUnit.findUnique({
    where: { id: businessUnitId },
  })

  return {
    props: {
      businessUnit,
    },
  }
}
