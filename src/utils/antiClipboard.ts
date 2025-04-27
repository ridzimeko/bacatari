const applyAntiClipboard = () => {
  // Bersihin handler .oncopy
  document.oncopy = null

  // Pasang listener yang nutup semua sabotase
  document.addEventListener(
    'copy',
    (e) => {
      e.preventDefault()
      e.stopImmediatePropagation()

      const selectedText = window.getSelection() as Selection
      if (selectedText.toString().length > 0 && navigator.clipboard) {
        navigator.clipboard.writeText(selectedText.toString())
      }
    },
    true,
  )

  console.log('anti clipboard applied')
}

export default applyAntiClipboard
