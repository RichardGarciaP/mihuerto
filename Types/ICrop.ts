export interface ICrop {
  _id?: string;
  name: string;
  description: string;
  image: string;
  scientificName: string;
  active: boolean;
  categoryId: string;
  beneficalNeighboursId: BeneficalNeighboursID[];
  plaguesId: PlaguesID[];
  germinationTime: number;
  harvestTime: number;
  sowingSeason: string;
  SolarLight: string;
  plantedAtHome: boolean;
  plotSize: number;
  thermalFloor: string;
  typeOfSoil: string;
  fertilisersId: FertilisersID[];
  harmfulNeighboursId: HarmfulNeighboursID[];
  reproductionsId: ReproductionsID[];
  submit?: string;
}

export interface BeneficalNeighboursID {
  beneficalNeighbourId: string;
}

export interface FertilisersID {
  fertiliserId: string;
}

export interface HarmfulNeighboursID {
  harmfulNeighbourId: string;
}

export interface PlaguesID {
  plagueId: string;
}

export interface ReproductionsID {
  reproductionId: string;
}
