import os
import glob
import re

public_dir = "public"
html_files = glob.glob(os.path.join(public_dir, "*.html"))

for filepath in html_files:
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        encoding = "utf-8"
    except UnicodeDecodeError:
        with open(filepath, "r", encoding="windows-1252") as f:
            content = f.read()
        encoding = "windows-1252"

    if 'id="nas-modal-overlay"' not in content:
        continue

    content = content.replace("Let\\'s Talk", "Let's Talk")

    with open(filepath, "w", encoding=encoding) as f:
        f.write(content)

print("Backslashes fixed.")
