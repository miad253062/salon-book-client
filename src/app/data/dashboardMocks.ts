
export type MockAppointment = {
    id: string;
    serviceName: string;
    serviceImage: string;
    category: string;
    customerName: string;
    customerEmail: string;
    date: string;
    time: string;
    price: number;
    status: "pending" | "confirmed" | "cancelled";
    paymentStatus: "unpaid" | "paid" | "refunded";
    message: string;
    requestDate: string;
};

export const mockAppointments: MockAppointment[] = [
    {
        id: "appt-1001",
        serviceName: "Signature Haircut & Styling",
        serviceImage: "https://picsum.photos/seed/haircut/400/300",
        category: "Haircut & Styling",
        customerName: "Sarah Johnson",
        customerEmail: "sarah@example.com",
        date: "2026-11-28",
        time: "10:30",
        price: 45,
        status: "pending",
        paymentStatus: "unpaid",
        message: "I'd like a shoulder-length cut with soft layers.",
        requestDate: "2026-11-19",
    },
    {
        id: "appt-1002",
        serviceName: "Balayage Hair Coloring",
        serviceImage: "https://picsum.photos/seed/coloring/400/300",
        category: "Hair Coloring",
        customerName: "Sarah Johnson",
        customerEmail: "sarah@example.com",
        date: "2026-11-25",
        time: "14:00",
        price: 120,
        status: "confirmed",
        paymentStatus: "paid",
        message: "",
        requestDate: "2026-11-15",
    },
    {
        id: "appt-1003",
        serviceName: "Relaxing Spa Massage",
        serviceImage: "https://picsum.photos/seed/spa/400/300",
        category: "Spa & Massage",
        customerName: "Sarah Johnson",
        customerEmail: "sarah@example.com",
        date: "2026-11-12",
        time: "16:45",
        price: 80,
        status: "cancelled",
        paymentStatus: "refunded",
        message: "Prefer a female therapist if possible.",
        requestDate: "2026-11-05",
    },
    {
        id: "appt-1004",
        serviceName: "Hydrating Facial",
        serviceImage: "https://picsum.photos/seed/facial/400/300",
        category: "Facial & Skincare",
        customerName: "Sarah Johnson",
        customerEmail: "sarah@example.com",
        date: "2026-11-30",
        time: "11:15",
        price: 65,
        status: "pending",
        paymentStatus: "unpaid",
        message: "Skin is dry after travel.",
        requestDate: "2026-11-20",
    },
    {
        id: "appt-1005",
        serviceName: "Gel Manicure & Pedicure",
        serviceImage: "https://picsum.photos/seed/nails/400/300",
        category: "Manicure & Pedicure",
        customerName: "Emily Carter",
        customerEmail: "emily@example.com",
        date: "2026-11-24",
        time: "09:00",
        price: 55,
        status: "confirmed",
        paymentStatus: "unpaid",
        message: "First time booking, please advise on nail care.",
        requestDate: "2026-11-18",
    },
    {
        id: "appt-1006",
        serviceName: "Bridal Makeup Package",
        serviceImage: "https://picsum.photos/seed/makeup/400/300",
        category: "Makeup",
        customerName: "Mia Rodriguez",
        customerEmail: "mia@example.com",
        date: "2026-12-02",
        time: "07:30",
        price: 200,
        status: "pending",
        paymentStatus: "unpaid",
        message: "Wedding day trial session if available.",
        requestDate: "2026-11-20",
    },
];

export type MockService = {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    duration: number;
    image: string;
    status: "active" | "inactive";
};

export const mockServices: MockService[] = [
    {
        id: "svc-1",
        name: "Signature Haircut & Styling",
        category: "Haircut & Styling",
        description: "Precision cut, wash, blow-dry and finishing style.",
        price: 45,
        duration: 45,
        image: "https://picsum.photos/seed/haircut/400/300",
        status: "active",
    },
    {
        id: "svc-2",
        name: "Balayage Hair Coloring",
        category: "Hair Coloring",
        description: "Hand-painted highlights for a natural, sun-kissed look.",
        price: 120,
        duration: 120,
        image: "https://picsum.photos/seed/coloring/400/300",
        status: "active",
    },
    {
        id: "svc-3",
        name: "Keratin Hair Treatment",
        category: "Hair Treatment",
        description: "Smoothing treatment that reduces frizz for months.",
        price: 150,
        duration: 90,
        image: "https://picsum.photos/seed/treatment/400/300",
        status: "inactive",
    },
    {
        id: "svc-4",
        name: "Hydrating Facial",
        category: "Facial & Skincare",
        description: "Deep-cleansing facial with a hydrating mask.",
        price: 65,
        duration: 60,
        image: "https://picsum.photos/seed/facial/400/300",
        status: "active",
    },
];

export type MockUser = {
    id: string;
    name: string;
    email: string;
    joined: string;
    appointments: number;
    status: "active" | "blocked";
};

export const mockUsers: MockUser[] = [
    { id: "usr-1", name: "Sarah Johnson", email: "sarah@example.com", joined: "2026-03-14", appointments: 8, status: "active" },
    { id: "usr-2", name: "Emily Carter", email: "emily@example.com", joined: "2026-05-02", appointments: 4, status: "active" },
    { id: "usr-3", name: "Mia Rodriguez", email: "mia@example.com", joined: "2026-06-21", appointments: 6, status: "blocked" },
    { id: "usr-4", name: "Noah Williams", email: "noah@example.com", joined: "2026-09-09", appointments: 1, status: "active" },
];

export type MockTransaction = {
    id: string;
    customerName: string;
    customerEmail: string;
    service: string;
    appointmentDate: string;
    amount: number;
    currency: string;
    sessionId: string;
    status: "succeeded" | "failed" | "pending";
    date: string;
};

export const mockTransactions: MockTransaction[] = [
    {
        id: "txn-1",
        customerName: "Sarah Johnson",
        customerEmail: "sarah@example.com",
        service: "Balayage Hair Coloring",
        appointmentDate: "2026-11-25",
        amount: 120,
        currency: "USD",
        sessionId: "cs_test_a91f4c7d2e",
        status: "succeeded",
        date: "2026-11-15",
    },
    {
        id: "txn-2",
        customerName: "Emily Carter",
        customerEmail: "emily@example.com",
        service: "Gel Manicure & Pedicure",
        appointmentDate: "2026-11-24",
        amount: 55,
        currency: "USD",
        sessionId: "cs_test_5b38e0f1aa",
        status: "succeeded",
        date: "2026-11-18",
    },
    {
        id: "txn-3",
        customerName: "Mia Rodriguez",
        customerEmail: "mia@example.com",
        service: "Bridal Makeup Package",
        appointmentDate: "2026-12-02",
        amount: 200,
        currency: "USD",
        sessionId: "cs_test_77d2bc9e04",
        status: "failed",
        date: "2026-11-20",
    },
];
