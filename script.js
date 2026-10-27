
const products = [
  {
    name: "Wardah Glasting Liquid Lip",
    brand: "Wardah",
    category: "Lipstik",
    price: "Rp76.532",
    rating: 4,
    icon: "💄",
    description: "Pilihan warna untuk makeup sehari-hari. Transferproof, tidak lengket, tahan lama!"
  },
  {
    name: "Goute Goublush Cream Blush",
    brand: "Goute",
    category: "Blush",
    price: "Rp35.890",
    rating: 4.5,
    icon: "🌸",
    description: "Blush dengan warna ceria untuk tampilan fresh. Mudah diblend, High Pigmented, dan ringan."
  },
  {
    name: "Make Over Powder",
    brand: "Make Over",
    category: "Bedak",
    price: "Rp95.000",
    rating: 4,
    icon: "🪞",
    description: "Bedak untuk melengkapi riasan wajah."
  },
  {
    name: "Luxcrime Foundation",
    brand: "Luxcrime",
    category: "Foundation",
    price: "Rp119.000",
    rating: 5,
    icon: "🧴",
    description: "Pilihan complexion untuk tampilan makeup."
  },
  {
    name: "Azarine Sunscreen",
    brand: "Azarine",
    category: "Skincare",
    price: "Rp65.000",
    rating: 5,
    icon: "☀️",
    description: "Perlindungan matahari untuk rutinitas pagi. Ringan dipakai seharian, Tidak ada whitecas, gampang diblend"
  },
  {
    name: "Hanasui Lip Tint",
    brand: "Hanasui",
    category: "Lipstik",
    price: "Rp30.000",
    rating: 4,
    icon: "💋",
    description: "Pilihan lip tint untuk tampilan bibir berwarna."
  }
];

const grid = document.getElementById("productGrid");
const search = document.getElementById("search");
const category = document.getElementById("category");
const reviewForm = document.getElementById("reviewForm");
const formMessage = document.getElementById("formMessage");

// Menampilkan daftar produk
function renderProducts() {
  const keyword = search.value.toLowerCase().trim();
  const selectedCategory = category.value;

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.brand.toLowerCase().includes(keyword);

    const matchesCategory =
      selectedCategory === "Semua" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  grid.replaceChildren();

  if (filteredProducts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent =
      "Produk tidak ditemukan. Coba kata kunci lain ya! 💙";

    grid.appendChild(empty);
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "card";

    const art = document.createElement("div");
    art.className = "product-art";
    art.textContent = product.icon;
    art.setAttribute("aria-hidden", "true");

    const content = document.createElement("div");
    content.className = "card-content";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const brand = document.createElement("p");
    brand.textContent = product.brand;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = product.price;

    const rating = document.createElement("p");
    rating.className = "stars";
    rating.textContent =
      "★".repeat(product.rating) +
      "☆".repeat(5 - product.rating);

    const description = document.createElement("p");
    description.className = "review-text";
    description.textContent = product.description;

    const button = document.createElement("a");
    button.className = "btn";
    button.href = "#review";
    button.textContent = "Tulis Review";

    content.append(
      tag,
      title,
      brand,
      price,
      rating,
      description,
      button
    );

    card.append(art, content);
    grid.appendChild(card);
  });
}

// Fitur pencarian dan kategori
search.addEventListener("input", renderProducts);
category.addEventListener("change", renderProducts);

// Mengirim review baru
reviewForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name =
    document.getElementById("productName").value.trim();

  const brand =
    document.getElementById("brand").value.trim();

  const rating = Number(
    document.getElementById("rating").value
  );

  const review =
    document.getElementById("reviewText").value.trim();

  if (!name || !brand || !review) {
    formMessage.textContent =
      "Mohon lengkapi semua kolom terlebih dahulu.";
    return;
  }

  if (rating < 1 || rating > 5) {
    formMessage.textContent = "Rating tidak valid.";
    return;
  }

  // Cek apakah produk sudah ada
  const existingProduct = products.find(product =>
    product.name.toLowerCase() === name.toLowerCase() &&
    product.brand.toLowerCase() === brand.toLowerCase()
  );

  if (existingProduct) {
    existingProduct.rating = rating;
    existingProduct.description = review;
  } else {
    products.unshift({
      name: name,
      brand: brand,
      category: "Lipstik",
      price: "Harga belum ditambahkan",
      rating: rating,
      icon: "💄",
      description: review
    });
  }

  // Tampilkan semua produk agar produk baru terlihat
  search.value = "";
  category.value = "Semua";
  renderProducts();

  formMessage.textContent =
    "Review berhasil ditambahkan! Terima kasih 💙";

  reviewForm.reset();

  document.getElementById("produk").scrollIntoView({
    behavior: "smooth"
  });
});

// Tampilkan produk saat halaman dibuka
renderProducts();
