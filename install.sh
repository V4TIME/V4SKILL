#!/usr/bin/env bash
# V4SKILL installer — install all 73 Hermes Agent skills in one command.
#
# Usage:
#   ./install.sh                 # copy all skills into ~/.hermes/skills/v4skill
#   ./install.sh --link          # symlink the checkout instead of copying
#   ./install.sh --force         # replace an existing install
#   ./install.sh --target DIR    # install somewhere else
#   ./install.sh --repo URL      # clone from a different remote first
#   ./install.sh --branch NAME   # clone a different branch
#
# Remote one-liner (no checkout required):
#   curl -fsSL https://raw.githubusercontent.com/V4TIME/V4SKILL/main/install.sh | bash
#
# Requirements: bash, and git only when the script is not run from a checkout.
# The script verifies the install and exits non-zero if any skill is missing.

set -euo pipefail

REPO_URL="https://github.com/V4TIME/V4SKILL.git"
BRANCH="main"
MODE="copy"
FORCE=0
HERMES_HOME="${HERMES_HOME:-$HOME/.hermes}"
TARGET=""
EXPECTED_SKILLS=73

die() {
  echo "error: $*" >&2
  exit 1
}

usage() {
  cat <<'EOF'
V4SKILL installer — install all 73 Hermes Agent skills at once.

Usage:
  ./install.sh [options]

Options:
  --copy            Copy the skills (default; self-contained install)
  --link            Symlink the checkout (keeps git pull updates live)
  --force, -f       Replace an existing target directory
  --target DIR      Install directory (default: $HERMES_HOME/skills/v4skill)
  --repo URL        Git remote to clone when not running from a checkout
  --branch NAME     Branch to clone (default: main)
  -h, --help        Show this help

Environment:
  HERMES_HOME       Hermes home directory (default: ~/.hermes)

Examples:
  ./install.sh
  ./install.sh --link
  ./install.sh --target /opt/hermes/skills/v4skill --force
  curl -fsSL https://raw.githubusercontent.com/V4TIME/V4SKILL/main/install.sh | bash

After installing, reload Hermes Agent and run `skill-compass --refresh`
(or ask Hermes: "refresh skill-compass").
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --copy) MODE="copy"; shift ;;
    --link) MODE="link"; shift ;;
    --force|-f) FORCE=1; shift ;;
    --target)
      [ $# -ge 2 ] || die "--target needs a directory"
      TARGET="$2"; shift 2 ;;
    --repo)
      [ $# -ge 2 ] || die "--repo needs a URL"
      REPO_URL="$2"; shift 2 ;;
    --branch)
      [ $# -ge 2 ] || die "--branch needs a name"
      BRANCH="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) die "unknown option: $1 (try --help)" ;;
  esac
done

# Expand a leading ~ that arrived through a quoted argument.
case "$TARGET" in
  "~") TARGET="$HOME" ;;
  "~/"*) TARGET="$HOME/${TARGET#\~/}" ;;
esac

TARGET="${TARGET:-$HERMES_HOME/skills/v4skill}"

# ---------- locate the source ----------

SRC=""
FROM_CLONE=0
SELF="${BASH_SOURCE[0]:-}"
if [ -n "$SELF" ] && [ -f "$SELF" ]; then
  SELF_DIR="$(cd "$(dirname "$SELF")" && pwd -P)"
  if [ -f "$SELF_DIR/README.md" ] && [ "$(find "$SELF_DIR" -name SKILL.md -not -path '*/.git/*' | wc -l | tr -d ' ')" -gt 0 ]; then
    SRC="$SELF_DIR"
  fi
fi

TMP_DIR=""
cleanup() {
  if [ -n "$TMP_DIR" ]; then
    rm -rf "$TMP_DIR"
  fi
}
trap cleanup EXIT

if [ -z "$SRC" ]; then
  command -v git >/dev/null 2>&1 || die "git is required to install from $REPO_URL"
  TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/v4skill.XXXXXX")"
  echo "==> Cloning $REPO_URL ($BRANCH)"
  git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$TMP_DIR/repo"
  SRC="$TMP_DIR/repo"
  FROM_CLONE=1
fi

SRC_REAL="$(cd "$SRC" && pwd -P)"

# ---------- normalize and guard the target ----------

TARGET_PARENT="$(dirname "$TARGET")"
mkdir -p "$TARGET_PARENT"
TARGET="$(cd "$TARGET_PARENT" && pwd -P)/$(basename "$TARGET")"

case "$TARGET" in
  ""|"/"|"$HOME"|"$HOME/") die "refusing to install into $TARGET" ;;
esac

if [ -e "$TARGET" ]; then
  TARGET_REAL="$(cd "$TARGET" && pwd -P)"
else
  TARGET_REAL="$TARGET"
fi

