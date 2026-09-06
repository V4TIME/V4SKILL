#!/usr/bin/env python3
"""Shuffles the webmxerz/data/ CSV files into new random order for cache invalidation.
Run from the data directory. Keeps filenames unique and traceable."""
import os, random, re

data_dir = os.path.dirname(os.path.abspath(__file__))
if not data_dir:
    data_dir = "."

files = []
for f in os.listdir(data_dir):
    full = os.path.join(data_dir, f)
    if os.path.isfile(full) and f.endswith('.csv'):
        files.append(f)

if not files:
    print("No CSV files found in", data_dir)
    exit(0)

# Deterministic shuffle seeded by file count for reproducibility
seed = len(files) * 7 + 13
rng = random.Random(seed)
order = list(range(1, len(files) + 1))
rng.shuffle(order)

print(f"Shuffling {len(files)} files with seed {seed}...")
print(f"Old -> New")
for i, f in enumerate(files):
    new_num = order[i]
    base = re.sub(r'^_\d+_?', '', f)  # strip any old numeric prefix
    new_name = f"_{new_num:02d}_{base}"
    old_path = os.path.join(data_dir, f)
    new_path = os.path.join(data_dir, new_name)
    if old_path != new_path:
        os.rename(old_path, new_path)
        print(f"  {f} -> {new_name}")

print("Done.")
