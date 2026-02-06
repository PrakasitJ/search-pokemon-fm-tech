import { Pokemon } from '@/types/Pokemon';

const createMockPokemon = (overrides: Partial<Pokemon>): Pokemon => ({
  id: '0',
  number: '000',
  name: 'Test',
  weight: { minimum: '0kg', maximum: '0kg' },
  height: { minimum: '0m', maximum: '0m' },
  classification: 'Test Pokemon',
  types: [],
  resistant: [],
  attacks: { fast: [], special: [] },
  weaknesses: [],
  fleeRate: 0,
  maxCP: 0,
  evolutions: [],
  evolutionRequirements: { amount: 0, name: '' },
  maxHP: 0,
  image: '',
  ...overrides,
});

// Mocks
const mockBulbasaur = createMockPokemon({
  id: '1',
  number: '001',
  name: 'Bulbasaur',
  types: ['Grass', 'Poison'],
  image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg'
});

const mockCharmander = createMockPokemon({
  id: '4',
  number: '004',
  name: 'Charmander',
  types: ['Fire'],
  image: 'https://img.pokemondb.net/artwork/charmander.jpg'
});

const mockSquirtle = createMockPokemon({
  id: '7',
  number: '007',
  name: 'Squirtle',
  types: ['Water'],
  image: 'https://img.pokemondb.net/artwork/squirtle.jpg'
});

describe('Pokemon Type Validation', () => {
  test('Bulbasaur should be Grass type', () => {
    expect(mockBulbasaur.types).toContain('Grass');
  });

  test('Charmander should be Fire type', () => {
    expect(mockCharmander.types).toContain('Fire');
  });

  test('Squirtle should be Water type', () => {
    expect(mockSquirtle.types).toContain('Water');
  });
});
