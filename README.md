# PhyloTree

Inspried from [Tree of Life / D3 / Observable](https://observablehq.com/@d3/tree-of-life)


## Development

```
npm run dev
```

### Structure

PhyloTree

- MainGraph (drawSVG)
- DetailInfo
- Footer

### Scripts

1. source: xlsx
2. export csv (Excel 要特別選 UTF-8 csv)
3. run `make-detail-json.py` script

read `data/tree_species.csv` and create `scripts/infoDetail.json`

4. copy `scripts/infoDetail.json` to `data/infoDetail.json`


run python via poetry:

```sh
$ cd scripts
$ poetry run make-detail-json.py
```
