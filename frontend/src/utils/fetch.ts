const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const getAllDivisi = async () => {
    const res = await fetch(`${PUBLIC_API_URL}/divisi`);
    const {semuaDivisi} = await res.json();

    return semuaDivisi;
}
export const getAllWawancara = async () => {

}
export const getEnrolledDivisi = async () => {

}

export const getPilihanWawancara = async () => {

}