## merge-translation.instruction.md

### Purpose

This instruction describes how an AI agent should append or merge new translation entries into the i18n JSON files: `mock-common-id.json`, `mock-common-en.json`, and `mock-common-cn.json` in the `public/` directory.

### Input Format

The input will be a set of translation key-value pairs for each language, provided in JSON format, e.g.:

```json
// public/mock-common-id.json
{
  "FleetAssignedNotificationModal.title": "Armada Baru Telah Ditugaskan",
  "FleetAssignedNotificationModal.description": "Armada pengganti telah berhasil ditugaskan untuk pesanan <b>{orderId}</b> demi memastikan pelaksanaan pesanan yang lebih maksimal.",
  "FleetAssignedNotificationModal.button.confirm": "Mengerti"
}

// public/mock-common-en.json
{
  "FleetAssignedNotificationModal.title": "New Fleet Assigned",
  "FleetAssignedNotificationModal.description": "A replacement fleet has been successfully assigned for order <b>{orderId}</b> to ensure better order execution.",
  "FleetAssignedNotificationModal.button.confirm": "Understood"
}

// public/mock-common-cn.json
{
  "FleetAssignedNotificationModal.title": "新车队已分配",
  "FleetAssignedNotificationModal.description": "已成功为订单 <b>{orderId}</b> 分配了替换车队，以确保更好的订单执行。",
  "FleetAssignedNotificationModal.button.confirm": "明白了"
}
```

### Single Language Input Format

In some cases, you may receive translations for only one language (typically Indonesian). In such cases:

1. **Translate to Other Languages**: First translate the provided text to the other two languages:
   - If Indonesian is provided, translate to English and Chinese
   - If English is provided, translate to Indonesian and Chinese
   - If Chinese is provided, translate to Indonesian and English

2. **Then Merge**: Once you have translations for all three languages, proceed with the standard merging process

Example:

```json
// Input (Indonesian only)
{
  "UploadProofModal.message.physicalProofRequired": "(Perlu Kirim Bukti Fisik)",
  "UploadProofModal.message.physicalProofSent": "(Sudah Kirim Bukti Fisik)"
}

// After translation to English and Chinese:
// English
{
  "UploadProofModal.message.physicalProofRequired": "(Physical Proof Required)",
  "UploadProofModal.message.physicalProofSent": "(Physical Proof Sent)"
}

// Chinese
{
  "UploadProofModal.message.physicalProofRequired": "(需要发送物理证明)",
  "UploadProofModal.message.physicalProofSent": "(已发送物理证明)"
}
```

### Agent Instructions

**IMPORTANT**: You must modify the actual translation files (`public/mock-common-id.json`, `public/mock-common-en.json`, `public/mock-common-cn.json`), NOT this instruction document itself.

#### Recommended Method: Using JavaScript (Most Efficient)

The most efficient way to merge translations is by using a JavaScript script that can process all language files at once. This method requires creating only one temporary script file and handles all merging operations in a single execution.

1. **Create a JavaScript Merge Script**
   - Create a temporary JavaScript file named exactly `merge-translations.js` with the following content:

   ```javascript
   import fs from "fs";
   import path from "path";
   import { fileURLToPath } from "url";

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);

   // New translations to be added/updated
   const newTranslations = {
     "mock-common-id.json": {
       // Indonesian translations go here
     },
     "mock-common-en.json": {
       // English translations go here
     },
     "mock-common-cn.json": {
       // Chinese translations go here
     },
   };

   // Function to merge translations
   function mergeTranslations(filePath, newTranslations) {
     try {
       // Read the existing file
       const data = fs.readFileSync(filePath, "utf8");
       const existingTranslations = JSON.parse(data);

       // Merge new translations
       const mergedTranslations = {
         ...existingTranslations,
         ...newTranslations,
       };

       // Write back to file with proper formatting
       fs.writeFileSync(
         filePath,
         JSON.stringify(mergedTranslations, null, 2) + "\n",
         "utf8"
       );

       console.log(`Successfully merged translations into ${filePath}`);
     } catch (error) {
       console.error(`Error merging translations into ${filePath}:`, error);
     }
   }

   // Process each file
   Object.keys(newTranslations).forEach((fileName) => {
     const filePath = path.join(__dirname, "public", fileName);
     mergeTranslations(filePath, newTranslations[fileName]);
   });

   console.log("Translation merging completed!");
   ```

2. **Populate the Script with Translations**
   - Replace the placeholder comments in the `newTranslations` object with the actual translation key-value pairs for each language.

