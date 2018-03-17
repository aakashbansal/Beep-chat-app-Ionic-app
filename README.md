# Beep-chat-app-Ionic-app

The given repository is a **Chat application** built in **Ionic framework** using **Firebase** for **authentication** and **database**.

The app supports **One-to-One Chats** and also has a feature to add **Channels** and carrying on a discussion over a particular topic on that channel. 

## App Screenshots

**Registering and Login**

<img src="SCREENSHOTS/Splash.png" width="200"> <img src="SCREENSHOTS/Register.png" width="200"> <img src="SCREENSHOTS/Login.png" width="200"> 


**Inbox and Personal Chat**

<img src="SCREENSHOTS/Inbox.png" width="200">  <img src="SCREENSHOTS/SearchUser.png" width="200"> <img src="SCREENSHOTS/PersonalChat.png" width="200">


**Channels & Channel Chats**

<img src="SCREENSHOTS/Channels.png" width="200">  <img src="SCREENSHOTS/AddChannel.png" width="200"> <img src="SCREENSHOTS/ChannelChats.png" width="200">


**Profile-View and Edit**

<img src="SCREENSHOTS/ViewProfile.png" width="200">  <img src="SCREENSHOTS/ProfileEdit.png" width="200">



## Project Setup

The following project requires **Node.Js** and **NPM** to be pre-installed and the necessary path variables for **Node** and **NPM** should also be set-up already.

Besides that **Android SDK** and **JAVA JDK** must also be installed before-hand and available in the **system path** for this **Ionic** app to work.

For detailed instructions on how to do that, following articles can be referred : 

[Android Platform Guide by Cordova(Official Guide)](https://cordova.apache.org/docs/en/latest/guide/platforms/android/) or

[Environment setting tutorial Ionic + Android on windows (Blog post)](http://www.tiagoporto.com/blog/environment-setting-tutorial-ionic-android-on-windows/)

Once the above required dependencies are successfully installed, open the terminal/command-line and then : 

First install **Cordova** and **Ionic**.

```
$  npm install -g cordova
$  npm install -g ionic
```
Then set-up the project:
```
$ cd \<required-directory>
$ git clone https://github.com/aakashbansal/Beep-chat-app-Ionic-app.git
$ cd \Beep-chat-app-Ionic-app
$ npm install
```

This sets-up the project locally on your machine.

## Setting up Firebase for this Project

See this [Official Firebase Documentation](https://firebase.google.com/docs/web/setup) for getting familiar on how to set up **Firebase** for this app. 

After setting up the **Firebase** project on the **console**, just copy and paste the **config** object from the **Firebase console** into the following directory :  **src/config/firebase.config.ts** 

This initializes the **Developer keys** for the project.

Now, go to the **Firebase console** of the given project https://console.firebase.google.com/project/<YOUR_PROJECT_ID>/overview

The project is good to go now.

## Running the App

To run the app in **Browser** :
```
$ ionic lab
```

To run the app on an **Android Device** :
```
$ ionic cordova platform add android
$ ionic cordova run android
```

To run the app on **Android Emulator** :
```
$ ionic cordova platform add android
$ ionic cordova emulate android
```
