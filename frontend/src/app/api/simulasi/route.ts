import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {id_komoditas, id_waktu, kota, jenis_pasar} = body;

    console.log("Body yang diterima:", body);
    console.log("id_komoditas:", id_komoditas);
    console.log("id_waktu:", id_waktu);
    console.log("kota:", kota);
    console.log("jenis_pasar:", jenis_pasar);


    if(!id_komoditas?.length || !id_waktu || !kota || !jenis_pasar) {
        return NextResponse.json({error: "Pilih waktu, wilayah, atau jenis pasar"}, {status:400}) 
    }

    try {
        const lokasi = await prisma.lokasi.findFirst({
            where: {
                kota,
                jenis_pasar
            },
            select: {
                id_lokasi: true,
            },
        });

        if(!lokasi) {
            return NextResponse.json({error: 'Lokasi tidak ditemukan'}, {status: 404});
        }

        const data = await prisma.fakta_komoditas.findMany({
            where: {
                id_waktu: id_waktu,
                id_komoditas: {
                    in: id_komoditas,
                },
                id_lokasi: lokasi.id_lokasi
            },
            select: {
                harga: true,
                komoditas: {
                    select: {
                        nama_komoditas: true,
                    }
                }
            }
        });

        const result = data.map(item => ({
            nama_komoditas: item.komoditas.nama_komoditas,
            harga: item.harga,
        }))

        return NextResponse.json(result);
    } catch(error) {
        console.error(error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}
