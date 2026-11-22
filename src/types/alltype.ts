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

export type TAppointment = {
  _id?: string;
  id?: string;
  userId?: string;
  userEmail?: string;
  serviceId?: string;
  serviceName?: string;
  category?: string;
  service?: Partial<IService>;
  date?: string;
  time?: string;
  price?: number;
  notes?: string;
  message?: string;
  status: string;
  paymentStatus?: string;
  requestDate?: string;
  createdAt?: string;
};

export type TAdminOverview = {
  totalCustomer: number;
  totalService: number;
  totalAppointment: number;
  totalPending: number;
  totalConfirmed: number;
  payment: {
    success: number,
    totalAmount: number
  }
};

export type UserOverview = {
  totalAppointmentByCustomer: number,
  pendingAppointment: number,
  confirmedAppointment: number,
  cancelledAppointment: number
}

export type UserInfo = TAppointment[];
