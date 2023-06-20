import Image from 'next/image'
import { Button } from '../Button'
import { HeaderContainer, Menu } from './styles'
import { signOut, useSession } from 'next-auth/react'

import igapsLogo from '@/assets/igaps-logo.svg'
import Link from 'next/link'
import { Buildings, House, SignOut, UserPlus, UsersFour } from 'phosphor-react'

export const Header = () => {
  const session = useSession()

  return (
    <HeaderContainer>
      <Menu>
        <Image src={igapsLogo} alt="2RFP" width={200} />
        {session.data?.user.access_level === 1 && (
          <>
            <Link href="/register-user" style={{ textDecoration: 'none' }}>
              <Button variant="tertiary" fontSize="md">
                Registrar novo usuário <UserPlus />
              </Button>
            </Link>
            <Link href="/business-units" style={{ textDecoration: 'none' }}>
              <Button variant="tertiary" fontSize="md">
                Unidades de negócio <Buildings />
              </Button>
            </Link>
            <Link href="/departments" style={{ textDecoration: 'none' }}>
              <Button variant="tertiary" fontSize="md">
                Setores <House />
              </Button>
            </Link>
            <Link href="/positions" style={{ textDecoration: 'none' }}>
              <Button variant="tertiary" fontSize="md">
                Cargos <UsersFour />
              </Button>
            </Link>
          </>
        )}
      </Menu>
      <Button variant="danger-secondary" onClick={() => signOut()}>
        Sair
        <SignOut />
      </Button>
    </HeaderContainer>
  )
}
