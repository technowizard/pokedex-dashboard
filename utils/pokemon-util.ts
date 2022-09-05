export const parseTypeColor = (type: string) => {
  switch (type) {
    case 'fire':
      return '#F7786B';
    case 'water':
      return '#77C4FE';
    case 'poison':
      return '#7C538C';
    case 'grass':
      return '#4FC1A6';
    case 'electric':
      return '#FFCE4B';
    case 'rock':
      return '#B1736C';
    case 'dark':
      return '#565669';
    case 'flying':
      return '#cdcde6';
    case 'dragon':
      return '#f7af5a';
    case 'bug':
      return '#92df68';
    case 'ground':
      return '#be7447';
    case 'psychic':
      return '#405483';
    case 'fighting':
      return '#a2a29b';
    case 'ghost':
      return '#9473b4';
    case 'ice':
      return '#a4def6';
    default:
      return '#c5c5c5';
  }
};

export const parseBaseStatsName = (name: string) => {
  switch (name) {
    case 'hp':
      return 'HP';
    case 'attack':
      return 'Attack';
    case 'defense':
      return 'Defense';
    case 'special-attack':
      return 'Sp. Attack';
    case 'special-defense':
      return 'Sp. Defense';
    case 'speed':
      return 'Speed';
    default:
      break;
  }
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const parseAbilityName = (string: string) => {
  const actualName = string.split('-');

  return actualName
    .map(item => {
      return capitalizeFirstLetter(item);
    })
    .join(' ');
};

// api related utils
export const getPokemonIdByUrl = (url: string) => url.split('/')[6];

export const getPokemonImageById = (id: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
