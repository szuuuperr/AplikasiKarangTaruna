require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Tutorial = require("./models/Tutorial");

const seedData = [
    {
        title: "Cara Memperbaiki Engsel Pintu yang Rusak",
        category: "Kayu",
        difficulty: "Pemula",
        duration: "15 menit",
        thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=600&fit=crop",
        description: "Tutorial lengkap cara memperbaiki engsel pintu yang sudah kendor atau rusak. Cocok untuk pemula yang baru mulai belajar bertukang. Anda akan belajar teknik dasar melepas dan memasang engsel dengan benar.",
        tools: ["Obeng (+/-)", "Palu", "Bor tangan", "Engsel baru", "Sekrup kayu", "Lem kayu"],
        steps: [
            { title: "Lepaskan engsel lama", desc: "Gunakan obeng untuk melepas semua sekrup pada engsel yang rusak. Pastikan pintu ditopang agar tidak jatuh." },
            { title: "Bersihkan area pemasangan", desc: "Pastikan lubang sekrup bersih dari serpihan kayu. Gunakan amplas halus jika perlu." },
            { title: "Isi lubang yang aus", desc: "Jika lubang sekrup sudah aus, isi dengan lem kayu dan potongan tusuk gigi. Biarkan kering." },
            { title: "Pasang engsel baru", desc: "Posisikan engsel baru dan tandai titik sekrup. Buat lubang pilot dengan bor, lalu kencangkan sekrup." },
            { title: "Uji coba pintu", desc: "Buka dan tutup pintu beberapa kali untuk memastikan engsel berfungsi dengan baik." }
        ]
    },
    {
        title: "Memasang Rak Dinding dengan Rapi",
        category: "Kayu",
        difficulty: "Menengah",
        duration: "30 menit",
        thumbnail: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=400&fit=crop",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&h=600&fit=crop",
        description: "Pelajari cara memasang rak dinding yang kokoh dan rapi. Tutorial ini mencakup pengukuran, pengeboran, dan teknik pemasangan bracket yang benar.",
        tools: ["Bor listrik", "Waterpass", "Pensil", "Meteran", "Fisher & sekrup", "Bracket rak", "Papan rak"],
        steps: [
            { title: "Tentukan posisi rak", desc: "Gunakan meteran untuk mengukur ketinggian yang diinginkan. Tandai posisi dengan pensil." },
            { title: "Pasang bracket pertama", desc: "Bor lubang sesuai tanda, masukkan fisher, lalu kencangkan bracket dengan sekrup." },
            { title: "Sejajarkan bracket kedua", desc: "Gunakan waterpass untuk memastikan kedua bracket sejajar. Tandai dan bor lubang kedua." },
            { title: "Pasang papan rak", desc: "Letakkan papan di atas bracket dan kencangkan dari bawah jika diperlukan." }
        ]
    },
    {
        title: "Mengecat Dinding Seperti Profesional",
        category: "Cat",
        difficulty: "Pemula",
        duration: "45 menit",
        thumbnail: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&h=400&fit=crop",
        image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1200&h=600&fit=crop",
        description: "Teknik mengecat dinding yang menghasilkan hasil rata dan profesional. Pelajari cara memilih cat, mempersiapkan dinding, dan teknik mengecat yang benar.",
        tools: ["Rol cat besar", "Kuas sudut", "Bak cat", "Lakban kertas", "Koran/plastik penutup", "Cat tembok", "Amplas halus"],
        steps: [
            { title: "Persiapan dinding", desc: "Bersihkan dinding dari debu dan kotoran. Tambal lubang atau retakan dengan dempul dan amplas setelah kering." },
            { title: "Lindungi area sekitar", desc: "Pasang lakban kertas pada kusen, saklar, dan tepian. Tutup lantai dengan koran atau plastik." },
            { title: "Cat bagian sudut", desc: "Gunakan kuas untuk mengecat sudut-sudut dan tepian yang tidak terjangkau roller." },
            { title: "Cat dengan roller", desc: "Celupkan roller ke bak cat, buang kelebihan, lalu cat dari atas ke bawah dengan gerakan W." },
            { title: "Lapisan kedua", desc: "Tunggu cat pertama kering (2-4 jam), lalu aplikasikan lapisan kedua untuk hasil optimal." }
        ]
    },
    {
        title: "Memperbaiki Keran Air yang Bocor",
        category: "Pipa",
        difficulty: "Pemula",
        duration: "20 menit",
        thumbnail: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop",
        image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&h=600&fit=crop",
        description: "Panduan simpel mengatasi keran bocor tanpa harus memanggil tukang. Anda hanya butuh beberapa alat sederhana dan waktu sekitar 20 menit.",
        tools: ["Kunci inggris", "Obeng", "Karet seal/O-ring baru", "Lap kering", "Selotip teflon"],
        steps: [
            { title: "Matikan suplai air", desc: "Putar katup di bawah wastafel hingga tertutup penuh untuk menghentikan aliran air." },
            { title: "Buka handle keran", desc: "Lepas penutup handle, buka sekrup pengikat, lalu angkat handle keran." },
            { title: "Ganti seal/O-ring", desc: "Lepas cartridge atau stem, identifikasi seal yang aus, dan ganti dengan yang baru." },
            { title: "Pasang kembali", desc: "Rakit kembali semua komponen, pastikan rapat. Buka suplai air dan cek kebocoran." }
        ]
    },
    {
        title: "Memasang Stop Kontak Listrik Tambahan",
        category: "Listrik",
        difficulty: "Menengah",
        duration: "25 menit",
        thumbnail: "https://plus.unsplash.com/premium_photo-1682086495049-43a423baec15?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dw",
        image: "https://plus.unsplash.com/premium_photo-1682086495049-43a423baec15?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Tutorial pemasangan stop kontak tambahan dengan aman. Penting untuk memahami dasar kelistrikan sebelum memulai pekerjaan ini.",
        tools: ["Tespen", "Tang potong", "Tang kupas kabel", "Obeng (+/-)", "Stop kontak baru", "Kabel NYM", "Isolasi listrik"],
        steps: [
            { title: "Matikan listrik", desc: "Matikan MCB utama di panel listrik. Pastikan tidak ada arus dengan tespen." },
            { title: "Buat jalur kabel", desc: "Tentukan jalur kabel dari sumber listrik terdekat ke lokasi stop kontak baru." },
            { title: "Sambungkan kabel", desc: "Kupas ujung kabel dan sambungkan ke terminal stop kontak — kabel fase, netral, dan ground." },
            { title: "Pasang stop kontak", desc: "Masukkan stop kontak ke dalam doos, kencangkan sekrup, dan pasang cover." },
            { title: "Uji coba", desc: "Nyalakan MCB dan tes stop kontak menggunakan tespen atau alat elektronik." }
        ]
    },
    {
        title: "Membuat Rak Sepatu dari Kayu Palet",
        category: "Kayu",
        difficulty: "Lanjutan",
        duration: "60 menit",
        thumbnail: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&h=400&fit=crop",
        image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=1200&h=600&fit=crop",
        description: "Proyek DIY membuat rak sepatu dari kayu palet bekas. Selain hemat biaya, hasilnya unik dan ramah lingkungan. Cocok untuk yang sudah familiar dengan alat pertukangan.",
        tools: ["Gergaji tangan/mesin", "Bor listrik", "Amplas", "Paku/sekrup", "Cat/pernis kayu", "Meteran", "Pensil"],
        steps: [
            { title: "Siapkan kayu palet", desc: "Bongkar palet dan pilih papan yang masih bagus. Bersihkan dari paku dan kotoran." },
            { title: "Potong sesuai ukuran", desc: "Ukur dan potong papan sesuai desain rak yang diinginkan. Haluskan permukaan dengan amplas." },
            { title: "Rakit rangka rak", desc: "Pasang papan samping terlebih dahulu, lalu rak-rak horizontal. Gunakan sekrup untuk memperkuat." },
            { title: "Finishing", desc: "Amplas seluruh permukaan, lalu aplikasikan cat atau pernis kayu sesuai selera." },
            { title: "Pasang di lokasi", desc: "Tempatkan rak di area yang diinginkan. Bisa ditambah karet anti-slip di bagian bawah." }
        ]
    }
];

const seed = async () => {
    try {
        await connectDB();
        await Tutorial.deleteMany({});
        console.log("Existing tutorials cleared");

        const created = await Tutorial.insertMany(seedData);
        console.log(`${created.length} tutorials inserted`);

        const idMap = {};
        created.forEach((t, i) => { idMap[i + 1] = t._id; });

        const relationsMap = {
            1: [5, 6, 2],
            2: [1, 6, 3],
            3: [2, 5, 4],
            4: [1, 3, 5],
            5: [4, 1, 6],
            6: [2, 1, 3]
        };

        for (const [oldId, relatedOldIds] of Object.entries(relationsMap)) {
            const mongoId = idMap[Number(oldId)];
            const relatedMongoIds = relatedOldIds.map((rid) => idMap[rid]);
            await Tutorial.findByIdAndUpdate(mongoId, { relatedIds: relatedMongoIds });
        }

        console.log("Related tutorials linked");
        console.log("Seed completed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Seed failed:", err.message);
        process.exit(1);
    }
};

seed();
