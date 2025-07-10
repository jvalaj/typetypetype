const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const notifier = require('node-notifier');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'renderer/assets/icon.png'),
    titleBarStyle: 'default',
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle notifications
ipcMain.on('show-notification', (event, { title, body, type = 'info' }) => {
  if (process.platform === 'darwin') {
    // macOS native notifications
    new Notification({
      title,
      body,
      silent: false
    }).show();
  } else {
    // Cross-platform notifications for other OS
    notifier.notify({
      title,
      message: body,
      icon: path.join(__dirname, 'renderer/assets/icon.svg'),
      sound: true
    });
  }
});

// Handle high score notifications
ipcMain.on('high-score-beaten', (event, { mode, wpm, accuracy }) => {
  const title = '🎉 New High Score!';
  const body = `You achieved ${wpm} WPM with ${accuracy}% accuracy in ${mode} mode!`;
  
  if (process.platform === 'darwin') {
    new Notification({
      title,
      body,
      silent: false
    }).show();
  } else {
    notifier.notify({
      title,
      message: body,
      icon: path.join(__dirname, 'renderer/assets/icon.svg'),
      sound: true
    });
  }
}); 