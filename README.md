# 📱 CryptoApp

## 🚀 Descripción

CryptoApp es una aplicación de **React Native** que permite visualizar y gestionar información sobre criptomonedas en tiempo real. Permite filtrar, ordenar y ver detalles.

## 📂 Estructura del Proyecto

```bash
src/
├── app/
│   ├── config/
│   ├── navigation/
├── modules/
│   ├── crypto/
│   │   ├── data/
│   │   ├── domain/
│   │   ├── presentation/
│   │   │   ├── components/
│   │   │   ├── screens/
│   │   │   ├── redux/
assets/
    ├── animations/
```

## 📦 Instalación y Ejecución

### 🔹 Requisitos Previos

- Node.js 18+
- React Native CLI
- Android Studio / Xcode (para emuladores)

### 🔹 Instalación

```sh
git clone https://github.com/steven230500/cryptoapp.git
cd cryptoapp
npm install
```

### 🔹 Ejecución en Android

```sh
npm run android
```

### 🔹 Ejecución en iOS

```sh
npm run ios
```

## 🎥 Capturas de Pantalla y Demo

## 📱 Android

| 📱 Dashboard (Android)                         | 📈 Detalle (Android)                      |
| ---------------------------------------------- | ----------------------------------------- |
| ![Dashboard](assets/screenshots/dashboard.png) | ![Detalle](assets/screenshots/detail.png) |

## 🍎 iOS

| 📱 Dashboard (iOS)                       | 📈 Detalle (iOS)                         |
| ---------------------------------------- | ---------------------------------------- |
| ![Dashboard](assets/screenshots/ios.png) | ![Detalle](assets/screenshots/ios_d.png) |

## 🔗 API Utilizada

Esta app obtiene los datos desde la API de **CoinLore**:
[https://api.coinlore.net/api/tickers/](https://api.coinlore.net/api/tickers/)

## ✅ Buenas Prácticas Implementadas

- Uso de **Redux Toolkit** para manejo de estado global.
- Arquitectura **data-domain-presentation**.
- Animaciones con **react-native-reanimated** y **Lottie**.
- Manejo de errores y estados de carga.

## 👨‍💻 Autor

- **Steven Patiño** - [GitHub](https://github.com/steven230500) - [LinkedIn](https://linkedin.com/in/steven-p-0ab502126)
