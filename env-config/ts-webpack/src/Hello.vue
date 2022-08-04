<template>
  <h1>Hello Vue!</h1>
</template>
<script lang='ts'>
import { number } from "prop-types"


export default {
  setup() {
    const o: {a: number, b:number} = {
      a: 1,
      b: 2,
    }
    console.log(o)
    return {
      
    }
  }
}
</script>