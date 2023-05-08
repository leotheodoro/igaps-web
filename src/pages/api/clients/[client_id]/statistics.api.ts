import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '../../auth/[...nextauth].api'
import { z } from 'zod'
import dayjs from 'dayjs'

interface Register {
  time: number
  count: number
}

interface RegisterWithStatus {
  name: string | number
  count: number
}

const statisticsBodySchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  tableName: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).end()
  }

  const clientId = String(req.query.client_id)

  if (session.user.access_level === 0 && session.user.client_id !== clientId) {
    return res.status(403).end()
  }

  const { tableName, startDate, endDate } = statisticsBodySchema.parse(req.body)

  const startDateWithTime = dayjs(startDate).startOf('day')
  const endDateWithTime = dayjs(endDate).endOf('day')

  if (startDate > endDate) {
    return res.status(400).json({
      message: 'Período inicial não pode ser maior que o período final',
    })
  }

  const registersWithStatus: Array<{ status: number; count: string }> =
    await prisma.$queryRawUnsafe(`
    SELECT
      status,
      CAST(COUNT(*) AS CHAR) AS 'count'
    FROM
      ${tableName}
    WHERE
      (time_exec BETWEEN '${startDateWithTime.toISOString()}' AND '${endDateWithTime.toISOString()}')
    GROUP BY status
  `)

  const registersWithStatusFormatted: RegisterWithStatus[] =
    registersWithStatus.map((register) => {
      return {
        count: Number(register.count),
        name: register.status,
      }
    })

  const registersWithExecutionStatus: Array<{
    status_execucao: string
    count: string
  }> = await prisma.$queryRawUnsafe(`
    SELECT
      status_execucao,
      CAST(COUNT(*) AS CHAR) AS 'count'
    FROM
      ${tableName}
    WHERE
      (time_exec BETWEEN '${startDateWithTime.toISOString()}' AND '${endDateWithTime.toISOString()}')
    GROUP BY status_execucao
  `)

  const registersWithExecutionStatusFormatted: RegisterWithStatus[] =
    registersWithExecutionStatus.map((register) => {
      return {
        name: register.status_execucao,
        count: Number(register.count),
      }
    })

  const isSameDayMonthAndYear = startDateWithTime.isSame(
    endDateWithTime.startOf('day'),
  )
  if (isSameDayMonthAndYear) {
    const registersPerHour: Register[] = await prisma.$queryRawUnsafe(`
      SELECT
        HOUR(time_exec) AS 'time',
        CAST(COUNT(time_exec) AS CHAR) AS 'count'
      FROM
        ${tableName}
      WHERE
        (time_exec BETWEEN '${startDateWithTime.toISOString()}' AND '${endDateWithTime.toISOString()}')
      GROUP BY HOUR(time_exec)
    `)

    const registersPerHourWithMissingHours = Array.from({ length: 24 }).map(
      (_, index) => {
        const hasRegisters = registersPerHour.filter(
          (register) => register.time === index,
        )

        if (hasRegisters.length > 0) {
          return {
            time: hasRegisters[0].time,
            count: Number(hasRegisters[0].count),
          }
        }

        return {
          time: index,
          count: 0,
        }
      },
    )

    return res.status(200).json({
      registersByTime: registersPerHourWithMissingHours,
      registersByStatus: registersWithStatusFormatted,
      registersByExecutionStatus: registersWithExecutionStatusFormatted,
    })
  }

  const isSameMonthAndYear = startDateWithTime
    .startOf('month')
    .isSame(endDateWithTime.startOf('day').startOf('month'))
  if (isSameMonthAndYear) {
    const registersPerDay: Register[] = await prisma.$queryRawUnsafe(`
      SELECT
        DAY(time_exec) AS 'time',
        CAST(COUNT(time_exec) AS CHAR) AS 'count'
      FROM
        ${tableName}
      WHERE
        (time_exec BETWEEN '${startDateWithTime.toISOString()}' AND '${endDateWithTime.toISOString()}')
      GROUP BY DAY(time_exec)
    `)

    const daysOfMonth = startDateWithTime.daysInMonth()
    const registersPerDayWithMissingDays = Array.from({
      length: daysOfMonth,
    }).map((_, index) => {
      const hasRegisters = registersPerDay.filter(
        (register) => register.time === index + 1,
      )

      if (hasRegisters.length > 0) {
        return {
          time: index + 1,
          count: Number(hasRegisters[0].count),
        }
      }

      return {
        time: index + 1,
        count: 0,
      }
    })

    return res.status(200).json({
      registersByTime: registersPerDayWithMissingDays,
      registersByStatus: registersWithStatusFormatted,
      registersByExecutionStatus: registersWithExecutionStatusFormatted,
    })
  }

  const isSameYear = startDateWithTime.year() === endDateWithTime.year()
  if (isSameYear) {
    const registersPerMonth: Register[] = await prisma.$queryRawUnsafe(`
      SELECT
        MONTH(time_exec) AS 'time',
        CAST(COUNT(time_exec) AS CHAR) AS 'count'
      FROM
        ${tableName}
      WHERE
        (time_exec BETWEEN '${startDateWithTime.toISOString()}' AND '${endDateWithTime.toISOString()}')
      GROUP BY MONTH(time_exec)
    `)

    const registersPerMonthWithMissingMonths = Array.from({
      length: 12,
    }).map((_, index) => {
      const hasRegisters = registersPerMonth.filter(
        (register) => register.time === index + 1,
      )

      if (hasRegisters.length > 0) {
        return {
          time: index + 1,
          count: Number(hasRegisters[0].count),
        }
      }

      return {
        time: index + 1,
        count: 0,
      }
    })

    return res.status(200).json({
      registersByTime: registersPerMonthWithMissingMonths,
      registersByStatus: registersWithStatusFormatted,
      registersByExecutionStatus: registersWithExecutionStatusFormatted,
    })
  }

  const isDifferentYears = startDateWithTime.year() !== endDateWithTime.year()
  if (isDifferentYears) {
    const registersPerYear: Register[] = await prisma.$queryRawUnsafe(`
      SELECT
        YEAR(time_exec) AS 'time',
        CAST(COUNT(time_exec) AS CHAR) AS 'count'
      FROM
        ${tableName}
      WHERE
        (time_exec BETWEEN '${startDateWithTime.toISOString()}' AND '${endDateWithTime.toISOString()}')
      GROUP BY YEAR(time_exec)
    `)

    const registersPerYearWithIntegerCount: Register[] = registersPerYear.map(
      (register) => {
        return {
          time: register.time,
          count: Number(register.count),
        }
      },
    )

    return res.status(200).json({
      registersByTime: registersPerYearWithIntegerCount,
      registersByStatus: registersWithStatusFormatted,
      registersByExecutionStatus: registersWithExecutionStatusFormatted,
    })
  }
}
