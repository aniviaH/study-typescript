try {
  // ...
} catch (err) {
  // We have to verify err is an error before using it as one.
  console.log(err.message)
  // Property 'message' does not exist on type 'unknown'.
  
  if (err instanceof Error) {
    console.log(err.message)
  }
}