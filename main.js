// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: true,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
      enableRemoteModule: true,
      webviewTag: true
    }
  })
  // Событие закрытия окна
  mainWindow.on('close', (e) => {
    e.preventDefault(); // Отменяет закрытие окна
    mainWindow.webContents.executeJavaScript(`
      const confirmationResponse = window.confirm("Вы уверены что хотите закрыть ElectroScratch? Всё что не было сохранено будет утеряно.");
      if (confirmationResponse) {
        app.quit(); // Закрытие окна, если пользователь подтвердил
      }
    `);
  });

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
    },
  );

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        'Access-Control-Allow-Origin': ['*'],
        ...details.responseHeaders,
      },
    });
  });

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
  (details, callback) => {
    callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
  },
);

mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      'Access-Control-Allow-Origin': ['*'],
      // We use this to bypass headers
      'Access-Control-Allow-Headers': ['*'],
      ...details.responseHeaders,
    },
  });
});

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

}

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.