export const formatPrice = price =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price / 100)

export const getUniqueValues = (data, type) => {
  let allValues = data.map(item => item[type])
  if (type === 'colors') allValues = allValues.flat()
  allValues = allValues.map(item => item.toLowerCase())
  return ['all', ...new Set(allValues)]
}
