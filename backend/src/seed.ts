import mongoose from 'mongoose';
import Divisi from './models/divisiModels'; // Adjust the path to your Divisi model
import Wawancara from './models/wawancaraModels';
const seedDivisi = async () => {
  try {
    // Connect to MongoDB (replace the URI with your actual connection string)
    await mongoose.connect('mongodb://localhost:27017/oprec25', {serverSelectionTimeoutMS: 20000});
    console.log("connected");

    // Array of division data to be inserted
    const divisiData = [
      {
        judul: 'Backend',
        judulPanjang: 'Backend Development',
        logoDivisi: 'backend_logo.png',
        slot: 10,
        slug: 'backend',
        proker: [
          {
            url: 'https://example.com/backend_proker',
            filename: 'backend_proker.pdf',
            deskripsiProker: 'Backend division project description',
          },
        ],
        deskripsi: 'Responsible for server-side logic and database management.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Complete a backend task.',
          toolsPenugasan: 'Node.js, Express',
          linkPenugasan: 'https://example.com/backend_task',
        },
      },
      {
        judul: 'Frontend',
        judulPanjang: 'Frontend Development',
        logoDivisi: 'frontend_logo.png',
        slot: 8,
        slug: 'frontend',
        proker: [
          {
            url: 'https://example.com/frontend_proker',
            filename: 'frontend_proker.pdf',
            deskripsiProker: 'Frontend division project description',
          },
        ],
        deskripsi: 'Focuses on the visual elements and user experience.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Build a frontend interface.',
          toolsPenugasan: 'React, Vue.js',
          linkPenugasan: 'https://example.com/frontend_task',
        },
      },
      {
        judul: 'UI/UX',
        judulPanjang: 'UI/UX Design',
        logoDivisi: 'uiux_logo.png',
        slot: 5,
        slug: 'uiux',
        proker: [
          {
            url: 'https://example.com/uiux_proker',
            filename: 'uiux_proker.pdf',
            deskripsiProker: 'UI/UX division project description',
          },
        ],
        deskripsi: 'Designs user interfaces and improves user experience.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Design a user-friendly interface.',
          toolsPenugasan: 'Figma, Adobe XD',
          linkPenugasan: 'https://example.com/uiux_task',
        },
      },
      {
        judul: 'Data Science & AI',
        judulPanjang: 'Data Science and Artificial Intelligence',
        logoDivisi: 'dsai_logo.png',
        slot: 6,
        slug: 'dsai',
        proker: [
          {
            url: 'https://example.com/dsai_proker',
            filename: 'dsai_proker.pdf',
            deskripsiProker: 'Data Science division project description',
          },
        ],
        deskripsi: 'Analyzes data and builds AI models.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Create a data analysis project.',
          toolsPenugasan: 'Python, TensorFlow',
          linkPenugasan: 'https://example.com/dsai_task',
        },
      },
      {
        judul: 'Competitive Programming',
        judulPanjang: 'Competitive Programming',
        logoDivisi: 'cp_logo.png',
        slot: 7,
        slug: 'cp',
        proker: [
          {
            url: 'https://example.com/cp_proker',
            filename: 'cp_proker.pdf',
            deskripsiProker: 'Competitive Programming division project description',
          },
        ],
        deskripsi: 'Solves algorithmic challenges and competes in programming competitions.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Solve a programming challenge.',
          toolsPenugasan: 'C++, Java',
          linkPenugasan: 'https://example.com/cp_task',
        },
      },
      {
        judul: 'Mobile Apps',
        judulPanjang: 'Mobile Application Development',
        logoDivisi: 'mobapps_logo.png',
        slot: 6,
        slug: 'mobapps',
        proker: [
          {
            url: 'https://example.com/mobapps_proker',
            filename: 'mobapps_proker.pdf',
            deskripsiProker: 'Mobile Apps division project description',
          },
        ],
        deskripsi: 'Develops mobile applications for Android and iOS.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Create a mobile app.',
          toolsPenugasan: 'Flutter, React Native',
          linkPenugasan: 'https://example.com/mobapps_task',
        },
      },
      {
        judul: 'Game Development',
        judulPanjang: 'Game Development',
        logoDivisi: 'gamedev_logo.png',
        slot: 4,
        slug: 'gamedev',
        proker: [
          {
            url: 'https://example.com/gamedev_proker',
            filename: 'gamedev_proker.pdf',
            deskripsiProker: 'Game Development division project description',
          },
        ],
        deskripsi: 'Develops games for multiple platforms.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Create a game prototype.',
          toolsPenugasan: 'Unity, Unreal Engine',
          linkPenugasan: 'https://example.com/gamedev_task',
        },
      },
      {
        judul: 'Backend',
        judulPanjang: 'Backend Development',
        logoDivisi: 'backend_logo.png',
        slot: 10,
        slug: 'backend',
        proker: [
          {
            url: 'https://example.com/backend_proker',
            filename: 'backend_proker.pdf',
            deskripsiProker: 'Backend division project description',
          },
        ],
        deskripsi: 'Responsible for server-side logic and database management.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Complete a backend task.',
          toolsPenugasan: 'Node.js, Express',
          linkPenugasan: 'https://example.com/backend_task',
        },
      },
      {
        judul: 'Frontend',
        judulPanjang: 'Frontend Development',
        logoDivisi: 'frontend_logo.png',
        slot: 8,
        slug: 'frontend',
        proker: [
          {
            url: 'https://example.com/frontend_proker',
            filename: 'frontend_proker.pdf',
            deskripsiProker: 'Frontend division project description',
          },
        ],
        deskripsi: 'Focuses on the visual elements and user experience.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Build a frontend interface.',
          toolsPenugasan: 'React, Vue.js',
          linkPenugasan: 'https://example.com/frontend_task',
        },
      },
      {
        judul: 'UI/UX',
        judulPanjang: 'UI/UX Design',
        logoDivisi: 'uiux_logo.png',
        slot: 5,
        slug: 'uiux',
        proker: [
          {
            url: 'https://example.com/uiux_proker',
            filename: 'uiux_proker.pdf',
            deskripsiProker: 'UI/UX division project description',
          },
        ],
        deskripsi: 'Designs user interfaces and improves user experience.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Design a user-friendly interface.',
          toolsPenugasan: 'Figma, Adobe XD',
          linkPenugasan: 'https://example.com/uiux_task',
        },
      },
      {
        judul: 'Data Science & AI',
        judulPanjang: 'Data Science and Artificial Intelligence',
        logoDivisi: 'dsai_logo.png',
        slot: 6,
        slug: 'dsai',
        proker: [
          {
            url: 'https://example.com/dsai_proker',
            filename: 'dsai_proker.pdf',
            deskripsiProker: 'Data Science division project description',
          },
        ],
        deskripsi: 'Analyzes data and builds AI models.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Create a data analysis project.',
          toolsPenugasan: 'Python, TensorFlow',
          linkPenugasan: 'https://example.com/dsai_task',
        },
      },
      {
        judul: 'Competitive Programming',
        judulPanjang: 'Competitive Programming',
        logoDivisi: 'cp_logo.png',
        slot: 7,
        slug: 'cp',
        proker: [
          {
            url: 'https://example.com/cp_proker',
            filename: 'cp_proker.pdf',
            deskripsiProker: 'Competitive Programming division project description',
          },
        ],
        deskripsi: 'Solves algorithmic challenges and competes in programming competitions.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Solve a programming challenge.',
          toolsPenugasan: 'C++, Java',
          linkPenugasan: 'https://example.com/cp_task',
        },
      },
      {
        judul: 'Mobile Apps',
        judulPanjang: 'Mobile Application Development',
        logoDivisi: 'mobapps_logo.png',
        slot: 6,
        slug: 'mobapps',
        proker: [
          {
            url: 'https://example.com/mobapps_proker',
            filename: 'mobapps_proker.pdf',
            deskripsiProker: 'Mobile Apps division project description',
          },
        ],
        deskripsi: 'Develops mobile applications for Android and iOS.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Create a mobile app.',
          toolsPenugasan: 'Flutter, React Native',
          linkPenugasan: 'https://example.com/mobapps_task',
        },
      },
      {
        judul: 'Game Development',
        judulPanjang: 'Game Development',
        logoDivisi: 'gamedev_logo.png',
        slot: 4,
        slug: 'gamedev',
        proker: [
          {
            url: 'https://example.com/gamedev_proker',
            filename: 'gamedev_proker.pdf',
            deskripsiProker: 'Game Development division project description',
          },
        ],
        deskripsi: 'Develops games for multiple platforms.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Create a game prototype.',
          toolsPenugasan: 'Unity, Unreal Engine',
          linkPenugasan: 'https://example.com/gamedev_task',
        },
      },
    ];

