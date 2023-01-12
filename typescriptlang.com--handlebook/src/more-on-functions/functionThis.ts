interface User {
  name: string
  admin: boolean
}
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
function getDB () {
  const db = {
    users: [
      {name: 'zhangsan', admin: true},
      {name: 'lisi', admin: false},
    ],
    filterUsers(filter: (this: User) => boolean) {
      console.log('filterUsers---this', this);
      console.log('this.users---', this.users);
      const res = this.users.filter(function (item: User) {
        return filter.call(item)
      })
      console.log('res---', res);
      return res
    }
  }
  return db
}
const db = getDB();
console.log('db---', db);
const admins = db.filterUsers(function (this: User) {
  console.log('this---', this);
  return this.admin;
});

console.log('admins---', admins)