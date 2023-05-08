import Image from 'next/image'
import { Button } from '../Button'
import { HeaderContainer, ButtonGroup } from './styles'
import { signOut, useSession } from 'next-auth/react'

import igapsLogo from '@/assets/igaps-logo.svg'
import Link from 'next/link'
import { Buildings, SignOut, UserPlus } from 'phosphor-react'

export const Header = () => {
  const session = useSession()

  return (
    <HeaderContainer>
      <Image src={igapsLogo} alt="2RFP" width={200} />
      <ButtonGroup>
        {session.data?.user.access_level === 1 && (
          <Link href="/register-user" style={{ textDecoration: 'none' }}>
            <Button variant="secondary">
              Registrar novo usuário <UserPlus />
            </Button>
          </Link>
        )}
        {session.data?.user.access_level === 1 && (
          <Link href="/register-client" style={{ textDecoration: 'none' }}>
            <Button variant="secondary">
              Registrar novo cliente <Buildings />
            </Button>
          </Link>
        )}
        <Button variant="danger-secondary" onClick={() => signOut()}>
          Sair
          <SignOut />
        </Button>
      </ButtonGroup>
    </HeaderContainer>
  )
}
