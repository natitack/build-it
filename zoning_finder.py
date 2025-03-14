import json
from shapely.geometry import Point, Polygon, shape
from shapely.geometry.polygon import Polygon

def find_zoning_by_coordinates(zoning_geojson_file, latitude, longitude):
    """
    Find the zoning information for a given set of coordinates.
    
    Args:
        zoning_geojson_file (str): Path to the zoning GeoJSON file
        latitude (float): Latitude of the location
        longitude (float): Longitude of the location
    
    Returns:
        dict: Dictionary with zoning information if found
             Returns None if no zoning information is found
    """
    # Create a Point object from the coordinates
    point = Point(longitude, latitude)  # Note: GeoJSON uses (longitude, latitude) order
    
    # Load the zoning GeoJSON file
    try:
        with open(zoning_geojson_file, 'r') as f:
            zoning_data = json.load(f)
    except Exception as e:
        print(f"Error reading zoning GeoJSON file: {e}")
        return None
    
    # Check if the file has the expected structure
    if 'type' not in zoning_data or zoning_data['type'] != 'FeatureCollection' or 'features' not in zoning_data:
        print("Invalid zoning GeoJSON format: Expected a FeatureCollection with features")
        return None
    
    # Search through features to find which polygon contains the point
    for feature in zoning_data['features']:
        if 'geometry' in feature and 'properties' in feature:
            geometry = feature['geometry']
            properties = feature['properties']
            
            # Skip if not a polygon
            if geometry['type'] != 'Polygon':
                continue
            
            # Create a shapely Polygon from the coordinates
            try:
                polygon = Polygon(geometry['coordinates'][0])
                
                # Check if the point is within the polygon
                if polygon.contains(point):
                    # Return the zoning information
                    return {
                        'zone': properties.get('ZONE', 'Unknown'),
                        'zone_type': properties.get('ZONE_TYPE', 'Unknown'),
                        'community_type': properties.get('COMMUNITY_TYPE', 'Unknown'),
                        'ordinance': properties.get('ORDINANCE', ''),
                        'objectid': properties.get('OBJECTID', '')
                    }
            except Exception as e:
                print(f"Error processing polygon: {e}")
                continue
    
    # If we get here, the point is not within any zoning polygon
    return None

def get_zoning_from_address(address_geojson_file, zoning_geojson_file, address_query):
    """
    Find zoning information for a given address by first finding 
    the coordinates and then getting the zoning data.
    
    Args:
        address_geojson_file (str): Path to the address GeoJSON file
        zoning_geojson_file (str): Path to the zoning GeoJSON file
        address_query (str): Address to search for
    
    Returns:
        dict: Dictionary with address and zoning information
             Returns None if no match is found
    """
    # Import the address finder function
    from address_finder import find_address_coordinates
    
    # Get coordinates for the address
    address_result = find_address_coordinates(address_geojson_file, address_query)
    
    if not address_result:
        print(f"No address found for: {address_query}")
        return None
    
    # Get zoning information for the coordinates
    zoning_info = find_zoning_by_coordinates(
        zoning_geojson_file, 
        address_result['latitude'], 
        address_result['longitude']
    )
    
    if not zoning_info:
        return {
            'address': address_result['address'],
            'latitude': address_result['latitude'],
            'longitude': address_result['longitude'],
            'zoning': "No zoning information found for these coordinates"
        }
    
    # Combine address and zoning information
    return {
        'address': address_result['address'],
        'latitude': address_result['latitude'],
        'longitude': address_result['longitude'],
        'zoning': zoning_info
    }

# Example usage
if __name__ == "__main__":
    # Example 1: Direct coordinate lookup
    zoning = find_zoning_by_coordinates("zoning.geojson", 44.0515347449165, -121.327630659812)
    if zoning:
        print(f"Zoning information: {zoning}")
    else:
        print("No zoning information found for these coordinates")
    
    # Example 2: Combined address and zoning lookup
    result = get_zoning_from_address("addresses.geojson", "zoning.geojson", "1013 Brooks St")
    if result:
        print(f"Address: {result['address']}")
        print(f"Coordinates: ({result['latitude']}, {result['longitude']})")
        print(f"Zoning: {result['zoning']}")
