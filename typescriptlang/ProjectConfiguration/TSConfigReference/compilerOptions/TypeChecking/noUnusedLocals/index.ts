const createKeyboard = (modelId: number) => {
  const defaultModelId = 12
        // 'defaultModelId' is declared but its value is never read.
  return {
    type: 'keyboard',
    modelId
  }
}