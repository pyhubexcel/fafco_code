from smartystreets_python_sdk.us_street import Lookup as StreetLookup
from smartystreets_python_sdk import (
    SharedCredentials,
    ClientBuilder
)
from django.conf import settings
from django.core.mail import send_mail


def singleaddressvalidation(address_data, user_id):
    key = settings.KEY
    hostname = settings.HOSTNAME

    credentials = SharedCredentials(key, hostname)
    client = ClientBuilder(credentials).build_us_street_api_client()
    lookup = StreetLookup()
    lookup.street = address_data.get("street")
    lookup.city = address_data.get("city")
    lookup.state = address_data.get("state")
    lookup.zipcode = address_data.get("zipcode")
    client.send_lookup(lookup)
    result = lookup.result

    if not result:
        send_mail(
            'Manual Address Verification Needed',
            f'Registration ID:{user_id}\n'
            f'Address Info: {address_data.get("street")},{address_data.get("city")}, {address_data.get("state")} {address_data.get("zipcode")}',
            settings.EMAIL_HOST_USER,
            [settings.NET_ADMIN_USER],
            fail_silently=False,
        )
        return {"success": False,
                "message": "Any claims opened with an unverifield address with not be processed untill the address is manually validated by Customer Care"}

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
            "state_abbreviation":
                first_candidate.components.state_abbreviation,
            "zipcode": first_candidate.components.zipcode,
            "plus4_code": first_candidate.components.plus4_code,
            "delivery_point": first_candidate.components.delivery_point,
            "delivery_point_check_digit":
                first_candidate.components.delivery_point_check_digit
        },
        "metadata": {
            "record_type": first_candidate.metadata.record_type,
            "zip_type": first_candidate.metadata.zip_type,
            "county_fips": first_candidate.metadata.county_fips,
            "county_name": first_candidate.metadata.county_name,
            "carrier_route": first_candidate.metadata.carrier_route,
            "congressional_district":
                first_candidate.metadata.congressional_district,
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
