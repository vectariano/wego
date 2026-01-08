import requests
import os
from datetime import datetime, timedelta
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from dotenv import load_dotenv
from urllib.parse import urlencode

load_dotenv()

_HOTELS_CACHE = {}
_CACHE_TIMESTAMP = None
_CACHE_TTL = 300

class HotelViewSet(ViewSet):
    def list(self, request):
        print("HotelViewSet.list called")
        
        # Получаем все параметры из запроса
        destination = request.query_params.get("destination", "Bali Resorts")
        check_in = request.query_params.get("check_in", "2025-12-29")
        check_out = request.query_params.get("check_out", "2025-12-30",)
        adults = request.query_params.get("adults", "2")
        rooms = request.query_params.get("rooms", "1")
        
        try:
            check_in_date = datetime.strptime(check_in, "%Y-%m-%d")
            check_out_date = datetime.strptime(check_out, "%Y-%m-%d")
            
            if check_out_date <= check_in_date:
                check_out_date = check_in_date + timedelta(days=1)
                check_out = check_out_date.strftime("%Y-%m-%d")
                
        except ValueError:
            today = datetime.now()
            check_in = today.strftime("%Y-%m-%d")
            check_out = (today + timedelta(days=2)).strftime("%Y-%m-%d")
        
        try:
            adults = int(adults)
            if adults < 1:
                adults = 2
        except (TypeError, ValueError):
            adults = 2
            
        try:
            rooms = int(rooms)
            if rooms < 1:
                rooms = 1
        except (TypeError, ValueError):
            rooms = 1

        # Проверяем кэш
        cache_key = f"{destination}_{check_in}_{check_out}_{adults}_{rooms}"
        global _HOTELS_CACHE, _CACHE_TIMESTAMP
        
        current_time = datetime.now().timestamp()
        if (_CACHE_TIMESTAMP and 
            (current_time - _CACHE_TIMESTAMP) < _CACHE_TTL and
            cache_key in _HOTELS_CACHE):
            print(f"Returning cached results for {cache_key}")
            return Response(_HOTELS_CACHE[cache_key])

        api_key = os.getenv("SERP_API_KEY")
        print(f"Loaded API key: '{api_key}'") 
        if not api_key:
            return Response({"error": "API key not configured"}, status=500)

        url = "https://serpapi.com/search.json"
        params = {
            "engine": "google_hotels",
            "q": destination,
            "check_in_date": check_in,
            "check_out_date": check_out,
            "adults": str(adults),
            "rooms": str(rooms),
            "hotel_class": 3,
            "api_key": api_key
        }

        query_string = urlencode(params)
        full_url = f"{url}?{query_string}"
        print(f">>> Sending request to SerpAPI: {full_url}")

        try:
            response = requests.get(url, params=params, timeout=40)
            response.raise_for_status()
            data = response.json()
            
            hotels = []
            if "properties" in data:
                hotels = data.get("properties", [])
            elif "hotels" in data:
                hotels = data.get("hotels", [])
            elif "results" in data:
                hotels = data.get("results", [])
            
            print(f"Received {len(hotels)} hotels for: {destination} ({check_in} to {check_out})")

            enriched_hotels = []
            for hotel in hotels:
                hotel['search_params'] = {
                    'destination': destination,
                    'check_in': check_in,
                    'check_out': check_out,
                    'adults': adults,
                    'rooms': rooms
                }
                enriched_hotels.append(hotel)
            
            _HOTELS_CACHE[cache_key] = enriched_hotels
            _CACHE_TIMESTAMP = current_time
            
            return Response(enriched_hotels)

        except requests.exceptions.Timeout:
            error_msg = "SerpAPI request timeout"
            print(error_msg)
            return Response({"error": error_msg}, status=504)
        except requests.exceptions.RequestException as e:
            error_msg = f"SerpAPI connection error: {e}"
            print(error_msg)
            return Response({"error": error_msg}, status=502)
        except Exception as e:
            error_msg = f"SerpAPI error: {str(e)}"
            print(error_msg)
            return Response({"error": error_msg}, status=500)

    def retrieve(self, request, pk=None):
        print(f"HotelViewSet.retrieve called with pk={repr(pk)}")
        if not pk:
            return Response({"error": "Hotel ID is required"}, status=400)

        global _HOTELS_CACHE
        for cache_key, hotels in _HOTELS_CACHE.items():
            for hotel in hotels:
                if hotel.get("property_token") == pk:
                    print(f"Found hotel: {hotel.get('name')}")
                    return Response(hotel)

        print(f"Hotel with property_token={pk} not found")
        return Response({"error": "Hotel not found"}, status=404)