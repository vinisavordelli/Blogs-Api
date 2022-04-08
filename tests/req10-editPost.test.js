const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('10 - Sua aplicação deve ter o endpoint PUT `/post/:id`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que é possível editar um blogpost com sucesso', async () => {
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
      .put(`${url}/post/1`, {
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado',
      })
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        expect(json.title).toBe('Fórmula 1 editado');
        expect(json.content).toBe('O campeão do ano! editado');
        expect(json.userId).toBe(1);
        expect(json.categories[0].id).toBe(1);
        expect(json.categories[0].name).toBe("Inovação");
      });
  });

  it('Será validado que é não é possível editar as categorias de um blogpost', async () => {
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
      .put(`${url}/post/1`, {
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado',
        categoryIds: [1, 2]
      })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Categories cannot be edited');
      });
  });

  it('Será validado que não é possível editar um blogpost com outro usuário', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'MichaelSchumacher@gmail.com',
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
      .put(`${url}/post/1`, {
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado',
      })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Unauthorized user');
      });
  });

  it('Será validado que não possível editar um blogpost sem token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .put(`${url}/post/1`, {
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado',
      })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Token not found');
      });
  });

  it('Será validado que não possível editar um blogpost com token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'et462g5r',
            'Content-Type': 'application/json',
          },
        },
      })
      .put(`${url}/post/1`, {
        title: 'Fórmula 1 editado',
        content: 'O campeão do ano! editado',
      })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Expired or invalid token');
      });
  });

  it('Será validado que não possível editar um blogpost sem o campo `title`', async () => {
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
      .put(`${url}/post/1`, {
        content: 'O campeão do ano! editado',
      })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"title" is required');
      });
  });

  it('Será validado que não possível editar um blogpost sem o campo `content`', async () => {
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
      .put(`${url}/post/1`, {
        title: 'Fórmula 1 editado',
      })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"content" is required');
      });
  });

});
