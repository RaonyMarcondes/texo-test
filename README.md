# Test React Native - Texo

## Setup

1. Install the latest version of [node.js](https://nodejs.org/en)

2. Clone the repository in the desired directory via command line

   $ git clone git@github.com:RaonyMarcondes/texo-test.git

3. Navigate to the root directory

   $ cd texo-test

4. Install dependencies

   $ yarn install

5. Run the application locally with the commands:

   $ yarn run ios (on a mac with Xcode previously installed)

   $ yarn run android (in an environment with Android Studio previously installed)

6. In the command line, a prompt will appear with options to run the application in an emulated environment, or run it on a device that has the [Expo Go](https://expo.dev/go) app previously installed

## API Issue

In the movies list, it is not possible to filter exclusively by YEAR, without the Winner filter being active simultaneously.

It is also not possible to associate the YEAR filter with the pagination, since the API signatures become completely different, and lose paging information when the YEAR and Winner filters are active, so the list becomes the exact The same as in the case of the widget that displays the winners of a given year selected through a search field on the Dashboard.
