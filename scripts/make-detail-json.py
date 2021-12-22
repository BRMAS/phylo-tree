
#!/usr/bin/env python
# -.- coding: utf-8 -.-
import requests
from bs4 import BeautifulSoup
import pykew.powo as powo
from pykew.powo_terms import Name, Filters

import csv
import json

data = {}
counter = 0
with open('../data/tree_species_final-211222.csv') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        if counter > 0: # ignore header
            key = ' '.join(row[0].split()) # for remove xa0 (latin1 空白) while export from excel
            #print(key, row)
            if key != '':
                append_image_url = ''
                append_ipni_id = ''
                append_dist = ''

                data[key] = row[1:5]
                #api_url = f'http://powo.science.kew.org/api/1/search?q={sname}'
                #r = requests.get(api_url)
                #print (r.json())
                specific_epithet = key.split(' ')[1]
                query = { Name.genus: 'Begonia', Name.species: specific_epithet}
                res = powo.search(query, filters=[Filters.accepted, Filters.species])

                print(key, res.size())
                if res.size() != 1:
                    print('size != 1')
                    print('-------------')
                    if res.size() > 0:
                        for x in res:
                            print(x)
                else:
                    for x in res:
                        append_ipni_id = x['fqId']
                        res2 = powo.lookup(append_ipni_id, include=['distribution'])
                        names = []
                        if res2 and 'distribution' in res2:
                            for n in res2['distribution']['natives']:
                                names.append(n['name'])
                        append_dist = ','.join(names)

                # find image url
                if 'https://brmas.openmuseum.tw' in row[1]:
                    r = requests.get(row[1])
                    soup = BeautifulSoup(r.text, 'lxml')
                    image_tag = soup.select('meta[property="og:image"]')[0]
                    append_image_url = image_tag['content']

                data[key].append(append_image_url)
                data[key].append(append_ipni_id)

                sources = 'Royal Botanic Gardens, Kew'
                if append_dist == '':
                    print (key, '===== no dist =====')
                    #    data[key].append('FIXME') # 手工輸入
                    if custom_dist := row[5]:
                        append_dist = custom_dist
                    if custom_sources := row[6]:
                        sources = custom_sources

                data[key].append(append_dist)
                data[key].append(sources)

        counter += 1

jdata = json.dumps(data)
fout = open('infoDetail.json', 'w')
fout.write(jdata)
fout.close()
