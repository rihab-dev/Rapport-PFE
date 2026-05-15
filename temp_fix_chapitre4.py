from pathlib import Path

path = Path(r"d:\PFE\Rapport1\tex\chapitre4.tex")
text = path.read_text(encoding="utf-8", errors="replace")
lines = text.splitlines()
new_lines = []
for line in lines:
    if "�" in line and line.lstrip().startswith("%"):
        continue
    new_lines.append(line)
new_text = "\n".join(new_lines)
new_text = new_text.replace("�?T", "'")
new_text = new_text.replace("�" , "")
path.write_text(new_text, encoding="utf-8")
print("Fixed file", path)
