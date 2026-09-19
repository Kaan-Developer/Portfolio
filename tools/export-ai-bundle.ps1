<#
.SYNOPSIS
    Projenin tamamını Claude'a tek dosyada verebilmek için AI bağlam paketi üretir.

.DESCRIPTION
    - Kaynak kodu, dokümanları ve konfigürasyonu tek bir Markdown dosyasında toplar.
    - Claude prompt'unu (docs/ai/claude-prompt.md) paketin en başına yerleştirir;
      böylece tek dosya tek başına yeterli olur.
    - Gizli bilgileri (API anahtarı, JWT) otomatik maskeler; .env asla dahil edilmez.
    - Paylaşılabilir bir ZIP arşivi ve kısa bir kullanım notu üretir.

.PARAMETER OutDir
    Çıktı klasörü (depo köküne göre). Varsayılan: share

.PARAMETER BundleName
    Üretilecek dosyaların temel adı. Varsayılan: Portfolio-AI-Bundle

.PARAMETER IncludeLockfile
    pnpm-lock.yaml dosyasını da pakete ekler (varsayılan: kapalı; bağlam israfını önler).

.PARAMETER NoOpen
    Bitince Windows Gezgini'ni açmaz.

.EXAMPLE
    powershell -NoProfile -ExecutionPolicy Bypass -File tools\export-ai-bundle.ps1

.EXAMPLE
    powershell -NoProfile -ExecutionPolicy Bypass -File tools\export-ai-bundle.ps1 -IncludeLockfile -NoOpen
#>

[CmdletBinding()]
param(
    [string]$OutDir = "share",
    [string]$BundleName = "Portfolio-AI-Bundle",
    [switch]$IncludeLockfile,
    [switch]$NoOpen
)

$ErrorActionPreference = "Stop"

# ---------------------------------------------------------------
# 0. Depo kökünü bul (script tools/ altında durur)
# ---------------------------------------------------------------

$root = $PSScriptRoot
if (-not $root) {
    $root = Split-Path -Parent $MyInvocation.MyCommand.Path
}
$root = Split-Path -Parent $root

if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "Depo koku bulunamadi: $root"
}

Set-Location -LiteralPath $root

# ---------------------------------------------------------------
# 1. Yardımcı fonksiyonlar
# ---------------------------------------------------------------

# Secret'ları maskeler ve kaç değerin maskelendiğini döner.
function Protect-Secrets {
    param([string]$Text)

    $count = 0

    $rules = @(
        @{ Pattern = '(?i)\b(gsk_[A-Za-z0-9]{8,})'; Replacement = 'gsk_REDACTED' },
        @{ Pattern = '(?i)\b(sk-[A-Za-z0-9_\-]{16,})'; Replacement = 'sk-REDACTED' },
        @{ Pattern = 'eyJ[A-Za-z0-9_\-]{8,}\.[A-Za-z0-9_\-]{8,}\.[A-Za-z0-9_\-]{4,}'; Replacement = 'JWT_REDACTED' },
        @{ Pattern = '(?im)^([ \t]*[A-Z0-9_]*API_KEY[ \t]*=[ \t]*)(\S+)'; Replacement = '${1}REDACTED' },
        @{ Pattern = '(?im)^([ \t]*VITE_SUPABASE_[A-Z0-9_]*[ \t]*=[ \t]*)(\S+)'; Replacement = '${1}REDACTED' }
    )

    foreach ($rule in $rules) {
        $found = [regex]::Matches($Text, $rule.Pattern)
        if ($found.Count -gt 0) {
            $count += $found.Count
            $Text = [regex]::Replace($Text, $rule.Pattern, $rule.Replacement)
        }
    }

    return [pscustomobject]@{
        Text  = $Text
        Count = $count
    }
}

