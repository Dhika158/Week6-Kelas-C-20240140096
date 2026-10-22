
const localCars = [
  {
    id: 1,
    name: "Mercedes-Benz E-Class",
    type: "Sedan",
    price: 1250000000,
    year: 2025,
    engine: "2.0L Turbo",
    description: "Sedan eksekutif dengan kenyamanan premium dan teknologi modern.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 2,
    name: "Mercedes-Benz S-Class",
    type: "Sedan",
    price: 2450000000,
    year: 2025,
    engine: "3.0L Inline-6",
    description: "Kemewahan kelas atas dengan interior elegan dan teknologi canggih.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3,
    name: "Mercedes-Benz C-Class",
    type: "Sedan",
    price: 950000000,
    year: 2025,
    engine: "1.5L Turbo",
    description: "Sedan modern yang memadukan desain sporty dan kenyamanan harian.",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4,
    name: "Mercedes-Benz GLE",
    type: "SUV",
    price: 1750000000,
    year: 2025,
    engine: "2.0L Turbo",
    description: "SUV premium dengan kabin luas untuk perjalanan bersama keluarga.",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 5,
    name: "Mercedes-Benz G-Class",
    type: "SUV",
    price: 2850000000,
    year: 2025,
    engine: "3.0L Turbo",
    description: "SUV ikonik dengan karakter tangguh dan tampilan yang berani.",
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 6,
    name: "Mercedes-Benz CLE Coupe",
    type: "Coupe",
    price: 1550000000,
    year: 2025,
    engine: "2.0L Turbo",
    description: "Coupe elegan dengan siluet dinamis dan karakter berkendara sporty.",
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 7,
    name: "Mercedes-Benz EQE",
    type: "Electric",
    price: 2200000000,
    year: 2025,
    engine: "Electric",
    description: "Mobil listrik premium dengan desain futuristis dan kabin modern.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 8,
    name: "Mercedes-Benz GLA",
    type: "SUV",
    price: 900000000,
    year: 2025,
    engine: "1.3L Turbo",
    description: "SUV kompak premium untuk mobilitas perkotaan yang dinamis.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 9,
    name: "Mercedes-Benz AMG GT",
    type: "Coupe",
    price: 3100000000,
    year: 2025,
    engine: "4.0L V8",
    description: "Mobil performa tinggi dengan desain agresif dan karakter sport.",
    image: "https://images.unsplash.com/photo-1618843479618-39b7c5b6c8b3?auto=format&fit=crop&w=900&q=85"
  }
];

let cars = [...localCars];
let apiCars = [];
let selectedCar = null;
let toastTimer;

const carGrid = document.getElementById("car-grid");
const searchInput = document.getElementById("search-input");
const typeFilter = document.getElementById("type-filter");
const sortFilter = document.getElementById("sort-filter");
const apiStatus = document.getElementById("api-status");
const apiNote = document.getElementById("api-note");
const bookingForm = document.getElementById("booking-form");
const carChoice = document.getElementById("car-choice");
const formResult = document.getElementById("form-result");

// Format harga dalam Rupiah
function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(price);
}

// FETCH API: mengambil data mobil dari API publik.
// Katalog lokal tetap tersedia jika API tidak dapat diakses.
async function fetchCarData() {
  apiStatus.className = "api-status";
  apiStatus.querySelector("span").textContent = "";
  apiStatus.lastChild.textContent = " Mengambil data API...";

  try {
    const response = await fetch(
      "https://api.sampleapis.com/cars/sedans"
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Format data API tidak sesuai");
    }

    // Simpan hasil API dan cari mobil Mercedes jika tersedia.
    apiCars = data.filter((car) => {
      const details = [
        car.make,
        car.manufacturer,
        car.brand,
        car.model
      ].filter(Boolean).join(" ");

      return /mercedes/i.test(details);
    });

    if (apiCars.length > 0) {
      apiStatus.className = "api-status success";
      apiStatus.lastChild.textContent = " API terhubung";
      apiNote.textContent =
        `Fetch API berhasil. Ditemukan ${apiCars.length} data Mercedes dari API. ` +
        "Katalog contoh tetap tersedia.";
    } else {
      apiStatus.className = "api-status success";
      apiStatus.lastChild.textContent = " API berhasil";
      apiNote.textContent =
        `Fetch API berhasil mengambil ${data.length} data sedan. ` +
        "Belum ditemukan data Mercedes yang cocok, jadi katalog menampilkan data contoh lokal.";
    }

    console.log("Fetch API berhasil:", data);
    console.log("Data Mercedes dari API:", apiCars);
  } catch (error) {
    apiStatus.className = "api-status error";
    apiStatus.lastChild.textContent = " API tidak tersedia";
    apiNote.textContent =
      "API gagal diakses. Katalog contoh tetap dapat digunakan. " +
      "Periksa koneksi internet atau pembatasan CORS jika diperlukan.";

    console.error("Fetch API gagal:", error);
  }
}

