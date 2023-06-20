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

interface Position {
  id: string
  name: string
  goal: string
  cbo: string
  department: {
    id: string
    name: string
  }
}

export default function Positions() {
  async function handleDelete(id: string) {
    await api.delete(`positions/delete/${id}`)

    queryClient.invalidateQueries(['positions'])
  }

  const { data: positions } = useQuery<Position[]>(['positions'], async () => {
    const response = await api.get('/positions/list')

    return response.data
  })

  return (
    <>
      <NextSeo title="Cargos | iGAPS Technology" />
      <Header />
      <Container>
        <ContainerHeader>
          <Heading>Cargos</Heading>
          <Link href="/positions/register" style={{ textDecoration: 'none' }}>
            <Button>Cadastrar cargo</Button>
          </Link>
        </ContainerHeader>

        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Objetivo</th>
              <th>CBO</th>
              <th>Setor</th>
            </tr>
          </thead>
          <tbody>
            {positions &&
              positions.map((position) => (
                <tr key={position.id}>
                  <td>{position.name}</td>
                  <td>{position.goal}</td>
                  <td>{position.cbo}</td>
                  <td>{position.department.name}</td>
                  <td>
                    <ButtonGroup>
                      <Link
                        href={`/positions/update/${position.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button size="sm" variant="secondary">
                          Editar
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="danger-secondary"
                        onClick={() => handleDelete(position.id)}
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