# Dosya uzantısına göre Markdown kod bloğu dilini belirler.
function Get-CodeLanguage {
    param([string]$FileName)

    $extension = [System.IO.Path]::GetExtension($FileName).ToLowerInvariant()

    switch ($extension) {
        ".ts"   { return "ts" }
        ".tsx"  { return "tsx" }
        ".js"   { return "js" }
        ".jsx"  { return "jsx" }
        ".mjs"  { return "mjs" }
        ".json" { return "json" }
        ".css"  { return "css" }
        ".html" { return "html" }
        ".md"   { return "md" }
        ".sql"  { return "sql" }
        ".yaml" { return "yaml" }
        ".yml"  { return "yaml" }
        ".svg"  { return "xml" }
        ".ps1"  { return "powershell" }
        ".cmd"  { return "bat" }
        default { return "text" }
    }
}

# İçerikteki en uzun backtick dizisinden uzun bir kod çiti üretir (iç içe blok güvenliği).
function Get-CodeFence {
    param([string]$Content)

    $longest = 0
    foreach ($match in [regex]::Matches($Content, '`+')) {
        if ($match.Length -gt $longest) {
            $longest = $match.Length
        }
    }

    $size = 3
    if ($longest -ge 3) {
        $size = $longest + 1
    }

    $backtick = [string][char]96
    return $backtick * $size
}

# Git bilgisini güvenli şekilde toplar (repo değilse boş değerlerle döner).
function Get-GitInfo {
    $info = [pscustomobject]@{
        IsRepo  = $false
        Branch  = "-"
        Commit  = "-"
        Subject = "-"
        Dirty   = @()
    }

    try {
        $inside = (& git rev-parse --is-inside-work-tree 2>$null)
        if ($inside -ne "true") {
            return $info
        }

        $info.IsRepo = $true
        $info.Branch = (& git rev-parse --abbrev-ref HEAD 2>$null)
        $info.Commit = (& git rev-parse --short HEAD 2>$null)
        $info.Subject = (& git log -1 --pretty=%s 2>$null)
        $info.Dirty = @(& git status --porcelain 2>$null)
    }
    catch {
        return $info
    }

    return $info
}

# ---------------------------------------------------------------
# 2. Sabitler
# ---------------------------------------------------------------

# Pakete girecek klasörler ve kök dosyalar.
$includeDirectories = @("src", "api", "docs", "public", "supabase")

$includeRootFiles = @(
    "package.json",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    "vite.config.ts",
    "tailwind.config.ts",
    "index.html",
    "README.md",
    "LICENSE",
    ".gitignore",
    ".gitattributes",
    ".oxlintrc.json",
    ".env.example"
)

if ($IncludeLockfile) {
    $includeRootFiles += "pnpm-lock.yaml"
}

# Asla pakete girmemesi gereken yollar (güvenlik ve bağlam temizliği).
$excludedPathParts = @(
    "\node_modules\",
    "\.git\",
    "\.output\",
    "\.pnpm-store\",
    "\.vercel\",
    "\dist\",
    "\share\",
    "\coverage\"
)

# Güvenlik: env dosyaları ve özel anahtarlar her koşulda hariç tutulur.
$excludedFileNames = @(
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test",
    "id_rsa",
    "id_ed25519"
)

# Metin tabanlı olmayan uzantılar pakete girmez.
$binaryExtensions = @(
    ".png", ".jpg", ".jpeg", ".gif", ".ico", ".webp", ".avif", ".bmp",
    ".woff", ".woff2", ".ttf", ".otf", ".eot",
    ".zip", ".gz", ".tar", ".7z", ".rar",
    ".pdf", ".mp4", ".mov", ".mp3", ".wav",
    ".exe", ".dll", ".so", ".dylib", ".db", ".sqlite", ".tsbuildinfo"
)

$maxFileBytes = 400KB
$promptFile = Join-Path $root "docs\ai\claude-prompt.md"

# ---------------------------------------------------------------
# 3. Dosya listesini topla
# ---------------------------------------------------------------

Write-Host ""
Write-Host "==> Claude baglam paketi hazirlaniyor" -ForegroundColor Cyan
Write-Host "    Depo koku : $root"

$collected = New-Object System.Collections.Generic.List[string]