const wawancaraData = [
  {
    tanggal: new Date('2021-10-01'),
    himakom: true,
    sesi: [
      {
        jam: new Date('2021-10-01T08:00:00'),
        dipilihOleh: [],
        slotDivisi: {
          backend: {
            sisaSlot: 10,
            lokasi: 'Gedung A',
          },
          frontend: {
            sisaSlot: 8,
            lokasi: 'Gedung B',
          },
          uiux: {
            sisaSlot: 5,
            lokasi: 'Gedung C',
          },
          dsai: {
            sisaSlot: 6,
            lokasi: 'Gedung D',
          },
          cp: {
            sisaSlot: 7,
            lokasi: 'Gedung E',
          },
          mobapps: {
            sisaSlot: 6,
            lokasi: 'Gedung F',
          },
          gamedev: {
            sisaSlot: 4,
            lokasi: 'Gedung G',
          },
        },
      },
      {
        jam: new Date('2021-10-01T10:00:00'),
        dipilihOleh: [],
        slotDivisi: {
          backend: {
            sisaSlot: 10,
            lokasi: 'Gedung A',
          },
          frontend: {
            sisaSlot: 8,
            lokasi: 'Gedung B',
          },
          uiux: {
            sisaSlot: 5,
            lokasi: 'Gedung C',
          },
          dsai: {
            sisaSlot: 6,
            lokasi: 'Gedung D',
          },
          cp: {
            sisaSlot: 7,
            lokasi: 'Gedung E',
          },
          mobapps: {
            sisaSlot: 6,
            lokasi: 'Gedung F',
          },
          gamedev: {
            sisaSlot: 4,
            lokasi: 'Gedung G',
          },
        },
      },
    ],
  },
  {
    tanggal: new Date('2021-10-01'),
    himakom: false,
    sesi: [
      {
        jam: new Date('2021-10-01T08:00:00'),
        dipilihOleh: [],
        slotDivisi: {
          backend: {
            sisaSlot: 10,
            lokasi: 'Gedung A',
          },
          frontend: {
            sisaSlot: 8,
            lokasi: 'Gedung B',
          },
          uiux: {
            sisaSlot: 5,
            lokasi: 'Gedung C',
          },
          dsai: {
            sisaSlot: 6,
            lokasi: 'Gedung D',
          },
          cp: {
            sisaSlot: 7,
            lokasi: 'Gedung E',
          },
          mobapps: {
            sisaSlot: 6,
            lokasi: 'Gedung F',
          },
          gamedev: {
            sisaSlot: 4,
            lokasi: 'Gedung G',
          },
        },
      },
      {
        jam: new Date('2021-10-01T10:00:00'),
        dipilihOleh: [],
        slotDivisi: {
          backend: {
            sisaSlot: 10,
            lokasi: 'Gedung A',
          },
          frontend: {
            sisaSlot: 8,
            lokasi: 'Gedung B',
          },
          uiux: {
            sisaSlot: 5,
            lokasi: 'Gedung C',
          },
          dsai: {
            sisaSlot: 6,
            lokasi: 'Gedung D',
          },
          cp: {
            sisaSlot: 7,
            lokasi: 'Gedung E',
          },
          mobapps: {
            sisaSlot: 6,
            lokasi: 'Gedung F',
          },
          gamedev: {
            sisaSlot: 4,
            lokasi: 'Gedung G',
          },
        },
      },
    ],
  },
]
    // Insert the data into the Divisi collection
    for (const divisionData of divisiData) {
        const division = new Divisi(divisionData);
        await division.save(); // Save each division individually
    }
    for(const wawancara of wawancaraData){
      const wawancaraBaru = new Wawancara(wawancara);
      await wawancaraBaru.save();
    }
    console.log('Data successfully seeded!');
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

// Run the seed function
seedDivisi();
