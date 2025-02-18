# ElectroScratch
Кастомно-сделанный клиент Scratch который использует Electron.
## Известные проблемы
- Иногда не работает закрытие окна
- [РЕДКО] Не загружается Scratch
## Как запустить
1. Скачайте репозиторий
```bash
git clone https://github.com/ImVovanchik/electroscratch.git
```
2. Установите NodeJS + npm и зависимости
```bash
############################################
#         Установка NodeJS + npm           #
############################################
# Для Ubuntu/Debian
sudo apt install nodejs npm
# Для Arch Linux
sudo pacman -S nodejs npm
# Для Windows
# Скачайте с официального сайта
# https://nodejs.org/en/download/
# Для Fedora
sudo dnf install nodejs npm
# Для OpenSUSE
sudo zypper install nodejs npm
# Для MacOS
brew install nodejs npm
############################################
#         Установка зависимостей           #
############################################
cd electroscratch
npm install
```
3. Запустите
```bash
npm start
```
*или можно сделать `electron .` если у вас есть Electron установленным глобально*
## Как собрать
1. Делайте шаги 1 и 2 из "Как запустить"
2. Соберите
```bash
npm run make-win # Для Windows
npm run make-linux # Для Linux
npm run make-mac # Для MacOS
```
*или можно сделать `electron-builder build` если у вас есть Electron Builder установленным в консоли npx*