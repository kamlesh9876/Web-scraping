const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Function to calculate file hash
function getFileHash(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
  } catch (error) {
    return null;
  }
}

// Function to get all files recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  try {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip certain directories
        if (file === 'node_modules' || file === '.git' || file === '.next' || file === 'dist') {
          return;
        }
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      } else {
        arrayOfFiles.push(fullPath);
      }
    });
  } catch (error) {
    // Skip directories we can't read
  }

  return arrayOfFiles;
}

// Function to find duplicate files
function findDuplicates() {
  log('\n🔍 Scanning for duplicate files...\n', 'cyan');
  log('=' .repeat(50), 'cyan');

  const allFiles = getAllFiles('.');
  const fileHashes = new Map();
  const duplicates = new Map();

  // Calculate hashes and find duplicates
  allFiles.forEach(filePath => {
    const hash = getFileHash(filePath);
    if (hash) {
      if (fileHashes.has(hash)) {
        // Found duplicate
        if (!duplicates.has(hash)) {
          duplicates.set(hash, [fileHashes.get(hash)]);
        }
        duplicates.get(hash).push(filePath);
      } else {
        fileHashes.set(hash, filePath);
      }
    }
  });

  // Display results
  let totalDuplicates = 0;
  let totalSizeSaved = 0;

  if (duplicates.size === 0) {
    logSuccess('No duplicate files found!');
    return;
  }

  logInfo(`Found ${duplicates.size} groups of duplicate files:\n`);

  let duplicateIndex = 1;
  for (const [hash, files] of duplicates) {
    if (files.length > 1) {
      log(`${duplicateIndex}. Duplicate Group (${files.length} files):`, 'magenta');
      
      // Show all files in this duplicate group
      files.forEach((filePath, index) => {
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        const relativePath = path.relative('.', filePath);
        
        if (index === 0) {
          log(`   📁 Keep: ${relativePath} (${sizeKB} KB)`, 'green');
        } else {
          log(`   🗑️  Remove: ${relativePath} (${sizeKB} KB)`, 'red');
          totalSizeSaved += stats.size;
          totalDuplicates++;
        }
      });
      
      log('');
      duplicateIndex++;
    }
  }

  // Summary
  log('📊 Duplicate Summary\n', 'cyan');
  log('=' .repeat(50), 'cyan');
  logSuccess(`Total duplicate files to remove: ${totalDuplicates}`);
  logSuccess(`Total space to save: ${(totalSizeSaved / 1024 / 1024).toFixed(2)} MB`);
  
  return { duplicates, totalDuplicates, totalSizeSaved };
}

// Function to remove duplicate files
function removeDuplicates(duplicates) {
  log('\n🗑️  Removing duplicate files...\n', 'cyan');
  log('=' .repeat(50), 'cyan');

  let removedCount = 0;
  let totalSizeSaved = 0;

  for (const [hash, files] of duplicates) {
    // Keep the first file, remove the rest
    for (let i = 1; i < files.length; i++) {
      try {
        const filePath = files[i];
        const stats = fs.statSync(filePath);
        const relativePath = path.relative('.', filePath);
        
        fs.unlinkSync(filePath);
        logSuccess(`Removed: ${relativePath} (${(stats.size / 1024).toFixed(2)} KB)`);
        
        removedCount++;
        totalSizeSaved += stats.size;
      } catch (error) {
        logError(`Failed to remove ${files[i]}: ${error.message}`);
      }
    }
  }

  log('\n📊 Cleanup Summary\n', 'cyan');
  log('=' .repeat(50), 'cyan');
  logSuccess(`Files removed: ${removedCount}`);
  logSuccess(`Space saved: ${(totalSizeSaved / 1024 / 1024).toFixed(2)} MB`);
  logSuccess(`Duplicate cleanup completed!`);
}

// Function to find duplicate file names (different content, same name)
function findDuplicateNames() {
  log('\n🔍 Scanning for duplicate file names...\n', 'cyan');
  log('=' .repeat(50), 'cyan');

  const allFiles = getAllFiles('.');
  const fileNames = new Map();
  const nameDuplicates = new Map();

  allFiles.forEach(filePath => {
    const fileName = path.basename(filePath);
    const relativePath = path.relative('.', filePath);
    
    if (fileNames.has(fileName)) {
      if (!nameDuplicates.has(fileName)) {
        nameDuplicates.set(fileName, [fileNames.get(fileName)]);
      }
      nameDuplicates.get(fileName).push(relativePath);
    } else {
      fileNames.set(fileName, relativePath);
    }
  });

  if (nameDuplicates.size === 0) {
    logSuccess('No duplicate file names found!');
    return;
  }

  logInfo(`Found ${nameDuplicates.size} files with duplicate names:\n`);

  for (const [fileName, files] of nameDuplicates) {
    if (files.length > 1) {
      log(`📁 ${fileName} (${files.length} occurrences):`, 'yellow');
      files.forEach(filePath => {
        log(`   - ${filePath}`, 'blue');
      });
      log('');
    }
  }
}

// Main execution
function main() {
  try {
    // Find content duplicates
    const result = findDuplicates();
    
    // Ask user if they want to remove duplicates
    if (result && result.totalDuplicates > 0) {
      log('\n❓ Would you like to remove the duplicate files? (y/n)\n', 'yellow');
      log('💡 This will keep the first file in each group and remove the rest.\n', 'blue');
      
      // For automation, we'll proceed with removal
      // In interactive mode, you'd wait for user input
      log('🤖 Auto-proceeding with duplicate removal...\n', 'cyan');
      
      setTimeout(() => {
        removeDuplicates(result.duplicates);
        
        // Find duplicate names
        findDuplicateNames();
        
        log('\n🎉 Duplicate cleanup completed!\n', 'green');
        log('💡 Run "git add . && git commit -m \"Remove duplicate files\"" to commit changes\n', 'blue');
      }, 2000);
    } else {
      // Still check for duplicate names
      findDuplicateNames();
    }
    
  } catch (error) {
    logError(`Error during duplicate scan: ${error.message}`);
    process.exit(1);
  }
}

// Handle process interruption
process.on('SIGINT', () => {
  log('\n\n🛑 Duplicate scan interrupted by user\n', 'yellow');
  process.exit(0);
});

// Run the script
main();
