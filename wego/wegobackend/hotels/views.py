
import requests
import os
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from dotenv import load_dotenv

load_dotenv()

_HOTELS_CACHE = []


class HotelViewSet(ViewSet):
    def list(self, request):
        print(" HotelViewSet.list called")
        url = "https://serpapi.com/search.json"  
        params = {
            "engine": "google_hotels",
            "q": "Bali Resorts",
            "check_in_date": "2025-11-28",
            "check_out_date": "2025-11-29",
            "hotel_class": 3,
            "api_key": os.getenv("SERP_API_KEY")
        }

        try:
            print(f"Fetching from SerpAPI: {url} with params: {params['q']}")
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            hotels = data.get("properties", [])

    
            global _HOTELS_CACHE
            _HOTELS_CACHE = hotels

            print(f" Received {len(hotels)} hotels")
            if hotels:
                print("=== HOTEL KEYS (first hotel) ===")
                print(list(hotels[0].keys()))
                print("Sample name:", hotels[0].get("name"))
                print("Sample rating:", hotels[0].get("overall_rating"))
                print("Sample images count:", len(hotels[0].get("images", [])))
                print("===============================")

            return Response(hotels)
        except Exception as e:
            error_msg = f" SerpAPI error: {e}"
            print(error_msg)
            return Response({"error": error_msg}, status=500)

    def retrieve(self, request, pk=None):
        print(f"HotelViewSet.retrieve called with pk={repr(pk)}")
        try:
            idx = int(pk)
        except (TypeError, ValueError) as e:
            print(f"Invalid hotel ID '{pk}': {e}")
            return Response({"error": "Invalid hotel ID"}, status=400)

        global _HOTELS_CACHE
        cache_len = len(_HOTELS_CACHE)
        print(f" Hotel cache size: {cache_len}")

        if idx < 0 or idx >= cache_len:
            print(f"Index {idx} out of range [0, {cache_len})")
            return Response({"error": "Hotel not found"}, status=404)

        hotel = _HOTELS_CACHE[idx]
        print(f"Returning hotel #{idx}: {hotel.get('name', 'N/A')}")
        return Response(hotel)