3. **Execute the Script**
   - Run the script using Node.js:
     ```bash
     node merge-translations.js
     ```

4. **Clean Up**
   - Remove the temporary script file after merging:
     ```bash
     rm merge-translations.js
     ```

#### Alternative Method: Using jq

If JavaScript is not available, you can use `jq` as an alternative, though it's less efficient:

1. **Check jq Availability**
   - Verify that `jq` is installed on the system: `which jq`
   - If not available, install it using the system's package manager.

2. **Create Temporary Translation Files**
   - For each language, create a temporary JSON file containing only the new translations:
     - `new-id.json` for Indonesian
     - `new-en.json` for English
     - `new-cn.json` for Chinese

3. **Merge Using jq**
   - Use the following command structure for each language file:
     ```bash
     jq -s '.[0] * .[1]' public/mock-common-id.json new-id.json > temp.json && mv temp.json public/mock-common-id.json
     ```
   - Repeat for each language file, replacing the file names accordingly.

4. **Clean Up**
   - Remove the temporary files after merging:
     ```bash
     rm new-id.json new-en.json new-cn.json
     ```

#### Manual Method (Alternative)

If `jq` is not available, you can use the following manual approach:

1. **Locate the Target Files**
   - The files are: `public/mock-common-id.json`, `public/mock-common-en.json`, and `public/mock-common-cn.json`.
   - **DO NOT** modify this instruction file or add examples to it.

2. **Parse the Input**
   - For each language, extract the key-value pairs to be merged.

3. **Merge Logic**
   - For each key-value pair in the input:
     - If the key does **not** exist in the target file, **append** it to the end of the JSON file.
     - If the key **already exists**, **overwrite** its value with the new one.
   - Preserve the existing structure and formatting of the JSON file (pretty-printed, 2-space indentation).
   - Ensure the file remains valid JSON after the operation.

4. **HTML and Placeholders**
   - Do **not** escape HTML tags (e.g., `<strong>`) or template placeholders (e.g., `{{orderId}}`).
   - Insert them as-is in the value string.

5. **Order**
   - Append new keys to the end of the JSON file, just before the closing brace `}`.
   - The order of keys in the file does not matter, but try to keep new keys grouped if possible.

6. **File Modification Process**
   - Read the end of each target JSON file to understand the current structure.
   - Add the new translation keys by modifying the last entry to include a comma, then adding the new entries.
   - Ensure proper JSON formatting with correct indentation.

7. **Validation**
   - After merging, ensure the resulting file is valid JSON.
   - **Never modify this instruction document** - only modify the actual translation files.

### Example

#### Using JavaScript (Recommended)

Given the input translations:

```json
// Indonesian
{
  "ModalTindakLanjutModeManual.title": "Tindak Lanjut Mode Manual",
  "ModalTindakLanjutModeManual.label.followUpResult": "Hasil Tindak Lanjut*"
}

// English
{
  "ModalTindakLanjutModeManual.title": "Manual Mode Follow-Up",
  "ModalTindakLanjutModeManual.label.followUpResult": "Follow-Up Result*"
}

// Chinese
{
  "ModalTindakLanjutModeManual.title": "手动模式跟进",
  "ModalTindakLanjutModeManual.label.followUpResult": "跟进结果*"
}
```

Create a file named exactly `merge-translations.js` with the following content:

```javascript
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// New translations to be added/updated
const newTranslations = {
  "mock-common-id.json": {
    "ModalTindakLanjutModeManual.title": "Tindak Lanjut Mode Manual",
    "ModalTindakLanjutModeManual.label.followUpResult": "Hasil Tindak Lanjut*",
  },
  "mock-common-en.json": {
    "ModalTindakLanjutModeManual.title": "Manual Mode Follow-Up",
    "ModalTindakLanjutModeManual.label.followUpResult": "Follow-Up Result*",
  },
  "mock-common-cn.json": {
    "ModalTindakLanjutModeManual.title": "手动模式跟进",
    "ModalTindakLanjutModeManual.label.followUpResult": "跟进结果*",
  },
};

// Function to merge translations
function mergeTranslations(filePath, newTranslations) {
  try {
    // Read the existing file
    const data = fs.readFileSync(filePath, "utf8");
    const existingTranslations = JSON.parse(data);

    // Merge new translations
    const mergedTranslations = { ...existingTranslations, ...newTranslations };

    // Write back to file with proper formatting
    fs.writeFileSync(
      filePath,
      JSON.stringify(mergedTranslations, null, 2) + "\n",
      "utf8"
    );

    console.log(`Successfully merged translations into ${filePath}`);
  } catch (error) {
    console.error(`Error merging translations into ${filePath}:`, error);
  }
}

// Process each file
Object.keys(newTranslations).forEach((fileName) => {
  const filePath = path.join(__dirname, "public", fileName);
  mergeTranslations(filePath, newTranslations[fileName]);
});

console.log("Translation merging completed!");
```

