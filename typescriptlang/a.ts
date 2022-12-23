import { string } from 'prop-types';
import {b} from './b'
import c from './c'

console.log('b: ', b);
console.log('c: ', c);

/**
 * 注释1
 * 注释1
 */
export function func (str?: string) {
  console.log('func', str)
}

func('hello')

interface User {
  name: string;
  tall?: number;
}

const zhangsan: User = {
  name: '张三',
  tall: 181
}