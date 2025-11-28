# hotels/views.py
import requests
import os
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from dotenv import load_dotenv

load_dotenv()

_HOTELS_CACHE = {}

class HotelViewSet(ViewSet):
    def list(self, request):
        print("HotelViewSet.list called")
        adults = request.query_params.get("adults", "2")
        try:
            adults = int(adults)
            if adults < 1:
                adults = 2
        except (TypeError, ValueError):
            adults = 2

        cache_key = f"adults_{adults}"

        if cache_key in _HOTELS_CACHE:
            print(f"Returning cached hotels for adults={adults}")
            return Response(_HOTELS_CACHE[cache_key])

        url = "https://serpapi.com/search.json"
        params = {
            "engine": "google_hotels",
            "q": "Bali Resorts",
            "check_in_date": "2025-11-28",
            "check_out_date": "2025-11-29",
            "adults": str(adults),
            "hotel_class": 3,
            "api_key": os.getenv("SERP_API_KEY")
        }

        try:
            print(f"Fetching from SerpAPI with adults={adults}")
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            hotels = data.get("properties", [])

            _HOTELS_CACHE[cache_key] = hotels

            print(f"Received {len(hotels)} hotels for adults={adults}")
            if hotels:
                print("=== Sample hotel ===")
                print("Name:", hotels[0].get("name"))
                print("Rating:", hotels[0].get("overall_rating"))
                print("Property token:", hotels[0].get("property_token"))
                print("=====================")

            return Response(hotels)
        except Exception as e:
            error_msg = f"SerpAPI error: {e}"
            print(error_msg)
            return Response({"error": error_msg}, status=500)

    def retrieve(self, request, pk=None):
        print(f"HotelViewSet.retrieve called with pk={repr(pk)}")
        return Response({"error": "Use /api/hotels/?adults=N instead"}, status=404)