#### Single Language Input Example

When only Indonesian translations are provided:

```json
// Input (Indonesian only)
{
  "UploadProofModal.message.physicalProofRequired": "(Perlu Kirim Bukti Fisik)",
  "UploadProofModal.message.physicalProofSent": "(Sudah Kirim Bukti Fisik)"
}
```

First translate to English and Chinese, then create the merge script (always named `merge-translations.js`):

```javascript
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// New translations to be added/updated
const newTranslations = {
  "mock-common-id.json": {
    "UploadProofModal.message.physicalProofRequired":
      "(Perlu Kirim Bukti Fisik)",
    "UploadProofModal.message.physicalProofSent": "(Sudah Kirim Bukti Fisik)",
  },
  "mock-common-en.json": {
    "UploadProofModal.message.physicalProofRequired":
      "(Physical Proof Required)",
    "UploadProofModal.message.physicalProofSent": "(Physical Proof Sent)",
  },
  "mock-common-cn.json": {
    "UploadProofModal.message.physicalProofRequired": "(需要发送物理证明)",
    "UploadProofModal.message.physicalProofSent": "(已发送物理证明)",
  },
};

// Function to merge translations
function mergeTranslations(filePath, newTranslations) {
  try {
    // Read the existing file
    const data = fs.readFileSync(filePath, "utf8");
    const existingTranslations = JSON.parse(data);

    // Merge new translations
    const mergedTranslations = { ...existingTranslations, ...newTranslations };

    // Write back to file with proper formatting
    fs.writeFileSync(
      filePath,
      JSON.stringify(mergedTranslations, null, 2) + "\n",
      "utf8"
    );

    console.log(`Successfully merged translations into ${filePath}`);
  } catch (error) {
    console.error(`Error merging translations into ${filePath}:`, error);
  }
}

// Process each file
Object.keys(newTranslations).forEach((fileName) => {
  const filePath = path.join(__dirname, "public", fileName);
  mergeTranslations(filePath, newTranslations[fileName]);
});

console.log("Translation merging completed!");
```

Execute the script:

```bash
node merge-translations.js
```

Clean up:

```bash
rm merge-translations.js
```

#### Using jq (Alternative)

Given the input translations:

```json
// new-id.json
{
  "ModalTindakLanjutModeManual.title": "Tindak Lanjut Mode Manual",
  "ModalTindakLanjutModeManual.label.followUpResult": "Hasil Tindak Lanjut*"
}

// new-en.json
{
  "ModalTindakLanjutModeManual.title": "Manual Mode Follow-Up",
  "ModalTindakLanjutModeManual.label.followUpResult": "Follow-Up Result*"
}

// new-cn.json
{
  "ModalTindakLanjutModeManual.title": "手动模式跟进",
  "ModalTindakLanjutModeManual.label.followUpResult": "跟进结果*"
}
```

Execute the following commands:

```bash
# Merge Indonesian translations
jq -s '.[0] * .[1]' public/mock-common-id.json new-id.json > temp.json && mv temp.json public/mock-common-id.json

# Merge English translations
jq -s '.[0] * .[1]' public/mock-common-en.json new-en.json > temp.json && mv temp.json public/mock-common-en.json

# Merge Chinese translations
jq -s '.[0] * .[1]' public/mock-common-cn.json new-cn.json > temp.json && mv temp.json public/mock-common-cn.json

# Clean up temporary files
rm new-id.json new-en.json new-cn.json
```

#### Manual Method

Given the input above, after merging, the three files should contain the new keys and values, with any existing values for those keys replaced.

---

**Summary:**

- Use JavaScript for efficient and reliable translation merging (recommended).
- As an alternative, use `jq` if JavaScript is not available.
- As a last resort, use the manual method if neither JavaScript nor `jq` are available.
- When only one language is provided, first translate it to the other two languages before merging.
- Append or overwrite translation keys in the three i18n files as specified.
- Do not escape HTML or placeholders.
- Maintain valid, pretty-printed JSON.
