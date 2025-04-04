import json
import re

def find_address_coordinates(geojson_file, address_query):
    """
    Find the latitude and longitude for an address in a GeoJSON file.
    
    Args:
        geojson_file (str): Path to the GeoJSON file
        address_query (str): Address to search for (can be partial)
    
    Returns:
        dict: Dictionary with address, latitude, and longitude if found
             Returns None if no match is found
    """
    # Normalize the query for better matching
    normalized_query = normalize_address(address_query)
    
    # Load the GeoJSON file
    try:
        with open(geojson_file, 'r') as f:
            geojson_data = json.load(f)
    except Exception as e:
        print(f"Error reading GeoJSON file: {e}")
        return None
    
    # Check if the file has the expected structure
    if 'type' not in geojson_data or geojson_data['type'] != 'FeatureCollection' or 'features' not in geojson_data:
        print("Invalid GeoJSON format: Expected a FeatureCollection with features")
        return None
    
    # Search through features for matching addresses
    matches = []
    
    for feature in geojson_data['features']:
        if 'properties' in feature and 'geometry' in feature:
            properties = feature['properties']
            geometry = feature['geometry']
            
            # Check if the feature has the required address and coordinate fields
            if ('FULLADDR' in properties and 
                'LATTITUDE' in properties and 
                'LONGITUDE' in properties):
                
                full_address = properties['FULLADDR']
                normalized_address = normalize_address(full_address)
                
                # Check if the normalized query is part of the normalized address
                if normalized_query in normalized_address:
                    match = {
                        'address': full_address,
                        'latitude': properties['LATTITUDE'],
                        'longitude': properties['LONGITUDE'],
                        'similarity': calculate_similarity(normalized_query, normalized_address)
                    }
                    matches.append(match)
    
    # If matches found, return the best match
    if matches:
        # Sort by similarity score (highest first)
        best_match = sorted(matches, key=lambda x: x['similarity'], reverse=True)[0]
        return {
            'address': best_match['address'], 
            'latitude': best_match['latitude'], 
            'longitude': best_match['longitude']
        }
    else:
        return None

def normalize_address(address):
    """
    Normalize an address for better matching:
    - Convert to lowercase
    - Replace common abbreviations
    - Remove special characters
    """
    if not address:
        return ""
    
    # Convert to lowercase
    address = address.lower()
    
    # Dictionary of common street type abbreviations
    abbrev_map = {
        ' st ': ' street ',
        ' st': ' street',
        ' rd ': ' road ',
        ' rd': ' road',
        ' ave ': ' avenue ',
        ' ave': ' avenue',
        ' blvd ': ' boulevard ',
        ' blvd': ' boulevard',
        ' dr ': ' drive ',
        ' dr': ' drive',
        ' ln ': ' lane ',
        ' ln': ' lane',
        ' ct ': ' court ',
        ' ct': ' court',
        ' pkwy ': ' parkway ',
        ' pkwy': ' parkway',
        ' hwy ': ' highway ',
        ' hwy': ' highway',
        ' pl ': ' place ',
        ' pl': ' place',
        ' cir ': ' circle ',
        ' cir': ' circle',
        ' trl ': ' trail ',
        ' trl': ' trail',
        ' nw ': ' northwest ',
        ' ne ': ' northeast ',
        ' sw ': ' southwest ',
        ' se ': ' southeast ',
        ' n ': ' north ',
        ' e ': ' east ',
        ' s ': ' south ',
        ' w ': ' west '
    }
    
    # Apply abbreviation replacements
    normalized = ' ' + address + ' '  # Add spaces to catch abbreviations at start/end
    for abbrev, full in abbrev_map.items():
        normalized = normalized.replace(abbrev, full)
    normalized = normalized.strip()  # Remove the extra spaces we added
    
    # Remove special characters but keep spaces
    normalized = re.sub(r'[^\w\s]', '', normalized)
    
    return normalized

def calculate_similarity(query, address):
    """
    Calculate a simple similarity score between query and address.
    Higher score means better match.
    
    This is a basic implementation that can be improved with more sophisticated
    string matching algorithms if needed.
    """
    # If exact match, highest score
    if query == address:
        return 100
    
    # If query is a substring of address, score based on length ratio
    if query in address:
        return 90 * (len(query) / len(address))
    
    # Count matching words
    query_words = set(query.split())
    address_words = set(address.split())
    matching_words = query_words.intersection(address_words)
    
    # Calculate score based on word matches
    if len(query_words) > 0:
        return 80 * (len(matching_words) / len(query_words))
    
    return 0

# Example usage
if __name__ == "__main__":
    # Example usage
    result = find_address_coordinates("addresses.geojson", "1013 Brooks St")
    if result:
        print(f"Found: {result['address']}")
        print(f"Latitude: {result['latitude']}, Longitude: {result['longitude']}")
    else:
        print("Address not found")
