import { Animal } from './animal.js'
import { TitleComponent, type TitleComponentProps } from './TitleComponent.js'

eval("console.log(new Animal().isDangerous())")

const c = TitleComponent()
console.log(c);

const props: TitleComponentProps = {
  name: 'button',
  value: 'value'
}
console.log(props);