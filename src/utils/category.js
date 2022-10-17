const categories = [
  { id: 101, name: 'Umum' },
  { id: 102, name: 'Kebutuhan' },
  { id: 103, name: 'Keinginan' },
  { id: 104, name: 'Hobi' },
  { id: 105, name: 'Makan' },
  { id: 106, name: 'Jajan' },
  { id: 107, name: 'Investasi' },
  { id: 108, name: 'Hiburan' },
  { id: 109, name: 'Jalan-jalan' },
  { id: 110, name: 'Belanja' },
  { id: 111, name: 'Pendidikan' },
  { id: 112, name: 'Kesehatan' },
  { id: 113, name: 'Keluarga' },
  { id: 114, name: 'Pajak' },
  { id: 115, name: 'Pengeluaran Lainnya' },
  { id: 201, name: 'Gaji' },
  { id: 202, name: 'Uang Saku' },
  { id: 203, name: 'Pendapatan pasif' },
  { id: 205, name: 'Pemberian' },
  { id: 206, name: 'Hadiah' },
  { id: 207, name: 'Lainnya' },
]

function getCategoryName (id) {
  const category = categories.find(category => category.id === id)
  return category.name
}

export {
  categories,
  getCategoryName
}