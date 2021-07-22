---
title: How to create an Esperanto keyboard layout on Windows
---

<SelectLanguage/>

# How to create an Esperanto keyboard layout on Windows

In this tutorial I will show you how to create Esperanto, with which you can type letters with circumflexs holding AltGr key.

## How to create the layout

Firstly, you have to download an app, Microsoft Keyboard Layout Creator 1.4.

[Download link](https://www.microsoft.com/en-us/download/confirmation.aspx?id=102134)

Open the installed file and if you want, change the extraction directory. Then click on the _Extract_ button.

![alt text](/create-keyboard/1.png) {.center}

Navigate to the extraction directory and open the _setup_ file. Accept the License Agreement and click through the setup.

![alt text](/create-keyboard/2.png) {.center}

Type _msklc_ into the Windows 10 search bar and open _Microsoft Keyboard Layout Creator 1.4_.

When the program launches, click the _File_ option and select _Load Existing Keyboard..._

![alt text](/create-keyboard/3.png) {.center}

Select an existing keyboard, I picked the US-International Keyboard, but you can pick other one too.

The keyboard should change its layout. Now you will edit lower case letters, change shift state to _Alt+Ctrl (AltGr)_ and click on the keys to change their characters. While editing a key, remember to click on _All..._ and select the lower checkbox _caps = shift_ so that Caps Lock and Shift are treated the same.

![alt text](/create-keyboard/4.png)![alt text](/create-keyboard/5.png) {.center}

After changing other keys, it should look like that:

![alt text](/create-keyboard/6.png) {.center}

To edit the upper case letters, change shift state to _Shift_ and once again click on the keys to change their characters. This time don't click the _All..._ button. The keyboard should look like that:

![alt text](/create-keyboard/7.png) {.center}

Now click on the _Project_ option and select _Properties..._ to change the name, the description, the copyright and other properties of the layout.

![alt text](/create-keyboard/8.png) {.center}

If you want to check, whether the keyboard works correctly, click on the _Project_ option and select _Test Keyboard Layout..._

If everything looks good, finally click on _Project_ and select _Build DLL and Setup Package..._

Windows will appear, as for the first window, click no and yes as for the second one, folder will appear with a file named _setup_ inside, open it.

![alt text](/create-keyboard/9.png) {.center}

If you see that, you can close all the windows, and restart your computer.

Congrats! Now you can change keyboard layouts using a shortcut Win + Space.

## Kiel forigi la klavaranĝon

If you want to delete the layout, go back to the folder with the _setup_ program and open it. Then press _Finish_ and allow the program to make changes in the user account control window. Which will apear in your task bar, like on the image:

![alt text](/create-keyboard/10.png) {.center}

If you see this, you successfully removed the layout. You can close all windows

![alt text](/create-keyboard/11.png) {.center}

## Problemoj

If you have any problems, send me a message on discord: janomiĥalako#9984, or email me: [janmichalak@int.pl](mailto:janmichalak@int.pl)
