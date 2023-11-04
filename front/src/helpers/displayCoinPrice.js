export const moneyMask = (value) => {
  return value
  value = String(value + '00')
  // value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

  const result = new Intl.NumberFormat('ru-RU').format(
    parseFloat(value) / 100
  )

  return result
}