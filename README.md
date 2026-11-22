# Расписание — Android APK из PWA

Автоматическая сборка APK через GitHub Actions. Никакого Android Studio на твоём компьютере не нужно.

---

## 🚀 Как получить APK за 5 минут

### 1. Создай репозиторий на GitHub
- Зайди на [github.com/new](https://github.com/new)
- Название: `schedule-app` (любое)
- Public / Private — не важно
- **Не добавляй** README, .gitignore, license
- Нажми **Create repository**

### 2. Залей файлы
```bash
# В папке android-app (где лежит этот README)
git init
git add .
git commit -m "Initial commit: PWA + Capacitor config"
git branch -M main
git remote add origin https://github.com/ТВОЙ_ЮЗЕР/schedule-app.git
git push -u origin main
```

### 3. Жди сборку (3–5 минут)
- Зайди в репозиторий → вкладка **Actions**
- Видишь workflow "Build Android APK" → жди зелёной галочки ✅

### 4. Скачай APK
- Зайди в завершённый запуск (Workflow run)
- Внизу **Artifacts** → `app-debug-apk` → скачиваешь `.zip`
- Распаковываешь → `app-debug.apk` — ставь на телефон

---

## 📱 Что внутри APK

| Фича | Статус |
|------|--------|
| Полное расписание (чётная/нечётная) | ✅ |
| Подсветка текущей пары | ✅ |
| Домашнее задание (сохраняется локально) | ✅ |
| Работа **офлайн** (Service Worker) | ✅ |
| Установка как приложение (PWA) | ✅ |
| Тёмная/светлая тема (авто) | ✅ |
| Адаптивные иконки | ✅ |
| Splash screen | ✅ |

---

## 🔐 Релизная сборка (подписанная, для Play Market)

По умолчанию собирается **debug APK** (можно ставить прямо на телефон, но не в Play Market).

Для подписанного release APK:
1. Сгенерируй keystore:
   ```bash
   keytool -genkeypair -v -keystore release-key.keystore -alias schedule-key -keyalg RSA -keysize 2048 -validity 10000
   ```
2. В репозитории → **Settings → Secrets and variables → Actions → New repository secret**:
   - `CAPACITOR_ANDROID_KEYSTORE_PASSWORD` — пароль от keystore
   - `CAPACITOR_ANDROID_KEY_PASSWORD` — пароль от ключа (обычно такой же)
   - `CAPACITOR_ANDROID_KEYSTORE_BASE64` — `base64 -w 0 release-key.keystore` (вывод в одну строку)
3. В workflow раскомментируй секцию release (или добавь отдельный job с `actions/download-artifact` + подпись)

---

## 🛠 Локальная разработка (если понадобится)

```bash
# Нужен Node.js 18+ и Android Studio
cd android-app
npm install
npx cap sync android
npx cap open android  # откроет Android Studio
```

---

## 📂 Структура

```
android-app/
├── .github/workflows/build-apk.yml   # GitHub Actions workflow
├── public/                           # Твой PWA (index.html, sw.js, manifest.json, favicon.svg)
├── capacitor.config.json             # Конфиг Capacitor
├── package.json                      # Зависимости
├── android/                          # Сгенерируется при первой сборке
│   └── app/src/main/res/             # Иконки, манифест, стили
└── README.md                         # Этот файл
```

---

## ❗ Возможные проблемы

| Ошибка | Решение |
|--------|---------|
| `gradlew: Permission denied` | В workflow добавлен `chmod +x gradlew` (уже есть) |
| Иконки не сгенерировались | Проверь логи шага "Generate PNG icons" — нужен ImageMagick |
| `keystore not found` | Для debug не нужно, для release — добавь секреты |
| APK не ставится на телефон | Включи "Неизвестные источники" в настройках Android |

---

## 📄 Лицензия

MIT — делай что хочешь.