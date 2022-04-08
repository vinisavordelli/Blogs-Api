const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('5 - Sua aplicação deve ter o endpoint POST `/categories`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que é possivel cadastrar uma categoria com sucesso', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'lewishamilton@gmail.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/categories`, {
        name: 'Música'
      })
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.name).toBe('Música');
      });
  });

  it('Será validado que não é possivel cadastrar uma categoria sem o campo name', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'lewishamilton@gmail.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/categories`, {

      })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"name" is required');
      });
  });

  it('Será validado que não é possível cadastrar uma categoria sem o token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/categories`, {
        name: 'Typescript'
      })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Token not found');
      });
  });

  it('Será validado que não é possível cadastrar uma categoria com o token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'kwngu4425h2',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/categories`, {
        name: 'Typescript'
      })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Expired or invalid token');
      });
  });
})