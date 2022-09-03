# address_conv_authentication

## Tujuan

### 1. Mengimplementasikan auth token
-	Menggunakan JWT
-	Terdapat permission untuk akses API hanya untuk user admin 
### 2. Mendapatkan satu nama dengan id yang sama
-	Route: /namaid/{id}
-	Input header: token
-	Input body: id
-	Gagal jika input body tidak ditemukan pada data dummy
-	Gagal jika tidak ada token di header
-	Gagal jika token tidak sesuai dengan auth/permission yang sudah ada
### 3. Mendapatkan semua nama dengan kota_id yang sama (data kecamatan)
-	Route: /namakota/{id_kota}
-	Input header: token
-	Input body: id_kota
-	Gagal jika input body tidak ditemukan pada data dummy
-	Gagal jika tidak ada token di header
-	Gagal jika token tidak sesuai dengan auth/permission yang sudah ada

## Diagram Flow
### Login
<img src="/assets/add_conv_auth_login.png" alt="add_conv_auth_login" style="height: 500px; width:400px;"/>

### Get 1 nama berdasarkan id
<img src="/assets/add_conv_auth_nama_id.png" alt="add_conv_auth_nama_id" style="height: 700px; width:400px;"/>

### Get semua nama berdasarkan kota_id
<img src="/assets/add_conv_auth_nama_kota_id.png" alt="add_conv_auth_nama_kota_id" style="height: 700px; width:400px;"/>

## Database
-	Menggunakan mysql 
- Struktur database berada pada file `address_conv.sql`
-	Initialize database:

```css
CREATE TABLE `auth` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `role` varchar(255) COLLATE utf8_bin NOT NULL,
  `token` varchar(1000) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;
```

## Getting Started
-	Install dependencies: `npm install`
-	Run development mode: `npm run start-dev` 
-	Server berada pada `localhost:5000`

## Menjalankan API
Semua use case dijalankan pada file `address-conv-auth.postman_collection.json`.  
Berikut merupakan use case yang dilakukan:
-	POST login user baru admin
-	POST login user baru user
-	POST login user admin (cek update token)
-	Get 1 nama dari id; token benar;body ditemukan; user: admin
-	Get 1 nama dari id; token benar; body tidak ditemukan; user: admin
-	GET 1 nama dari id; token salah; body ditemukan; user: admin
-	GET 1 nama dari id; token benar; body ditemukan; user: user
-	GET semua nama dari id; token benar; body ditemukan user: user
-	GET semua nama dari id; token benar; body ditemukan user: admin
-	GET semua nama dari id; token benar; body tidak ditemukan user: admin
-	GET semua nama dari id; token salah; body tidak ditemukan; user: admin
