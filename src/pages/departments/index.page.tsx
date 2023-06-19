import { Header } from '@/components/Header'

import { ToastContainer } from 'react-toastify'

import { NextSeo } from 'next-seo'
import { Container, ContainerHeader, ButtonGroup } from './styles'
import { Heading } from '@/components/Heading'
import { Table } from '@/components/Table'
import { Button } from '@/components/Button'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { authOptions } from '../api/auth/[...nextauth].api'
import { getServerSession } from 'next-auth'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

interface Department {
  id: string
  name: string
}

export default function Departments() {
  async function handleDelete(id: string) {
    await api.delete(`departments/delete/${id}`)

    queryClient.invalidateQueries(['departments'])
  }

  const { data: departments } = useQuery<Department[]>(
    ['departments'],
    async () => {
      const response = await api.get('/departments/list')

      return response.data
    },
  )

  return (
    <>
      <NextSeo title="Departamentos | iGAPS Technology" />
      <Header />
      <Container>
        <ContainerHeader>
          <Heading>Departamentos</Heading>
          <Link href="/departments/register" style={{ textDecoration: 'none' }}>
            <Button>Cadastrar departamento</Button>
          </Link>
        </ContainerHeader>

        <Table>
          <thead>
            <tr>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {departments &&
              departments.map((department) => (
                <tr key={department.id}>
                  <td>{department.name}</td>
                  <td>
                    <ButtonGroup>
                      <Link
                        href={`/departments/update/${department.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button size="sm" variant="secondary">
                          Editar
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="danger-secondary"
                        onClick={() => handleDelete(department.id)}
                      >
                        Excluir
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
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
