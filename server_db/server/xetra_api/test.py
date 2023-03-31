proxies = {
"http":  "", # Enter http Proxy if needed
"https": "", # Enter https Proxy if needed
}
 
API_TOKEN="AktienInvestApp "+"163a5d76-1d1f-401d-a095-11b009e5fbe1" 

import pandas as pd
import requests
import numpy as np
from pprint import pprint

x = requests.get('https://www.clearstream.com')
print(x.status_code)

url = 'https://api.clearstream.com/pmi'
r = requests.get(url = url,  headers={'Authorization': API_TOKEN})
res = r.json()

""" reference_date= '20200106' #Note :: Reference data has the formate of yyyymmdd

url = 'https://a7.deutsche-boerse.com/api/v1/rdi'
r = requests.get(url = url,  headers={'Authorization': API_TOKEN}, proxies = proxies)
pprint(r.json())

url = 'https://a7.deutsche-boerse.com/api/v1/rdi/XEUR/{}?mode=detailed'.format(reference_date)
r = requests.get(url = url,  headers={'Authorization': API_TOKEN}, proxies = proxies)
res = r.json()

lst_ms = np.array([x['MarketSegment'] for x in res['MarketSegments']])
indx_fgbl = np.where(lst_ms=='FGBL')[0][0]
indx_fdax = np.where(lst_ms=='FDAX')[0][0]
print('Market Segment for FGBL :: '+str(res['MarketSegments'][indx_fgbl]['MarketSegmentID']))
print('Market Segment for FDAX :: '+str(res['MarketSegments'][indx_fdax]['MarketSegmentID']))

indx_ogbl = np.where(lst_ms=='OGBL')[0][0]
print('Market Segment for OGBL :: '+str(res['MarketSegments'][indx_ogbl]['MarketSegmentID']))

url = 'https://a7.deutsche-boerse.com/api/v1/rdi/XEUR/{}/{}?mode=detailed'.format(reference_date,688)
r = requests.get(url = url,  headers={'Authorization': API_TOKEN}, proxies = proxies)
res_i = r.json()

for x in res_i['Securities']:
    print(x['SecurityDesc'],x['SecurityID']) """