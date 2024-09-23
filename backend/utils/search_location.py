from smartystreets_python_sdk import (SharedCredentials,
                                      ClientBuilder)
from smartystreets_python_sdk.us_autocomplete_pro import Lookup
from smartystreets_python_sdk.us_autocomplete_pro import geolocation_type
from django.conf import settings


def autocomplete(search_term):
    key = settings.KEY
    hostname = settings.HOSTNAME
    credentials = SharedCredentials(key, hostname)
    client = ClientBuilder(credentials).build_us_autocomplete_pro_api_client()
    lookup = Lookup(search_term)
    client.send(lookup)
    lookup.max_results = 10
    lookup.prefer_geo = geolocation_type.NONE
    lookup.prefer_ratio = 33
    lookup.source = ''
    suggestions = client.send(lookup)
    results = []
    for suggestion in suggestions:
        results.append(suggestion.__dict__)
    return results
