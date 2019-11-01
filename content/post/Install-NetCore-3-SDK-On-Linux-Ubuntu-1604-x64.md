---
title: "Install NetCore 3 SDK on Linux Ubuntu 16.04 X64"
date: 2019-10-28T21:58:09+01:00
draft: false
tags: [ ".NetCore", "Linux", "WLS" ]
---

On my desktop computer I have install Windows 10 as the OS, but i really like to play around with Linux and especially love their termials.
Therefore I have install the "Windows Subsystem for Linux (WLS)" on my computer. This open for the Linux world without having to spin a VM up.

I always tend to forget how to keep the Linux environment up to date, with the newest version of the .NetCore SDK.
So here it goes :)

# Register Microsoft key and feed
Before installing .NET, you'll need to register the Microsoft key, register the product repository, and install required dependencies. This only needs to be done once per machine.

Open a terminal and run the following commands:
wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb

# Install the .NET SDK
In your terminal, run the following commands:
sudo apt-get update
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install dotnet-sdk-3.0

And viola. Now verify that you have the newest version of .Net Core 3 by typing the following in the terminal:
dotnet --info

Now you are ready to go program with the new awesome .Net Core 3
