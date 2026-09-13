export const downloadFile = async (url: string, filename: string): Promise<void> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`)
  }
  const blob = await response.blob()
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = objectUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  // Отложенный revoke: мгновенный вызов может отменить запущенное браузером
  // сохранение, и файл «доезжает» с опозданием (рассинхрон со снекбаром).
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 10000)
}
