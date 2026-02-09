# -*- coding: utf-8 -*-
"""
제품_재원표.xlsx → specs.js (dict 내장용)
window.SPEC_DATA = { ... }; 형식으로 출력하여 홈페이지에 스크립트로 포함.
"""
import json
import os
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DESKTOP = Path(os.environ.get("USERPROFILE", "")) / "OneDrive" / "Desktop"
if not DESKTOP.exists():
    DESKTOP = Path(os.environ.get("USERPROFILE", "")) / "Desktop"
XLSX_PATH = DESKTOP / "제품_재원표.xlsx"
OUT_JS = PROJECT_ROOT / "assets" / "data" / "specs.js"

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
        return
    if not XLSX_PATH.exists():
        print("파일 없음:", XLSX_PATH)
        return
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
    OUT_JS.parent.mkdir(parents=True, exist_ok=True)
    json_str = json.dumps(out, ensure_ascii=False, indent=2)
    with open(OUT_JS, "w", encoding="utf-8") as f:
        f.write("/* 제품_재원표.xlsx → dict (내장용). 재원표 수정 후 이 스크립트 재실행. */\n")
        f.write("window.SPEC_DATA = ")
        f.write(json_str)
        f.write(";\n")
    print("Written:", OUT_JS)


if __name__ == "__main__":
    run()
