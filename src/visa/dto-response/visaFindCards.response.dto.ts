class NotFoundCards {
  not_found: string[];
}
class Item {
  id: number;
  card_number: string;
  client_code: string;
  filial_code: string;
  local_code: string;
  embossed_name: string;
  date_registered: string;
  name: string;
  resident: string;
  country_code: string;
  pasport: string;
  code: string;
  created_at: Date;
}
class Found {
  found: Item;
}
export class VisaFindCardsResponseDto {
  not_found: NotFoundCards[];
  found: Found[];
}
