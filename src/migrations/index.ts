import * as migration_20261019_200500_initial from './20261019_200500_initial'

export const migrations = [
  {
    up: migration_20261019_200500_initial.up,
    down: migration_20261019_200500_initial.down,
    name: '20261019_200500_initial',
  },
]
