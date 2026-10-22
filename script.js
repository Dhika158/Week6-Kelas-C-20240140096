
const cars = [
  {
    name: "Mercedes-Benz C-Class",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=85",
    description: "Sedan elegan dengan kenyamanan dan teknologi modern.",
    price: "Mulai dari Rp 1,1 Miliar"
  },
  {
    name: "Mercedes-Benz E-Class",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=85",
    description: "Sedan premium dengan kabin mewah dan teknologi canggih.",
    price: "Mulai dari Rp 1,5 Miliar"
  },
  {
    name: "Mercedes-Benz S-Class",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=85",
    description: "Kemewahan kelas atas dengan kenyamanan berkendara premium.",
    price: "Mulai dari Rp 2,8 Miliar"
  },
  {
    name: "Mercedes-Benz G-Class",
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1000&q=85",
    description: "SUV ikonik dengan karakter tangguh dan desain berani.",
    price: "Mulai dari Rp 3,5 Miliar"
  },
  {
    name: "Mercedes-Benz GLC",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85",
    description: "SUV modern yang memadukan kenyamanan dan fleksibilitas.",
    price: "Mulai dari Rp 1,3 Miliar"
  },
  {
    name: "Mercedes-Benz EQS",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=85",
    description: "Mobil listrik premium dengan desain futuristis.",
    price: "Mulai dari Rp 2,9 Miliar"
  }
];

const carGrid = document.getElementById("car-grid");
const catalogPage = document.getElementById("catalog");
const hero = document.getElementById("hero");
const transactionPage = document.getElementById("transaction");

const summaryImage = document.getElementById("summary-image");
const summaryCar = document.getElementById("summary-car");
const summaryDescription = document.getElementById("summary-description");
const summaryPrice = document.getElementById("summary-price");

const carChoice = document.getElementById("car-choice");
const transactionForm = document.getElementById("transaction-form");
const feedback = document.getElementById("transaction-feedback");

function renderCars() {
  carGrid.innerHTML = "";

  cars.forEach((car) => {
    const card = document.createElement("article");
    card.className = "car-card";

    const image = document.createElement("img");
    image.src = car.image;
    image.alt = car.name;
    image.loading = "lazy";
    image.onerror = () => {
      image.onerror = null;
      image.src = "images/placeholder.jpg";
    };

    const content = document.createElement("div");
    content.className = "car-card-content";

    const name = document.createElement("h3");
    name.textContent = car.name;

    const description = document.createElement("p");
    description.textContent = car.description;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = car.price;

    const button = document.createElement("button");
    button.className = "details-button";
    button.type = "button";
    button.textContent = "Pesan / Konsultasi ↗";
    button.addEventListener("click", () => showTransaction(car));

    content.append(name, description, price, button);
    card.append(image, content);
    carGrid.appendChild(card);
  });
}

function populateCarChoices() {
  carChoice.innerHTML = "";

  cars.forEach((car) => {
    const option = document.createElement("option");
    option.value = car.name;
    option.textContent = car.name;
    carChoice.appendChild(option);
  });
}

function showTransaction(car) {
  hero.classList.add("hidden");
  catalogPage.classList.add("hidden");
  transactionPage.classList.remove("hidden");

  carChoice.value = car.name;
  updateSelectedCar();

  feedback.textContent = "";
  transactionPage.scrollIntoView({ behavior: "smooth" });
}

function updateSelectedCar() {
  const car = cars.find((item) => item.name === carChoice.value);

  if (!car) return;

  summaryImage.onerror = () => {
    summaryImage.onerror = null;
    summaryImage.src = "images/placeholder.jpg";
  };

  summaryImage.src = car.image;
  summaryImage.alt = car.name;
  summaryCar.textContent = car.name;
  summaryDescription.textContent = car.description;
  summaryPrice.textContent = car.price;
}

function showCatalog() {
  transactionPage.classList.add("hidden");
  hero.classList.remove("hidden");
  catalogPage.classList.remove("hidden");
  feedback.textContent = "";

  document.getElementById("hero").scrollIntoView({
    behavior: "smooth"
  });
}

carChoice.addEventListener("change", updateSelectedCar);

document.getElementById("back-button").addEventListener("click", showCatalog);

document.getElementById("home-link").addEventListener("click", (event) => {
  event.preventDefault();
  showCatalog();
});

document.getElementById("catalog-link").addEventListener("click", (event) => {
  event.preventDefault();
  showCatalog();
  catalogPage.scrollIntoView({ behavior: "smooth" });
});

document.getElementById("transaction-link").addEventListener("click", (event) => {
  event.preventDefault();

  if (transactionPage.classList.contains("hidden")) {
    showTransaction(cars[0]);
  } else {
    transactionPage.scrollIntoView({ behavior: "smooth" });
  }
});

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!transactionForm.reportValidity()) return;

  const formData = {
    nama: document.getElementById("buyer-name").value.trim(),
    email: document.getElementById("buyer-email").value.trim(),
    telepon: document.getElementById("buyer-phone").value.trim(),
    mobil: carChoice.value,
    layanan: document.getElementById("order-type").value,
    pembayaran: document.getElementById("payment-method").value
  };

  feedback.textContent =
    `Permintaan simulasi berhasil disiapkan untuk ${formData.nama}. ` +
    `Pilihan: ${formData.mobil} — ${formData.layanan}. Data belum dikirim ke server.`;

  console.log("Data simulasi transaksi:", formData);
});

populateCarChoices();
renderCars();
