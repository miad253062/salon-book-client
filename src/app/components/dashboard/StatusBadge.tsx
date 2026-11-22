type StatusBadgeProps = {
    value?: string;
};

const styles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-600",
    paid: "bg-green-100 text-green-700",
    unpaid: "bg-gray-100 text-gray-600",
    refunded: "bg-blue-100 text-blue-700",
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-600",
    blocked: "bg-red-100 text-red-600",
    succeeded: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-600",
};

function StatusBadge({ value }: StatusBadgeProps) {
    const tone = styles[(value ?? "").toLowerCase()] ?? "bg-gray-100 text-gray-600";

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${tone}`}
        >
            {value}
        </span>
    );
}

export default StatusBadge;
