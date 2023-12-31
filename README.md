# React Native Books App

A React Native app that enables users to search for various books using the [Open Library API](https://openlibrary.org/developers/api).

## Caveat (Android)
In case android build fails, please remove [this line](https://github.com/tarikfp/rn-books-app/blob/3d8440c5e2fad03bc9f7be894ebaaaab30fb8be6/android/app/build.gradle#L119) from `android/app/build.gradle`.

Related issue: https://stackoverflow.com/a/75266614/9631529

## Some of the Utilized Technologies

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Shopify Restyle](https://github.com/Shopify/restyle)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Fast Image](https://github.com/DylanVann/react-native-fast-image)
- [React Native MMKV](https://github.com/mrousavy/react-native-mmkv)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [React Navigation Native Stack](https://reactnavigation.org/docs/native-stack-navigator/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)


## Getting Started

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).


>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

### Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

#### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
