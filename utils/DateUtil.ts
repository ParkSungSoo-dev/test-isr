import dayjs from 'dayjs'

export const now = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}