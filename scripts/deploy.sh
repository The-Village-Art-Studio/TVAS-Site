#!/bin/bash
# scripts/deploy.sh
# Run this script ON YOUR LOCAL MACHINE to deploy the app to the Droplet.
# Usage: ./scripts/deploy.sh

DROPLET_IP="143.110.211.200"
USER="root"
APP_DIR="/var/www/tvas-site"

echo "=========================================="
echo " Deploying TVAS-Site to $DROPLET_IP"
echo "=========================================="

# 1. Sync files to the droplet using rsync
echo "---> Syncing files to Droplet..."
# We exclude node_modules, .next build folder, and git folder to save time
# and ensure we build natively on the Droplet.
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' \
  --exclude 'scripts' --exclude 'dev.db' \
  ./ $USER@$DROPLET_IP:$APP_DIR/

# 2. Run build and restart commands on the remote Droplet
echo "---> Installing dependencies and building Next.js app on the Droplet..."

ssh $USER@$DROPLET_IP << EOF
set -e

cd $APP_DIR

echo "-> Ensuring Swap space exists (prevents build crashes)..."
if [ $(free -m | awk '/^Swap:/ {print $2}') -eq 0 ]; then
  echo "Creating 2GB swap file..."
  fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "-> Updating .env for production..."
sed -i 's|DATABASE_URL=.*|DATABASE_URL="file:///var/www/tvas-site/prod.db"|g' .env
sed -i 's|NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL="https://www.tvas.ca"|g' .env

echo "-> Running npm install..."
npm install --legacy-peer-deps

echo "-> Generating Prisma Client..."
npx prisma generate

echo "-> Pushing Database Schema..."
npx prisma db push --accept-data-loss

echo "-> Building Next.js..."
npm run build

echo "-> Starting/Restarting PM2..."
# Check if PM2 process exists, if so restart, else start
if pm2 show tvas-site > /dev/null; then
  pm2 restart tvas-site
else
  pm2 start npm --name "tvas-site" -- run start
fi

# Save PM2 process list to restart on server reboot
pm2 save
pm2 startup systemd -u root --hp /root || true

echo "-> Configuring Nginx..."
cp nginx/tvas.ca.conf /etc/nginx/sites-available/tvas.ca.conf
ln -sf /etc/nginx/sites-available/tvas.ca.conf /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx || true

EOF

echo "=========================================="
echo " Deployment Complete!"
echo " The site is now running on http://$DROPLET_IP:3000"
echo " (Nginx is routing traffic to port 3000)"
echo "=========================================="
