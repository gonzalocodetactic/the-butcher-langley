// Webflow grid placement IDs (w-node-...) from the export. The Webflow CSS places grid
// items by these IDs, so each template slot uses the ID of the export's item at the same
// position. Items added beyond these lists get no ID and use the grid's default placement.

type Quad = { box: string; image: string; number: string; label: string }

export const homeIntroStats: Quad[] = [
  {
    box: 'w-node-_641b9a73-caad-1592-65c7-d75834e4f3a3-9309f108',
    image: 'w-node-cd1725ab-18f4-0274-803a-35cb07464b54-9309f108',
    number: 'w-node-d09912fb-a869-7839-3343-da08bd4e5912-9309f108',
    label: 'w-node-f7c418aa-0ebb-5aad-4f6d-172dad9dd927-9309f108',
  },
  {
    box: 'w-node-_67e75ba7-27c7-7c65-2f9b-2e47a9c734ec-9309f108',
    image: 'w-node-_67e75ba7-27c7-7c65-2f9b-2e47a9c734ed-9309f108',
    number: 'w-node-_67e75ba7-27c7-7c65-2f9b-2e47a9c734ee-9309f108',
    label: 'w-node-_67e75ba7-27c7-7c65-2f9b-2e47a9c734f0-9309f108',
  },
  {
    box: 'w-node-_7b2731cb-0397-2eaf-abd2-def4d67aa3c9-9309f108',
    image: 'w-node-_7b2731cb-0397-2eaf-abd2-def4d67aa3ca-9309f108',
    number: 'w-node-_7b2731cb-0397-2eaf-abd2-def4d67aa3cb-9309f108',
    label: 'w-node-_7b2731cb-0397-2eaf-abd2-def4d67aa3cd-9309f108',
  },
  {
    box: 'w-node-_6b40eb56-f4ca-979f-2232-9a93a70304ee-9309f108',
    image: 'w-node-_6b40eb56-f4ca-979f-2232-9a93a70304ef-9309f108',
    number: 'w-node-_6b40eb56-f4ca-979f-2232-9a93a70304f0-9309f108',
    label: 'w-node-_6b40eb56-f4ca-979f-2232-9a93a70304f2-9309f108',
  },
]

export const homeMeatCutsTabs: string[] = [
  'w-node-a0b6f6ac-d4b1-5da3-2703-11de6461f930-9309f108',
  'w-node-a0b6f6ac-d4b1-5da3-2703-11de6461f933-9309f108',
  'w-node-a0b6f6ac-d4b1-5da3-2703-11de6461f936-9309f108',
  'w-node-_249f77b0-b194-ad92-b85a-c10d1400af9a-9309f108',
  'w-node-_3bc73d1f-47a5-81d6-30dd-29a3d0caed93-9309f108',
]

// Product tiles of each tab, by tab and position.
export const homeMeatCutsItems: string[][] = [
  [
    'w-node-fa3f3e63-c54b-bb78-28ec-25fa24f35420-9309f108',
    'w-node-fa3f3e63-c54b-bb78-28ec-25fa24f35423-9309f108',
    'w-node-fa3f3e63-c54b-bb78-28ec-25fa24f35426-9309f108',
    'w-node-fa3f3e63-c54b-bb78-28ec-25fa24f35429-9309f108',
    'w-node-fa3f3e63-c54b-bb78-28ec-25fa24f3542c-9309f108',
  ],
  [
    'w-node-_13f91cd0-58b8-d997-e53d-2c64fa434d3f-9309f108',
    'w-node-_13f91cd0-58b8-d997-e53d-2c64fa434d45-9309f108',
    'w-node-_13f91cd0-58b8-d997-e53d-2c64fa434d4b-9309f108',
    'w-node-_13f91cd0-58b8-d997-e53d-2c64fa434d51-9309f108',
    'w-node-_13f91cd0-58b8-d997-e53d-2c64fa434d57-9309f108',
  ],
  [
    'w-node-_79edc639-8bf9-637d-3131-99b43d6b60db-9309f108',
    'w-node-_79edc639-8bf9-637d-3131-99b43d6b60e1-9309f108',
    'w-node-_79edc639-8bf9-637d-3131-99b43d6b60e7-9309f108',
    'w-node-_79edc639-8bf9-637d-3131-99b43d6b60ed-9309f108',
    'w-node-_79edc639-8bf9-637d-3131-99b43d6b60f3-9309f108',
  ],
  [
    'w-node-_63a27f5e-3fb4-cd25-8676-0c1c45ba21a5-9309f108',
    'w-node-_63a27f5e-3fb4-cd25-8676-0c1c45ba21ab-9309f108',
    'w-node-_63a27f5e-3fb4-cd25-8676-0c1c45ba21b1-9309f108',
    'w-node-_63a27f5e-3fb4-cd25-8676-0c1c45ba21b7-9309f108',
    'w-node-_63a27f5e-3fb4-cd25-8676-0c1c45ba21bd-9309f108',
  ],
  [
    'w-node-_4d33d078-bfda-5fb4-ddbe-05830a21ce47-9309f108',
    'w-node-_4d33d078-bfda-5fb4-ddbe-05830a21ce4d-9309f108',
    'w-node-_4d33d078-bfda-5fb4-ddbe-05830a21ce53-9309f108',
    'w-node-_4d33d078-bfda-5fb4-ddbe-05830a21ce59-9309f108',
    'w-node-_4d33d078-bfda-5fb4-ddbe-05830a21ce5f-9309f108',
  ],
]

// Price cards on the Products, Freezer Packs and Farm Slaughter pricing grids, by position.
export const priceCardIds: string[] = [
  'w-node-e26af09a-0ee8-f86c-587f-af820a60d06c-59d91a41',
  'w-node-e26af09a-0ee8-f86c-587f-af820a60d093-59d91a41',
  'w-node-e26af09a-0ee8-f86c-587f-af820a60d0ba-59d91a41',
  'w-node-e26af09a-0ee8-f86c-587f-af820a60d0e1-59d91a41',
  'w-node-f6f56ff8-fb59-3a7c-a820-fb74f94fa170-59d91a41',
]
