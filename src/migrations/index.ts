import * as migration_20261019_200500_initial from './20261019_200500_initial'
import * as migration_20261020_195538_blob_storage_fields from './20261020_195538_blob_storage_fields'

export const migrations = [
  {
    up: migration_20261019_200500_initial.up,
    down: migration_20261019_200500_initial.down,
    name: '20261019_200500_initial',
  },
  {
    up: migration_20261020_195538_blob_storage_fields.up,
    down: migration_20261020_195538_blob_storage_fields.down,
    name: '20261020_195538_blob_storage_fields',
  },
]
