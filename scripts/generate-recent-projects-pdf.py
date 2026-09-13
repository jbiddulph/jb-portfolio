#!/usr/bin/env python3
"""Generate the public projects PDF from data/projectDocs.json.

Public documentation only. Never include admin-only portfolio fields
(domains, hosting, database_info, passwords, private repos, etc.).
"""

from __future__ import annotations

import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
DOCS_PATH = ROOT / "data" / "projectDocs.json"
OUTPUT = ROOT / "public" / "john-biddulph-recent-projects-2026.pdf"

# First 27 entries are featured products; remaining items are appendix experiments.
FEATURED_COUNT = 27

INK = colors.HexColor("#111827")
MUTED = colors.HexColor("#4b5563")
ACCENT = colors.HexColor("#1d4ed8")
RULE = colors.HexColor("#d1d5db")

FORBIDDEN_KEYS = {
    "domains",
    "subdomains",
    "hosting",
    "database_info",
    "ssl",
    "github_repo",
    "passwords",
    "apis_used",
    "documentation",
    "other_info",
}


def load_docs() -> list[dict]:
    docs = json.loads(DOCS_PATH.read_text())
    for doc in docs:
        overlap = FORBIDDEN_KEYS & set(doc)
        if overlap:
            raise SystemExit(f"Admin fields are not allowed ({doc.get('name')}: {overlap})")
    return docs


def make_styles():
    base = getSampleStyleSheet()
    return {
        "cover_kicker": ParagraphStyle(
            "cover_kicker", parent=base["Normal"], fontName="Times-Bold", fontSize=11,
            textColor=ACCENT, alignment=TA_CENTER, spaceAfter=8,
        ),
        "cover_title": ParagraphStyle(
            "cover_title", parent=base["Normal"], fontName="Times-Bold", fontSize=32,
            leading=38, textColor=INK, alignment=TA_CENTER, spaceAfter=12,
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub", parent=base["Normal"], fontName="Times-Roman", fontSize=13,
            leading=18, textColor=MUTED, alignment=TA_CENTER, spaceAfter=6,
        ),
        "h1": ParagraphStyle(
            "h1", parent=base["Heading1"], fontName="Times-Bold", fontSize=18,
            textColor=INK, spaceBefore=4, spaceAfter=10,
        ),
        "h2": ParagraphStyle(
            "h2", parent=base["Heading2"], fontName="Times-Bold", fontSize=14,
            textColor=INK, spaceBefore=2, spaceAfter=4,
        ),
        "meta": ParagraphStyle(
            "meta", parent=base["Normal"], fontName="Times-Italic", fontSize=9.5,
            leading=13, textColor=MUTED, spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "body", parent=base["Normal"], fontName="Times-Roman", fontSize=10.5,
            leading=15, textColor=INK, alignment=TA_JUSTIFY, spaceAfter=8,
        ),
        "label": ParagraphStyle(
            "label", parent=base["Normal"], fontName="Times-Bold", fontSize=9.5,
            textColor=ACCENT, spaceBefore=4, spaceAfter=3,
        ),
        "bullet": ParagraphStyle(
            "bullet", parent=base["Normal"], fontName="Times-Roman", fontSize=10.5,
            leading=14.5, textColor=INK, leftIndent=10, spaceAfter=2,
        ),
        "toc": ParagraphStyle(
            "toc", parent=base["Normal"], fontName="Times-Roman", fontSize=10,
            leading=13, textColor=INK,
        ),
        "small": ParagraphStyle(
            "small", parent=base["Normal"], fontName="Times-Roman", fontSize=9.5,
            leading=13, textColor=MUTED, alignment=TA_CENTER,
        ),
    }


def header_footer(canvas, doc):
    canvas.saveState()
    page_w, page_h = A4
    if doc.page > 1:
        canvas.setStrokeColor(RULE)
        canvas.setLineWidth(0.4)
        canvas.line(18 * mm, page_h - 12 * mm, page_w - 18 * mm, page_h - 12 * mm)
        canvas.setFont("Times-Italic", 8)
        canvas.setFillColor(MUTED)
        canvas.drawString(18 * mm, page_h - 10 * mm, "John Biddulph  ·  Project documentation")
        canvas.drawRightString(page_w - 18 * mm, page_h - 10 * mm, "2026")
        canvas.line(18 * mm, 12 * mm, page_w - 18 * mm, 12 * mm)
        canvas.drawString(18 * mm, 8 * mm, "www.jbiddulph.com")
        canvas.drawRightString(page_w - 18 * mm, 8 * mm, f"{doc.page}")
    canvas.restoreState()


def link(url: str) -> str:
    return f'<link href="{url}" color="#1d4ed8"><u>{url}</u></link>'


def text_blocks(text: str, style) -> list:
    blocks = []
    for part in (text or "").split("\n\n"):
        part = part.strip()
        if part:
            blocks.append(Paragraph(part.replace("\n", "<br/>"), style))
    return blocks


