# Production Deployment Guide

## Overview

Deployment otomatis ke production menggunakan:
- **Manual**: Jalankan `bash deploy.sh` di server
- **GitHub Actions**: Auto-deploy setiap push ke branch `main`

## Files

- `deploy.sh` - Script deployment utama
- `.github/workflows/deploy.yml` - GitHub Actions workflow

## Setup (One-Time Only)

### Step 1: Generate SSH Key di Server Production

SSH ke server:

```bash
ssh -p 2223 seej2596@seeoftunsoed.com

# Generate SSH key
ssh-keygen -t ed25519 -f ~/.ssh/github_deploy_key -N ""

# Display private key (copy ini)
cat ~/.ssh/github_deploy_key
```

### Step 2: Add Private Key ke GitHub Secrets

1. Buka GitHub repo: https://github.com/kendikadimas/seeois
2. Go to: **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Tambahkan secrets:

| Name | Value |
|------|-------|
| `DEPLOY_HOST` | `seeoftunsoed.com` |
| `DEPLOY_PORT` | `2223` |
| `DEPLOY_USER` | `seej2596` |
| `DEPLOY_KEY` | Paste private key dari Step 1 |

### Step 3: Authorize Public Key di Server

Di server, authorize public key:

```bash
# Add public key to authorized_keys
cat ~/.ssh/github_deploy_key.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Verify
cat ~/.ssh/authorized_keys | tail -1
```

### Step 4: Make deploy.sh Executable

```bash
ssh -p 2223 seej2596@seeoftunsoed.com
cd ~/sis/seeois
chmod +x deploy.sh
```

### Step 5: Test Manual Deployment

```bash
# SSH to server
ssh -p 2223 seej2596@seeoftunsoed.com

# Run deployment
cd ~/sis/seeois
bash deploy.sh
```

Expected output:
```
╔════════════════════════════════════════════════════════════╗
║          🚀 SEEO SIS Production Deployment 🚀             ║
╚════════════════════════════════════════════════════════════╝

[INFO] Deployment started at 2025-11-03 10:30:00
...
[✓] Code pulled successfully
[✓] PHP dependencies installed
[✓] Node dependencies installed
[✓] Frontend assets built successfully
[✓] Config cleared
[✓] Image symlink created
...
✨ Deployment Completed Successfully!
```

## Usage

### Manual Deployment

```bash
ssh -p 2223 seej2596@seeoftunsoed.com
cd ~/sis/seeois
bash deploy.sh
```

### Automated Deployment via GitHub

1. **Push ke main branch**:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Monitor deployment**:
   - Go to: https://github.com/kendikadimas/seeois/actions
   - Click latest workflow run
   - Watch real-time deployment progress

3. **Manual trigger** (optional):
   - Actions tab → Deploy to Production → Run workflow

### Scheduled Deployment (Cron)

Optional - untuk backup/maintenance setiap hari:

```bash
# Edit crontab
crontab -e

# Add (run every day at 2 AM)
0 2 * * * cd ~/sis/seeois && bash deploy.sh >> ~/deploy.log 2>&1
```

## What Deploy Script Does

1. ✅ Pull latest code from GitHub
2. ✅ Install PHP dependencies (Composer)
3. ✅ Install Node dependencies (npm)
4. ✅ Build frontend assets (npm run build)
5. ✅ Clear Laravel cache & config
6. ✅ Create/recreate image symlink
7. ✅ Run database migrations
8. ✅ Verify deployment success

## Deployment Log

View logs:

```bash
# See deployment log
tail -f ~/sis/seeois/deploy.log

# Or view from GitHub Actions
# https://github.com/kendikadimas/seeois/actions
```

## Image Path Setup

Script automatically creates symlink:
```
~/public_html/images → ~/sis/seeois/public/images
```

Images now accessible at:
```
https://seeoftunsoed.com/images/compro/logo.png
https://seeoftunsoed.com/images/apps/logo.png
```

## Troubleshooting

### Deployment fails - Permission denied

```bash
# Fix symlink permissions
chmod 755 ~/public_html/images
chmod -R 755 ~/sis/seeois/public/images
```

### Images still 404

```bash
# Verify symlink
ls -la ~/public_html/images

# Check if points to correct directory
readlink ~/public_html/images
# Should show: /home/seej2596/sis/seeois/public/images
```

### GitHub Actions fails - SSH connection error

```bash
# Verify authorized_keys
cat ~/.ssh/authorized_keys | grep github

# If empty, add again
cat ~/.ssh/github_deploy_key.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Database migration errors

```bash
# Run manually
cd ~/sis/seeois
php artisan migrate --force

# Or rollback
php artisan migrate:rollback
```

## Rollback Plan

If deployment breaks production:

```bash
# SSH to server
ssh -p 2223 seej2596@seeoftunsoed.com

# Go to project
cd ~/sis/seeois

# Revert to previous commit
git revert HEAD
git push origin main

# Then deploy again
bash deploy.sh
```

## Performance Tips

- Deployment typically takes 2-5 minutes
- First deployment slower (installing dependencies)
- Subsequent deployments faster (incremental updates)
- Monitor GitHub Actions log for real-time progress

## Security

- SSH key only has access to deployment directory
- GitHub Secrets encrypted at rest
- Deploy workflow logs don't show sensitive data
- Private key never exposed in code or logs

## Support

For issues:
1. Check deploy.log: `tail -f ~/sis/seeois/deploy.log`
2. Check GitHub Actions: https://github.com/kendikadimas/seeois/actions
3. SSH and run manually: `bash ~/sis/seeois/deploy.sh`

---

**Last Updated:** November 3, 2025
