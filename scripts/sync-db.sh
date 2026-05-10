#!/bin/bash
# scripts/sync-db.sh
# Safely syncs your local dev.db to the live server.

DROPLET_IP="143.110.211.200"
USER="root"
APP_DIR="/var/www/tvas-site"

echo "=========================================="
echo " Syncing Local Database to Live Server"
echo "=========================================="

echo "1. Stopping live server to release database locks..."
ssh $USER@$DROPLET_IP "pm2 stop tvas-site"

echo "2. Clearing old production database and WAL files..."
ssh $USER@$DROPLET_IP "rm -f $APP_DIR/prod.db $APP_DIR/prod.db-wal $APP_DIR/prod.db-shm"

echo "3. Uploading your local dev.db..."
scp ./dev.db $USER@$DROPLET_IP:$APP_DIR/prod.db

# Optional: Upload WAL files if they exist locally
if [ -f "./dev.db-wal" ]; then
  scp ./dev.db-wal $USER@$DROPLET_IP:$APP_DIR/prod.db-wal
fi
if [ -f "./dev.db-shm" ]; then
  scp ./dev.db-shm $USER@$DROPLET_IP:$APP_DIR/prod.db-shm
fi

echo "4. Restarting live server..."
ssh $USER@$DROPLET_IP "pm2 start tvas-site"

echo "=========================================="
echo " Sync Complete! Your live site now has your localhost data."
echo "=========================================="
