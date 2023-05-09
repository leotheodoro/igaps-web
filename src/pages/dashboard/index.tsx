import { Header } from '@/components/Header'

import { User } from '@prisma/client'

import { ToastContainer } from 'react-toastify'

import { NextSeo } from 'next-seo'
import { DashboardContainer } from './styles'

interface DashboardProps {
  loggedUser: User
}

export default function Dashboard({ loggedUser }: DashboardProps) {
  return (
    <>
      <NextSeo title="Dashboard | iGAPS Technology" />
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
