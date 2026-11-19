export interface IService {
  _id?: string;
  name: string;
  category:
    | "Haircut & Styling"
    | "Hair Coloring"
    | "Hair Treatment"
    | "Facial & Skincare"
    | "Makeup"
    | "Manicure & Pedicure"
    | "Spa & Massage";
  description: string;
  price: number;
  duration: number;
  image: string | null;
  status: "active" | "inactive";
}
