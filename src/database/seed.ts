import { UserService, INewUserBuffer } from '../services';

export default (async function() {
  const userBuffers: INewUserBuffer[] = [
    {
      firstname: 'charles',
      lastname: 'kenney',
      username: 'charles01',
      email: 'charlesc.kenney@gmail.com',
      password: 'password',
    }
  ]

  userBuffers.forEach(async buffer => await UserService.create(buffer));
})
