const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const getAllDivisi = async (accessToken: string) => {
    const res = await fetch(`${PUBLIC_API_URL}/divisi`, {
        headers: {Cookie: `accessToken=${accessToken};`},
        credentials: "include"
    });
    const { semuaDivisi } = await res.json();

    const himakomDivisi = semuaDivisi.filter((divisi: any) => divisi.himakom === true);
    const otiDivisi = semuaDivisi.filter((divisi: any) => divisi.himakom === false);
    return { himakomDivisi, otiDivisi };
}

export const getOneDivisi = async (slug: string, accessToken: string) => {
    const res = await fetch(`${PUBLIC_API_URL}/divisi/${slug}`, {
        headers: {Cookie: `accessToken=${accessToken};`},
        credentials: "include"
    });
    const { satuDivisi } = await res.json();

    return satuDivisi;
}

export const getAllWawancara = async (accessToken: string) => {
    const res = await fetch(`${PUBLIC_API_URL}/wawancara`, {
        headers: {Cookie: `accessToken=${accessToken};`},
        credentials: "include"
    });
    const wawancara = await res.json();

    return wawancara;
}

export const getEnrolledDivisi = async (accessToken: string) => {
    const res = await fetch(`${PUBLIC_API_URL}/auth/divisi`, {
        headers: {Cookie: `accessToken=${accessToken};`},
        credentials: "include",
    });
    const { divisiPilihan } = await res.json();

    return divisiPilihan;
}

export const getPilihanWawancara = async (accessToken: string) => {
    const res = await fetch(`${PUBLIC_API_URL}/auth/wawancara`, {
        headers: {Cookie: `accessToken=${accessToken};`},
        credentials: "include",
    });
    const { filteredOti, filteredHima } = await res.json();

    return { filteredOti, filteredHima };
}

export const getPenugasanUser = async(slug:string, accessToken: string) => {
    const res = await fetch(`${PUBLIC_API_URL}/divisi/${slug}/penugasan`, {
        headers: {Cookie: `accessToken=${accessToken};`},
        credentials: "include",
    });
    const penugasan = await res.json();

    return penugasan;
}

export const getAllUsersAndTheirFilteredTugas = async (accessToken: string) => {
    const res = await fetch(`${PUBLIC_API_URL}/auth/adminonly/admin`, {
        credentials: "include",
        headers: {Cookie: `accessToken=${accessToken};`},
    });
    const users = await res.json();

    return users;
}