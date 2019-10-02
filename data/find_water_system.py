import csv
import json
import sys
import pandas as pd
from shapely.geometry import shape, Point

# fieldnames = ("row_id", "guid", "geom", "pwsid", "d_population_count",
#               "county_fips", "address_city_name", "addr_line_two_txt",
#               "addr_line_one_txt", "address_zip", "district_lpa_id")
# csv.field_size_limit(sys.maxsize)
# csv_file = csv.DictReader(open('water_system_clean.csv', 'r'), fieldnames)
# json_file = open('water_system_clean_2.json', 'w')

# myDict = {"polygons": []}
# my_df = pd.DataFrame()

# row_num = 0
# for row in csv_file:

#     # if row_num > 1:
#         # break

#     geom = row['geom'].replace("MULTIPOLYGON ", "").replace("(", "").replace(")", "")
#     pwsid = row['pwsid'].replace("CA", "")
#     if geom == "" or len(geom) < 10:
#         continue
#     geomList = []
#     latlngList = geom.split(",")
#     for latlng in latlngList:
#         latlng = latlng.strip()
#         lng, lat = latlng.split(" ")
#         lng = float(lng)
#         lat = float(lat)
#         geomList.append([lng, lat])

#     myDict['polygons'].append({'pwsid': pwsid, 'latlng': {"type":"Polygon", "coordinates": [geomList]}, 'population':float(row['d_population_count']),'city': row['address_city_name']})
#     row_num += 1

# json.dump(myDict, json_file)
# json_file.write('\n')


# depending on your version, use: from shapely.geometry import shape, Point

# load GeoJSON file containing sectors
with open('water_system_clean_2.json') as f:
    js = json.load(f)



def find_water_system(lon, lat):
    # point = Point(-120.9267512055462, 37.56610413561439)
    point = Point(-122.4847313, 37.7536699)
    num_poly = 0
    for poly in js['polygons']:
        polygon = shape(poly['latlng'])
        num_poly += 1
        if polygon.contains(point):
            print "Num of polys checked: " + str(num_poly)
            print poly['pwsid']
            return
    print "Num of polys checked: " + str(num_poly)
    print "Not found"

find_water_system(-122.4363949, 37.7939175)