def project_block(project: dict, styles: dict, index: int):
    stack = ", ".join(project.get("stack") or [])
    bits = [
        Paragraph(f"{index}.  {project['name']}", styles["h2"]),
        Paragraph(
            f"{project.get('period', '')}  ·  {stack}<br/>{link(project['url'])}",
            styles["meta"],
        ),
        Paragraph(project.get("summary") or "", styles["body"]),
        Paragraph("Purpose", styles["label"]),
        *text_blocks(project.get("purpose") or "", styles["body"]),
        Paragraph("How it works", styles["label"]),
        *text_blocks(project.get("howItWorks") or project.get("does") or "", styles["body"]),
    ]

    architecture = project.get("architecture") or []
    if architecture:
        bits.append(Paragraph("Architecture", styles["label"]))
        for item in architecture:
            bits.append(Paragraph(f"–  {item}", styles["bullet"]))

    features = project.get("features") or project.get("users") or []
    if features:
        bits.append(Paragraph("What you can do", styles["label"]))
        for item in features:
            bits.append(Paragraph(f"–  {item}", styles["bullet"]))

    if project.get("dataAuth"):
        bits.append(Paragraph("Data & access (public product)", styles["label"]))
        bits.extend(text_blocks(project["dataAuth"], styles["body"]))

    integrations = project.get("integrations") or []
    if integrations:
        bits.append(Paragraph("Integrations", styles["label"]))
        bits.append(Paragraph(", ".join(integrations), styles["body"]))

    if project.get("deployment"):
        bits.append(Paragraph("Deployment notes", styles["label"]))
        bits.extend(text_blocks(project["deployment"], styles["body"]))

    related = project.get("related") or []
    if related:
        bits.append(Paragraph("Related links", styles["label"]))
        for item in related:
            label = item.get("label") or item.get("url")
            bits.append(Paragraph(f"–  {label}: {link(item.get('url', ''))}", styles["bullet"]))

    bits.append(Spacer(1, 8))
    return KeepTogether(bits)


def build():
    docs = load_docs()
    core = docs[:FEATURED_COUNT]
    appendix = docs[FEATURED_COUNT:]
    styles = make_styles()

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="John Biddulph — Project Documentation 2026",
        author="John Biddulph",
        subject="Public documentation for how each portfolio application works",
    )

    story = []
    story.append(Spacer(1, 36 * mm))
    story.append(Paragraph("PROJECT DOCUMENTATION", styles["cover_kicker"]))
    story.append(Paragraph("Recent applications", styles["cover_title"]))
    story.append(Paragraph("John Biddulph  ·  Full Stack Engineer  ·  Worthing, UK", styles["cover_sub"]))
    story.append(Paragraph("How each product works, what users can do, and how it is built", styles["cover_sub"]))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(link("https://www.jbiddulph.com"), styles["cover_sub"]))
    story.append(
        Paragraph(
            "Public product documentation only. Admin / operational portfolio fields "
            "(domains, hosting, databases, passwords, private repos) are intentionally excluded.",
            styles["small"],
        )
    )
    story.append(PageBreak())

    story.append(Paragraph("About this document", styles["h1"]))
    story.append(
        Paragraph(
            "This PDF is the public documentation pack for the applications on "
            "<b>jbiddulph.com/portfolio</b>. For each project it covers purpose, end-to-end "
            "behaviour, architecture at a high level, user-facing capabilities, public "
            "integrations, and deployment platform notes.",
            styles["body"],
        )
    )
    story.append(
        Paragraph(
            "It is not an operations runbook. Hosting credentials, private repository access, "
            "database connection details, SSL account notes, and other admin-only fields from "
            "the portfolio CMS are never included.",
            styles["body"],
        )
    )

    story.append(Paragraph("Contents", styles["h1"]))
    toc_rows = []
    for i, project in enumerate(core, 1):
        toc_rows.append(
            [
                Paragraph(f"{i}.", styles["toc"]),
                Paragraph(project["name"], styles["toc"]),
                Paragraph(project.get("period") or "", styles["toc"]),
            ]
        )
    if appendix:
        toc_rows.append(
            [
                Paragraph("", styles["toc"]),
                Paragraph("Appendix — related public experiments", styles["toc"]),
                Paragraph("", styles["toc"]),
            ]
        )
    toc = Table(toc_rows, colWidths=[12 * mm, 110 * mm, 45 * mm])
    toc.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("TEXTCOLOR", (0, 0), (0, -1), ACCENT),
                ("LINEBELOW", (0, 0), (-1, -2), 0.2, RULE),
            ]
        )
    )
    story.append(toc)
    story.append(PageBreak())

    story.append(Paragraph("The applications", styles["h1"]))
    story.append(
        Paragraph(
            f"{len(core)} featured products with full public documentation.",
            styles["body"],
        )
    )
    for i, project in enumerate(core, 1):
        story.append(project_block(project, styles, i))

    if appendix:
        story.append(Paragraph("Appendix — related public experiments", styles["h1"]))
        story.append(
            Paragraph(
                "Companion demos and experiments that support the main portfolio story. "
                "Same public-only rule applies.",
                styles["body"],
            )
        )
        for i, project in enumerate(appendix, 1):
            story.append(project_block(project, styles, i))

    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph("Contact: Worthing, West Sussex  ·  www.jbiddulph.com", styles["small"]))

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(f"Wrote {OUTPUT} ({OUTPUT.stat().st_size} bytes, {len(docs)} docs)")


if __name__ == "__main__":
    build()
