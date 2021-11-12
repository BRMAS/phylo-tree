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

### Scripts

scripts to create json data:

read `data/tree_species.csv` and create `scripts/infoDetail.json`

run python via poetry:

```sh
cd scripts
poetry run make-detail-json.py
```
