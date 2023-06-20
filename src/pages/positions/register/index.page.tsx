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
import { SelectInput, SelectOption } from '@/components/SelectInput'
import { prisma } from '@/lib/prisma'
import { useMemo } from 'react'

const registerPositionFormSchema = z.object({
  name: z.string().min(1, { message: 'Nome do cargo é obrigatório' }),
  goal: z.string(),
  cbo: z.string(),
  departmentId: z.string({ required_error: 'Cliente é obrigatório' }),
})

type RegisterPositionFormData = z.infer<typeof registerPositionFormSchema>

interface Department {
  id: string
  name: string
}

interface RegisterPositionProps {
  departments: Department[]
}

export default function RegisterPosition({
  departments,
}: RegisterPositionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<RegisterPositionFormData>({
    resolver: zodResolver(registerPositionFormSchema),
  })

  async function handleSignup(data: RegisterPositionFormData) {
    const { name, goal, cbo, departmentId } = data

    try {
      const response = await api.post<{ status: number }>(
        '/positions/register',
        {
          name,
          goal,
          cbo,
          departmentId,
        },
      )
      if (response.status === 201) {
        toast.success('Cargo criado com sucesso')
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
      <NextSeo title="Cadastrar cargo | iGAPS Technology" />
      <Header />
      <Container>
        <ContainerHeader>
          <Heading>Cadastrar cargo</Heading>
          <Link href="/positions" style={{ textDecoration: 'none' }}>
            <Button variant="tertiary">Voltar</Button>
          </Link>
        </ContainerHeader>

        <Form as="form" onSubmit={handleSubmit(handleSignup)}>
          <label>
            <Text size="sm">Nome</Text>
            <TextInput placeholder="Nome do cargo" {...register('name')} />

            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Objetivo</Text>
            <TextInput placeholder="Objetivo do cargo" {...register('goal')} />

            {errors.goal && (
              <FormError size="sm">{errors.goal.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">CBO</Text>
            <TextInput placeholder="CBO do cargo" {...register('cbo')} />

            {errors.cbo && (
              <FormError size="sm">{errors.cbo.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Departamento</Text>
            <Controller
              name="departmentId"
              control={control}
              render={({ field }) => {
                return (
                  <SelectInput
                    placeholder="Selecione um setor"
                    options={departmentOptions}
                    disabled={departmentOptions.length === 0}
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
            Cadastrar cargo
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

  const departments = await prisma.department.findMany({
    where: {
      businessUnit: {
        is_active: true,
      },
    },
  })

  return {
    props: {
      departments,
    },
  }
}
