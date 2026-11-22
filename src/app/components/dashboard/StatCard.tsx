import { IconType } from "react-icons";

type StatCardProps = {
    label: string;
    value: string | number;
    icon: IconType;
    tone?: "orange" | "dark" | "green" | "red" | "amber";
};

const tones = {
    orange: "bg-orange-50 text-orange-600",
    dark: "bg-[#2c3446]/10 text-[#2c3446]",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-600",
};

function StatCard({ label, value, icon: Icon, tone = "orange" }: StatCardProps) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="min-w-0">
                <p className="truncate text-sm text-gray-500">{label}</p>
                <p className="mt-1 text-2xl font-bold text-[#2c3446]">{value}</p>
            </div>
            <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}
            >
                <Icon size={18} />
            </span>
        </div>
    );
}

export default StatCard;
