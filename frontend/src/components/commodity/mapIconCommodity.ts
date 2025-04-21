const iconMapping: { [key: string]: string } = {
    "Beras": "🍚",
    "Jagung": "🌽",
    "Cabai Merah": "🌶️",
    "Tomat": "🍅"
};

export async function fetchAndMapKomoditas() {
    try {
        const response = await fetch("/api/komoditas");
        const data = await response.json();

        if (data.success) {
            return data.data.map((item: any) => ({
                id_komoditas: item.id_komoditas,
                nama_komoditas: item.nama_komoditas,  
                kategori: item.kategori,
                icon: iconMapping[item.nama_komoditas] || "❓"
            }));
        }
    } catch (error) {
        console.error("Error fetching komoditas:", error);
    }

    return [];
}