# Never copy or link the checkout into itself (would recurse forever).
case "$TARGET_REAL/" in
  "$SRC_REAL"/*)
    [ "$TARGET_REAL" = "$SRC_REAL" ] || die "refusing to install inside the source checkout"
    ;;
esac

# ---------- install ----------

echo "==> Installing 73 V4SKILL skills"
echo "    source: $SRC_REAL"
echo "    target: $TARGET"
echo "    mode:   $MODE"

ALREADY_THERE=0

if [ "$MODE" = "link" ]; then
  if [ -L "$TARGET" ]; then
    if [ "$(readlink "$TARGET")" = "$SRC_REAL" ]; then
      ALREADY_THERE=1
    else
      [ "$FORCE" -eq 1 ] || die "$TARGET is a symlink to $(readlink "$TARGET"); use --force to replace it"
      rm -f "$TARGET"
      ln -s "$SRC_REAL" "$TARGET"
    fi
  elif [ -e "$TARGET" ]; then
    [ "$FORCE" -eq 1 ] || die "$TARGET already exists; use --force to replace it"
    rm -rf "$TARGET"
    ln -s "$SRC_REAL" "$TARGET"
  else
    ln -s "$SRC_REAL" "$TARGET"
  fi
else
  if [ -d "$TARGET" ] && [ "$TARGET_REAL" = "$SRC_REAL" ]; then
    ALREADY_THERE=1
  else
    if [ -e "$TARGET" ] || [ -L "$TARGET" ]; then
      [ "$FORCE" -eq 1 ] || die "$TARGET already exists; use --force to replace it"
      rm -rf "$TARGET"
    fi
    mkdir -p "$TARGET"
    # Copy only the tracked skill tree; never traverse .git (it can contain
    # lockfiles and host-specific metadata the skills do not need).
    for entry in "$SRC_REAL"/* "$SRC_REAL"/.[!.]*; do
      [ -e "$entry" ] || [ -L "$entry" ] || continue
      case "$(basename "$entry")" in
        .git|.pytest_cache) continue ;;
      esac
      cp -a "$entry" "$TARGET/"
    done
  fi

  # Keep the install tree clean: no caches or generated state.
  rm -rf "$TARGET/.git" "$TARGET/.pytest_cache"
  find "$TARGET" -type d -name '__pycache__' -prune -exec rm -rf {} + 2>/dev/null || true
  find "$TARGET" -type f \( -name '*.pyc' -o -name '*.pyo' \) -delete 2>/dev/null || true
  rm -f "$TARGET/productivity/.caveman-hermes-ownership.json"
fi

if [ "$ALREADY_THERE" -eq 1 ]; then
  echo "==> Already installed at $TARGET; verifying the existing tree"
fi

# ---------- verify ----------

COUNT="$(find -L "$TARGET" -name SKILL.md -not -path '*/.git/*' | wc -l | tr -d ' ')"
[ "$COUNT" -eq "$EXPECTED_SKILLS" ] || die "expected $EXPECTED_SKILLS skills, found $COUNT in $TARGET"

if command -v python3 >/dev/null 2>&1; then
  python3 - "$TARGET" "$EXPECTED_SKILLS" <<'PY'
import re
import sys
from pathlib import Path

root = Path(sys.argv[1]).resolve()
expected = int(sys.argv[2])
files = sorted(root.rglob("SKILL.md"))
frontmatter = re.compile(r"^---[ \t]*\n(.*?)\n---[ \t]*\n", re.S)
problems = []
categories = set()

for path in files:
    text = path.read_text(encoding="utf-8", errors="replace")
    match = frontmatter.match(text)
    if not match:
        problems.append(f"{path.relative_to(root)}: missing YAML frontmatter")
        continue
    block = match.group(1)
    for field in ("name", "description"):
        if not re.search(rf"^{field}\s*:", block, re.M):
            problems.append(f"{path.relative_to(root)}: missing {field}")
    category = re.search(r"^\s+category:\s*(\S+)", block, re.M)
    if category:
        categories.add(category.group(1))

if len(files) != expected:
    problems.append(f"expected {expected} SKILL.md files, found {len(files)}")

if problems:
    print("FAILED: install verification found problems:", file=sys.stderr)
    for problem in problems:
        print(f"  - {problem}", file=sys.stderr)
    sys.exit(1)

print(f"OK: {len(files)} skills installed across {len(categories)} categories")
PY
else
  echo "OK: $COUNT skills installed (install python3 to run frontmatter validation)"
fi

# ---------- next steps ----------

cat <<EOF

Installed all 73 skills at:
  $TARGET

Next steps:
  1. Reload Hermes Agent (restart it, or reopen the session).
  2. Refresh the index:  skill-compass --refresh
     (or ask Hermes: "refresh skill-compass")
  3. Try it:              ask Hermes "Load skill-compass and list my skills"
EOF

if [ "$MODE" = "link" ]; then
  echo "Update later:  cd \"$SRC_REAL\" && git pull"
elif [ "$FROM_CLONE" -eq 1 ]; then
  echo "Update later:  re-run this installer with --force"
else
  echo "Update later:  git pull && ./install.sh --force"
fi
