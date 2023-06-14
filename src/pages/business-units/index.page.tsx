import { Header } from '@/components/Header'

import { ToastContainer } from 'react-toastify'

import { NextSeo } from 'next-seo'
import { Container, ContainerHeader, ButtonGroup } from './styles'
import { Heading } from '@/components/Heading'
import { Table } from '@/components/Table'
import { Button } from '@/components/Button'
import Link from 'next/link'

export default function BusinessUnits() {
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
              <th>ID</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Jalovi Centro</td>
              <td>
                <ButtonGroup>
                  <Button size="sm" variant="secondary">
                    Editar
                  </Button>
                  <Button size="sm" variant="danger-secondary">
                    Excluir
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jalovi Rio Branco</td>
              <td>
                <ButtonGroup>
                  <Button size="sm" variant="secondary">
                    Editar
                  </Button>
                  <Button size="sm" variant="danger-secondary">
                    Excluir
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
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
