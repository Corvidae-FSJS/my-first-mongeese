const Band = require('../band');

describe('Band Model', () => {
  it('valid model all properties', () => {
    const data = {
      name: 'Cult of Luna',
      genre: 'Doom Metal',
      guitarists: 3,
      vocals: ['whispers', 'clean', 'bellow', 'scream'],
      synths: false,
      lyrics: {
        form: 'epic narrative',
        language: 'English'
      }
    };

    const band = new Band(data);
    const errors = band.validateSync();
    console.log(errors);
    expect(errors).toBeUndefined();

    const json = band.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('validates required properties', () => {
    const data = {};
    const band = new Band(data);
    const { errors } = band.validateSync();
    expect(errors.name.kind).toBe('required');
    expect(errors.genre.kind).toBe('required');
    expect(errors.guitarists.kind).toBe('required');
    expect(errors['lyrics.language'].kind).toBe('required');
  });

  it('populates default properties', () => {
    const data = {
      name: 'Dödsrit',
      genre: 'Blackened Crust',
      guitarists: 1,
      vocals: ['whispers', 'scream', 'bellow', 'squeal'],
      lyrics: {
        form: 'narrative',
        language: 'English'
      }
    };
    const dödsrit = new Band(data);
    const err = dödsrit.validateSync();
    expect(err).toBeUndefined();

    expect(dödsrit.synths).toBe(false);
  });

  it('enforces max number of guitarists', () => {
    const data = {
      guitarists: 6
    };
    const guitarmageddon = new Band(data);
    const { errors } = guitarmageddon.validateSync();
    expect(errors.guitarists.kind).toBe('max');
  });

  it('enforces min number of guitarists', () => {
    const data = {
      guitarists: -1 
    };
    const guitarmageddon = new Band(data);
    const { errors } = guitarmageddon.validateSync();
    expect(errors.guitarists.kind).toBe('min');
  });

  it('enforces enum on vocals', () => {
    const data = {
      vocals: ['screams']
    };
    const tyr = new Band(data);
    const { errors } = tyr.validateSync();
    expect(errors['vocals.0'].kind).toBe('enum');
  });
});