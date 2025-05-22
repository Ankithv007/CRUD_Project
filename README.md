#Deployment

### 🚀 Full Stack Deployment on AWS EC2 with XAMPP, Node.js, MySQL & React

This guide walks you through deploying a full stack web application on an AWS EC2 instance using **XAMPP** (Apache, MySQL/MariaDB, phpMyAdmin), **Node.js backend**, and **React frontend**.

---

### ✅ High-Level Steps

1. Launch and connect to EC2 instance (Ubuntu or Amazon Linux recommended)
2. Install XAMPP (Apache, MySQL/MariaDB, phpMyAdmin)
3. Start XAMPP services
4. Enable remote access to phpMyAdmin
5. Create MySQL database and user
6. Clone your GitHub project
7. Configure Node.js backend to connect with MySQL
8. Build and serve React frontend
9. Test the complete stack

---

## 📦 1. Connect to Your EC2 Instance

```bash
ssh -i your-key.pem ec2-user@your-ec2-public-ip
```
## 2. Install XAMPP on EC2
```
wget https://sourceforge.net/projects/xampp/files/XAMPP%20Linux/8.2.4/xampp-linux-x64-8.2.4-0-installer.run
```
-  Make it executable and run:
```
chmod +x xampp-linux-x64-8.2.4-0-installer.run
sudo ./xampp-linux-x64-8.2.4-0-installer.run
```
## 3. Start XAMPP Services
```
sudo /opt/lampp/lampp start
```
-  Check service status:
```
sudo /opt/lampp/lampp status
```
- Apache
- MySQL (MariaDB)
- ProFTPD

## 4. Enable Remote Access to phpMyAdmin (change from Reuire local to the Require all granted )
```
Edit configuration file:
`
sudo nano /opt/lampp/etc/extra/httpd-xampp.conf
`
- Find this block
<LocationMatch "^/(?i:(?:xampp|phpmyadmin|licenses|phpinfo))">
   Require local
Change it to:
  - Require all granted
```
- Restart XAMPP to apply changes:
```
sudo /opt/lampp/lampp restart
```
- Access phpMyAdmin in browser:
```
http://your-ec2-public-ip/phpmyadmin
```
## 5. Create MySQL Database in phpMyAdmin
1.Open the URL above
2.Create a new Database
3.Create a User and assign a password
4.Grant that user full privileges on the created database

## 6. Clone Your GitHub Project
-----------------------------------------------------
### in the client folder change the localhost into your punlic ip adress (do not change the DB if the DB is in same EC2)
### inside client folder(where the React folder are present)
```
cd client
npm run build
```
## Next steps to deploy on your EC2 with XAMPP (Apache):
1.Copy the contents of dist/ to Apache's web root, for example:
```
sudo cp -r ../dist/* /opt/lampp/htdocs/
```
2.Restart Apache to make sure it serves the new files:
```
sudo /opt/lampp/lampp restart
```
3.Open your browser and navigate to:
```
http://<your-ec2-public-ip>/
```
-------------------------------------------------
## ✅ Running the Backend with PM2 (Process Manager)

This guide explains how to run the Node.js backend in the background and ensure it survives terminal close or EC2 instance reboot.

---

### ✅ What We Did To Fix It
- inside the sevrer (package.json=> "start": "node index.js") 
#### 1. 📦 Install PM2 – A Node.js process manager

Install PM2 globally to manage your Node.js app:

```bash
sudo npm install -g pm2
```
### 2. 🚀 Start the Backend Using PM2
```
pm2 start index.js --name myapp
```
### 3. ⚙️ Auto-Start PM2 on Reboot
```
pm2 startup
```
- Then run the command it shows, for example:
```
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
```
### 4. 💾 Save the Running Processes
```
pm2 save
```

  
