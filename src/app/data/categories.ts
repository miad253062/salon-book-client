import { IService } from "@/types/alltype";
import { IconType } from "react-icons";
import {
  FaCut,
  FaHandSparkles,
  FaLeaf,
  FaMagic,
  FaPaintBrush,
  FaSoap,
  FaSpa,
} from "react-icons/fa";

type Category = IService["category"];

export type TCategory = { label: string; value: Category; icon: IconType };

export const CATEGORIES: TCategory[] = [
  { label: "Haircut & Styling", value: "Haircut & Styling", icon: FaCut },
  { label: "Hair Coloring", value: "Hair Coloring", icon: FaPaintBrush },
  { label: "Hair Treatment", value: "Hair Treatment", icon: FaLeaf },
  { label: "Facial & Skincare", value: "Facial & Skincare", icon: FaSoap },
  { label: "Makeup", value: "Makeup", icon: FaMagic },
  { label: "Manicure & Pedicure", value: "Manicure & Pedicure", icon: FaHandSparkles},
  { label: "Spa & Massage", value: "Spa & Massage", icon: FaSpa },
];
