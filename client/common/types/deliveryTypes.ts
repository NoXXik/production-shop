export interface PVZ {
  Address: string;
  AddressComment: string;
  Name: string;
  Phone: string;
}

export interface DeliveryInfoOnChoose {
  id: string;
  city: string;
  cityName: string;
  price: string;
  term: string;
  tarif: number;
  PVZ: PVZ;
}

export interface DeliveryInfo {
  id: string;
  city: string;
  cityName: string;
  price: number;
  term: string;
  tarif: number;
  address: string;
  addressComment: string;
  name: string;
  phone: string;
}
