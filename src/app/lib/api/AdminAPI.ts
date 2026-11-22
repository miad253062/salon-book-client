export const OverviewAdmin = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/overview`)
    const data = await res.json()
    return data;
}