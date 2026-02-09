# -*- coding: utf-8 -*-
"""
제품_재원표.xlsx → specs.json 변환
표시 가능 컬럼만 사용 (요구사항 문서와 동일)
"""
import json
import os
import sys
from pathlib import Path

# 프로젝트 루트 = scripts의 상위
PROJECT_ROOT = Path(__file__).resolve().parents[1]
DESKTOP = Path(os.environ.get("USERPROFILE", "")) / "OneDrive" / "Desktop"
if not DESKTOP.exists():
    DESKTOP = Path(os.environ.get("USERPROFILE", "")) / "Desktop"
XLSX_PATH = DESKTOP / "제품_재원표.xlsx"
OUT_PATH = PROJECT_ROOT / "assets" / "data" / "specs.json"

# 시트명 → JSON 키 매핑 (표시 가능 컬럼만 사용)
SHEET_MAP = {
    "SLB_Motor_Specs": "slbMotorSpecs",
    "SLB960_Dim": "slb960Dim",
    "SLF_1P_220V_60Hz": "slf1P220V60Hz",
    "SLF_3P_220_380V_60Hz": "slf3P220380V60Hz",
    "SLF_A_Dimensions": "slfADimensions",
    "SLF_D_Dimensions": "slfDDimensions",
    "Controllers": "controllers",
    "Hood_Sizes": "hoodSizes",
    "Shutter_Sizes": "shutterSizes",
    "Inlet_Summary": "inletSummary",
}


def row_to_obj(headers, row):
    return {h: ("" if v is None else str(v).strip()) for h, v in zip(headers, row)}


def run():
    try:
        import openpyxl
    except ImportError:
        print("pip install openpyxl")
        sys.exit(1)
    if not XLSX_PATH.exists():
        print(f"파일 없음: {XLSX_PATH}")
        sys.exit(1)
    wb = openpyxl.load_workbook(str(XLSX_PATH), read_only=True, data_only=True)
    out = {}
    for sheet in wb.worksheets:
        key = SHEET_MAP.get(sheet.title)
        if not key:
            continue
        rows = list(sheet.iter_rows(values_only=True))
        if not rows:
            out[key] = []
            continue
        headers = [str(c).strip() if c is not None else "" for c in rows[0]]
        out[key] = [row_to_obj(headers, row) for row in rows[1:] if any(c is not None for c in row)]
    wb.close()
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("Written:", OUT_PATH)


if __name__ == "__main__":
    run()
