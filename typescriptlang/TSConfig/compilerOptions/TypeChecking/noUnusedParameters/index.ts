const createDefaultKeyboard = (modelId: number) => {
                              // 'modelId' is declared but its value is never read.
  const defaultModelId = 23
  return {
    type: 'keyboard',
    modelId: defaultModelId
  }
}