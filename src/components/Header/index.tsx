import Image from 'next/image'
import { Button } from '../Button'
import { HeaderContainer, Menu } from './styles'
import { signOut, useSession } from 'next-auth/react'

import igapsLogo from '@/assets/igaps-logo.svg'
import Link from 'next/link'
import { Buildings, SignOut, UserPlus } from 'phosphor-react'

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
