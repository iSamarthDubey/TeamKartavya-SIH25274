Write-Host "Starting Krishi Hedge Ecosystem..." -ForegroundColor Green

# Start PWA (App) on Port 3000
Write-Host "Launching PWA..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "pnpm --filter @app/pwa dev"

# Start Web (Landing Page) on Port 3001
Write-Host "Launching Landing Page..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "pnpm --filter @app/web dev"

# Start Admin Web on Port 3002
Write-Host "Launching Admin Dashboard..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "pnpm --filter @app/admin-web dev"

Write-Host "All apps launched in separate windows!" -ForegroundColor Green
