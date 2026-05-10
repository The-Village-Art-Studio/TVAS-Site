#!/bin/bash
# scripts/setup-server.sh
# Run this script ON YOUR LOCAL MACHINE to setup the remote Droplet.
# Usage: ./scripts/setup-server.sh

DROPLET_IP="143.110.211.200"
USER="root"

echo "=========================================="
echo " Setting up Droplet at $DROPLET_IP"
echo "=========================================="

ssh $USER@$DROPLET_IP << 'EOF'
set -e

# 1. Update system packages
echo "---> Updating system packages..."
apt-get update
apt-get upgrade -y

# 2. Install essential tools
echo "---> Installing Nginx, Git, and Certbot..."
apt-get install -y curl git nginx certbot python3-certbot-nginx

# 3. Install Node.js (v20)
echo "---> Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 4. Install PM2 globally
echo "---> Installing PM2..."
npm install -g pm2

# 5. Create application directory
echo "---> Creating app directory..."
mkdir -p /var/www/tvas-site
chown -R $USER:$USER /var/www/tvas-site

# 6. Set up Firewall (UFW)
echo "---> Configuring Firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
# ufw --force enable # Enable firewall (Optional but recommended, uncomment if you want)

echo "=========================================="
echo " Server provisioning complete!"
echo " Next step: Run ./scripts/deploy.sh to push the code."
echo "=========================================="
EOF
