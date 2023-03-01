export function TitleComponent() {}
export interface TitleComponentProps {}

interface User {
  name: string;
  id: number;
}

// const user: User = {
//   name: "Hayes",
//   id: 0,
// };

interface User {
  name: string;
  id: number;

  // username: string;
}
 
class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
 
const user: User = new UserAccount("Murphy", 1);