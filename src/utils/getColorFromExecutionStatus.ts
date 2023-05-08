import { colors } from '@/styles/tokens'

export function getColorFromExecutionStatus(status: string): string {
  if (status === 'Concluido') {
    return colors.ignite500
  }

  if (status === 'Pendente') {
    return colors.warning500
  }

  if (status === 'Erro ao consultar') {
    return colors.danger500
  }

  return colors.gray200
}
