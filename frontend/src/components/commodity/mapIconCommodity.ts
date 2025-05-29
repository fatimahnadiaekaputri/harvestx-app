import { Commodity } from "./commodity";

const iconMapping: { [key: string]: string } = {
  beras: "🍚",
  bawang_merah: "🧅",
  bawang_putih: "🧄",
  cabai: "🌶️",
  kangkung: "🥬",
  kedelai: "🫘",
  kentang: "🥔",
  ketimun: "🥒",
  sawi: "🥗",
  tomat: "🍅",
};

const displayNameMapping: { [key: string]: string } = {
  beras: "Beras",
  bawang_merah: "Bawang Merah",
  bawang_putih: "Bawang Putih",
  cabai: "Cabai",
  kangkung: "Kangkung",
  kedelai: "Kedelai",
  kentang: "Kentang",
  ketimun: "Ketimun",
  sawi: "Sawi",
  tomat: "Tomat",
};

export async function fetchAndMapKomoditas(): Promise<Commodity[]> {
  const komoditasList = Object.keys(iconMapping);

  return komoditasList.map((id_komoditas) => ({
    id_komoditas,
    nama_komoditas: displayNameMapping[id_komoditas] || id_komoditas,
    icon: iconMapping[id_komoditas] || "❓",
  }));
}