// Render katalog mobil ke halaman
function renderCars() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedType = typeFilter.value;

  let filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(keyword) ||
      car.type.toLowerCase().includes(keyword) ||
      car.engine.toLowerCase().includes(keyword);

    const matchesType =
      selectedType === "all" || car.type === selectedType;

    return matchesSearch && matchesType;
  });

  if (sortFilter.value === "low") {
    filteredCars.sort((a, b) => a.price - b.price);
  } else if (sortFilter.value === "high") {
    filteredCars.sort((a, b) => b.price - a.price);
  }

  carGrid.replaceChildren();

  document.getElementById("empty-message")
    .classList.toggle("hidden", filteredCars.length > 0);

  filteredCars.forEach((car) => {
    const card = document.createElement("article");
    card.className = "car-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "car-image-wrap";

    const image = document.createElement("img");
    image.className = "car-image";
    image.src = car.image;
    image.alt = car.name;
    image.loading = "lazy";

    image.onerror = () => {
      image.onerror = null;
      image.src =
        "https://placehold.co/900x560/171b20/d5b477?text=Mercedes-Benz";
    };

    const type = document.createElement("span");
    type.className = "car-type";
    type.textContent = car.type.toUpperCase();

    imageWrap.append(image, type);

    const info = document.createElement("div");
    info.className = "car-info";

    const name = document.createElement("h3");
    name.className = "car-name";
    name.textContent = car.name;

    const description = document.createElement("p");
    description.className = "car-description";
    description.textContent = car.description;

    const specs = document.createElement("div");
    specs.className = "car-specs";

    const year = document.createElement("span");
    year.textContent = `◷ ${car.year}`;

    const engine = document.createElement("span");
    engine.textContent = `⚙ ${car.engine}`;

    specs.append(year, engine);

    const bottom = document.createElement("div");
    bottom.className = "car-bottom";

    const priceArea = document.createElement("div");

    const priceLabel = document.createElement("p");
    priceLabel.className = "car-price-label";
    priceLabel.textContent = "Estimasi harga mulai";

    const price = document.createElement("p");
    price.className = "car-price";
    price.textContent = formatPrice(car.price);

    priceArea.append(priceLabel, price);

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.className = "details-button";
    detailsButton.textContent = "Pilih Mobil ↗";
    detailsButton.addEventListener("click", () => selectCar(car.id));

    bottom.append(priceArea, detailsButton);
    info.append(name, description, specs, bottom);
    card.append(imageWrap, info);
    carGrid.appendChild(card);
  });
}

// Isi dropdown dari daftar mobil yang tersedia
function populateCarOptions() {
  const previousValue = carChoice.value;
  carChoice.replaceChildren();

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Pilih mobil";
  carChoice.appendChild(placeholder);

  cars.forEach((car) => {
    const option = document.createElement("option");
    option.value = String(car.id);
    option.textContent = car.name;
    carChoice.appendChild(option);
  });

  if (cars.some((car) => String(car.id) === previousValue)) {
    carChoice.value = previousValue;
  }
}

// Memilih mobil dan mengarahkan pengguna ke form
function selectCar(id) {
  selectedCar = cars.find((car) => car.id === Number(id));

  if (!selectedCar) return;

  carChoice.value = String(selectedCar.id);
  updateSummary();

  document.getElementById("booking").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  showToast(`${selectedCar.name} dipilih.`);
}

// Update ringkasan pemesanan
function updateSummary() {
  const car = cars.find(
    (item) => item.id === Number(carChoice.value)
  );

  selectedCar = car || null;

  document.getElementById("summary-car").textContent =
    car ? car.name : "Belum dipilih";

  document.getElementById("summary-price").textContent =
    car ? formatPrice(car.price) : "-";

  document.getElementById("summary-type").textContent =
    document.getElementById("order-type").value;
}

// DOM & EVENT HANDLING: pencarian, filter, dan pengurutan
searchInput.addEventListener("input", renderCars);
typeFilter.addEventListener("change", renderCars);
sortFilter.addEventListener("change", renderCars);
carChoice.addEventListener("change", updateSummary);

document.getElementById("order-type").addEventListener("change", updateSummary);

// DOM & EVENT HANDLING: menangani submit form
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formResult.classList.add("hidden");
  formResult.classList.remove("error");

  // Validasi bawaan browser sudah memeriksa required, email,
  // dan minlength sebelum event submit berjalan.
  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  const formData = new FormData(bookingForm);

  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const phone = String(formData.get("phone")).trim();
  const carId = Number(formData.get("car"));
  const orderType = String(formData.get("orderType"));
  const payment = String(formData.get("payment"));
  const message = String(formData.get("message")).trim();

  const car = cars.find((item) => item.id === carId);

  if (!car) {
    formResult.textContent = "Silakan pilih mobil terlebih dahulu.";
    formResult.classList.remove("hidden");
    formResult.classList.add("error");
    carChoice.focus();
    return;
  }

  if (!/^[0-9+\-\s()]{8,20}$/.test(phone)) {
    formResult.textContent =
      "Nomor telepon harus berisi 8–20 karakter angka atau simbol telepon yang valid.";
    formResult.classList.remove("hidden");
    formResult.classList.add("error");
    document.getElementById("buyer-phone").focus();
    return;
  }

  // Data hanya diproses di browser untuk demonstrasi.
  const booking = {
    name,
    email,
    phone,
    car: car.name,
    estimatedPrice: car.price,
    orderType,
    payment,
    message,
    submittedAt: new Date().toLocaleString("id-ID")
  };

  console.log("Data form pemesanan:", booking);

  formResult.innerHTML = "";

  const title = document.createElement("strong");
  title.textContent = "Permintaan berhasil dicatat!";

  const detail = document.createElement("p");
  detail.textContent =
    `Terima kasih, ${booking.name}. Permintaan ${booking.orderType.toLowerCase()} ` +
    `untuk ${booking.car} telah diproses dalam simulasi. ` +
    `Estimasi harga: ${formatPrice(booking.estimatedPrice)}.`;

  const note = document.createElement("p");
  note.textContent =
    "Ini hanya demo frontend. Data tidak dikirim ke server.";

  formResult.append(title, detail, note);
  formResult.classList.remove("hidden");

  showToast("Form berhasil divalidasi dan diproses.");

  console.log("Data form berhasil diproses di browser.");
});

// Notifikasi kecil
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// Inisialisasi awal: katalog dan dropdown tetap dapat digunakan
// walaupun permintaan Fetch API gagal.
populateCarOptions();
renderCars();
updateSummary();
fetchCarData();
