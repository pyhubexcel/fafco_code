from smartystreets_python_sdk.us_street import Lookup as StreetLookup
from smartystreets_python_sdk.us_street.match_type import MatchType
from smartystreets_python_sdk import SharedCredentials, StaticCredentials, ClientBuilder,exceptions
from smartystreets_python_sdk.us_autocomplete_pro import Lookup as AutocompleteProLookup, geolocation_type
from django.conf import settings


def singleaddressvalidation(address_data):
    key= settings.KEY
    hostname=settings.HOSTNAME

    credentials = SharedCredentials(key, hostname)
    client = ClientBuilder(credentials).build_us_street_api_client()
    lookup = StreetLookup()
    lookup.street = address_data.get("street")
    lookup.city = address_data.get("city")
    lookup.state = address_data.get("state")
    lookup.zipcode = address_data.get("zipcode")

    try:
        client.send_lookup(lookup)
    except exceptions.SmartyException as err:
        return {"error": "An error occurred during address validation."}

    result = lookup.result

    if not result:
        return {"error": "No candidates found. The address is not valid."}

    first_candidate = result[0]

    data = {
        "delivery_line_1": first_candidate.delivery_line_1,
        "last_line": f"{first_candidate.components.city_name} "
                     f"{first_candidate.components.state_abbreviation} "
                     f"{first_candidate.components.zipcode}-{first_candidate.components.plus4_code}",
        "components": {
            "primary_number": first_candidate.components.primary_number,
            "street_name": first_candidate.components.street_name,
            "street_suffix": first_candidate.components.street_suffix,
            "city_name": first_candidate.components.city_name,
            "default_city_name": first_candidate.components.default_city_name,
            "state_abbreviation": first_candidate.components.state_abbreviation,
            "zipcode": first_candidate.components.zipcode,
            "plus4_code": first_candidate.components.plus4_code,
            "delivery_point": first_candidate.components.delivery_point,
            "delivery_point_check_digit": first_candidate.components.delivery_point_check_digit
        },
        "metadata": {
            "record_type": first_candidate.metadata.record_type,
            "zip_type": first_candidate.metadata.zip_type,
            "county_fips": first_candidate.metadata.county_fips,
            "county_name": first_candidate.metadata.county_name,
            "carrier_route": first_candidate.metadata.carrier_route,
            "congressional_district": first_candidate.metadata.congressional_district,
            "rdi": first_candidate.metadata.rdi,
            "elot_sequence": first_candidate.metadata.elot_sequence,
            "elot_sort": first_candidate.metadata.elot_sort,
            "latitude": first_candidate.metadata.latitude,
            "longitude": first_candidate.metadata.longitude,
            "precision": first_candidate.metadata.precision,
            "time_zone": first_candidate.metadata.time_zone,
            "utc_offset": first_candidate.metadata.utc_offset,            
        },
        "analysis": {
            "dpv_match_code": first_candidate.analysis.dpv_match_code,
            "dpv_footnotes": first_candidate.analysis.dpv_footnotes,
            "dpv_cmra": first_candidate.analysis.cmra,
            "dpv_vacant": first_candidate.analysis.vacant,
            "dpv_no_stat": first_candidate.analysis.dpv_no_stat,
            "active": first_candidate.analysis.active,
        }
    }
    return data