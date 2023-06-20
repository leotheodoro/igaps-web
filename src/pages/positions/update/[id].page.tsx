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
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth].api'
import { prisma } from '@/lib/prisma'
import { SelectInput, SelectOption } from '@/components/SelectInput'
import { useMemo } from 'react'

interface Department {
  id: string
  name: string
}

interface UpdatePositionProps {
  position: {
    id: string
    name: string
    goal: string
    cbo: string
    department_id: string
  }
  departments: Department[]
}

const updatePositionFormSchema = z.object({
  name: z.string().min(1, { message: 'Nome do cargo é obrigatório' }),
  goal: z.string(),
  cbo: z.string(),
  departmentId: z.string({ required_error: 'Cliente é obrigatório' }),
})

type UpdatePositionFormData = z.infer<typeof updatePositionFormSchema>

export default function UpdatePosition({
  position,
  departments,
}: UpdatePositionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<UpdatePositionFormData>({
    resolver: zodResolver(updatePositionFormSchema),
  })

  async function handleSignup(data: UpdatePositionFormData) {
    const { name, goal, cbo, departmentId } = data

    try {
      const response = await api.put<{ status: number }>(
        `/positions/update/${position.id}`,
        {
          name,
          goal,
          cbo,
          departmentId,
        },
      )
      if (response.status === 200) {
        toast.success('Cargo editado com sucesso')
      }
    } catch (error) {
      return toast.error('Internal server error')
    }
  }

  const departmentOptions: SelectOption[] = useMemo(() => {
    return departments.map((department) => {
      return {
        key: department.id,
        label: department.name,
      }
    })
  }, [departments])

  return (
    <>
      <NextSeo title="Editar cargo | iGAPS Technology" />
      <Header />
      <Container>
        <ContainerHeader>
          <Heading>Editar {position.name}</Heading>
          <Link href="/positions" style={{ textDecoration: 'none' }}>
            <Button variant="tertiary">Voltar</Button>
          </Link>
        </ContainerHeader>

        <Form as="form" onSubmit={handleSubmit(handleSignup)}>
          <label>
            <Text size="sm">Nome</Text>
            <TextInput
              placeholder="Nome do cargo"
              {...register('name')}
              defaultValue={position.name}
            />

            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Objetivo</Text>
            <TextInput
              placeholder="Objetivo do cargo"
              {...register('goal')}
              defaultValue={position.goal}
            />

            {errors.goal && (
              <FormError size="sm">{errors.goal.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">CBO</Text>
            <TextInput
              placeholder="CBO do cargo"
              {...register('cbo')}
              defaultValue={position.cbo}
            />

            {errors.cbo && (
              <FormError size="sm">{errors.cbo.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Departamento</Text>
            <Controller
              name="departmentId"
              control={control}
              defaultValue={position.department_id}
              render={({ field }) => {
                return (
                  <SelectInput
                    placeholder="Selecione um setor"
                    options={departmentOptions}
                    disabled={departmentOptions.length === 0}
                    defaultValue={position.department_id}
                    onChange={(value: string) => {
                      field.onChange(value)
                    }}
                  />
                )
              }}
            />

            {errors.departmentId && (
              <FormError size="sm">{errors.departmentId.message}</FormError>
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

  const positionId = params?.id

  const position = await prisma.position.findUnique({
    where: { id: positionId },
  })

  const departments = await prisma.department.findMany({
    where: {
      businessUnit: {
        is_active: true,
      },
    },
  })

  return {
    props: {
      position,
      departments,
    },
  }
}
