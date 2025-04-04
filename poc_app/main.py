import json
from zoning_finder import get_zoning_from_address

def main():
    address_geojson_file = "addresses.geojson"  # Path to the address GeoJSON file
    zoning_geojson_file = "zoning.geojson"      # Path to the zoning GeoJSON file
    
    # Prompt the user for an address
    address_query = input("Please enter an address to look up zoning information: ")
    
    # Get zoning information for the address
    result = get_zoning_from_address(address_geojson_file, zoning_geojson_file, address_query)
    
    if result:
        print(f"Address: {result['address']}")
        print(f"Coordinates: ({result['latitude']}, {result['longitude']})")
        print(f"Zoning: {result['zoning']}")
    else:
        print("No zoning information found for the provided address.")

if __name__ == "__main__":
    main()