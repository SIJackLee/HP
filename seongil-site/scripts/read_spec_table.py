# -*- coding: utf-8 -*-
"""제품_재원표.xlsx 항목 추출"""
import os
import sys
from pathlib import Path

DESKTOP = Path(os.environ.get("USERPROFILE", "")) / "OneDrive" / "Desktop"
if not DESKTOP.exists():
    DESKTOP = Path(os.environ.get("USERPROFILE", "")) / "Desktop"
XLSX = DESKTOP / "제품_재원표.xlsx"

def main():
    try:
        import openpyxl
    except ImportError:
        print("openpyxl 필요: pip install openpyxl")
        sys.exit(1)
    if not XLSX.exists():
        print(f"파일 없음: {XLSX}")
        sys.exit(1)
    wb = openpyxl.load_workbook(str(XLSX), read_only=True, data_only=True)
    lines = []
    for sheet in wb.worksheets:
        lines.append(f"\n=== 시트: {sheet.title} ===")
        rows = list(sheet.iter_rows(values_only=True))
        for i, row in enumerate(rows):
            cells = [str(c) if c is not None else "" for c in row]
            if any(cells):
                lines.append("\t".join(cells))
    wb.close()
    out = Path(__file__).parent / "spec_table_items.txt"
    with open(out, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print("Done. Saved to spec_table_items.txt")

if __name__ == "__main__":
    main()
