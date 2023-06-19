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
import { prisma } from '@/lib/prisma'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

interface BusinessUnit {
  id: string
  name: string
}

export default function BusinessUnits() {
  async function handleDelete(id: string) {
    await api.delete(`business-units/delete/${id}`)

    queryClient.invalidateQueries(['business-units'])
  }

  const { data: businessUnits } = useQuery<BusinessUnit[]>(
    ['business-units'],
    async () => {
      const response = await api.get('/business-units/list')

      return response.data
    },
  )

  return (
    <>
      <NextSeo title="Unidades de negócio | iGAPS Technology" />
      <Header />
      <Container>
        <ContainerHeader>
          <Heading>Unidades de negócio</Heading>
          <Link
            href="/business-units/register"
            style={{ textDecoration: 'none' }}
          >
            <Button>Cadastrar unidade de negócio</Button>
          </Link>
        </ContainerHeader>

        <Table>
          <thead>
            <tr>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {businessUnits &&
              businessUnits.map((businessUnit) => (
                <tr key={businessUnit.id}>
                  <td>{businessUnit.name}</td>
                  <td>
                    <ButtonGroup>
                      <Link
                        href={`/business-units/update/${businessUnit.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button size="sm" variant="secondary">
                          Editar
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="danger-secondary"
                        onClick={() => handleDelete(businessUnit.id)}
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
