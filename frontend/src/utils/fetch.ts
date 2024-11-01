const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const getAllDivisi = async () => {
    const res = await fetch(`${PUBLIC_API_URL}/divisi`);
    const {semuaDivisi} = await res.json();

    const himakomDivisi = semuaDivisi.filter((divisi: any) => divisi.himakom === true);
    const otiDivisi = semuaDivisi.filter((divisi: any) => divisi.himakom === false);
    return {himakomDivisi, otiDivisi};
}

export const getOneDivisi = async (slug: string) => {
    const res = await fetch(`${PUBLIC_API_URL}/divisi/${slug}`);
    const {satuDivisi} = await res.json();

    return satuDivisi;
}
export const getAllWawancara = async () => {
    const res = await fetch(`${PUBLIC_API_URL}/wawancara`);
    const wawancara = await res.json();

    return wawancara;
}
export const getEnrolledDivisi = async () => {

}

export const getPilihanWawancara = async () => {

}