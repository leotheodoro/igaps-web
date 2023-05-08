import { Header } from '@/components/Header'

import { User } from '@prisma/client'

import { ToastContainer } from 'react-toastify'

import { NextSeo } from 'next-seo'
import { DashboardContainer } from './styles'

interface DashboardProps {
  clients: User[]
  loggedUser: User
}

export default function Dashboard({ clients, loggedUser }: DashboardProps) {
  return (
    <>
      <NextSeo title="Dashboard | 2RFP Technology" />
      <Header />
      <DashboardContainer>
        <h1>IGAPS PROJECT</h1>
      </DashboardContainer>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
    </>
  )
}
