const request = require('../request');
const db = require('../db');

describe('bands api', () => {
  beforeEach(() => {
    return db.dropCollection('bands');
  });

  const dödsrit = {
    name: 'Dödsrit',
    genre: 'Blackened Crust',
    guitarists: 1,
    vocals: ['whispers', 'scream'],
    synths: false,
    lyrics: {
      form: 'narrative',
      language: 'English'
    }
  };

  function postBand(band) {
    return request
      .post('/api/bands')
      .send(band)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a band', () => {
    return postBand(dödsrit)
      .then(band => {
        expect(band).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...dödsrit
        });
      });
  });

  it('gets a band by id', () => {
    return postBand(dödsrit)
      .then(band => {
        return request.get(`/api/bands/${band._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(band);
          });
      });
  });
  
  it('gets a list of bands', () => {
    return Promise.all([
      postBand({ name: 'Cult of Luna', genre: 'Doom Metal', guitarists: 3, lyrics: { form: 'narrative', language: 'English' } }),
      postBand({ name: 'We Butter The Bread With Butter', genre: 'Deathcore', guitarists: 2, lyrics: { form: 'satirical', language: 'German' } }),
      postBand({ name: 'Auðn', genre: 'Black Metal', guitarists: 3, lyrics: { form: 'narrative', language: 'Icelandic' } })
    ])
      .then(() => {
        return request
          .get('/api/bands')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });
  it('updates a band', () => {
    return postBand(dödsrit)
      .then(band => {
        band.guitarist = 2;
        return request
          .put(`/api/bands/${band._id}`)
          .send(band)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.guitarists).toBe(1);
      });
  });
  it('deletes a band', () => {
    return postBand(dödsrit)
      .then(band => {
        return request
          .delete(`/api/bands/${band._id}`)
          .expect(200);
      });
  });
});