foreach ($directory in $includeDirectories) {
    $path = Join-Path $root $directory
    if (-not (Test-Path -LiteralPath $path)) {
        continue
    }

    Get-ChildItem -LiteralPath $path -Recurse -File -Force | ForEach-Object {
        $full = $_.FullName
        $isExcluded = $false

        foreach ($part in $excludedPathParts) {
            if ($full.IndexOf($part, [System.StringComparison]::OrdinalIgnoreCase) -ge 0) {
                $isExcluded = $true
                break
            }
        }

        if ($excludedFileNames -contains $_.Name) {
            $isExcluded = $true
        }

        if (-not $isExcluded -and $binaryExtensions -notcontains $_.Extension.ToLowerInvariant() -and $_.Length -gt 0) {
            $collected.Add($full)
        }
    }
}

foreach ($name in $includeRootFiles) {
    $path = Join-Path $root $name
    if (Test-Path -LiteralPath $path) {
        $collected.Add((Resolve-Path -LiteralPath $path).Path)
    }
}

# Prompt dosyası paketin başına ayrı bölüm olarak girer; kaynak listesinde tekrar etmesin.
$files = @($collected | Sort-Object -Unique | Where-Object { $_ -ne $promptFile })

if ($files.Count -eq 0) {
    throw "Paketlenecek dosya bulunamadi."
}

Write-Host "    Dosya     : $($files.Count) kaynak dosya" -ForegroundColor Green

# ---------------------------------------------------------------
# 4. Markdown paketini oluştur
# ---------------------------------------------------------------

$git = Get-GitInfo
$generatedAt = Get-Date -Format "yyyy-MM-dd HH:mm"

# Markdown satırlarını listede biriktirip sonda tek seferde yazıyoruz.
$out = New-Object System.Collections.Generic.List[string]

$out.Add('# Kaan Hamitler Portfolio — Claude AI Bağlam Paketi')
$out.Add('')
$out.Add('> Bu dosya `tools/export-ai-bundle.ps1` (kısayol: `pnpm share`) ile otomatik üretildi.')
$out.Add('> Tek dosyada hem Claude prompt''unu hem de projenin güncel kaynak kodunu içerir.')
$out.Add('>')
$out.Add('> **Bağlam önceliği:** En güncel kod bu dosyadadır. GitHub bağlamı veya depo dalı geride olabilir;')
$out.Add('> iki kaynak çelişirse bu dosyayı esas al ve çelişkiyi kullanıcıya bildir.')
$out.Add('')
$out.Add('---')
$out.Add('')
$out.Add('## Paket Künyesi')
$out.Add('')
$out.Add('| Alan | Değer |')
$out.Add('| --- | --- |')
$out.Add('| Üretim zamanı | ' + $generatedAt + ' |')
$out.Add('| Depo | https://github.com/Kaan-Developer/Portfolio |')

if ($git.IsRepo) {
    $out.Add('| Aktif dal | `' + $git.Branch + '` |')
    $out.Add('| Commit | `' + $git.Commit + '` |')
    $out.Add('| Son commit mesajı | ' + $git.Subject + ' |')
}
else {
    $out.Add('| Git bilgisi | Alınamadı (repo değil veya git kurulu değil) |')
}

$dirtyCount = 0
if ($git.Dirty) {
    $dirtyCount = @($git.Dirty | Where-Object { $_ -and $_.Trim() -ne "" }).Count
}

if ($dirtyCount -gt 0) {
    $out.Add('| Çalışma ağacı | ' + $dirtyCount + ' dosya commit edilmemiş (paket çalışma ağacını yansıtır) |')
}
else {
    $out.Add('| Çalışma ağacı | Temiz |')
}

$out.Add('| Paketlenen dosya | ' + $files.Count + ' |')
$out.Add('| Kod çiti dili | Dosya uzantısına göre otomatik |')
$out.Add('')
$out.Add('## İçindekiler')
$out.Add('')
$out.Add('- **Bölüm A — Claude Proje Prompt''u:** Claude''a rolünü, mimari sınırları, konvansiyonları ve görevleri verir. En başta oku.')
$out.Add('- **Bölüm B — Proje Bağlamı:** Paket kapsamı, dosya ağacı ve tüm kaynak dosyaların içeriği.')
$out.Add('- **Bölüm C — Git Durumu:** Değiştirilmiş dosyaların listesi.')
$out.Add('')
$out.Add('---')
$out.Add('')

