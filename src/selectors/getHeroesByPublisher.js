import { heroes } from '../data/heroes'

export const getHeroesByPublisher = (publisher) => {

  const validPublishers = ['DC Comics', 'Marvel Comics']

  if (!validPublishers.includes(publisher))
    throw new Error('Unicamente estan permitidos los publishers: DC Comics y Marvel Comics')

  return heroes.filter(hero => hero.publisher === publisher)
}