# --- Bölüm A: Claude prompt'u (paketin en başında yer alır) -----------

$promptText = ""
if (Test-Path -LiteralPath $promptFile) {
    $promptText = [System.IO.File]::ReadAllText($promptFile)
}

$out.Add('# BÖLÜM A — CLAUDE PROJE PROMPT''U')
$out.Add('')

if ($promptText.Trim().Length -gt 0) {
    $out.Add('> Kaynak: `docs/ai/claude-prompt.md` (depoda da güncel olarak durur).')
    $out.Add('')
    $out.Add($promptText.TrimEnd())
}
else {
    $out.Add('> UYARI: `docs/ai/claude-prompt.md` bulunamadı. Bu depoda rol ve kural tanımı eksik olabilir.')
}

$out.Add('')
$out.Add('---')
$out.Add('')

# --- Bölüm B: proje bağlamı ------------------------------------------

$out.Add('# BÖLÜM B — PROJE BAĞLAMI')
$out.Add('')
$out.Add('## B.1 Paket kapsamı')
$out.Add('')
$out.Add('Paketlenen klasörler: ' + (($includeDirectories | ForEach-Object { '`' + $_ + '/`' }) -join ', '))
$out.Add('')
$out.Add('Bilinçli olarak hariç tutulanlar:')
$out.Add('')
$out.Add('- `node_modules/`, `.git/`, `.output/`, `.pnpm-store/`, `dist/`, `.vercel/`, `share/` (bağımlılık ve üretilmiş çıktı)')
$out.Add('- `.env` ve türevleri (gizli anahtar içerir; pakete asla girmez — kullanıcıdan istenmemesi gerekir)')
$out.Add('- İkili dosyalar: görsel, font, arşiv, veritabanı, video uzantıları')
if (-not $IncludeLockfile) {
    $out.Add('- `pnpm-lock.yaml` (bağlam israfını önlemek için dışarıda; `-IncludeLockfile` parametresiyle eklenebilir)')
}
$out.Add('- ' + [math]::Round($maxFileBytes / 1KB) + ' KB üzerindeki dosyalar (ilgili başlıkta not düşülür)')
$out.Add('')
$out.Add('## B.2 Dosya ağacı')
$out.Add('')
$out.Add('```text')
foreach ($file in $files) {
    $out.Add($file.Substring($root.Length + 1).Replace("\", "/"))
}
$out.Add('```')
$out.Add('')
$out.Add('## B.3 Dosya içerikleri')
$out.Add('')
$out.Add('> Yollar depo köküne görelidir. Kod çiti, dosya içeriğine göre otomatik seçilmiştir.')
$out.Add('')

$redactionTotal = 0
$totalChars = 0
$totalLines = 0
$codeFileCount = 0
$skipped = New-Object System.Collections.Generic.List[string]

foreach ($file in $files) {
    $relative = $file.Substring($root.Length + 1).Replace("\", "/")
    $info = Get-Item -LiteralPath $file

    if ($info.Length -gt $maxFileBytes) {
        $skipped.Add($relative)
        $out.Add('### `' + $relative + '`')
        $out.Add('')
        $out.Add('> Atlatıldı: ' + [math]::Round($info.Length / 1KB, 1) + ' KB (sınır ' + [math]::Round($maxFileBytes / 1KB) + ' KB). Gerekirse açıkça isteyin.')
        $out.Add('')
        continue
    }

    $raw = [System.IO.File]::ReadAllText($file)
    $safe = Protect-Secrets -Text $raw
    $redactionTotal += $safe.Count

    $content = $safe.Text.TrimEnd()
    $lineCount = ($content -split "\r?\n").Count

    $totalLines += $lineCount
    $totalChars += $content.Length
    $codeFileCount++

    $fence = Get-CodeFence -Content $content
    $language = Get-CodeLanguage -FileName $file

    $out.Add('### `' + $relative + '`')
    $out.Add('')
    $out.Add('> ' + $lineCount + ' satır · ' + $info.Length + ' bayt')
    $out.Add('')
    $out.Add($fence + $language)
    $out.Add($content)
    $out.Add($fence)
    $out.Add('')
}

# (Bölüm A kod bloğu, Markdown'ta Bölüm B'den önce gelmesi için yukarı taşındı.)

# --- Bölüm C: git durumu ---------------------------------------------

$out.Add('# BÖLÜM C — GIT DURUMU')
$out.Add('')

if ($git.IsRepo) {
    $out.Add('- Aktif dal: `' + $git.Branch + '`')
    $out.Add('- Commit: `' + $git.Commit + '` — ' + $git.Subject)
    $out.Add('')

    if ($dirtyCount -gt 0) {
        $out.Add('### Commit edilmemiş değişiklikler (' + $dirtyCount + ' dosya)')
        $out.Add('')
        $out.Add('```text')
        foreach ($line in $git.Dirty) {
            if ($line -and $line.Trim() -ne "") {
                $out.Add($line.TrimEnd())
            }
        }
        $out.Add('```')
    }
    else {
        $out.Add('Çalışma ağacı temiz; paket son commit ile birebir aynıdır.')
    }
}
else {
    $out.Add('Git deposu bulunamadı; sürüm bilgisi yok.')
}

$out.Add('')
$out.Add('---')
$out.Add('')

# --- Bölüm D: istatistikler -------------------------------------------

$estimatedTokens = [math]::Round($totalChars / 4)

$out.Add('# BÖLÜM D — PAKET İSTATİSTİKLERİ')
$out.Add('')
$out.Add('| Ölçüm | Değer |')
$out.Add('| --- | --- |')
$out.Add('| Paketlenen dosya | ' + $codeFileCount + ' |')
$out.Add('| Toplam satır | ' + $totalLines + ' |')
$out.Add('| Toplam karakter | ' + $totalChars + ' |')
$out.Add('| Tahmini token | ~' + $estimatedTokens + ' (kaba tahmin: karakter / 4) |')
$out.Add('| Maskelenen gizli değer | ' + $redactionTotal + ' |')
if ($skipped.Count -gt 0) {
    $out.Add('| Atlanan büyük dosya | ' + $skipped.Count + ' (' + ($skipped -join ', ') + ') |')
}
$out.Add('| Prompt dosyası | ' + $(if ($promptText.Trim().Length -gt 0) { 'dahil edildi (Bölüm A)' } else { 'BULUNAMADI' }) + ' |')
$out.Add('')
$out.Add('> Not: Paket, üretildiği andaki çalışma ağacını yansıtır. Kod ile doküman çelişirse kod geçerlidir.')

# ---------------------------------------------------------------
# 5. Dosyaları yaz
# ---------------------------------------------------------------

$absoluteOutDir = Join-Path $root $OutDir

if (-not (Test-Path -LiteralPath $absoluteOutDir)) {
    New-Item -ItemType Directory -Path $absoluteOutDir -Force | Out-Null
}

$bundlePath = Join-Path $absoluteOutDir ($BundleName + ".md")
$notePath = Join-Path $absoluteOutDir "NASIL-KULLANILIR.md"
$zipPath = Join-Path $absoluteOutDir ($BundleName + "-" + (Get-Date -Format "yyyy-MM-dd") + ".zip")

# UTF-8 BOM: Türkçe karakterlerin Not Defteri/VS Code ve tarayıcıda bozulmaması için.
$utf8Bom = New-Object System.Text.UTF8Encoding($true)

$bundleText = $out -join "`r`n"
[System.IO.File]::WriteAllText($bundlePath, $bundleText, $utf8Bom)

$noteText = @"
# Claude'a nasıl gönderilir

1. Bu klasördeki `$BundleName.md` dosyasını aç (VS Code veya Not Defteri).
2. İçeriğin tamamını kopyala (Ctrl+A, Ctrl+C).
3. Claude sohbetini aç, mesaj kutusuna yapıştır (Ctrl+V).
   - Dosya çok büyükse kopyalamak yerine `$BundleName.md` dosyasını ek olarak yükle.
4. Mesajın en sonuna şunu ekle:

   Rollerini ve proje kurallarını paketin başındaki "BÖLÜM A" bölümünden alıyorsun.
   Görev: Bölüm 9.0 — Varsayılan görev.
   Çıktı: Teknik Durum Raporu + Riskli Noktalar (öncelik sıralı) + Sonraki 5 Adım (S/M/L eforlu).
   Bağlam önceliği: En güncel kod bu pakettedir; GitHub/depo bağlamı geride olabilir, çelişkide paketi esas al.

5. Belirli bir iş için görev numarasını değiştir (örnek: `Bölüm 9.1 — #2 İletişim formunu tamamla`).

## Notlar

- `.env` dosyası ve gizli anahtarlar bu pakete **dahil edilmez**; tespit edilen anahtarlar `REDACTED` ile maskelenir.
- Paket, üretim anındaki çalışma ağacını (commit edilmemiş değişiklikler dahil) yansıtır.
- Yeniden üretmek için: `pnpm share` veya `powershell -NoProfile -ExecutionPolicy Bypass -File tools\export-ai-bundle.ps1`

Üretim zamanı: $(Get-Date -Format "yyyy-MM-dd HH:mm") · Paketlenen dosya: $codeFileCount
"@

[System.IO.File]::WriteAllText($notePath, $noteText, $utf8Bom)

if (Test-Path -LiteralPath $zipPath) {
    Remove-Item -LiteralPath $zipPath -Force
}

Compress-Archive -LiteralPath @($bundlePath, $notePath) -DestinationPath $zipPath -CompressionLevel Optimal -Force

# ---------------------------------------------------------------
# 6. Konsol özeti
# ---------------------------------------------------------------

$bundleSizeKb = [math]::Round((Get-Item -LiteralPath $bundlePath).Length / 1KB, 1)
$zipSizeKb = [math]::Round((Get-Item -LiteralPath $zipPath).Length / 1KB, 1)

Write-Host ""
Write-Host "==> Paket hazir" -ForegroundColor Green
Write-Host ""
Write-Host ("    Dosya      : " + $codeFileCount) -ForegroundColor Gray
Write-Host ("    Satir      : " + $totalLines) -ForegroundColor Gray
Write-Host ("    Tahmini    : ~" + $estimatedTokens + " token") -ForegroundColor Gray

if ($redactionTotal -gt 0) {
    Write-Host ("    Maskeleme : " + $redactionTotal + " gizli deger gizlendi") -ForegroundColor Yellow
}
else {
    Write-Host "    Maskeleme : gizli deger bulunmadi" -ForegroundColor Gray
}

if ($promptText.Trim().Length -eq 0) {
    Write-Host "    UYARI     : docs/ai/claude-prompt.md bulunamadi" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "    Markdown   : $bundlePath  ($bundleSizeKb KB)" -ForegroundColor Cyan
Write-Host "    Kullanim   : $notePath" -ForegroundColor Cyan
Write-Host "    Arsiv      : $zipPath  ($zipSizeKb KB)" -ForegroundColor Cyan
Write-Host ""
Write-Host "    Sir kontrolu: .env dahil edilmedi, anahtarlar maskelendi." -ForegroundColor Green
Write-Host "    Sonraki adim: markdown dosyasini Claude'a ekleyin." -ForegroundColor Green
Write-Host ""

if (-not $NoOpen) {
    try {
        Set-Clipboard -Value $bundlePath
        Write-Host "    Dosya yolu panoya kopyalandi." -ForegroundColor Green
    }
    catch {
        Write-Host "    Pano kopyalanamadi (sorun degil)." -ForegroundColor DarkGray
    }

    Start-Process explorer.exe -ArgumentList "/select,`"$bundlePath`""
}